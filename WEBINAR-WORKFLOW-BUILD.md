# Webinar Workflow — Build Spec + Email Content

Companion to `META-GHL-WORKFLOW.md`. That file covers ad → page → form.
This one covers everything that happens after the form is submitted.

Webinar: **Tuesday, September 15, 2026 · 7:00 PM Eastern**

---

## Part 1 — What I changed from the original plan, and why

### 1. Split attended from no-show before the nurture starts

**This is the important one.** The original Day 1 email is *"Thank You for Attending"* and it goes to everyone who did not book — including people who never showed up.

Two problems. A no-show who gets thanked for attending knows instantly that nobody is paying attention, and you have burned the single best re-engagement moment you will ever have with them. No-shows are not cold; they raised their hand and life got in the way. They need *"you missed it, here is the short version"*, not a thank-you.

Typical webinar show rates run 30–45%. So this branch is more than half your list.

### 2. All waits are anchored to the webinar date, never to durations

A step that says *"wait 3 days, then send"* works for someone who registers three weeks out and fails for someone who registers the day before — their "3 days before" email arrives after the webinar has ended.

Every pre-webinar step uses **Wait Until a specific date/time**. Each Wait is set to skip outbound communications if its moment has already passed, so late registrants pass through any reminder they have missed rather than receiving it stale.

### 3. SMS added at the two moments it actually matters

You are collecting phone numbers with consent and not using them. Email open rates sit around 20–30%; SMS lands above 90%. For *"we go live in one hour"*, SMS is the channel and email is the backup.

Two texts only — T-1 hour and T-15 minutes. Any more and you train people to opt out.

### 4. Hard exit conditions on the nurture

The moment someone books, they must leave the nurture sequence. Without this, a person who books on Day 5 still receives *"Last Chance to Schedule Your Free Strategy Session"* on Day 21. That single mistake does more damage to trust than the whole sequence builds.

### 5. Engagement-based fast-track

Anyone who watches more than 60% of the session, or clicks the offer link, skips the slow nurture and goes straight to a direct booking ask. They are ready — do not make them read six more emails first.

### 6. Timezone made explicit everywhere

Your audience spans four US timezones. Every mention of the time says **7:00 PM Eastern / 4:00 PM Pacific**. A driver in California seeing only "7:00 PM" will show up three hours late.

---

## Part 2 — The map

```
FORM SUBMITTED
      |
      +-- Tag: webinar-2026-09-15-registered
      +-- Custom field: Webinar Date = 2026-09-15
      +-- Opportunity -> Webinar Funnel -> "Registered"
      +-- EMAIL 1 (immediate): You're In
      |
      +-- Wait Until  T-3 days   -> EMAIL 2   (skip if past)
      +-- Wait Until  T-1 day    -> EMAIL 3   (skip if past)
      +-- Wait Until  T-1 hour   -> EMAIL 4 + SMS 1
      +-- Wait Until  T-15 min   -> EMAIL 5 + SMS 2
      |
   [ WEBINAR RUNS ]
      |
      +-- Wait Until  T+3 hours
      |
      +-- IF tag "webinar-attended"  ------+
      |                                     |
   NO-SHOW PATH                        ATTENDED PATH
      |                                     |
   EMAIL N1 (Day 1)                    EMAIL A1 (Day 1)
   "You missed it"                     "Thank you for attending"
      |                                     |
      |                          IF watched >60% OR clicked offer
      |                                     |
      |                              FAST TRACK -> direct booking ask
      |                                     |
      +------------- MERGE -----------------+
                     |
              NURTURE SEQUENCE
              Day 3, 5, 7, 10, 14, 21
                     |
              EXIT THE MOMENT tag "consultation-booked" is added
                     |
              Day 21 no booking -> tag "webinar-cold"
                                -> Opportunity -> "Closed Lost"

BOOKED (any point)
      |
      +-- Opportunity -> "Consultation Booked"
      +-- HAND OFF to existing LLC Formation pipeline (via Short Intake Form)
      +-- EMAIL B1 booking confirmation
      +-- Wait Until T-24h -> EMAIL B2
      +-- Wait Until T-1h  -> EMAIL B3 + SMS
      +-- After call -> EMAIL B4
```

---

## Part 3 — Build it in GHL

### Custom fields to create first

