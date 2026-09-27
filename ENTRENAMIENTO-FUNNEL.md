# Entrenamiento de Despacho (Español) — build spec

Spanish Group Dispatch Training · **sábado 31 de octubre y domingo 1 de
noviembre de 2026**, 11:00 AM ET both days · **$197 USD**.

Companion to the code. The pages and emails are generated from
`lib/training-config.mjs`; this file covers everything that has to be clicked
inside GoHighLevel.

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

Emails            emails-entrenamiento/   (10 templates)
```

**The Zoom room is deliberately not the webinar's.** That link sits in five
webinar emails already sent to a list that grows with every ad click. Reusing it
would have let any free registrant walk into a paid training.

---

## 2. Tags

```
entrenamiento-2026-10-31-registrado
entrenamiento-2026-10-31-pagado
entrenamiento-2026-10-31-abandonado
entrenamiento-2026-10-31-asistio
```

Date-stamped because this becomes the template for future trainings. Reuse a
bare `entrenamiento-pagado` across three runs and by February you cannot tell
who paid for which one.

The webinar taught the cost of this: when its date moved, five tags had to be
renamed. Annoying once, versus permanently ambiguous data.

---

## 3. Pipeline — "Entrenamiento Español — Oct 2026"

Four stages, mapping directly onto the four questions that need answering at a
glance:

| Stage | Answers |
| --- | --- |
| `Registrado (sin pago)` | who registered but did not pay |
| `Pagado — confirmado` | who paid · who is confirmed |
| `Abandonado` | who was chased and never converted |
| `Asistió` | who actually turned up |

Opportunity value: **$197**, not 0.

This differs from the webinar on purpose. There, value stayed 0 because revenue
was counted again in LLC Formation and 997 in both places double-counted every
sale. Here the training *is* the revenue and it is counted nowhere else, so the
pipeline total is a real number.

`Asistió` has no automatic source — same gap as the webinar. Export the Zoom
attendee list after day 2 and bulk-move them. Ten minutes.

---

## 4. Workflow 1 — "ENT - Registro y recuperación"

**Trigger:** Form Submitted → *Spanish Training Intake Form*

**Settings:** re-entry off · timezone America/New_York

| # | Action | Setting |
| --- | --- | --- |
| 1 | Add Tag | `entrenamiento-2026-10-31-registrado` |
| 2 | Create or Update Opportunity | Pipeline **Entrenamiento Español** · Stage **Registrado (sin pago)** · Value **197** |
| 3 | Send Internal Notification | to Cora — copy in §6 |
| 4 | Wait | **1 hora** |
| 5 | Send Email | `ENT - recuperación 1h` |
| 6 | Wait | **2 días** |
| 7 | Send Email | `ENT - recuperación día 2` |
| 8 | Wait | **2 días** |
| 9 | Send Email | `ENT - recuperación día 4` |
| 10 | Add Tag | `entrenamiento-2026-10-31-abandonado` |
| 11 | Create or Update Opportunity | Stage **Abandonado** |

**No If/Else anywhere in this workflow.** Everyone who registers enters it, and
people who pay are pulled out from Workflow 2. That is the same pattern the
webinar uses for bookings, it is already proven in this account, and it avoids
branching a workflow that has waits in it.

**Create or Update Opportunity**, never plain Update Opportunity — the latter
silently does nothing without a Find before it, raises no error, and cost a
debugging session on the webinar build.

---

## 5. Workflow 2 — "ENT - Pago y recordatorios"

**Trigger:** the payment event for the training product. In GHL this is
**Order Form Submitted** or **Payment Received** depending on version — use
whichever your account offers, and **filter it to this product only**, or every
purchase in the account lands in this training's sequence.

**Settings:** re-entry off · timezone America/New_York

| # | Action | Setting |
| --- | --- | --- |
| 1 | **Remove From Workflow** | **ENT - Registro y recuperación** |
| 2 | Add Tag | `entrenamiento-2026-10-31-pagado` |
| 3 | Create or Update Opportunity | Stage **Pagado — confirmado** · Value **197** |
| 4 | Send Email | `ENT - pago confirmado` |
| 5 | Send Internal Notification | to Cora — copy in §6 |
| 6 | Wait until | `17/10/2026` · `10:00 AM` · **skip outbound if passed** |
| 7 | Send Email | `ENT - 2 semanas` |
| 8 | Wait until | `24/10/2026` · `10:00 AM` · skip outbound |
| 9 | Send Email | `ENT - 1 semana` |
| 10 | Wait until | `28/10/2026` · `10:00 AM` · skip outbound |
| 11 | Send Email | `ENT - 3 días` |
| 12 | Wait until | `30/10/2026` · `5:00 PM` · skip outbound |
| 13 | Send Email | `ENT - 1 día` |
| 14 | Wait until | `31/10/2026` · `9:00 AM` · skip outbound |
| 15 | Send Email | `ENT - hoy día 1` |
| 16 | Wait until | `01/11/2026` · `9:00 AM` · skip outbound |
| 17 | Send Email | `ENT - hoy día 2` |

### Step 1 is the one that matters

It must be **first**, immediately after the trigger. It is what stops someone
who has just paid $197 receiving *"tu lugar todavía no está reservado"* an hour
later.

Put it lower down and the waits above it run first — the person gets the
recovery email, then gets removed, exactly the failure the step exists to
prevent. The webinar had this bug once, with the remove steps parked at the end
of the consultation workflow.

### Every "Wait until" needs skip-if-passed

On each one, set **"If this date has already passed"** to:

> Skip all outbound communication actions till next wait or event start date action

Without it, someone paying on 29 October receives *"faltan dos semanas"* the
moment they buy. With it they pass straight through to the next live reminder.

There are six of these. Defaults vary per step — check each individually.

---

## 6. Owner notifications

Both are **Send Internal Notification**, not Send Email. Pick the user *Cora
Matzek* from the dropdown rather than typing an address.

**On registration** (Workflow 1, step 3):

```
Subject: Nuevo registro — {{contact.first_name}} {{contact.last_name}}

