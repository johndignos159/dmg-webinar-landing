# DMG Webinar — Master Reference

Single entry point. Everything decided, everything built, everything outstanding.
Detail lives in the two companion docs; this file holds **current state**.

| Doc | Covers |
| --- | --- |
| `META-GHL-WORKFLOW.md` | Meta ad → landing page → form, plus a plain-English glossary |
| `WEBINAR-WORKFLOW-BUILD.md` | The GHL workflow map and build spec |
| `WORKFLOW-BUILD-STEPS.md` | Click-by-click build order for both workflows |
| `N8N-ZOOM-ATTENDANCE.md` | Wiring Zoom attendance into GHL so the split works |
| `emails/README.md` | The 17 emails, subject lines, how to load them |

Last updated 2026-08-05.

---

## 1. The webinar

| | |
| --- | --- |
| Title | The Transportation Entrepreneur Blueprint™ |
| Date | **Tuesday, 15 September 2026** |
| Time | **7:00 PM Eastern / 4:00 PM Pacific** |
| Length | 45 minutes + live Q&A |
| Platform | Zoom — **paid plan confirmed 2026-08-07** |
| Room | `https://us05web.zoom.us/j/81236507956` |
| Offer | Trucking Business Setup — **997 USD** (LLC, EIN, BOI, BOC-3, bilingual) |
| Close | "Book Your Setup Call" |

Changed from Sat 15 Aug 2:00 PM on 2026-08-05. The config uses a `-04:00`
offset, which is correct — DST runs to 1 Nov 2026, so September is still EDT
even though the page label reads EST.

---

## 2. Live values — the reference card

```
Production site      https://dmg-webinar-landing.vercel.app
Thank-you page       https://dmg-webinar-landing.vercel.app/confirmed
GitHub               johndignos159/dmg-webinar-landing

GHL location id      dEUu3bVfyQdKMZZSumgJ

Registration form    chuVjUognnNozdZ3Fy7r
  embed              https://api.leadconnectorhq.com/widget/form/chuVjUognnNozdZ3Fy7r
  redirect           /confirmed   (verified working)

Short Intake Form    5vCz4nUIQbx73vumvbFK
  embed              https://api.leadconnectorhq.com/widget/form/5vCz4nUIQbx73vumvbFK
  role               the 997 offer link — front door to LLC Formation

Booking calendar     https://api.leadconnectorhq.com/widget/booking/hu6p9LZ65HxhL9ayiqko
  note               permanent link, not the slug one — survives calendar renames

Webinar Pipeline     H3YdniI3QAKlRDnbCOWd     (created 2026-08-06, 7 stages)
LLC Formation        xQn1lQyjn4kR8KjxtwZI     (handoff destination)

Phone                321-204-9035
```

**Never use the Vercel preview URLs** (`…-git-main-…`, `…-iuvbg2zym-…`). They sit
behind Vercel SSO and demand a login. Only the production URL above is public.

---

## 3. The Webinar Funnel pipeline

Built 2026-08-06 as **"Webinar Pipeline"**. **Opportunity value 0** — revenue is
counted in LLC Formation only, and putting 997 in both places double-counts
every sale.

Simplified to three stages 2026-08-07. No-Show, Attended Live, Watched Replay
and Consultation Booked were all removed — the first three when the attended
split was dropped, the last when it became clear "Hot Lead" says the same thing.

| # | Stage | Enters when |
| --- | --- | --- |
| 1 | **Registered** | Registration form submitted. Everyone starts here. |
| 2 | **Hot Lead** | Booked a setup call. **Handoff point.** |
| 3 | **Closed Lost** | Nurture finished at day 21 with no booking |

An empty stage makes a funnel chart lie, so fewer honest stages beat more
aspirational ones. Depth lives in the pipelines downstream: whether the call
happened is **Schedule a Consulation**, whether they bought is **LLC Formation**.
### Why it stops at Hot Lead

The Short Intake Form's submission is **stage 0 of LLC Formation**. So a
converting webinar lead enters that pipeline on its own — you wire nothing.

```
Webinar Funnel  (value 0 — engagement tracking)
  Registered → No-Show → Attended Live
  → Hot Lead → Consultation Booked → Closed Lost
                      |
        they fill the Short Intake Form
                      |
LLC Formation  (997 — where revenue is counted)
  Intake SIGN UP → LLC Submitted → Session Booked → … → Paid 997
```

### Why a separate pipeline at all

