# English Group Dispatch Training — build spec

DMG Group Dispatch Eng. · **Saturday 14 and Sunday 15 November 2026** ·
**$197 USD**. The two days start at different times and use different Zoom
rooms — see below.

Companion to the code. The pages and emails are generated from
`lib/training-en-config.mjs`; this file covers everything clicked inside
GoHighLevel.

> **This is the English training.** The Spanish one is `ENTRENAMIENTO-FUNNEL.md`
> and runs 31 Oct / 1 Nov. They share a GHL account, a Meta dataset and an n8n
> instance, and nothing else. Every tag, pipeline, workflow, template and
> webhook below is named so the two can never be confused. **If you find
> yourself editing something named `TRAINING - …` while working on this file,
> stop — that is the Spanish funnel.**

---

## 1. Live values

```
Landing page      https://training.dmgagencycore.com
                  (also /training on the main domain until DNS is set)
Confirmation      /training/confirmed

Registration form  ⚠ NOT CREATED YET — see §2
  on submit        Redirect -> the payment link below

Payment link       ⚠ NOT CREATED YET — see §2
Product            DMG Group Dispatch Training (English) — 14 & 15 Nov 2026
  price            $197 USD, one-time, LIVE mode

Day 1  Sat 14 Nov  11:00 AM ET
  zoom            https://us06web.zoom.us/j/81717580026?pwd=OCVn5paUWUeuERrlVXxZUL00sk16Cn.1
  meeting id      817 1758 0026
  passcode        985204

Day 2  Sun 15 Nov  3:00 PM ET     ← different time AND different room
  zoom            https://us06web.zoom.us/j/85175792698?pwd=NWKTwaElNbnKrCOCF7HnRjBDOfjOgt.1
  meeting id      851 7579 2698
  passcode        651030

Emails            emails-training-en/   (10 templates, English)
Meta relay        n8n/meta-capi-training-en-purchase.json
```

**The two days are not interchangeable.** Different start times, different
rooms. Anyone who saves day 1's link and turns up with it on day 2 lands in an
empty meeting, having paid $197. Every page and email therefore labels the two
separately, and the day 2 email leads with the fact that the link changed.

Both days fall after daylight saving ends on 1 November, so both are EST. The
Spanish training straddled that boundary; this one does not.

**Each session is three hours**, confirmed 2026-10-01. The pages and emails
print `11:00 AM – 2:00 PM` and `3:00 PM – 6:00 PM`. To change it, edit `end` on
each session in `lib/training-en-config.mjs` and re-run the email generator.

---

## 2. Create these in GoHighLevel, in this order

Order matters: the form needs the payment link to redirect to, and the
workflows need the form to trigger from.

### 2.1 Product — `DMG Group Dispatch Training (English)`

Payments → Products → create.

| Field | Value |
| --- | --- |
| Name | `DMG Group Dispatch Training (English) - 14 & 15 Nov 2026` |
| Type | One-time |
| Price | `197` USD |
| Mode | **LIVE**, not test |

Give it a name that cannot be mistaken for the Spanish product in a dropdown.
You will be picking it from a list that already contains
*Formación en despacho de grupos en español*.

### 2.2 Payment link

Payments → Payment Links → create, pointing at the product above.

Copy the resulting URL into `CHECKOUT_URL` in `lib/training-en-config.mjs`,
then re-run:

```
node scripts/build-training-en-emails.mjs
```

Until you do, the three recovery emails point at the landing page instead of
straight to checkout. The generator prints a warning every run while that is
the case.

### 2.3 Registration form — `English Training Intake Form`

Sites → Forms → create. Match the Spanish form's fields: first name, last name,
email, phone, and the consent checkbox.

- **On submit:** Redirect → the payment link from 2.2
- Copy the form id into `REGISTRATION_FORM_ID` in `lib/training-en-config.mjs`

The landing page shows a "registration opens soon" panel instead of the form
until that id is set. That is deliberate — an iframe pointed at an empty id
loads GHL's 404, which reads as a broken checkout on a page asking for $197.