{{contact.first_name}} {{contact.last_name}} se registró para el
entrenamiento y está en el paso de pago.

Email:  {{contact.email}}
Phone:  {{contact.phone}}

Aún no ha pagado. Si no completa en 4 días, la secuencia de
recuperación lo marca como abandonado. No hace falta hacer nada.
```

**On payment** (Workflow 2, step 5):

```
Subject: PAGO $197 — {{contact.first_name}} {{contact.last_name}}

{{contact.first_name}} {{contact.last_name}} pagó los $197 y está
confirmado para el entrenamiento.

Email:  {{contact.email}}
Phone:  {{contact.phone}}

Ya recibió su correo de confirmación con el enlace de Zoom.
```

The registration one says *no hace falta hacer nada*; the payment one does not.
That is deliberate — if both read the same, the channel gets skimmed and the
one that matters gets missed along with the noise.

---

## 7. End-to-end test

Run this **before any ad spend**. Every step has been a real failure on one of
the other funnels.

### Setup

Use an email and phone that exist nowhere in the 1,692 contacts. A phone match
merges into an existing record and inherits its DND — which silently skipped a
webinar confirmation email for two days before anyone noticed.

A `+alias` on the email is not enough. **The phone is what merges.**

### Steps

| # | Do | Expect |
| --- | --- | --- |
| 1 | Open `/entrenamiento` | Page loads, countdown running, form visible |
| 2 | Submit the form | Redirected to the fastpaydirect payment page |
| 3 | Check GHL contacts | New contact, tag `...-registrado`, opportunity at **Registrado (sin pago)** |
| 4 | Check Cora's inbox | Registration notification arrived |
| 5 | Pay with a real card | Payment succeeds in live mode |
| 6 | Check GHL again | Tag `...-pagado` added, opportunity moved to **Pagado — confirmado** |
| 7 | Check the buyer inbox | `ENT - pago confirmado` arrived with the working Zoom link, id and passcode |
| 8 | **Workflow 1 execution log** | Shows **"Removed by - External workflow action"** |
| 9 | Wait one hour | **No** recovery email arrives |

### Step 8 and 9 are the real test

Everything else is plumbing that either works or obviously does not. Step 9 is
the one that costs money if wrong: a customer who has just paid $197 being told
their seat is not reserved.

If a recovery email does arrive, step 1 of Workflow 2 is either missing, not at
the top, or pointed at the wrong workflow.

### Then clean up

Delete the test contact and its opportunity before the ad runs, or the first
real numbers start from one.

**Refund the test payment in Stripe.** $197 sitting in takings as a phantom sale
distorts the first week's reporting, which is the week the ad gets judged on.

---

## 8. Still open

- **Curriculum sign-off.** The twelve modules on the live page are a draft
  written from the dispatch page. All sales are final, so a module promised and
  not taught has no refund route and goes to a card dispute instead. Cora needs
  to read it.
- **End time.** Cora gave 11:00 AM, no finish. Pages say "11:00 AM ET, ambos
  días" rather than inventing one.
- **`&amp;` in the form's consent checkbox** renders as literal text.
- **DNS** for `entrenamiento.dmgagencycore.com` — CNAME to Vercel, same job as
  the webinar subdomain. The page works at `/entrenamiento` until then.
- **Meta pixel** for this funnel — which pixel, and a `Purchase` event on the
  confirmation page rather than `Lead`, since this one takes money.
