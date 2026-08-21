# Dispatch landing page — review

**Page:** https://go.dmgagencycore.com/dispatch-only
**Built as:** custom HTML pasted into a GHL funnel page (`.dmg-lp` scoped block)
**Form:** GHL `n9pNt4VYOVsvOg3VbqlL`, embedded, reached by the `#apply` anchor
**Pixel Cora intends to use:** `2317272492412268`
**Reviewed:** 2026-08-21

Separate from the webinar funnel. Different offer, different audience — existing
carriers who already haul, rather than people who have not started yet.

---

## Verdict — do not start ads yet

The page reads well and the offer is clear. One thing blocks launch and two more
are worth fixing in the same sitting.

| | Status |
| --- | --- |
| Meta Pixel installed | **No** — blocking |
| `<title>` tag | **Missing** |
| og:title / og:description / og:image | **Missing** |
| Privacy Policy + Terms links | Present |
| Mobile styles | Present |
| Copy and offer | Strong |

---

## 1. The pixel is not on the page — blocking

Fetched the live page and searched it: no `fbq`, no `connect.facebook.net`, no
occurrence of `2317272492412268`. The only tracking present is GoHighLevel's own.

Running ads to this page today means Meta cannot see who converted. It would
optimise for the cheapest *clicks* it can find rather than applications, and the
reporting would show spend against no attributable result.

**Where it goes in GHL:** open the funnel, then **Settings** -> **Tracking Code**
-> paste the base pixel code into the **Head** section. That applies it to every
step of the funnel, which is what you want.

### It needs a conversion event, not just PageView

The base code alone reports page views. Meta needs to know when someone
*applies*, and that takes a second signal.

Two ways, in order of preference:

1. **A thank-you page.** Set the form to redirect to a separate funnel step, e.g.
   `/dispatch-only-thanks`, and put a `Lead` event in that step's tracking code.
   Same pattern as the webinar funnel, and the most reliable.
2. **On-click event.** Fire `Lead` when the submit button is clicked. Simpler,
   but it counts attempts rather than completions, so the numbers run high.

Option 1 also gives somewhere to set expectations — "we will call you within one
business day" — which reduces the number of people who apply and then go cold.

**Open question for John:** does the form currently redirect anywhere, or does it
show an inline confirmation message? That decides which route to take.

---

## 2. The page has no title

There is no `<title>` tag in the HTML at all. Consequences:

- The browser tab shows the URL
- Google has nothing to use as the result heading
- Anyone bookmarking it gets a meaningless entry

Set it in the funnel step settings. Suggested:

```
Truck Dispatch Services for Carriers | DMG Agency Core
```

---

## 3. No link preview tags

Only `og:type` is present. No `og:title`, `og:description` or `og:image`.

When the ad — or anyone sharing the link — produces a preview card, Facebook
falls back to scraping whatever it finds, usually a stray image and a blank
title. For an ad destination this is worth two minutes.

Suggested values:

```
og:title        Dispatch That Keeps You Loaded — DMG Agency Core
og:description  Load sourcing, broker communication, rate negotiation and
                weekly invoicing. 8% flat. No contracts.
og:image        a 1200x630 image — the truck photo, or a branded card
```

---

## 4. One pixel or two?

Cora now has two: `1752983249236168` (webinar) and `2317272492412268`
(dispatch). Both pages sit on subdomains of `dmgagencycore.com`.

**Meta's own guidance is one pixel per website**, with different *events* or
*custom conversions* separating the campaigns. Reasons that matter here:

- **Retargeting.** With one pixel you can show a dispatch ad to someone who read
  the webinar page, and the reverse. With two, those audiences never meet.
- **Aggregated Event Measurement** is configured per *domain*, not per pixel, and
  allows eight prioritised events across the whole domain. Two pixels sharing one
  domain makes that allocation harder to reason about.
- **Learning.** Conversion data pools in one place instead of splitting in half.

The counter-argument is clean separation of reporting — but custom conversions
filtered by URL give you that anyway.

Nothing is broken either way, and the second pixel already exists. But no
dispatch ad has run yet, so **now is the cheapest moment to decide.** Once spend
starts, consolidating means discarding learning data.

---

## What the page gets right

Worth saying, because the structure is better than most pages of this kind.

- **The hook names the reader's problem.** *"Need A Dispatcher You Can Rely
  On?"* — not a feature, not a slogan.
- **The problem section is concrete.** Empty miles, weak broker rates, time lost
  chasing loads. Those are the actual complaints carriers have.
- **Four services, plainly stated.** Load sourcing, broker communication, rate
  negotiation, weekly invoicing. No padding.
- **Pricing is on the page.** *8%, no contracts, cancel anytime.* Most dispatch
  pages hide the rate behind a call. Showing it filters out people who were never
  going to pay it, and builds trust with the ones who will.
- **"Cancel anytime — we earn your business every week"** is the strongest line
  on the page. It answers the fear carriers actually have about dispatchers.
- **Privacy Policy and Terms are linked.** Meta checks for these.

---

## Ad compliance for this offer

Lower risk than the webinar campaign.

- **No income claims on the page** — nothing to trip the unrealistic-outcomes
  rule. Keep it that way in the ad copy: no "earn $X per week".
- **Special Ad Category should be None.** The page sells a service to carriers
  who already operate. Keep the ad copy addressed to business owners — the moment
  it reads like recruiting drivers, Meta may classify it as employment and strip
  the targeting.
- The 8% fee is a plain price and raises nothing.

---

## Suggested campaign shape

Different audience from the webinar, so different targeting.

| Level | Setting | Value |
| --- | --- | --- |
| Campaign | Objective | Leads |
| | Special Ad Category | None |
| Ad set | Conversion location | Website |
| | Conversion event | Lead |
| | Location | United States |
| | Detailed targeting | Owner-operator, trucking business, CDL, freight — narrower than the webinar, since this audience genuinely exists as an interest cluster |
| Ad | Destination | `https://go.dmgagencycore.com/dispatch-only` |

Unlike the webinar campaign this one has **no deadline**. Dispatch is an
always-on offer, so it can run continuously at a modest daily budget and be
judged on cost per application rather than on filling a room by a date.

---

## Checklist before Cora starts

- [ ] Install the pixel in funnel Settings -> Tracking Code -> Head
- [ ] Decide one pixel or two
- [ ] Add a `Lead` conversion event — thank-you page preferred
- [ ] Set the page title
- [ ] Add og:title, og:description, og:image
- [ ] Test with Meta Pixel Helper: PageView on the page, Lead after applying
- [ ] Confirm the form creates a contact in GHL and notifies someone
