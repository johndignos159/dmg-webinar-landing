# Spanish Dispatch Training — build spec

Spanish Group Dispatch Training · **Saturday 31 October and Sunday 1 November
2026**, 11:00 AM ET both days · **$197 USD**.

Companion to the code. The pages and emails are generated from
`lib/training-config.mjs`; this file covers everything clicked inside
GoHighLevel.

> **Language rule.** Everything a *customer* reads is Spanish — the landing
> page, the emails, the checkout terms. Everything *you* click is English —
> tags, pipeline stages, workflow names, email template names. You maintain
> this funnel; you should not have to translate a dropdown to find the right
> reminder at 11pm the night before the training.

---

## 1. Live values

```
Landing page      https://webinar.dmgagencycore.com/entrenamiento
                  (also entrenamiento.dmgagencycore.com once DNS is set)
Confirmation      /entrenamiento/confirmado

Registration form arxMryfXfCK31Rj6JrpZ   "Spanish Training Intake Form"
  on submit       Redirect -> the payment link below            [confirmed]

Payment link      https://link.fastpaydirect.com/payment-link/6ab8697cbaea3cadef54f885
Product           Entrenamiento de Despacho en Grupo (Español) — 31 Oct y 1 Nov 2026
  price           $197 USD, one-time, LIVE mode                 [confirmed]

Zoom              https://us06web.zoom.us/j/88927881365
  meeting id      889 2788 1365
  passcode        331181
  recurrence      daily 11:00 AM ET — Zoom handles the DST change itself

Emails            emails-entrenamiento/   (10 templates, Spanish content)
```

**The Zoom room is deliberately not the webinar's.** That link sits in five
webinar emails already sent to a list that grows with every ad click. Reusing it
would have let any free registrant walk into a paid training.

---

## 2. Tags — create these four

```
training-2026-10-31-registered
training-2026-10-31-paid
training-2026-10-31-abandoned
training-2026-10-31-attended
```

Date-stamped because this becomes the template for future trainings. Reuse a
bare `training-paid` across three runs and by February you cannot tell who paid
for which one.

---

## 3. Pipeline — create one named `Spanish Training - Oct 2026`

Four stages, in this order:

| # | Stage name | Answers the question |
| --- | --- | --- |
| 1 | `Registered - Not Paid` | who registered but did not pay |
| 2 | `Paid - Confirmed` | who paid · who is confirmed |
| 3 | `Abandoned` | who was chased and never converted |
| 4 | `Attended` | who actually turned up |

Opportunity value: **197**.

Different from the webinar on purpose. There, value stayed 0 because revenue was
counted again in LLC Formation and 997 in both places double-counted every sale.
This training is counted nowhere else, so 197 makes the pipeline total a real
revenue figure.

`Attended` has no automatic source — same gap as the webinar. Export the Zoom
attendee list after day 2 and bulk-move them. Ten minutes.

---

## 4. Workflow 1 — name it `TRAINING - Registration & Recovery`

**Trigger:** Form Submitted → *Spanish Training Intake Form*

**Settings:** re-entry **off** · timezone **America/New_York**

| # | Action | Exactly what to set |
| --- | --- | --- |
| 1 | Add Tag | `training-2026-10-31-registered` |
| 2 | Create or Update Opportunity | Pipeline `Spanish Training - Oct 2026` · Stage `Registered - Not Paid` · Value `197` |
| 3 | Send Internal Notification | to **Cora Matzek** — copy in §6 |
| 4 | Wait | **1 hour** |
| 5 | Send Email | template `TRAINING - recovery 1 hour` |
| 6 | Wait | **2 days** |
| 7 | Send Email | template `TRAINING - recovery day 2` |
| 8 | Wait | **2 days** |
| 9 | Send Email | template `TRAINING - recovery day 4` |
| 10 | Add Tag | `training-2026-10-31-abandoned` |
| 11 | Create or Update Opportunity | Stage `Abandoned` |

