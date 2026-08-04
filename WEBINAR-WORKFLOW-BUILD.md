# Webinar Workflow — Build Spec + Email Content

Companion to `META-GHL-WORKFLOW.md`. That file covers ad → page → form.
This one covers everything that happens after the form is submitted.

Webinar: **Saturday, August 15, 2026 · 2:00 PM Eastern**

---

## Part 1 — What I changed from the original plan, and why

### 1. Split attended from no-show before the nurture starts

**This is the important one.** The original Day 1 email is *"Thank You for Attending"* and it goes to everyone who did not book — including people who never showed up.

Two problems. A no-show who gets thanked for attending knows instantly that nobody is paying attention, and you have burned the single best re-engagement moment you will ever have with them. No-shows are not cold; they raised their hand and life got in the way. They need *"you missed it, here is the replay"*, not a thank-you.

Typical webinar show rates run 30–45%. So this branch is more than half your list.

### 2. All waits are anchored to the webinar date, never to durations

A step that says *"wait 3 days, then send"* works for someone who registers three weeks out and fails for someone who registers the day before — their "3 days before" email arrives after the webinar has ended.

Every pre-webinar step uses **Wait Until a specific date/time**, calculated from the webinar datetime, with an if/else so late registrants skip anything already in the past.

### 3. SMS added at the two moments it actually matters

You are collecting phone numbers with consent and not using them. Email open rates sit around 20–30%; SMS lands above 90%. For *"we go live in one hour"*, SMS is the channel and email is the backup.

Two texts only — T-1 hour and T-15 minutes. Any more and you train people to opt out.

### 4. Hard exit conditions on the nurture

The moment someone books, they must leave the nurture sequence. Without this, a person who books on Day 5 still receives *"Last Chance to Schedule Your Free Strategy Session"* on Day 21. That single mistake does more damage to trust than the whole sequence builds.

### 5. Engagement-based fast-track

Anyone who watches more than 60% of the session, or clicks the offer link, skips the slow nurture and goes straight to a direct booking ask. They are ready — do not make them read six more emails first.

### 6. Timezone made explicit everywhere

Your audience spans four US timezones. Every mention of the time says **2:00 PM Eastern / 11:00 AM Pacific**. A driver in California seeing only "2:00 PM" will show up three hours late.

---

## Part 2 — The map

```
FORM SUBMITTED
      |
      +-- Tag: webinar-2026-08-15-registered
      +-- Custom field: Webinar Date = 2026-08-15
      +-- Opportunity -> Webinar Funnel -> "Registered"
      +-- EMAIL 1 (immediate): You're In
      |
      +-- Wait Until  T-3 days   -> EMAIL 2   (skip if past)
      +-- Wait Until  T-1 day    -> EMAIL 3   (skip if past)
      +-- Wait Until  T-1 hour   -> EMAIL 4 + SMS 1
      +-- Wait Until  T-15 min   -> EMAIL 5 + SMS 2
      |
   [ WEBINAR RUNS ]
      |
      +-- Wait Until  T+3 hours
      |
      +-- IF tag "webinar-attended"  ------+
      |                                     |
   NO-SHOW PATH                        ATTENDED PATH
      |                                     |
   EMAIL N1 (Day 1)                    EMAIL A1 (Day 1)
   "You missed it"                     "Thank you for attending"
      |                                     |
      |                          IF watched >60% OR clicked offer
      |                                     |
      |                              FAST TRACK -> direct booking ask
      |                                     |
      +------------- MERGE -----------------+
                     |
              NURTURE SEQUENCE
              Day 3, 5, 7, 10, 14, 21
                     |
              EXIT THE MOMENT tag "consultation-booked" is added
                     |
              Day 21 no booking -> tag "webinar-cold"
                                -> Opportunity -> "Closed Lost"

BOOKED (any point)
      |
      +-- Opportunity -> "Consultation Booked"
      +-- HAND OFF to existing Lead Generation - Start Up Pipeline
      +-- EMAIL B1 confirmation + intake form
      +-- Wait Until T-24h -> EMAIL B2
      +-- Wait Until T-1h  -> EMAIL B3 + SMS
      +-- After call -> EMAIL B4
```

---

## Part 3 — Build it in GHL

### Custom fields to create first

| Field | Type | Purpose |
| --- | --- | --- |
| Webinar Date | DATE | Which session — keeps the pipeline reusable |
| Webinar Attended | RADIO | Live / Replay / No-Show |
| Watch Duration | NUMERICAL | Minutes — drives the fast-track branch |
| Ad Campaign | TEXT | Which Meta campaign produced the lead |