> **Known bug inherited from the Spanish form:** `&amp;` renders as literal
> text in the consent checkbox. Do not copy the Spanish wording verbatim.

### 2.4 Tags — create these four

```
training-en-2026-11-14-registered
training-en-2026-11-14-paid
training-en-2026-11-14-abandoned
training-en-2026-11-14-attended
```

Date-stamped and language-stamped. The Spanish tags are
`training-2026-10-31-…`; a bare `training-paid` across both would make it
impossible to tell who bought which.

### 2.5 Pipeline — `English Training - Nov 2026`

Four stages, in this order:

| # | Stage name | Answers the question |
| --- | --- | --- |
| 1 | `Registered - Not Paid` | who registered but did not pay |
| 2 | `Paid - Confirmed` | who paid · who is confirmed |
| 3 | `Abandoned` | who was chased and never converted |
| 4 | `Attended` | who actually turned up |

Opportunity value: **197**.

A separate pipeline from the Spanish one, not shared stages. Sharing would make
the pipeline total meaningless the moment both trainings are running.

`Attended` has no automatic source. Export the Zoom attendee list after day 2
and bulk-move them. Ten minutes.

---

## 3. Workflow 1 — name it `TRAINING EN - Registration & Recovery`

**Trigger:** Form Submitted → *English Training Intake Form*

**Settings:** re-entry **off** · timezone **America/New_York**

| # | Action | Exactly what to set |
| --- | --- | --- |
| 1 | Add Tag | `training-en-2026-11-14-registered` |
| 2 | Create or Update Opportunity | Pipeline `English Training - Nov 2026` · Stage `Registered - Not Paid` · Value `197` |
| 3 | Send Internal Notification | to **Cora Matzek** |
| 4 | Wait | **1 hour** |
| 5 | Send Email | template `TRAINING EN - recovery 1 hour` |
| 6 | Wait | **2 days** |
| 7 | Send Email | template `TRAINING EN - recovery day 2` |
| 8 | Wait | **2 days** |
| 9 | Send Email | template `TRAINING EN - recovery day 4` |
| 10 | Add Tag | `training-en-2026-11-14-abandoned` |
| 11 | Create or Update Opportunity | Stage `Abandoned` |

**No If/Else anywhere in this workflow.** Everyone who registers enters it, and
people who pay get pulled out by Workflow 2.

**Create or Update Opportunity**, never plain *Update Opportunity* — the latter
silently does nothing without a Find before it, raises no error, and cost a
debugging session on the webinar build.

---

## 4. Workflow 2 — name it `TRAINING EN - Payment & Reminders`

**Trigger:** the payment event for this product — *Order Form Submitted* or
*Payment Received* depending on your version. **Filter it to the English
product only.** Without that filter, every Spanish training sale also lands in
this sequence and those buyers get English emails with the wrong dates and the
wrong Zoom rooms.

**Settings:** re-entry **off** · timezone **America/New_York**

| # | Action | Exactly what to set |
| --- | --- | --- |
| 1 | **Remove From Workflow** | `TRAINING EN - Registration & Recovery` |
| 2 | Add Tag | `training-en-2026-11-14-paid` |
| 3 | Create or Update Opportunity | Stage `Paid - Confirmed` · Value `197` |
| 4 | **Custom Webhook** | POST to the n8n URL in §6 — fires the Meta `Purchase` |
| 5 | Send Email | template `TRAINING EN - payment confirmed` |
| 6 | Send Internal Notification | to **Cora Matzek** |
| 7 | Wait until | `31/10/2026` · `10:00 AM` · **skip outbound** |
| 8 | Send Email | template `TRAINING EN - 2 weeks before` |
| 9 | Wait until | `07/11/2026` · `10:00 AM` · skip outbound |
| 10 | Send Email | template `TRAINING EN - 1 week before` |
| 11 | Wait until | `11/11/2026` · `10:00 AM` · skip outbound |
| 12 | Send Email | template `TRAINING EN - 3 days before` |
| 13 | Wait until | `13/11/2026` · `5:00 PM` · skip outbound |
| 14 | Send Email | template `TRAINING EN - 1 day before` |
| 15 | Wait until | `14/11/2026` · `9:00 AM` · skip outbound |
| 16 | Send Email | template `TRAINING EN - day 1 morning` |
| 17 | Wait until | `15/11/2026` · `9:00 AM` · skip outbound |
| 18 | Send Email | template `TRAINING EN - day 2 morning` |

