# Dispatch landing page — review

**Page:** https://go.dmgagencycore.com/dispatch-only
**Built as:** custom HTML pasted into a GHL funnel page (`.dmg-lp` scoped block)
**Form:** GHL `n9pNt4VYOVsvOg3VbqlL`, embedded, reached by the `#apply` anchor
**Pixel Cora intends to use:** `2317272492412268`
**Reviewed:** 2026-08-21

Separate from the webinar funnel. Different offer, different audience — existing
carriers who already haul, rather than people who have not started yet.

---

## Verdict — one thing left before spend

The page reads well, the offer is clear, and the pixel is now on. The remaining
blocker is the **Lead event**: without it Meta sees page views but never learns
who applied, so it optimises for the cheapest clicks it can find. Set that, and
the campaign can run.

The title and og tags are not blockers, but they are ten minutes and they are
what the ad's link preview is built from.

| | Status |
| --- | --- |
| Meta Pixel installed | **Yes** — added 2026-08-21, native GHL field |
| `<title>` tag | Missing on the landing page |
| og:title / og:description / og:image | **Missing** |
| Privacy Policy + Terms links | Present |
| Mobile styles | Present |
| Copy and offer | Strong |
| Form creates contact + notifies | Confirmed by John |
| Redirect goes to the thank-you step | Fixed 2026-08-21 |

---

## 1. The pixel — installed 2026-08-21

An earlier fetch of the live page found no pixel at all, which would have made
the campaign optimise for cheap clicks rather than applications. It was added the
same day. A later fetch shows `2317272492412268` in the page config on **both**
funnel steps.

It is set through GHL's **native Facebook Pixel field**, not pasted as code. That
means `connect.facebook.net` does not appear in the raw HTML — GHL initialises
the pixel from its own JavaScript at runtime. Absence from the page source is
therefore not evidence it is missing; only Meta Pixel Helper in a real browser
settles it.

**Do not also paste the base pixel snippet into Tracking Code.** Two
installations fire PageView twice and double every number.

### It needs a conversion event, not just PageView

The base code alone reports page views. Meta needs to know when someone
*applies*. The funnel already has the right shape for this — two steps:

```
go.dmgagencycore.com/dispatch-only      the landing page
go.dmgagencycore.com/dispatch-thankyou  "Application Received"
```

**Where the code goes:**

| Scope | Location | Code |
| --- | --- | --- |
| Whole funnel | Settings -> Tracking Code -> **Head** | base pixel + `PageView` |
| Thank-you step only | that step -> Tracking Code -> **Body** | `if (window.fbq) fbq('track', 'Lead');` |

Body rather than Head on the second one, so the base pixel has already defined
`fbq` by the time it runs.

Do **not** also use the "Facebook Pixel ID" field in the form settings. That
covers the form iframe only, and combined with the page-level pixel it
double-counts.

### The redirect currently skips the thank-you page — resolved 2026-08-21

The form was set to redirect to `https://info.dmgagencycore.com/book-consultation`,
bypassing the thank-you step entirely. Changed to the thank-you page so the Lead
event has somewhere to fire.

**That change has a cost, and it needs compensating for.** Sending applicants
straight to the booking page captured them at the moment they were most
motivated. The thank-you page tells them "we will call you" and its only button
is *Return to Home* — so as built, the redirect change trades a booking
opportunity for a tracking event.

Fix: change that button to **Book Your Call Now**, pointing at
`https://info.dmgagencycore.com/book-consultation`. Then the page sets
expectations, fires the conversion, and still captures the booking.

### Brand errors on the thank-you page

| What | Currently | Should be |
| --- | --- | --- |
| Page title | `Application Received - ProDispatch` | `Application Received — DMG Agency Core` |
| Footer year | 2025 | 2026 |
| Footer city | Altamonte Springs, FL | Orlando or St. Petersburg — the other pages disagree with each other too |

"ProDispatch" is template residue. Small things, but this is a paid ad
destination, and inconsistent branding is what makes a carrier hesitate before
handing over their MC number.

---

## 2. The landing page has no title

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

## Meta Instant Forms — considered and declined 2026-08-21

Cora asked whether to use a Meta Instant Form instead of this page. Decision: no.

Instant Forms convert better and cost less per lead — no page load, and the
fields pre-fill from the person's Facebook profile. On mobile that removes the
single biggest drop-off point.

The reason to decline is specific to this offer. Dispatch is an ongoing
relationship at 8% of revenue, and the page is doing the persuading: the fee is
stated openly rather than hidden behind a call, and *"cancel anytime — we earn
your business every week"* answers the fear carriers actually have about
dispatchers. An Instant Form shows none of that. The applicant taps through
pre-filled fields in seconds and arrives not knowing the price.

Cheaper leads, worse conversations — the wrong trade at this price point.

Two further costs worth recording: Instant Form leads never visit the site, so
the pixel never sees them and there is no audience to retarget; and they go cold
within minutes precisely because they cost nothing to submit, which demands a
call-back speed DMG has not committed to.

**Revisit only with data.** If cost per application from this page disappoints
after two weeks of real spend, test an Instant Form as a *separate* campaign and
compare on cost per **signed carrier**, not cost per lead. Instant Forms nearly
always win the first metric and often lose the last. Do not run both at once on a
small budget — each ad set needs roughly 50 conversions a week to leave the
learning phase, and splitting the spend teaches you nothing about either.

If it is ever tested, turn on Meta's **"Higher intent"** setting, which adds a
review step before submit.

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

Done:

- [x] Pixel installed on both funnel steps
- [x] Form redirect points at `go.dmgagencycore.com/dispatch-thankyou`
- [x] Form creates a contact in GHL and notifies someone
- [x] Decided against a Meta Instant Form

Outstanding:

- [ ] Paste the corrected thank-you HTML — `dispatch-thankyou.html` in this repo.
      Fixes the "ProDispatch" title, the 2025 footer year, adds `noindex`, and
      turns *Return to Home* into **Book Your Call Now**
- [ ] Funnel -> **Events** tab -> set the thank-you step to fire **Lead**
- [ ] Landing page title and SEO fields (gear icon on the Dispatch step)
- [ ] og image — needs a 1200x630 URL
- [ ] Test with Meta Pixel Helper: PageView on the landing page, Lead after applying
- [ ] Settle the business city — the pages currently say Altamonte Springs,
      Orlando and St. Petersburg. The corrected file uses St. Petersburg