### Tags

```
webinar-2026-08-15-registered
webinar-2026-08-15-attended
webinar-2026-08-15-noshow
webinar-2026-08-15-replay
consultation-booked
webinar-cold
```

Date-stamped on purpose. Reuse `webinar-registered` across sessions and by
December you cannot tell who registered for which one.

### Pipeline — "Webinar Funnel"

Registered → No-Show → Attended Live → Watched Replay → Hot Lead →
Consultation Booked → Closed Lost

**Stop at Consultation Booked.** Hand off to the existing
**Lead Generation – Start Up Pipeline**, which already runs
New Cold Lead → Consultation → Hot Lead → Payment Sent → Closed Won.
Duplicating those stages gives one person two opportunities and double-counts
revenue in your reporting.

### Workflow settings that matter

- **Trigger:** Form Submitted → *Webinar Registration*
- **Re-entry:** Off. Someone registering twice should not get two sequences.
- **Stop on response:** On, for the nurture only — a reply means a human should take over.
- **Timezone:** set the workflow to America/New_York so date waits behave.

### The skip-if-past pattern

Every pre-webinar step needs this or late registrants break:

```
IF/ELSE  ->  Webinar Date is more than 3 days from now
   YES  ->  Wait Until (Webinar Date minus 3 days)  ->  Send Email 2
   NO   ->  skip to the next step
```

Repeat for T-1 day, T-1 hour, T-15 min.

---

## Part 4 — Email content

Merge fields use GHL syntax. Replace `[REPLAY LINK]`, `[BOOKING LINK]`,
`[JOIN LINK]` with real URLs.

---

### EMAIL 1 — Immediately on registration

**Subject:** You're in — here's your seat for the Trucking Business Masterclass
**Preview:** Save the date, and read this before you forget.

```
{{contact.first_name}},

Your seat is confirmed.

WHEN
Saturday, August 15, 2026
2:00 PM Eastern / 11:00 AM Pacific
60 minutes, plus live Q&A

JOIN HERE
[JOIN LINK]

Add it to your calendar right now — that single click is the
difference between attending and forgetting:
[CALENDAR LINK]

WHAT WE'RE COVERING

- How to start a trucking business the right way, so you're not
  unwinding expensive mistakes six months in
- The errors I watch new carriers make every single week
- What actually separates a profitable carrier from a busy one
- The framework we use with every client:
  Launch, Operate, Generate Revenue, Protect, Grow

One thing worth saying plainly: come live if you can.

The recording never covers everything. The Q&A at the end is where
people ask the specific question about their own authority, their own
lane, their own numbers — and that part isn't in any replay.

See you Saturday.

DMG Agency Core
```

---

### EMAIL 2 — 3 days before

**Subject:** Why most trucking businesses fail in their first year
**Preview:** It isn't freight rates. It's something that happens before the first load.

```
{{contact.first_name}},

Three days until we go live. Here's a piece of it early.

Most new carriers don't fail because rates are bad or fuel is expensive.
They fail because of decisions made before the first load ever moved.

The pattern looks like this:

The LLC gets filed in the wrong state, or filed correctly but never
maintained. Authority goes active before there's a single broker packet
ready. Insurance is bought on price instead of coverage. And nobody
calculated cost per mile, so every load feels profitable right up until
the quarter closes and it wasn't.

None of that shows up as a problem in month one. It shows up in month
seven, when there's no cash to fix it.

The fix isn't complicated. It's sequence. Do the right things in the
right order and most of these never become problems at all.

That sequence is what Saturday is about.

Saturday, August 15
2:00 PM Eastern / 11:00 AM Pacific
[JOIN LINK]

DMG Agency Core
```

---

### EMAIL 3 — 1 day before

**Subject:** Tomorrow — your trucking business roadmap
**Preview:** 2:00 PM Eastern. Here's exactly what you're getting.

```
{{contact.first_name}},

Tomorrow.

Saturday, August 15
2:00 PM Eastern / 11:00 AM Pacific
[JOIN LINK]

What you're walking away with:

1. The correct order to launch — LLC, EIN, authority, insurance,
   BOC-3 — and what breaks when you do it out of sequence
2. The mistakes that quietly cost new carriers thousands, and how to
   spot them before they cost you
3. How to know your real cost per mile, so you stop hauling loads
   that lose money
4. The full Launch, Operate, Generate Revenue, Protect, Grow framework

Two things that will make tomorrow worth more to you:

Come with your single biggest question ready. We do live Q&A at the
end, and specific questions get specific answers.

And join from somewhere you can actually take notes. This isn't a
session to half-watch while doing something else.

See you tomorrow.

DMG Agency Core
```