**No If/Else anywhere in this workflow.** Everyone who registers enters it, and
people who pay get pulled out by Workflow 2. Same pattern the webinar already
uses for bookings — proven in this account, and it avoids branching a workflow
that contains waits.

**Create or Update Opportunity**, never plain *Update Opportunity* — the latter
silently does nothing without a Find before it, raises no error, and cost a
debugging session on the webinar build.

---

## 5. Workflow 2 — name it `TRAINING - Payment & Reminders`

**Trigger:** the payment event for this product. GHL calls it **Order Form
Submitted** or **Payment Received** depending on version — use whichever your
account offers, and **filter it to this product only**, or every purchase in the
whole account lands in this training's sequence.

**Settings:** re-entry **off** · timezone **America/New_York**

| # | Action | Exactly what to set |
| --- | --- | --- |
| 1 | **Remove From Workflow** | `TRAINING - Registration & Recovery` |
| 2 | Add Tag | `training-2026-10-31-paid` |
| 3 | Create or Update Opportunity | Stage `Paid - Confirmed` · Value `197` |
| 4 | Send Email | template `TRAINING - payment confirmed` |
| 5 | Send Internal Notification | to **Cora Matzek** — copy in §6 |
| 6 | Wait until | `17/10/2026` · `10:00 AM` · **skip outbound** |
| 7 | Send Email | template `TRAINING - 2 weeks before` |
| 8 | Wait until | `24/10/2026` · `10:00 AM` · skip outbound |
| 9 | Send Email | template `TRAINING - 1 week before` |
| 10 | Wait until | `28/10/2026` · `10:00 AM` · skip outbound |
| 11 | Send Email | template `TRAINING - 3 days before` |
| 12 | Wait until | `30/10/2026` · `5:00 PM` · skip outbound |
| 13 | Send Email | template `TRAINING - 1 day before` |
| 14 | Wait until | `31/10/2026` · `9:00 AM` · skip outbound |
| 15 | Send Email | template `TRAINING - day 1 morning` |
| 16 | Wait until | `01/11/2026` · `9:00 AM` · skip outbound |
| 17 | Send Email | template `TRAINING - day 2 morning` |

### Step 1 is the whole design

It must be **first**, immediately after the trigger. It is what stops someone
who just paid $197 receiving *"your seat is not reserved yet"* an hour later.

Put it anywhere lower and the waits above it run first — the person gets the
recovery email, *then* gets removed. That is the exact failure the step exists to
prevent, and the webinar shipped it once with its remove steps parked at the end
of the consultation workflow.

### All six "Wait until" steps need skip-if-passed

On each one, set **"If this date has already passed"** to:

> Skip all outbound communication actions till next wait or event start date action

Without it, someone paying on 29 October gets *"two weeks to go"* the moment they
buy. With it, they pass straight through to the next live reminder.

Defaults vary between steps — open all six and check individually.

---

## 6. Owner notifications

Both are **Send Internal Notification**, not Send Email. Pick the user
**Cora Matzek** from the dropdown rather than typing an address.

**Workflow 1, step 3 — on registration:**

```
Subject: New training registration — {{contact.first_name}} {{contact.last_name}}

{{contact.first_name}} {{contact.last_name}} registered for the Spanish
Dispatch Training and is at the payment step.

Email:  {{contact.email}}
Phone:  {{contact.phone}}

Not paid yet. If they do not complete within 4 days the recovery sequence
marks them abandoned. No action needed.
```

**Workflow 2, step 5 — on payment:**

```
Subject: PAID $197 — {{contact.first_name}} {{contact.last_name}}

{{contact.first_name}} {{contact.last_name}} paid $197 and is confirmed
for the Spanish Dispatch Training.

Email:  {{contact.email}}
Phone:  {{contact.phone}}

Their confirmation email with the Zoom link has already gone out.
```