| Field | Type | Purpose |
| --- | --- | --- |
| Webinar Date | DATE | Which session — keeps the pipeline reusable |
| Webinar Attended | RADIO | Live / Replay / No-Show |
| Watch Duration | NUMERICAL | Minutes — drives the fast-track branch |
| Ad Campaign | TEXT | Which Meta campaign produced the lead |

### Tags

```
webinar-2026-09-15-registered
webinar-2026-09-15-attended
webinar-2026-09-15-noshow
consultation-booked
webinar-cold
```

Date-stamped on purpose. Reuse `webinar-registered` across sessions and by
December you cannot tell who registered for which one.

### Pipeline — "Webinar Funnel"

Registered → No-Show → Attended Live → Hot Lead →
Consultation Booked → Closed Lost

**Stop at Consultation Booked.** Hand off to the existing **LLC Formation**
pipeline, which already runs Short Intake Form SIGN UP → LLC Formation
Submitted → Session Booked → Session Showed → Docs → Invoice Sent →
Paid Trucking Business $997.

Corrected 2026-08-05. This originally said hand off to *Lead Generation - Start
Up Pipeline*. That pipeline opens at "New Cold Lead → Contact Attempted" and is
built for outbound to people who have never heard of DMG. A webinar registrant
sat through 45 minutes and asked for a call — filing them as a cold lead
misrepresents them and makes conversion reporting meaningless.

LLC Formation is the right destination because the webinar sells exactly what
that pipeline fulfils: the $997 setup. The website and the webinar are selling
the same product, so they should land in the same place.

**The handoff moment is the Short Intake Form.** Its submission is stage 0 of
LLC Formation, so a webinar lead enters that pipeline naturally when they
convert — no manual stage-setting needed.

### Workflow settings that matter

- **Trigger:** Form Submitted → *Webinar Registration*
- **Re-entry:** Off. Someone registering twice should not get two sequences.
- **Stop on response:** On, for the nurture only — a reply means a human should take over.
- **Timezone:** set the workflow to America/New_York so date waits behave.

### The skip-if-past pattern

Handled by the Wait step itself. On each one, set **"If this date has already
passed"** to:

> Skip all outbound communication actions till next wait or event start date action

A late registrant then passes straight through any reminder whose moment has
gone, and resumes at the next Wait.

No branching. An earlier version of this doc specified an If/Else guard on the
Webinar Date field — that does not work, because the field holds the same value
for every contact and so cannot tell an early registrant from a late one.

---

## Part 4 — Email content

**The email copy is no longer duplicated here.** It lives in one place:

| What | Where |
| --- | --- |
| Editable copy | `scripts/email-content.mjs` |
| Generated HTML, ready to paste into GHL | `emails/*.html` |
| Subject lines + load instructions | `emails/README.md` |

Run `node scripts/build-emails.mjs` after any copy change.

This section used to hold a second copy of every email. It drifted the moment
the deck rewrite landed — it still said five pillars, 60 minutes, and a Saturday
date long after the real emails had moved on. One source of truth only.

All 17 templates are loaded in GHL as of 2026-08-05, HTML type, one folder.

---
## Part 5 — What else I'd suggest

### Do a dry run with two test contacts

Register twice — once four weeks out, once two hours before the webinar.
Watch what each one receives. The late registrant is where date-anchored
waits break, and it is much cheaper to find that now.

### There is no replay at all

Decided 2026-08-06, and it is a stronger position than a 48-hour expiring
replay. Live attendance is now the only way anyone receives the content, which
makes every reminder in the sequence matter more.

Say it plainly in the pre-webinar emails rather than hiding it — "there is no
recording" is a reason to show up, not a disappointment. It is stated in the
confirmation email, the T-1 day email, and on both pages of the site.

The trade is that no-shows get nothing unless you give them something. The
Day 1 no-show email handles that: it delivers the three core points as text and
offers a call, instead of a video link most people would never open.

### Track show rate as your primary metric

Registrations flatter you. Show rate tells you whether the reminder
sequence works. Below 30% means the problem is the reminders, not the ad.

### Reuse this for every webinar

Nothing here is specific to September 15 except the date field and the tags.
Change the date, change the tag suffix, run it again.

### Consider making the offer twice

Your plan mentions the offer at the end of the session. Most of the
attention is in the first twenty minutes. Mention that the strategy
session exists early — briefly, no pitch — then make the full offer at
the end. People who leave at minute 35 will still have heard it.

---

*Created 2026-08-04.*
