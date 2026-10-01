# Spanish Dispatch Training — build spec

Spanish Group Dispatch Training · **Saturday 31 October and Sunday 1 November
2026** · **$197 USD**. The two days start at different times and use
different Zoom rooms — see below.

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

Day 1  Sat 31 Oct  11:00 AM ET
  zoom            https://us06web.zoom.us/j/88927881365
  meeting id      889 2788 1365
  passcode        331181

Day 2  Sun 1 Nov   3:00 PM ET     ← different time AND different room
  zoom            https://us06web.zoom.us/j/83796003919
  meeting id      837 9600 3919
  passcode        190302

Emails            emails-entrenamiento/   (10 templates, Spanish content)
```

**The two days are not interchangeable.** Different start times, different
rooms. Anyone who saves day 1's link and turns up with it on day 2 lands in an
empty meeting, having paid $197. Every page and email therefore labels the two
separately, and the day 2 email leads with the fact that the link changed.

Note the DST boundary: daylight saving ends at 2 AM on 1 November, between the
sessions. Day 1 is EDT, day 2 is EST. The config carries a per-session offset
for that reason.

**Neither room is the webinar's.** That link sits in five
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
| `TRAINING - payment confirmed` | `01-payment-confirmed.html` |
| `TRAINING - 2 weeks before` | `02-2-weeks-before.html` |
| `TRAINING - 1 week before` | `03-1-week-before.html` |
| `TRAINING - 3 days before` | `04-3-days-before.html` |
| `TRAINING - 1 day before` | `05-1-day-before.html` |
| `TRAINING - day 1 morning` | `06-day-1-morning.html` |
| `TRAINING - day 2 morning` | `07-day-2-morning.html` |
| `TRAINING - recovery 1 hour` | `08-recovery-1-hour.html` |
| `TRAINING - recovery day 2` | `09-recovery-day-2.html` |
| `TRAINING - recovery day 4` | `10-recovery-day-4.html` |

Subject lines are in `emails-entrenamiento/README.md`, which also carries a
plain-English summary of what each email says — so you can check one without
reading Spanish.

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

## 9. Meta `Purchase` tracking for the $197 order

**Status as of 2026-09-30: the n8n relay is built, nothing else is.** Step 3's
workflow exists and is wired; it is inactive and has no access token yet. Steps
1, 2 and 4, and the GHL webhook action, are still to do — and none of them live
in this repo, they are clicked in Meta Events Manager, GoHighLevel and n8n.

### The one fact that decides the design

Checkout is **not** on a page we control. The form redirects to
`link.fastpaydirect.com/payment-link/6ab8697cbaea3cadef54f885` — GHL's own
payment domain. A *pixel* is browser JavaScript, and it can only run on pages we
can put code into. We cannot put code on that domain, and a standalone GHL
payment link has no tracking-code field.

So the browser pixel cannot see the payment. `Purchase` has to be reported
**server-side** instead: GHL tells a server the order succeeded, and that server
tells Meta. Meta calls this the **Conversions API**, or **CAPI** — the same
events as the pixel, sent machine-to-machine rather than from the visitor's
browser.

Two consequences worth knowing before you start:

- **Do not put a `Purchase` on `/entrenamiento/confirmado`.** That page is a
  plain URL. Anyone can open it without paying, and every visit would report a
  $197 sale that never happened. The confirmation page is not proof of payment;
  only GHL's payment event is.
- **A "dataset" and a "pixel" are now the same object in Meta.** Events Manager
  renamed pixels to datasets when CAPI arrived. Dataset ID `1650730799896868` is
  the same number as the pixel ID already in the site's `<head>`. Sending
  `Purchase` to that same ID is what lets Meta join the ad click, the page view
  and the sale into one attributed conversion.

### Which pixel

Use **`1650730799896868`** — Cora's dataset, already initialized globally by
`components/meta-pixel.tsx`. Not `1752983249236168`; that one is the original
webinar dataset, and mixing a paid Spanish training into it corrupts the
cost-per-registration figure the webinar is judged on.

### Step 1 — get the two values from Meta

In **Events Manager → Data Sources → the `1650730799896868` dataset**:

| Value | Where | Looks like |
| --- | --- | --- |
| Dataset ID | under the dataset name | `1650730799896868` |
| Access token | **Settings → Conversions API → Generate access token** | long `EAA…` string |

The access token **is** a secret, unlike the pixel ID. It can write events into
the ad account. It goes in the n8n credential store in step 3 and nowhere else —
never in this repo, never in a GHL custom value, never in a browser.

### Step 2 — check whether GHL can do it natively first

Some GHL versions ship a Meta Conversions API integration. Look in
**Settings → Integrations**, and in the funnel's own settings, for anything
naming *Conversions API* or *Meta dataset*. If it is there, connect dataset
`1650730799896868` with the token from step 1 and **filter it to this product
only** — same trap as Workflow 2's trigger, or every sale in the account reports
as a $197 training purchase.

If it is not there — which is the likely case, since the checkout is a payment
link rather than a funnel step — use step 3.

### Step 3 — the n8n relay  ·  **BUILT 2026-09-30**

n8n is already in this stack (`kapitalempire1.app.n8n.cloud`, see
`N8N-ZOOM-ATTENDANCE.md`). It sits between GHL and Meta because Meta requires an
`event_time` as a Unix timestamp and requires the buyer's email to be
SHA-256 hashed, and a GHL webhook action can produce neither.

```
GHL Workflow 2  ──webhook──▶  n8n  ──Conversions API──▶  Meta dataset
"TRAINING - Payment & Reminders"     hash email,          1650730799896868
                                     add event_time