**Step 1 is the whole design.** Without it, someone who has just paid $197
keeps receiving "your seat is not reserved yet" an hour later.

**Every "Wait until" needs skip-if-passed on.** Someone who buys on 12 November
must not sit waiting for a 31 October date that has already gone; they would
receive nothing at all.

> **Note the 31 October clash.** The English "2 weeks before" email lands on the
> day the *Spanish* training runs. Different audiences, so no conflict — but if
> you are watching send volume that day, that is why it is higher.

---

## 5. Email templates to create

Ten templates, from `emails-training-en/`. Names must match the table in
§3 and §4 exactly.

1. Marketing → Emails → Templates → create with the name below
2. Open the `.html`, select all, copy
3. Paste over the template's code, save

| File | GHL template name |
| --- | --- |
| `01-payment-confirmed.html` | `TRAINING EN - payment confirmed` |
| `02-2-weeks-before.html` | `TRAINING EN - 2 weeks before` |
| `03-1-week-before.html` | `TRAINING EN - 1 week before` |
| `04-3-days-before.html` | `TRAINING EN - 3 days before` |
| `05-1-day-before.html` | `TRAINING EN - 1 day before` |
| `06-day-1-morning.html` | `TRAINING EN - day 1 morning` |
| `07-day-2-morning.html` | `TRAINING EN - day 2 morning` |
| `08-recovery-1-hour.html` | `TRAINING EN - recovery 1 hour` |
| `09-recovery-day-2.html` | `TRAINING EN - recovery day 2` |
| `10-recovery-day-4.html` | `TRAINING EN - recovery day 4` |

**Then re-select the template inside every workflow Send Email action.** A
workflow action holds its own copy of a template taken when it was first
chosen; editing the template afterwards does not reach it. That caught us on
the webinar — the templates were right for two days while the emails going out
were still wrong.

---

## 6. Meta `Purchase` tracking

Same design as the Spanish training (`ENTRENAMIENTO-FUNNEL.md` §9), and for the
same reason: checkout happens on GHL's `link.fastpaydirect.com` domain, which
no pixel can reach, so the `Purchase` is reported server-side through the
Conversions API.

**Same dataset, `1650730799896868`.** The English relay reuses the existing
`Meta CAPI - DMG dataset` Header Auth credential — no new Meta access token
needed. The two trainings are told apart in reporting by `content_name`.

### Import the relay

1. On `n8n.jopone.site`, click the **⌄** arrow next to **Create workflow** →
   **Import from File**
2. Pick `n8n/meta-capi-training-en-purchase.json`
3. Open **Send Purchase to Meta** and select the `Meta CAPI - DMG dataset`
   credential
4. Workflow **⋯** menu → **Settings** → **Error workflow** →
   `META CAPI - Error Alert` (the same alert workflow the Spanish relay uses —
   its email subject names the failing workflow, so one alert workflow covers
   both)
5. **Save**, then **Publish**

### The webhook URL

```
https://n8n.jopone.site/webhook/ghl-training-en-purchase-5208373ae36a9e3a7b2c501e
```

Its own path, separate from the Spanish relay. Treat it like a password — the
random string is the only thing stopping anyone who finds it posting fake $197
purchases into Cora's ad data.

That URL goes in step 4 of Workflow 2, with a payload containing at minimum
`email`. Mirror the Spanish one:

```json
{
  "id": "{{contact.id}}",
  "name": "{{contact.name}}",
  "email": "{{contact.email}}",
  "phone": "{{contact.phone}}"
}
```

### Test it before the ad runs

Cora opens Events Manager → dataset `1650730799896868` → **Test Events** and
reads you the code. Then, with the code appended to the URL:

