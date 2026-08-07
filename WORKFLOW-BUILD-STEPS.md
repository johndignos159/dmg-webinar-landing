# Workflow build — action by action

What to click, in order. Companion to `WEBINAR-WORKFLOW-BUILD.md`, which holds
the reasoning; this file is just the sequence.

**Two new workflows, plus a branch on an existing one.** Registration and
reminders; the nurture; then the booked path bolted onto
*01 - Schedule a Consultation Workflow*, which already handles that trigger.

Webinar: **Tuesday 15 September 2026, 7:00 PM Eastern.**

---

## Before you start

Set the workflow timezone to **America/New_York**. Every "Wait Until" below is
in Eastern, and GHL evaluates them against the workflow's timezone, not yours.

---

# Workflow 1 — "Webinar — Registration & Nurture"

**Trigger:** Form Submitted → *Webinar Registration*

**Settings:**
- Re-entry: **off** — someone registering twice should not get two sequences
- Stop on response: **on**
- Timezone: America/New_York

### Exit condition — handled from Workflow 3, not here

Nothing to add in this workflow. The **Remove From Workflow** action lives in
Workflow 3 and points back at this one and at Workflow 2.

That action asks you to pick a workflow because it is built to remove contacts
from *other* workflows. Putting it inside the workflow it is meant to stop does
not work, and the dropdown makes that obvious the moment you try.

So: build this workflow straight through. Workflow 3's first actions pull people
out of both the reminder and nurture workflows the moment they book.

Without that step, someone who books on day 5 still receives *"Two roads from
here"* on day 21 — which undoes everything the sequence built. It is the easiest
thing to forget, so it is the first action in Workflow 3.

---

## Part A — On registration

| # | Action | Setting |
| --- | --- | --- |
| 1 | Add Tag | `webinar-2026-09-15-registered` |
| 2 | Update Contact Field | Webinar Date = `09/15/2026` |
| 3 | Create Opportunity | Pipeline **Webinar Pipeline** · Stage **Registered** · Value **0** |
| 4 | Send Email | template **youre in** |

Value 0 matters. Revenue is counted in LLC Formation; putting 997 here as well
double-counts every sale.

---

## Part B — Pre-webinar reminders

**Every wait here is a date, never a duration.** A "wait 3 days" step works for
someone registering three weeks out and fires *after* the webinar for someone
registering the day before.

### The Wait step handles the bypass itself — settled 2026-08-06

Every Wait step has an **"If this date has already passed"** setting. Choose:

> **Skip all outbound communication actions till next wait or event start date
> action** *(Email, SMS, call & voicemail)*

That is the whole guard. Someone registering on 14 September hits the
12 September wait, GHL sees the date has passed, skips the "3 days" email, and
carries them to the next Wait where they resume normally.

**Set it on all four Wait steps.** Defaults vary between steps.

The other three options are all wrong here:

| Option | What it does |
| --- | --- |
| Continue to next action | Fires the stale email anyway |
| Exit contact from automation | Drops them out of the funnel entirely |
| Go to specific step | Works, but needs manual rewiring every time the sequence changes |

This replaces two earlier attempts — an If/Else guard on the Webinar Date field,
and a three-branch structure with a separate post-session workflow. Neither was
needed. The field is identical for every contact so it cannot distinguish
registrants, and GHL already solves this natively.

Ten steps, straight down. No branching.

| # | Action | Date / template | If date passed |
| --- | --- | --- | --- |
| 1 | Wait | `09/12/2026` · `07:00:00 PM` | Skip outbound |
| 2 | Send Email | `3 days` | |
| 3 | Wait | `09/14/2026` · `07:00:00 PM` | Skip outbound |
| 4 | Send Email | `1 day` | |
| 5 | Wait | `09/15/2026` · `06:00:00 PM` | Skip outbound |
| 6 | Send Email | `1 hr` | |
| 7 | Send SMS | copy below | |
| 8 | Wait | `09/15/2026` · `06:45:00 PM` | Skip outbound |
| 9 | Send Email | `15 mins` | |
| 10 | Send SMS | copy below | |

On every Wait, leave "When should the contact proceed?" on **On this date and
time**.

Subject lines are set on each Send Email step, not in the template. The full
list is in `emails/README.md`.

### SMS copy

T-1 hour:

```
{{contact.first_name}}, the DMG masterclass starts in 1 hour
(7PM ET / 4PM PT). Join: https://us05web.zoom.us/j/81236507956

Reply STOP to opt out.
```

T-15 minutes:

```
Starting in 15 min. Here's your link:
https://us05web.zoom.us/j/81236507956

Reply STOP to opt out.
```