LLC Formation opens at "Short Intake Form SIGN UP" — a webinar registrant has
not filled that, so there is no honest stage for them. And the states that
matter for a webinar (No-Show, Attended Live) are engagement states, not sales
stages. Without them you cannot measure show rate or attendee-to-booking
conversion — the two numbers that decide whether webinar two happens.

With no replay, show rate matters more than it would otherwise: live attendance
is now the only way anyone receives the content at all.

### Custom fields — created and verified 2026-08-06

| Field | Type | Purpose |
| --- | --- | --- |
| Webinar Date | DATE | Which session — keeps the pipeline reusable |
| Webinar Attended | RADIO | Live / Replay / No-Show |
| Watch Duration | NUMERICAL | Minutes attended — feeds the Hot Lead judgement |
| Ad Campaign | TEXT | Which Meta campaign produced the lead |

The "Replay" option on Webinar Attended is now unused. Harmless — leave it, in
case a future session is recorded.

### Tags

```
webinar-2026-09-15-registered
webinar-2026-09-15-attended
webinar-2026-09-15-noshow
consultation-booked
webinar-cold
```

Date-stamped deliberately. Reuse a plain `webinar-registered` across sessions
and by December you cannot tell who registered for which one.

---

## 4. Build order

1. ~~Custom fields~~ — **done, verified 2026-08-06**
2. ~~Webinar Pipeline~~ — **done, verified 2026-08-06**
3. **Delete the "Watched Replay" stage** if it is still there.
4. **Re-paste 15 emails** (list in section 6).
5. **Build the workflow.**

---

## 5. Status

### Done

- Landing page and `/confirmed` thank-you page live
- Site content rebuilt from `Transportation_Entrepreneur_Blueprint.pptx`
- Registration form built, embedded, redirect verified
- Phone submits E.164, country picker defaults to US
- All 17 email templates loaded in GHL as HTML type
- Zoom room, booking link and intake form baked into the emails
- Countdown, calendar links (Google + .ics) all derive from one date constant
- **Four custom fields created and verified** 2026-08-06 — Webinar Date (DATE),
  Webinar Attended (RADIO: Live/Replay/No-Show), Watch Duration (NUMERICAL),
  Ad Campaign (TEXT)
- **Webinar Pipeline created and verified** 2026-08-06 — all seven stages in order
- **All emails re-pasted into GHL** 2026-08-07
- **SMS consent text filled in** 2026-08-07 — real business name and use case on both checkboxes
- **Zoom confirmed on a paid plan** 2026-08-07
- **Workflow 1 built and verified end to end** 2026-08-07 — named
  "Webinar 0.1 Registration & Nurture". Execution log confirms Add Tag, Update
  contact field, Create or update opportunity and the confirmation email all
  fire, then the contact parks correctly on the first Wait.
- **Booking removal verified** 2026-08-07 — a contact parked on the Wait booked a
  call, and the log shows "Removed by - External workflow action / Removed From:
  01 - Schedule a Consultation Workflow". The nurture-exit path works.
- **Booking confirmation verified** — exactly one email, from the existing
  consultation workflow, already carrying a Reschedule link. So
  `booked-confirmation`, `booked-24hr` and `booked-1hr` stay unused.
- **`consultation-booked` tag dropped** — the existing `schedule-a-consultation`
  tag already marks every booker. Count webinar bookings by filtering contacts
  with both `webinar-2026-09-15-registered` and `schedule-a-consultation`.

### Outstanding

| Item | Blocks |
| --- | --- |
| The workflow itself | Everything |

| Meta Pixel ID — **parked 2026-08-06**, deferred until after the workflow | All ad tracking; remind before the ad goes live |

| Zoom attendance — **manual CSV for run one, decided 2026-08-07.** Must be tagged before 10:00 PM on 15 Sep. n8n spec written for later in `N8N-ZOOM-ATTENDANCE.md` | The entire attended / no-show split |
| Custom domain not attached | Nothing — Vercel URL works |
| Slide 4 origin story still a draft frame | The webinar itself |

### Placeholders still in the emails

| Placeholder | Files | Resolves when |
| --- | --- | --- |
| `[MEETING LINK]` | 15-booked-24h, 16-booked-1h | Merge field, inserted during workflow build |
| `[RESCHEDULE LINK]` | 15-booked-24h | Merge field, same |

`[REPLAY LINK]` is gone — the replay was dropped 2026-08-06.

---

## 6. Email re-paste list

Fifteen are fully resolved and can go in now:

```
01-immediate-youre-in     09-day5-front-door
02-t-minus-3-days         10-day7-fraud
03-t-minus-1-day          11-day10-which-pillar
04-t-minus-1-hour         12-day14-faq
05-t-minus-15-min         13-day21-two-roads
06-day1-noshow            14-booked-confirmation
07-day1-attended          17-post-consult
08-day3-backwards
```

Leave `15-booked-24h` and `16-booked-1h` only — they need per-appointment merge
fields you insert from the dropdown inside the workflow's email editor.

`06` and `07` moved onto the ready list when the replay was dropped. Note that
`06-day1-noshow` was rewritten end to end, not just relinked — it used to be a
"here is the recording" email and there is no recording now.

Also rename the GHL template **"day 7-front" to "day 7-fraud"**. Its content is
the fraud email; the name is wrong and will cost you a moment of confusion in
the workflow builder.

---

## 7. Decisions made, so they do not get re-litigated

**Option B architecture.** Meta ad → own landing page → GHL form. Not Meta
Instant Forms — those have no public URL, so a website button can never open
one, and Meta does not auto-redirect after submission.

**Thank-you page as a separate route.** `/confirmed` is how the Meta Pixel
reliably knows a registration happened. Detecting an iframe submit from the
parent page is fragile; a distinct URL loading is unambiguous.

**Tags, not `source`, for webinar attribution.** GHL does not overwrite `source`
on an existing contact — a test submission merged into a contact created days
earlier and kept "Voice AI Chat Widget". Filtering by source undercounts every
returning contact.

**UTM capture needs no code.** GHL writes an `attributions` block on form submit
containing page URL, medium, form id and utm source.

**Webinar opportunity value is 0.** Revenue lives in LLC Formation only.

**Attended and no-show get different Day 1 emails.** Show rates run 30–45%, so
"thank you for attending" would go to more than half the list who never showed.

**All workflow waits are date-anchored, never durations.** "Wait 3 days" fires
after the webinar for anyone registering late.

**Emails are generated, not hand-edited.** Copy lives in
`scripts/email-content.mjs`; run `node scripts/build-emails.mjs` after changes.

**No unsubscribe link in the templates.** Verified by test send 2026-08-06: GHL
appends its own at send time, on HTML templates as well as builder ones. The URL
it generates carries a token encoding that specific contact's id and email, so
it cannot be written into a file that goes to everyone — hardcoding one would
unsubscribe that single person every time anyone else clicked it. A
`{{unsubscribe_link}}` merge field was tried first and rendered as dead text.
Our footer supplies the physical postal address, which GHL does not add.

---

## 8. Corrections — old advice that was wrong

**Meta → GHL connection.** Early on this said to pick GoHighLevel from a
"Destination" dropdown inside Meta's form builder. That does not exist. The
connection is made from the GHL side: Settings → Integrations → Facebook, then
a workflow with the "Facebook Lead Form Submitted" trigger. Moot now that
Option B is the architecture, but do not go looking for that dropdown.

**Pipeline handoff.** This said hand off to *Lead Generation – Start Up
Pipeline*. Wrong. That pipeline opens at "New Cold Lead → Contact Attempted" and
is built for outbound to strangers. Corrected to **LLC Formation**.

**Intake form placement.** It was in the two pre-call emails. Wrong — it asks
for street address and postal code, which is what you need to form an entity,
not to prepare for a first conversation. Moved to post-consult, where it doubles
as the offer link.

**`output: 'standalone'` in next.config.** An AI Studio leftover that excludes
`public/` and `.next/static` from the build. Removed.

---

## 9. Three things that will break the workflow

**1. Duration waits.** Use *Wait Until a specific date/time* anchored to the
webinar datetime, with an if/else so late registrants skip anything already past.

**2. Phone format.** Must submit E.164 (`+1…`). Already verified, but if the
form is ever rebuilt, check it again — GHL SMS fails silently otherwise.

**3. Attendance.** Nothing tells GHL who showed up unless Zoom is wired in —
native integration, n8n off the Zoom webhook, or a manual CSV export. **Decide
before the session.** Without it the entire post-webinar branch collapses into
one undifferentiated follow-up.

---

## 10. Reusing this for the next webinar

Change the date in `lib/webinar-config.ts` and re-run
`node scripts/build-emails.mjs`. The countdown, the on-page date and time, both
calendar links and every email update together.

In GHL, change the tag suffix and the Webinar Date field value. The pipeline and
the workflow are reusable as-is.