The registration one says *no action needed*; the payment one does not. If both
read the same, the channel gets skimmed and the one that matters gets missed
along with the noise.

---

## 7. Email templates to create

Ten templates in Marketing → Emails → Templates. **Names in English, content in
Spanish.** Files are in `emails-entrenamiento/`.

| Create template named | Paste this file |
| --- | --- |
| `TRAINING - payment confirmed` | `01-pago-confirmado.html` |
| `TRAINING - 2 weeks before` | `02-dos-semanas.html` |
| `TRAINING - 1 week before` | `03-una-semana.html` |
| `TRAINING - 3 days before` | `04-tres-dias.html` |
| `TRAINING - 1 day before` | `05-un-dia.html` |
| `TRAINING - day 1 morning` | `06-hoy-dia-1.html` |
| `TRAINING - day 2 morning` | `07-hoy-dia-2.html` |
| `TRAINING - recovery 1 hour` | `08-recuperacion-1h.html` |
| `TRAINING - recovery day 2` | `09-recuperacion-dia-2.html` |
| `TRAINING - recovery day 4` | `10-recuperacion-dia-4.html` |

Subject lines are in `emails-entrenamiento/README.md`. They are Spanish — the
recipient reads those.

**If you ever edit a template, re-select it inside the workflow afterwards.** A
workflow action holds its own copy taken when the template was first chosen;
editing the template does not reach it. On the webinar, templates were correct
for two days while the emails going out were still wrong.

---

## 8. End-to-end test

Run this **before any ad spend**. Every step below has been a real failure on one
of the other funnels.

### Setup

Use an email **and phone** that exist nowhere in the 1,692 contacts. A phone
match merges into the existing record and inherits its DND — which silently
skipped a webinar confirmation email for two days before anyone noticed.

A `+alias` on the email does not help. **The phone is what merges.**

### Steps

| # | Do | Expect |
| --- | --- | --- |
| 1 | Open `/entrenamiento` | Page loads, countdown running, form visible |
| 2 | Submit the form | Redirected to the fastpaydirect payment page |
| 3 | Check GHL contacts | New contact · tag `training-2026-10-31-registered` · opportunity at `Registered - Not Paid` |
| 4 | Check Cora's inbox | Registration notification arrived |
| 5 | Pay with a real card | Payment succeeds in live mode |
| 6 | Check GHL again | Tag `training-2026-10-31-paid` added · opportunity moved to `Paid - Confirmed` |
| 7 | Check the buyer inbox | `TRAINING - payment confirmed` arrived, Zoom link and passcode work |
| 8 | **Workflow 1 execution log** | Shows **"Removed by - External workflow action"** |
| 9 | Wait one hour | **No** recovery email arrives |

### Steps 8 and 9 are the real test

Everything else either obviously works or obviously does not. Step 9 is the one
that costs money if it is wrong: a customer who has just paid $197 being told
their seat is not reserved.

If a recovery email does arrive, step 1 of Workflow 2 is missing, not at the top,
or pointed at the wrong workflow.

### Then clean up

Delete the test contact and its opportunity before the ad runs, or the first real
numbers start from one.

**Refund the test payment in Stripe.** A phantom $197 distorts exactly the week
the ad gets judged on.

---

## 9. Still open

- **Curriculum sign-off.** The twelve modules on the live page are my draft,
  written from the dispatch page. All sales are final, so a module promised and
  not taught has no refund route and goes to a card dispute instead. Cora needs
  to read it.
- **End time.** Cora gave 11:00 AM with no finish. Pages say "11:00 AM ET, ambos
  días" rather than inventing one.
- **`&amp;` in the form's consent checkbox** renders as literal text.
- **DNS** for `entrenamiento.dmgagencycore.com` — CNAME to Vercel, same job as
  the webinar subdomain. The page works at `/entrenamiento` until then.
- **Meta pixel** for this funnel — which pixel, and a `Purchase` event on the
  confirmation page rather than `Lead`, since this one takes money.