---

### EMAIL 4 — 1 hour before

**Subject:** One hour out
**Preview:** Your link is inside.

```
{{contact.first_name}},

We go live in one hour.

2:00 PM Eastern / 11:00 AM Pacific

JOIN HERE
[JOIN LINK]

Bring your biggest question. We'll get to as many as we can.

DMG Agency Core
```

---

### EMAIL 5 — 15 minutes before

**Subject:** Starting now
**Preview:** Doors are open.

```
{{contact.first_name}},

We're starting in 15 minutes.

[JOIN LINK]

Come on in.

DMG Agency Core
```

---

### SMS 1 — 1 hour before

```
{{contact.first_name}}, the DMG masterclass starts in 1 hour
(2PM ET / 11AM PT). Join: [JOIN LINK]

Reply STOP to opt out.
```

### SMS 2 — 15 minutes before

```
Starting in 15 min. Here's your link: [JOIN LINK]

Reply STOP to opt out.
```

---

### EMAIL N1 — Day 1, NO-SHOW ONLY

**Subject:** You missed it — replay inside (48 hours)
**Preview:** No lecture. Here's what you missed.

```
{{contact.first_name}},

You registered and didn't make it. That's usually a load, a breakdown,
or a day that got away — not a lack of interest.

So here's the recording:

[REPLAY LINK]

It's up for 48 hours.

If you only have ten minutes, skip to the section on cost per mile.
That one changes how people price freight the same week they watch it.

And if you'd rather just talk it through with someone instead of
watching an hour of video, that works too. We do free 30-minute
strategy calls — your business, your numbers, no pitch:

[BOOKING LINK]

DMG Agency Core
```

---

### EMAIL A1 — Day 1, ATTENDED ONLY

**Subject:** Thank you for being there
**Preview:** Replay, your takeaways, and what to do next.

```
{{contact.first_name}},

Thanks for showing up live on a Saturday. That says something about
how serious you are.

REPLAY
[REPLAY LINK]

THE THREE THINGS TO ACT ON

1. Sequence beats speed. Filing in the right order costs the same and
   saves months of unwinding.
2. Know your cost per mile before you accept another load. Most
   carriers are guessing, and guessing is why margins vanish.
3. Compliance is cheaper to build than to fix. Every time.

WHAT'S NEXT

I offered a free 30-minute strategy session at the end. That offer
is real and it's open.

It's your business, your numbers, and a straight answer about where
you actually stand. No pitch, no obligation.

[BOOKING LINK]

DMG Agency Core
```

---

### EMAIL D3 — Day 3

**Subject:** The startup mistakes I see every single week
**Preview:** Four of them. All avoidable. All expensive.

```
{{contact.first_name}},

I have this conversation most weeks. The details change, the mistakes
don't.

FILING THE LLC IN THE WRONG STATE
Someone reads that Wyoming or Delaware is better, files there, then
discovers they're operating in Florida and now owe foreign
qualification, a registered agent, and two sets of fees. File where
you operate.

GETTING AUTHORITY ACTIVE WITH NO PACKET READY
Authority goes live, the clock starts, and there's no insurance
certificate, no W-9, no notice of assignment. Weeks of paying for
authority that can't move freight.

BUYING INSURANCE ON PRICE
The cheap policy has exclusions you won't read until you need them.
The gap between cheap and correct is smaller than the gap between
correct and one uncovered claim.

NO IDEA WHAT A MILE COSTS
The one that quietly kills companies. You cannot price freight you
can't cost. Everything looks profitable until it isn't.

Any of these sound familiar? That's what the free strategy call is
for — 30 minutes, your actual situation:

[BOOKING LINK]

DMG Agency Core
```

---

### EMAIL D5 — Day 5

**Subject:** Before you spend another dollar on your trucking business
**Preview:** Where the money should go first.