Two texts only. More and you train people to opt out.

Check that your consent checkbox actually gates these — if it does not set DND
or a field the workflow can read, you are texting people who did not tick it.

---

## Part C — Hand off to the nurture

**The attended / no-show split was dropped 2026-08-07.** Everyone who registered
gets the same follow-up regardless of whether they showed. Two reasons:

1. The split needed the attendance list tagged manually before 10:00 PM on the
   night. One missed step and every attendee receives "you missed it".
2. **Update Opportunity does nothing without a Find Opportunity before it** —
   proven by test on 2026-08-07, the stage never moved and no error was raised.
   The split needed that fix in four places.

The trade is that you lose show-rate reporting from the pipeline. See the note
at the end for how to keep the number without the branching.

Two steps, no branching:

| # | Action | Setting |
| --- | --- | --- |
| 1 | Wait | `09/16/2026` · `09:00:00 AM` · Skip all outbound |
| 2 | Add Tag | `webinar-2026-09-15-nurture` |

The morning after, not the same night — a follow-up landing at 10pm gets buried.

That tag is the trigger for Workflow 2. Workflow 1 ends here.

---

# Workflow 2 — "Webinar — Nurture"

**Trigger:** Contact Tag -> `webinar-2026-09-15-nurture`

**Settings:** re-entry off, timezone America/New_York.

Durations are safe throughout. Everyone is tagged at the same moment, so
"wait 2 days" means the same for all of them. That was only untrue *before* the
webinar, which is why Part B used fixed dates.

| Wait | Send Email | Subject |
| --- | --- | --- |
| — | `06-day1-next-step` | The Blueprint — your next step |
| 2 days | `day 3-backward` | Building in the wrong order |
| 2 days | `day 5-front` | You can't do any of it until you legally exist |
| 2 days | `day 7-fraud` | $725M vanished last year. New authorities were the target. |
| 3 days | `day 10-which-pillar` | Which of the four pillars is missing? |
| 4 days | `day 14-faq` | The questions I get asked most |
| 7 days | `day 21-two-roads` | Two roads from here |

The first email sends immediately on trigger — no wait before it.

### After the last email

| # | Action | Setting |
| --- | --- | --- |
| 1 | Add Tag | `webinar-cold` |
| 2 | **Create or Update Opportunity** | Pipeline: **Webinar Pipeline** · Stage: **Closed Lost** · Value **0** |

### Use Create or Update, never Find + Update — corrected 2026-08-07

An earlier version of this doc specified Find Opportunity followed by Update
Opportunity. That was a misreading.

**Update opportunity** is the node that warns *"if neither is found, nothing
happens"* — it genuinely does need a Find before it, and it splits the canvas
into Found / Not Found branches, which breaks any workflow that has steps after
it.

**Create or Update Opportunity** is a different action. It looks for a matching
opportunity itself: finds one, updates it; finds none, creates one. No Find
step, no branching, no dead-end path.

It is the same node used in Part A, where it works. Use it everywhere an
opportunity needs setting.

`webinar-cold` is not a dead end. It is the warmest re-invite list for the next
webinar — better than cold traffic, and free.

---

## Keeping show rate without the split

The pipeline no longer records who attended, but the number still matters — it
is what tells you whether the reminder sequence works and whether webinar two is
worth running.

Cheapest way to keep it: on the night, export the Zoom participant list and
bulk-add the tag `webinar-2026-09-15-attended` in GHL. Same ten minutes as
before, but nothing depends on it — if it does not happen, no emails go wrong.
The tag is then just a filter you can count later.

## The pipeline has two stages nobody will enter

**Attended Live** and **No-Show** are now unused. An empty stage skews the funnel
chart, so either delete them, or leave them and read the funnel as
Registered → Consultation Booked → Closed Lost.
# The booked path — added to the existing workflow

**Decided 2026-08-07: no separate webinar booking workflow.** The webinar steps
go on the end of **01 - Schedule a Consultation Workflow**, which already
triggers on Appointment Booked for that calendar.

## Why not a separate one

Both would fire on the same trigger. A webinar lead who books would run through
each — two confirmation emails, two sets of reminders, from one booking.

A tag filter on a new workflow stops it firing for website bookings, but nothing
stops the *existing* workflow firing for webinar bookings. One workflow with a
branch is the only version that sends each thing once.

## What to add

Open **01 - Schedule a Consultation Workflow**. The two Remove steps go at the
**very top**, immediately after the trigger. The rest can follow them.

No Condition needed. Every one of these is a no-op for a website booker, so
they can run inline for everyone.

