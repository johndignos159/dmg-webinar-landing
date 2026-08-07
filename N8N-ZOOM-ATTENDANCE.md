# Zoom attendance → GHL, via n8n

Applies the `webinar-2026-09-15-attended` tag so Part C of the workflow can
branch. Without this, everyone falls down the No-Show path.

---

## Check these two things first

Neither is about n8n, and both can invalidate the plan.

### 1. Is the Zoom account paid?

`us05web.zoom.us` is the subdomain Zoom assigns to **Basic (free)** accounts. On
Basic:

- Meetings with 3+ participants are **cut off at 40 minutes**. The session is 45
  minutes plus Q&A, so it would end mid-offer.
- Webhook access via a Marketplace app is limited on some free tiers.

### 2. Is it a Meeting or a Webinar?

A Zoom **Meeting** lets every attendee unmute and turn on camera. With 200
registrants that is unmanageable during a pitch. A Zoom **Webinar** is a paid
add-on that keeps attendees view-only.

The event type also changes the webhook payload — Meetings emit
`meeting.participant_*`, Webinars emit `webinar.participant_*`. Confirm which
before building, or the filter will never match.

---

## The matching problem

Zoom only reports an email address if the participant was **signed in to Zoom**
or **registered through Zoom**. Someone who clicks the join link and types a
name gets `email: ""`.

Two ways to avoid a large unmatched pile:

- **Zoom registration on** — Zoom collects an email before admitting anyone. Most
  reliable, adds a small step for the attendee.
- **Fall back to name matching** — fuzzy and unreliable. Treat as best effort.

Whatever the rate, keep the manual CSV export as a backstop. Attendance drives
the entire post-webinar split; it is worth ten minutes of checking on the night.

---

## Workflow shape

Standard webhook-processing pattern: receive, validate, filter, act.

```
Webhook (POST)
   → IF: Zoom URL validation challenge?
        YES → Respond with encrypted token
        NO  ↓
   → IF: event is participant_joined AND email is not empty
        NO  → Respond 200, stop
        YES ↓
   → HTTP: GHL — find contact by email
   → IF: contact found?
        NO  → log to a "unmatched" sheet or Slack, respond 200
        YES ↓
   → HTTP: GHL — add tag  webinar-2026-09-15-attended
   → Respond 200
```

**Always respond 200 quickly.** Zoom retries on non-2xx and disables an endpoint
that keeps failing. Do the CRM work after responding, or keep it fast.

---

## Node by node

### 1. Webhook

- Method **POST**, path e.g. `zoom-attendance`
- Response mode: **Using Respond to Webhook node**

Zoom payload arrives under `$json.body` — not `$json`. This is the single most
common mistake in n8n webhook workflows.

```
{{ $json.body.event }}
{{ $json.body.payload.object.participant.email }}
```

### 2. Zoom's validation handshake

When you save the endpoint in Zoom, it POSTs an `endpoint.url_validation` event
and expects a specific response within seconds. Handle it before anything else:

```javascript
// Code node — runs only on the validation branch
const crypto = require('crypto');
const plainToken = $json.body.payload.plainToken;
const secret = 'YOUR_ZOOM_WEBHOOK_SECRET_TOKEN';

return [{
  json: {
    plainToken,
    encryptedToken: crypto
      .createHmac('sha256', secret)
      .update(plainToken)
      .digest('hex'),
  },
}];
```

Branch on `{{ $json.body.event === 'endpoint.url_validation' }}` and respond
with that object. Skip this and Zoom will refuse to save the endpoint.

### 3. Filter to the events that matter

IF node, both conditions:

```
{{ $json.body.event }}                                   equals  meeting.participant_joined
{{ $json.body.payload.object.participant.email }}        is not empty
```

Use `participant_joined` rather than `participant_left` — someone who joins and
loses connection still attended.

For a Zoom **Webinar**, the event is `webinar.participant_joined`.

### 4. Find the contact in GHL

HTTP Request:

```
Method   GET
URL      https://services.leadconnectorhq.com/contacts/
Query    locationId = dEUu3bVfyQdKMZZSumgJ
         query      = {{ $json.body.payload.object.participant.email }}
Headers  Authorization  Bearer YOUR_GHL_PRIVATE_INTEGRATION_TOKEN
         Version        2021-07-28
```

Store the token as an n8n **credential**, not in the node parameters.

### 5. Guard against no match

IF: `{{ $json.contacts.length > 0 }}`

The false branch matters. Someone who joined with a personal Zoom account under
a different email will not match, and you want a record of that rather than
silence. Send it to a Sheet, a Slack message, or an email to yourself.

### 6. Add the tag

HTTP Request:

```
Method   POST
URL      https://services.leadconnectorhq.com/contacts/{{ $json.contacts[0].id }}/tags
Headers  Authorization  Bearer YOUR_GHL_PRIVATE_INTEGRATION_TOKEN
         Version        2021-07-28
Body     { "tags": ["webinar-2026-09-15-attended"] }
```

Optionally also set **Webinar Attended = Live** and **Watch Duration**, though
duration only arrives on `participant_left`, so that needs a second branch.

### 7. Respond to Webhook

Status 200, empty body. Zoom does not read it, but it must arrive.

---

## Zoom side

1. [marketplace.zoom.us](https://marketplace.zoom.us) → **Develop → Build App**
2. Choose **Webhook Only** (no OAuth needed for receiving events)
3. Event subscription → paste the n8n **production** webhook URL
4. Copy the **Secret Token** into the Code node in step 2
5. Subscribe to `meeting.participant_joined` (or `webinar.participant_joined`)
6. Save — Zoom fires the validation handshake immediately

The n8n workflow must be **active** before saving in Zoom, or validation fails.

---

## Test before the night

1. Start the Zoom meeting yourself
2. Join from a second device signed in with an email that exists in GHL
3. Check the n8n execution list — one run, contact found, tag added
4. Confirm in GHL that the tag landed

Then remove the tag so the test contact does not skew the real run.

---

## The backstop

Whatever happens with n8n, **check the attendee list before 10:00 PM on
15 September.** That is when the GHL workflow evaluates the split.

Zoom → Reports → Usage → the meeting → participants. Anyone attended but
untagged, tag manually. Ten minutes, and it guarantees the branch is right.

---

*Created 2026-08-07.*
