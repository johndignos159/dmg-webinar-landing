# Meta Ads → GoHighLevel Webinar Workflow

The plan of record. Work top to bottom. Nothing below is optional unless marked so.

**Webinar:** Saturday, August 15, 2026 · 2:00 PM Eastern
**Architecture:** Option B — Meta ad → our landing page → GHL form → GHL workflow

---

## Glossary — read this first

You will hit these words constantly. Plain versions:

| Term | What it actually means |
| --- | --- |
| **Meta Pixel** | A snippet of code on your website that reports back to Facebook what visitors did. Without it Facebook is blind — it can see who clicked the ad but not who registered. |
| **Pixel ID** | The ~15-digit number identifying your pixel. Found in Meta Events Manager → Data Sources. |
| **Event** | A named thing the pixel reports. We use two: `PageView` (someone opened the page) and `Lead` (someone registered). |
| **UTM parameters** | Extra text on the end of a link that says where the visitor came from. `?utm_source=facebook&utm_campaign=webinar-aug15`. Your website reads them and passes them into the form, so in GHL you can see which ad produced which lead. Invisible to the visitor and harmless. |
| **Conversions API (CAPI)** | A second copy of the same events, sent from a server instead of the visitor's browser. Needed because iPhones and ad blockers block a lot of browser tracking. Without it Facebook under-reports your registrations and optimises badly. |
| **E.164** | The international phone format with a country code and a plus: `+13212049035`. GHL SMS silently fails without it. |
| **Conversion location** | A Meta ad setting: where the lead is captured. "Instant Form" = inside Facebook. "Website" = on your site. We use **Website**. |
| **Objective** | What you tell Meta to optimise for. "Traffic" buys clicks. "Leads" buys registrations. We use **Leads**. |

---

## The sequence

```
1.  User sees the ad in Facebook/Instagram
        | taps
2.  Browser opens
    dmgagencycore.com/webinar?utm_source=facebook
      &utm_medium=paid&utm_campaign=webinar-aug15&utm_content=ad-a
        |
3.  Page loads
    - Meta Pixel fires PageView
    - Countdown starts
    - UTM values captured into hidden form fields
        |
4.  User fills the form
    First name / Email / Phone
        | submits
5.  GHL receives it
    - Upserts contact (dedupes on email)
    - Writes custom fields: Webinar Date, Ad Campaign
    - Applies tag: webinar-2026-08-15-registered
    - Fires "Form Submitted" workflow trigger
        |
6.  Browser redirects to /webinar/confirmed
    - Meta Pixel fires Lead event   <-- what Meta optimises on
    - Shows: You're in + date/time + Add to Calendar + join link
        |
7.  GHL Workflow runs in the background
    - Creates Opportunity -> Webinar pipeline -> "Registered"
    - Email 1 (immediate): confirmation, calendar file, join link
    - Wait until T-24h  -> Email 2 + SMS
    - Wait until T-1h   -> Email 3 + SMS
    - Wait until T-15m  -> SMS "starting now"
        |
8.  Webinar runs
        |
9.  Attendance imported -> tags applied -> pipeline branches
    Attended -> "Attended Live" -> replay + offer sequence
    No-show  -> "No-Show"       -> replay push sequence
```

---

## Why step 6 exists

The redirect to a separate page is not decoration. It is how the pixel reliably knows a
registration happened.

If the form sits in an embedded frame on the landing page, detecting a successful submit
from the surrounding page is fragile — you end up listening for browser messages and
hoping GHL keeps sending them. A redirect to its own URL is unambiguous: that page
loading *means* someone registered. Fire `Lead` on page load and it is correct every time.

This is the difference between the campaign optimising properly and quietly wasting money.

---

## Three things that will break this

### 1. Duration-based waits kill reminders for late registrants

A workflow step saying "Wait 24 hours, then send reminder" works for someone who registers
three weeks out. For someone registering two hours before the webinar, the reminder arrives
the next day — after it ended.