| # | Action | Setting | Where |
| --- | --- | --- | --- |
| 1 | **Remove From Workflow** | Workflow 1 — registration/reminders | **Top, right after the trigger** |
| 2 | **Remove From Workflow** | **Webinar — Nurture** | **Top, right after the trigger** |
| 3 | Add Tag | `consultation-booked` | Anywhere after |

**No opportunity step here.** The stage move was dropped 2026-08-07 — the
`consultation-booked` tag records the same fact, and counting tagged contacts
gives the same number without adding a node to a shared workflow.


### Steps 1 and 2 must be at the top — corrected 2026-08-07

They were briefly placed at the end of the workflow. That does not work, for two
reasons.

**Timing.** There is a Wait partway through the consultation workflow. Someone
booking on day 5 of the nurture would not be removed until the workflow reached
its final step — after the appointment, days later. In the meantime they would
receive day 7, day 10 and day 14, all sent after they had already booked. That
is the exact failure the removes exist to prevent.

**Branching.** The workflow has several paths ending in different places. Steps
on one terminal branch are never reached by contacts routed down another.

At the top, immediately after the trigger, they fire for everyone the moment a
booking happens.

## The two that matter

**Steps 1 and 2** are the reason this exists. Someone booking on day 5 sits in
the **Nurture** workflow, not the registration one. Remove them from only the
first and they keep receiving day 7, 10, 14, and "Two roads from here" on day 21
— sixteen days after booking a call.

**Step 4** is not optional. Update Opportunity silently does nothing without a
Find Opportunity before it. No error, no failed step, the stage never moves.
Verified by test 2026-08-07.

## Check what the existing workflow already does

| If it already... | Then |
| --- | --- |
| Sends a booking confirmation | Do not add another. `booked-confirmation` goes unused. |
| Sends 24h / 1h reminders | Do not add those. `booked-24hr` and `booked-1hr` go unused. |
| Creates an opportunity in **Schedule a Consulation** | Do not add another, or every booking makes two. |
| Adds its own booking tag | Keep `consultation-booked` anyway — the Remove From Workflow steps do not depend on it, but it makes webinar bookings filterable. |

If it does **not** send confirmations or reminders, add those three emails into
the same branch. That is also where the `[MEETING LINK]` and `[RESCHEDULE LINK]`
merge fields become available in the dropdown, which is the last thing blocking
those two templates.

## Three templates may end up unused

`booked-confirmation`, `booked-24hr`, `booked-1hr` — if the existing workflow
covers that ground, leave them. Three fewer things to maintain, and they are
already built if you ever split the calendars.

## After the call — 04 - Consultation Showed

That workflow already has a **Goal** gating on appointment status = Showed, so
anything placed after it runs only for people who actually turned up. That is
the warmest audience in the whole funnel, and as of 2026-08-07 nothing was being
sent to them.

Add two actions after the Goal:

| # | Action | Setting |
| --- | --- | --- |
| 1 | **Send Email** | `18-post-call-auto` · *Good talking with you — here is the link* |
| 2 | **Add Task** | see below |

### The email

`18-post-call-auto` has no fill-in-the-blanks, so it can send unattended. Short,
lands within minutes of the call being marked Showed, and its only CTA is the
**Short Intake Form** — which is stage 0 of LLC Formation, so submitting it puts
them in the revenue pipeline on its own.

Create it in GHL as a new template; there is no existing one to paste over.

### The task

| Field | Value |
| --- | --- |
| Title | `Personal follow-up — {{contact.first_name}} {{contact.last_name}}` |
| Assigned to | John |
| Due | Same day |
| Description | Send `post-consult` with their lane and first step filled in, if the call warrants it. The automated email has already gone. |

### Why both

The automated email guarantees something reaches them at peak intent, even on a
busy week. The task lets you add the personal version where it is worth the
time — without it being the only thing standing between a good call and silence.

`post-consult` is not automated. It carries `[Which lane and why]` and
`[Specific recommendation and order]`, written per person after the
conversation. Send it manually, or trigger it from an appointment status change
and edit before sending.

Its CTA is the **Short Intake Form**, which is stage 0 of LLC Formation — so
submitting it moves them into the revenue pipeline on its own.

---

## Test before you trust it

Register a test contact, then book a call with the same email. Check:

- Nurture emails stop
- `consultation-booked` tag applied
- Webinar Pipeline opportunity moved to **Hot Lead**
- **Exactly one** confirmation email, not two
- **Exactly one** opportunity in Schedule a Consulation, not two

The last two are what catch a duplicated step.

---

*Created 2026-08-06.*