```powershell
Invoke-RestMethod -Method Post -Uri "https://n8n.jopone.site/webhook/ghl-training-en-purchase-5208373ae36a9e3a7b2c501e?test=TESTCODE" -ContentType "application/json" -Body '{"id":"abc123","name":"Test Buyer","email":"test@example.com","phone":"2605551234","orderId":"test-en-001"}'
```

A `Purchase` with `value 197`, `currency USD` and the English `content_name`
should appear within seconds.

**The test code lives on the URL, never inside the workflow.** That is the one
real difference from how the Spanish relay was first built: a code left inside
the node made Meta discard every real purchase while everything looked fine.
The GHL webhook URL carries no `?test=`, so a real sale can never be silently
thrown away.

---

## 7. DNS

`training.dmgagencycore.com`. DNS for this domain is edited **inside GoHighLevel**
(GHL is both the registrar and the DNS host; the Cloudflare nameservers are just
GHL's backend, and there is no separate Cloudflare login). Same job as the
Spanish and webinar subdomains.

1. **Vercel** → project `dmg-webinar-landing` → **Domains** (left sidebar, not
   under Settings) → **Connect an existing domain** → `training.dmgagencycore.com`.
   Not the search box — that one sells new domains. Decline any offer to switch
   to Vercel nameservers.
2. **GHL** → Settings → Domains → `dmgagencycore.com` → **Manage** → **DNS
   records** → add a **CNAME**: name `training`, value `cname.vercel-dns.com`.
3. Back in Vercel, wait for the green check (usually under a minute).

The middleware already routes the subdomain to `/training`, and the page works
at `/training` on the main domain until the record exists, so everything can be
tested before DNS propagates.

---

## 8. End-to-end test

### Setup

Use an email **and phone** that exist nowhere in the contacts. A phone match
merges into the existing record and inherits its DND — which silently skipped a
webinar confirmation email for two days before anyone noticed.

A `+alias` on the email does not help. **The phone is what merges.**

### Steps

| # | Do | Expect |
| --- | --- | --- |
| 1 | Open `/training` | Page loads, countdown running, form visible |
| 2 | Submit the form | Redirected to the payment page |
| 3 | Check GHL contacts | New contact · tag `training-en-2026-11-14-registered` · opportunity at `Registered - Not Paid` |
| 4 | Check Cora's inbox | Registration notification arrived |
| 5 | Pay with a real card | Payment succeeds in live mode |
| 6 | Check GHL again | Tag `training-en-2026-11-14-paid` · opportunity at `Paid - Confirmed` |
| 7 | Check n8n Executions | New green run on the English relay |
| 8 | Check Meta Test Events | `Purchase`, value 197, English `content_name` |
| 9 | Check the buyer inbox | `TRAINING EN - payment confirmed` arrived, **both** Zoom links work |
| 10 | **Workflow 1 execution log** | Shows **"Removed by - External workflow action"** |
| 11 | Wait one hour | **No** recovery email arrives |

### Steps 10 and 11 are the real test

Everything else either obviously works or obviously does not. Step 11 is the
one that costs money if it is wrong: a customer who has just paid $197 being
told their seat is not reserved.

If a recovery email does arrive, step 1 of Workflow 2 is missing, not at the
top, or pointed at the wrong workflow — check it does not say
`TRAINING - Registration & Recovery`, which is the Spanish one.

### Then clean up

Delete the test contact and its opportunity before the ad runs, or the first
real numbers start from one.

**Refund the test payment in Stripe.** The tracked `Purchase` stays in
reporting — a refund does not retract a sent event.

---

## 9. Still open

- **GHL product, payment link and form** — none exist yet. §2.
- **`CHECKOUT_URL` and `REGISTRATION_FORM_ID`** are empty in
  `lib/training-en-config.mjs`. The page and emails degrade safely until they
  are set, but neither can take money.
- **DNS** for `training.dmgagencycore.com`. §7.
- **Curriculum sign-off.** The English curriculum is a translation of Cora's
  Spanish one. If she wants different emphasis for an English-speaking
  audience, it changes `lib/training-en-content.mjs` and the `03-1-week-before`
  email.