```

**The workflow exists.** `META CAPI - Training Purchase ($197)`, id
`XGuxFenrxJUq2R83`, five nodes, **left inactive on purpose** — see the two
to-dos below.

| Node | Does |
| --- | --- |
| `GHL Purchase Webhook` | POST listener, path `ghl-training-purchase` |
| `Has Buyer Email` | guard — no email means no usable event |
| `Hash Email` | SHA-256 hex of the lowercased, trimmed email → `em_hash` |
| `Send Purchase to Meta` | POST to the Conversions API · 3 retries, 5s apart |
| `Missing Email - Fail Loudly` | throws, so a bad payload is a red execution |

The guard matters. Meta rejects an event carrying no identifier, and a silently
dropped `Purchase` looks identical to a funnel that simply made no sales. If GHL
ever sends a payload without an email, this workflow fails visibly instead.

The raw email never leaves n8n — only the hash does. That is Meta's requirement,
and it is also why a leaked payload would not expose your buyer list.

#### Still to do by hand

1. **Create the credential.** n8n → Credentials → new **Header Auth**, name it
   `Meta CAPI - DMG dataset`. Name `Authorization`, Value `Bearer ` followed by
   the access token from step 1. Then open `Send Purchase to Meta` and select it.
   The token belongs here and nowhere else — not in the node's fields, not in
   this repo, not in a GHL custom value.
2. **API version — settled.** The URL uses `v26.0`, Meta's current Graph API
   version per its changelog (released 2026-07-29). Nothing to check. Older
   versions stay usable for about two years, so this only needs revisiting if
   the workflow starts returning a version error.

Then **activate** the workflow. Not before the credential exists — an active
workflow without it turns every real purchase into a 401, and Meta does not
accept the event late.

**In GHL:** add a **Webhook** action to Workflow 2 (§5) — after step 3
`Create or Update Opportunity`, so it only fires on a real confirmed payment.
POST to the production webhook URL n8n shows on the `GHL Purchase Webhook` node.
The payload must include the buyer's email as `email`; `orderId` is used as the
deduplication key when present.

The event sent:

```
event_name        "Purchase"
event_time        Unix seconds, at the moment of the webhook
action_source     "website"
value             197
currency          "USD"
event_id          the GHL order ID, or training-<email hash> as a fallback
user_data.em      SHA-256 of the lowercased, trimmed buyer email
```

`event_id` matters. It is Meta's **deduplication** key: if a browser `Purchase`
ever also fires for the same order, Meta collapses the two into one conversion
instead of reporting two $197 sales. It is never random — with no order ID it
falls back to the email hash, which is still stable for that buyer.

Only the email is sent as an identifier. Adding a hashed phone would raise
Meta's match rate, at the cost of a second hashing node. Worth doing if match
quality turns out poor; not worth doing before there is any data.

### Step 4 — test it

Meta Events Manager → the dataset → **Test Events** gives you a temporary
`test_event_code`. Add it to the `Send Purchase to Meta` node's JSON body as a
sibling of `data` — `"test_event_code": "TEST12345",` on its own line above
`"data"` — then run one real purchase through
§8's end-to-end test, and the `Purchase` should appear in Test Events within
seconds, showing `value 197` and `currency USD`.

**Remove `test_event_code` afterwards.** Events sent with it are discarded —
they show in Test Events and never reach reporting or ad optimisation, so
leaving it in means a funnel that looks perfectly wired and attributes nothing.

Then refund the test payment in Stripe, as §8 already says, and expect the
test `Purchase` to stay in reporting — a refund does not retract a sent event.

---

## 10. Still open

- ~~Curriculum sign-off~~ **DONE 2026-09-28.** Cora supplied the real
  curriculum: day 1 "Aprende a hacer el trabajo" (7 points), day 2 "Construye
  tu cartera de clientes" (6 points). My twelve-module draft is gone. A
  language-barrier section was added under the two day cards.
- **End times.** Cora gave start times only. Pages and emails print the start
  for each day rather than inventing a finish.
- **`&amp;` in the form's consent checkbox** renders as literal text.
- **DNS** for `entrenamiento.dmgagencycore.com` — CNAME to Vercel, same job as
  the webinar subdomain. The page works at `/entrenamiento` until then.
- ~~**Meta pixel** for this funnel — a `Purchase` event on the confirmation
  page~~ **Superseded 2026-09-30, see §9.** The pixel part is done: dataset
  `1650730799896868` is initialized site-wide in `app/layout.tsx`, so
  `/entrenamiento` already reports `PageView`. The `Purchase` part cannot be
  done the way this line assumed — checkout is on GHL's `link.fastpaydirect.com`
  domain, so no pixel can see the payment, and the confirmation page is a plain
  URL that anyone can open without paying. It needs server-side CAPI instead.
- **Meta `Purchase` via CAPI** — the §9 build. The n8n relay is done
  (`META CAPI - Training Purchase ($197)`, id `XGuxFenrxJUq2R83`). Still open:
  the Meta access token into a Header Auth credential, activating that workflow,
  the webhook action on GHL Workflow 2, and the Test Events run.