```
{{contact.first_name}},

Most people starting out spend in exactly the wrong order.

The truck comes first, because the truck feels like the business.
Then insurance, because it's required. Then, eventually, whatever's
left goes to the structure that was supposed to protect all of it.

Backwards.

WHAT ACTUALLY COMES FIRST

The legal structure. LLC, EIN, and the compliance filings that make
you a real operating business instead of a person with a truck and
exposure.

It's the cheapest part of the whole thing. It's also the only part
that protects everything else — and the only part that gets
dramatically more expensive to fix later than to do correctly now.

Fixing a badly formed entity after you have trucks, drivers, and
contracts costs multiples of doing it right on day one. Sometimes
it means dissolving and starting over.

THE HONEST TEST

If your business took a serious hit tomorrow — an accident, a claim,
a customer who doesn't pay — is your personal house separate from it?

If you can't answer that with certainty, that's the thing to fix
before anything else.

Thirty minutes, free, no pitch:
[BOOKING LINK]

DMG Agency Core
```

---

### EMAIL D7 — Day 7

**Subject:** How one small decision saved this carrier thousands
**Preview:** A real number, from a real conversation.

```
{{contact.first_name}},

A carrier came to us running three trucks. Busy constantly. Barely
profitable, and he couldn't work out why.

He was pricing off what other people said rates should be. Never
calculated his own cost per mile.

We ran the numbers. His true cost — fuel, maintenance, insurance,
payments, driver pay, and the overhead nobody counts — was 34 cents
higher per mile than he thought.

He'd been running one lane for eight months. Felt fine. It was losing
money on every load.

He dropped the lane, repriced two others, kept the same trucks and
the same drivers, and his margin moved within a quarter.

Nothing about his operation changed. He just knew a number he hadn't
known before.

THE POINT

The difference between a busy trucking company and a profitable one
is usually not more freight. It's knowing which freight to say no to.

That's the first thing we look at on a strategy call. Bring your
numbers, or bring your best guess — either works:

[BOOKING LINK]

DMG Agency Core
```

---

### EMAIL D10 — Day 10

**Subject:** Is your trucking business actually ready?
**Preview:** Six questions. Answer honestly.

```
{{contact.first_name}},

Quick self-check. Answer honestly — nobody's watching.

1. Is your LLC filed in the state where you actually operate, and
   current on its annual filings?
2. Do you know your cost per mile to within a few cents?
3. If a broker asked for your packet right now, could you send it
   in under ten minutes?
4. Does your insurance cover what you actually haul, or what the
   cheapest quote covered?
5. If a claim hit tomorrow, is your personal property genuinely
   separate from the business?
6. Do you know which of your current lanes is the least profitable?

Four or more solid yeses and you're in better shape than most.

Fewer than four, and none of it is a crisis — but they compound.
Every one of these gets more expensive the longer it sits.

I HEAR THESE A LOT

"I'll sort it once I'm making more money."
The structure is what lets you make more money safely. It's backwards.

"It's too late, I've already started."
Almost never true. Most of this is fixable. It's just cheaper the
sooner you do it.

"I can't afford it right now."
That's exactly why the call is free. Thirty minutes, and you'll know
where you stand.

[BOOKING LINK]

DMG Agency Core
```

---

### EMAIL D14 — Day 14

**Subject:** The questions I get asked most
**Preview:** Straight answers, no sales pitch.

```
{{contact.first_name}},

The ones that come up every week.

DO I NEED AN LLC, OR CAN I OPERATE AS A SOLE PROPRIETOR?
You can operate as a sole proprietor. It means your personal assets
and your business are the same thing legally. In an industry where
one accident can produce a claim larger than most people's net worth,
that's a hard risk to justify against the cost of forming properly.

WHICH STATE SHOULD I FILE IN?
Where you operate. The Wyoming and Delaware advice circulating online
is aimed at businesses with a very different profile. For a carrier,
filing out of state usually means paying twice and complying twice.

HOW LONG UNTIL I CAN HAUL?
Authority typically takes a few weeks. What determines your actual
start date is whether insurance, BOC-3, and your broker packet are
ready when it activates. People who prepare in parallel start hauling
immediately. People who do it in sequence pay for idle authority.

DO I NEED MY OWN AUTHORITY, OR SHOULD I LEASE ON?
Depends on capital, risk tolerance, and whether you want to build an
asset or earn income now. Both are legitimate. They're very different
businesses.

WHAT DOES IT COST TO START PROPERLY?
Our full setup is $997 — LLC formation, EIN, BOI filing, BOC-3. What
it costs to start improperly is a much larger and much less
predictable number.

Question not here? Ask it on a call:
[BOOKING LINK]

DMG Agency Core
```

---

### EMAIL D21 — Day 21, final

**Subject:** Closing this out
**Preview:** Last note from me on this.

