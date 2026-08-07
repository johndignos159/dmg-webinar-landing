# Workflow build — action by action

What to click, in order. Companion to `WEBINAR-WORKFLOW-BUILD.md`, which holds
the reasoning; this file is just the sequence.

**Three workflows.** Registration through the attended/no-show split; the
nurture; the booked path. They fire on different triggers, and splitting them is
what stops the nurture having to be built twice.

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
| 2 | **Find Opportunity** | Pipeline: Webinar Pipeline |
| 3 | Update Opportunity | Stage -> **Closed Lost** |

**Find Opportunity must come first.** Without it the update silently does
nothing — no error, no failed step, the stage just never moves.

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
# Workflow 3 — "Webinar — Consultation Booked"

**Trigger:** Appointment Booked → your setup call calendar

This is where the per-appointment merge fields become available. They will be
blank in Workflow 1, which is why the booked emails live here.

| # | Action | Setting |
| --- | --- | --- |
| 1 | **Remove From Workflow** | Workflow 1 — the registration/reminder one |
| 2 | **Remove From Workflow** | **Webinar — Nurture** |
| 3 | Add Tag | `consultation-booked` |
| 4 | **Find Opportunity** | Pipeline: **Webinar Pipeline** |
| 5 | Update Opportunity | Stage → **Consultation Booked** |
| 6 | Send Email | `booked-confirmation` · *Your setup call is confirmed* |

**Steps 1 and 2 are the whole point of this workflow.** They are what stops a
person who has already booked from continuing to receive nurture emails.

Both are needed. Someone booking on day 5 is sitting in the **Nurture**
workflow, not the registration one — removing them from only the first would
leave them receiving "Two roads from here" on day 21, sixteen days after they
booked.

Put them first, before anything else, so they fire even if a later step errors.

**Step 4 is not optional.** Update Opportunity silently does nothing without a
Find Opportunity before it — no error, no failed step, the stage simply never
moves. Verified by test on 2026-08-07.

### Reminders

```
Wait Until  appointment start minus 24 hours   →  Send Email: booked-24hr
Wait Until  appointment start minus 1 hour     →  Send Email: booked-1hr  + SMS
```

### Finish the two waiting templates here

`booked-24hr` and `booked-1hr` still contain `[MEETING LINK]` and
`[RESCHEDULE LINK]`. Insert the real values from the **merge-field dropdown** in
this workflow's email editor — they are per-appointment, so they cannot be
hardcoded into the template files.

### After the call

`post-consult` is not automated. It carries `[Which lane and why]` and
`[Specific recommendation and order]`, which are written per person after the
conversation. Send it manually, or trigger it from an "Appointment Showed"
status change and edit before sending.

---

## Test before you trust it

Register twice with different emails:

1. **Now** — should receive "youre in" immediately, then wait for T-3 days
2. **On 15 September, an hour before** — should receive "youre in" and then
   *skip straight to* the T-1 hour block, not sit waiting for a T-3 day email
   that can never fire

The second test is the one that finds broken waits. It is much cheaper to find
now than on the night.

---

*Created 2026-08-06.*
