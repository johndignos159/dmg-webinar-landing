# Workflow build — action by action

What to click, in order. Companion to `WEBINAR-WORKFLOW-BUILD.md`, which holds
the reasoning; this file is just the sequence.

**Build two workflows, not one.** One for registration through nurture, one for
the booked path. They fire on different triggers and mixing them makes a long
workflow that is hard to debug.

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

### Exit condition — handled from Workflow 2, not here

Nothing to add in this workflow. The **Remove From Workflow** action lives in
Workflow 2 and points back at this one.

That action asks you to pick a workflow because it is built to remove contacts
from *other* workflows. Putting it inside the workflow it is meant to stop does
not work, and the dropdown makes that obvious the moment you try.

So: build this workflow straight through. Workflow 2's first action pulls people
out of it the moment they book.

Without that step, someone who books on day 5 still receives *"Two roads from
here"* on day 21 — which undoes everything the sequence built. It is the easiest
thing to forget, so it is the first action in Workflow 2.

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

Each block is If/Else → Wait Until → Send, so late registrants skip anything
already past.

### T-3 days

```
If/Else   →  Webinar Date is more than 3 days from now
   YES    →  Wait Until  12 Sep 2026, 7:00 PM
          →  Send Email: 3 days
   NO     →  skip to next block
```

### T-1 day

```
If/Else   →  Webinar Date is more than 1 day from now
   YES    →  Wait Until  14 Sep 2026, 7:00 PM
          →  Send Email: 1 day
   NO     →  skip
```

### T-1 hour

```
Wait Until  15 Sep 2026, 6:00 PM
Send Email: 1 hr
Send SMS:   see SMS copy below
```

### T-15 minutes

```
Wait Until  15 Sep 2026, 6:45 PM
Send Email: 15 mins
Send SMS:   see SMS copy below
```

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

## Part C — The attended / no-show split

```
Wait Until  15 Sep 2026, 10:00 PM        (three hours after the session ends)

If/Else  →  Contact has tag `webinar-2026-09-15-attended`

   YES  →  Update Opportunity  →  stage Attended Live
        →  Send Email: attended

   NO   →  Add Tag `webinar-2026-09-15-noshow`
        →  Update Opportunity  →  stage No-Show
        →  Send Email: no show
```

**This branch is the whole point.** Show rates run 30-45%, so more than half your
list takes the No path. Sending them "thank you for attending" tells them nobody
is paying attention.

**The attended tag has to come from somewhere.** Zoom does not tell GHL who
showed up on its own. Decide before 15 September:

- Native GHL/Zoom integration
- n8n off the Zoom webhook, tagging contacts as attendees come through
- Manual: export the Zoom attendee CSV, bulk-add the tag in GHL the same night

Manual is fine for the first run. Just do it **before 10:00 PM**, or everyone
falls down the No-Show branch.

---

## Part D — Nurture

Both branches merge here.

Durations are safe from this point. Everyone reaches the end of the webinar at
the same moment, so "wait 2 days" means the same thing for all of them. That is
only untrue *before* the webinar, which is why Part B uses dates.

| Wait | Then send |
| --- | --- |
| 2 days | day 3-backward |
| 2 days | day 5-front |
| 2 days | day 7-fraud |
| 3 days | day 10-which-pillar |
| 4 days | day 14-faq |
| 7 days | day 21-two-roads |

### After the last email

```
Add Tag             `webinar-cold`
Update Opportunity  →  stage Closed Lost
```

---

# Workflow 2 — "Webinar — Consultation Booked"

**Trigger:** Appointment Booked → your setup call calendar

This is where the per-appointment merge fields become available. They will be
blank in Workflow 1, which is why the booked emails live here.

| # | Action | Setting |
| --- | --- | --- |
| 1 | **Remove From Workflow** | select **Webinar — Registration & Nurture** |
| 2 | Add Tag | `consultation-booked` |
| 3 | Update Opportunity | Webinar Pipeline → stage **Consultation Booked** |
| 4 | Send Email | template **booked-confirmation** |

**Step 1 is the important one.** It is what stops someone who has already booked
from continuing to receive the nurture sequence. Put it first, before anything
else, so it fires even if a later step errors.

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