```
{{contact.first_name}},

Three weeks ago you registered for the masterclass. I've sent a fair
amount since then, so this is the last one on it.

The free strategy session is still open. Thirty minutes, your
business, straight answers about where you stand and what to fix
first. No pitch — if we're not a fit, I'll tell you and point you
somewhere useful.

[BOOKING LINK]

If the timing isn't right, that's genuinely fine. Nothing here
expires, and you know where to find us.

One last thing worth leaving you with.

The carriers who make it aren't the ones who started with the most
money or the best truck. They're the ones who got the boring parts
right early — structure, numbers, compliance — so that when the good
opportunities came, they were in a position to take them.

That's it. Good luck out there.

DMG Agency Core
```

---

### BOOKED PATH

**EMAIL B1 — immediately on booking**

**Subject:** Your strategy session is confirmed
**Preview:** One short form before we talk.

```
{{contact.first_name}},

Confirmed:
{{appointment.start_time}}

The calendar invite with the meeting link is attached.

BEFORE WE TALK

Two minutes on this, so I can come prepared instead of spending
our first ten minutes on background:

[INTAKE FORM LINK]

It asks where you are now, what you're trying to build, and what's
in the way. That's it.

WHAT TO EXPECT

Thirty minutes. I'll ask about your situation, tell you honestly
where the gaps are, and give you a straight recommendation on what
to fix first.

If we're a fit to help, I'll say so. If not, I'll say that too.

DMG Agency Core
```

**EMAIL B2 — 24 hours before**

**Subject:** Tomorrow — your strategy session
**Preview:** Time, link, and one thing to have ready.

```
{{contact.first_name}},

Our call is tomorrow at {{appointment.start_time}}.

[MEETING LINK]

If you haven't done the intake form yet, now's the time — it makes
a real difference to how useful the thirty minutes are:
[INTAKE FORM LINK]

Have your rough numbers handy if you're already operating. Best
guesses are fine.

Need to move it? Reschedule here: [RESCHEDULE LINK]

DMG Agency Core
```

**EMAIL B3 — 1 hour before**

**Subject:** One hour
**Preview:** Your link.

```
{{contact.first_name}},

We're on in an hour.

[MEETING LINK]

Talk soon.

DMG Agency Core
```

**SMS B3**

```
{{contact.first_name}}, our strategy session starts in 1 hour.
Join: [MEETING LINK]
```

**EMAIL B4 — after the call**

**Subject:** What we covered, and your next step
**Preview:** Recap and the path forward.

```
{{contact.first_name}},

Good talking with you.

WHAT WE COVERED
[Filled in by whoever ran the call]

WHAT I'D DO FIRST
[Specific recommendation]

If you want us to handle it, here's the link to get moving:
[OFFER LINK]

And if you'd rather do it yourself, everything I described is
doable on your own — take the notes and run with it. The offer
stands either way.

DMG Agency Core
```

---

### ONBOARDING — outline

Not written out, because it depends on fulfilment steps I do not have
visibility into. The shape:

| Timing | Purpose |
| --- | --- |
| Immediate | Welcome, what happens now, who their contact is |
| Day 0 | Documents needed, with a single upload link |
| Day 2 | Progress update — filed, pending, what's next |
| Day 7 | Education — what to do while waiting on FMCSA |
| On completion | Everything delivered, what they now own, how to maintain it |
| +14 days after completion | Review request — only after something has gone right |

Two rules worth keeping. Send the review request after a delivered
outcome, never on a timer alone. And send a progress update even when
there is no progress — silence during a filing period is the most
common reason clients start doubting they made the right call.

---

## Part 5 — What else I'd suggest

### Do a dry run with two test contacts

Register twice — once four weeks out, once two hours before the webinar.
Watch what each one receives. The late registrant is where date-anchored
waits break, and it is much cheaper to find that now.

### Set the replay to expire

The 48-hour window in the no-show email is deliberate. An always-available
replay removes any reason to attend live, and live attendance is where
your booking rate comes from. Publish the deadline and honour it.

### Track show rate as your primary metric

Registrations flatter you. Show rate tells you whether the reminder
sequence works. Below 30% means the problem is the reminders, not the ad.

### Reuse this for every webinar

Nothing here is specific to August 15 except the date field and the tags.
Change the date, change the tag suffix, run it again.

### Consider making the offer twice

Your plan mentions the offer at the end of the session. Most of the
attention is in the first twenty minutes. Mention that the strategy
session exists early — briefly, no pitch — then make the full offer at
the end. People who leave at minute 35 will still have heard it.

---

*Created 2026-08-04.*