**Use GHL's "Wait Until a specific date/time"**, anchored to the webinar datetime minus an
offset. Add an if/else so registrants skip any reminder whose time has already passed.

### 2. Phone numbers need the country code

The form must submit `+13212049035`, not `3212049035`. Set the phone field to default to US
in the GHL form config. Without it SMS fails silently — no error, no delivery.

### 3. Attendance does not arrive by itself

Nothing tells GHL who showed up unless it is connected. Ranked by effort:

- **Zoom** — GHL has a native integration; attendance can flow back automatically
- **n8n** — Zoom webhook into n8n, n8n updates GHL contacts (preferred, self-hosted already)
- **Manual** — export attendee CSV after the session, bulk-import as a tag

Manual is fine for the first webinar. **Decide before running it.** Without attendance data
the entire post-webinar branch collapses into one undifferentiated follow-up.

---

## Build checklist

### In GHL

- [ ] Custom fields: `Webinar Date` (DATE), `Webinar Attended` (RADIO: Live/Replay/No-Show), `Watch Duration` (NUMERICAL), `Ad Campaign` (TEXT)
- [x] Form built — id `chuVjUognnNozdZ3Fy7r` (First Name, Last Name, Email, Phone)
- [x] Form setting: redirect URL → `/confirmed` — **verified working 2026-07-31**
- [x] Phone submits E.164 — verified as `+63…` on a test submission
- [x] Phone country picker defaults to **US (+1)** — confirmed 2026-08-03
- [ ] Fill the `[BUSINESS NAME]` / `[USE_CASE_FROM_CAMPAIGN_DESCRIPTION]` placeholders
      in both SMS consent checkboxes (still showing raw to visitors)
- [ ] Pipeline "Webinar Funnel": Registered → No-Show → Attended Live → Watched Replay → Hot Lead → Consultation Booked → Closed Lost
- [ ] Workflow with **date-anchored** waits (see gotcha 1)
- [ ] Tags: `webinar-2026-08-15-registered` / `-attended` / `-noshow` / `-replay`

Stop the webinar pipeline at "Consultation Booked" and hand off to the existing
**Lead Generation – Start Up Pipeline**. Duplicating its closing stages means two
opportunities per person and double-counted revenue.

### In the code

- [ ] Meta Pixel installed — PageView on landing page, Lead on `/confirmed`
- [x] `/confirmed` page built, with Google Calendar + .ics buttons
- [x] GHL form embedded; all three CTAs scroll to `#register`
- [x] UTM capture — **not needed**. GHL records an `attributions` block
      automatically on form submit (page URL, medium, form id, utm source).
- [x] `REGISTER_URL` deleted from `lib/webinar-config.ts`

### Attribution gotcha found during testing

GHL **does not overwrite `source` on an existing contact.** A test submission
merged into a contact created days earlier by the chat widget, and `source`
stayed "Voice AI Chat Widget". Filtering webinar registrations by source will
undercount every returning contact — **use tags for webinar attribution.**

### Brand values for styling the GHL form

```
Font (labels, inputs)  Inter, 400
Font (headings)        Montserrat, 700-900, uppercase
Button background      #DC143C     hover #b91132
Button text            #FFFFFF     bold, uppercase, fully rounded
Field / body text      #1a1a1a
Label / helper text    #4b5563
Form background        #FFFFFF     (page places it on a white card)
```

### In Meta Ads Manager

- [ ] Objective: **Leads**
- [ ] Conversion location: **Website** (not Instant Form)
- [ ] Pixel connected, `Lead` set as the optimisation event
- [ ] Ad destination URL includes UTM parameters
- [ ] Conversions API configured (can follow later, but reporting will under-count until it is)

---

## Waiting on

| Item | Needed for |
| --- | --- |
| Meta Pixel ID | Installing the pixel — nothing tracks until this exists |
| Webinar platform choice | Join link, and whether attendance can automate at all |
| GHL form embed code | Replacing the landing-page buttons |

---

*Created 2026-07-31. Update the checkboxes as steps complete — this file is the source of truth.*
