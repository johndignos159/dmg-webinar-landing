/**
 * Copy for every webinar email.
 *
 * Rewritten from Transportation_Entrepreneur_Blueprint.pptx so the emails
 * promise exactly what the session delivers. Facts used here come from the
 * deck — keep them in sync if the deck changes:
 *
 *   $900B+ US trucking industry (2024)      72% of US freight moves by truck
 *   $150K-$220K+ owner-operator gross       $725M lost to freight fraud 2025
 *   Broker margin ~15%                      Dispatcher 5-10%
 *   Broker bond $75K BMC-84                 Offer: $997 setup, LLC + EIN
 *
 * Block types: p, h, small, list, btn, box. See build-emails.mjs.
 */

export const NAME = '{{contact.first_name}}';
export const JOIN = 'https://us05web.zoom.us/j/81236507956';
export const CAL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE&text=The%20Transportation%20Entrepreneur%20Blueprint%20%E2%80%94%20DMG%20Agency%20Core&dates=20260915T230000Z/20260916T000000Z&details=One%20industry.%20Many%20lanes.%20One%20first%20step.&location=Online';
export const REPLAY = '[REPLAY LINK]';
export const BOOK = '[BOOKING LINK]';
export const MEET = '[MEETING LINK]';
export const INTAKE = '[INTAKE FORM LINK]';

const RED = '#DC143C';

// Shown on any email that references income figures, mirroring the deck's
// disclaimer slide.
const DISCLAIMER = {
  small:
    'DMG Agency Core provides business education and consulting — not legal, tax, or financial advice. Figures are industry ranges from public data, illustrative only, and not a guarantee of income.',
};

export const emails = [
  // ---------------------------------------------------------------- PRE-WEBINAR
  {
    file: '01-immediate-youre-in',
    subject: "You're in — The Transportation Entrepreneur Blueprint",
    blocks: [
      { p: `${NAME},` },
      { p: 'Your seat is confirmed.' },
      {
        box: [
          ['When:', 'Tuesday, September 15, 2026'],
          ['Time:', '7:00 PM Eastern / 4:00 PM Pacific'],
          ['Length:', '45 minutes, plus live Q&amp;A'],
        ],
      },
      { btn: { text: 'Add to my calendar', url: CAL } },
      { small: `Your join link: <a href="${JOIN}" style="color:${RED};">${JOIN}</a>` },
      { h: "What you'll walk away with" },
      {
        list: [
          '<strong>What the opportunity is worth</strong> — exactly what this industry pays, and who actually collects it',
          '<strong>The four pillars</strong> — what every transportation business that survives is built on',
          '<strong>The traps that wipe people out</strong> — the fraud and mistakes ending businesses before they start',
          '<strong>The one first step</strong> — the single move that separates owners from wishful thinkers',
        ],
      },
      { h: 'One industry. Many lanes. One first step.' },
      {
        p: 'You do not need a truck to earn in transportation. Carrier, dispatcher, broker, forwarder — four different roads, and every one of them starts with the same move.',
      },
      { p: 'That move is what Tuesday is about.' },
      { h: 'Come live if you can' },
      {
        p: 'The Q&amp;A at the end is where people ask the specific question about their own lane, their own situation, their own numbers. That part is not in any replay.',
      },
      { p: 'See you Tuesday.' },
    ],
  },

  {
    file: '02-t-minus-3-days',
    subject: 'Most people never make it. Here is why.',
    blocks: [
      { p: `${NAME},` },
      { p: 'Three days out. Here is a piece of it early.' },
      {
        p: 'Transportation is a <strong>$900 billion</strong> industry in the US. Roughly <strong>72% of all freight</strong> moves by truck, and it never stops moving.',
      },
      {
        p: 'And most people who chase it are broke or gone within a year.',
      },
      {
        p: "It is almost never because they could not do the work. These are hard workers who put in their savings and their hope. It is one thing nobody teaches them.",
      },
      { h: 'They build in the wrong order' },
      {
        p: 'Looking for loads before they can legally haul them. Buying the truck before the business exists. Chasing a bond or an authority before the entity is even formed. Hunting clients with no foundation to stand on.',
      },
      {
        p: 'Every one of those feels like progress. None of them is. The result is wasted money, lost months, and a business that stalls before it starts.',
      },
      {
        p: 'Sequence is not a detail. It is the difference between building a business and burying one.',
      },
      { p: 'On Tuesday I hand you the order.' },
      { btn: { text: 'Join Tuesday, 7PM ET', url: JOIN } },
    ],
  },

  {
    file: '03-t-minus-1-day',
    subject: 'Tomorrow — four doors in, one first step',
    blocks: [
      { p: `${NAME},` },
      { p: 'Tomorrow.' },
      {
        box: [
          ['When:', 'Tuesday, September 15'],
          ['Time:', '7:00 PM Eastern / 4:00 PM Pacific'],
          ['Length:', '45 minutes, plus live Q&amp;A'],
        ],
      },
      { h: 'Four ways into this industry' },
      {
        list: [
          '<strong>Carrier / Owner-Operator</strong> — you move the freight and own the authority',
          '<strong>Dispatcher</strong> — you book loads and manage drivers for carriers',
          '<strong>Freight Broker</strong> — you connect shippers with carriers for a margin',
          '<strong>Freight Forwarder</strong> — you arrange and coordinate shipping for shippers',
        ],
      },
      {
        p: 'Different roads. Same first move. We will walk what each one requires, what each one pays, and the step every single one of them shares.',
      },
      { h: 'Two things that will make tomorrow worth more' },
      {
        p: 'Come with your single biggest question ready. We do live Q&amp;A at the end, and specific questions get specific answers.',
      },
      {
        p: 'And join from somewhere you can take notes. This is not a session to half-watch.',
      },
      { btn: { text: 'Join tomorrow', url: JOIN } },
    ],
  },

  {
    file: '04-t-minus-1-hour',
    subject: 'One hour out',
    blocks: [
      { p: `${NAME},` },
      { p: 'We go live in one hour.' },
      { p: '<strong>7:00 PM Eastern / 4:00 PM Pacific</strong>' },
      { btn: { text: 'Join the masterclass', url: JOIN } },
      { small: "Bring your biggest question. We'll get to as many as we can." },
    ],
  },

  {
    file: '05-t-minus-15-min',
    subject: 'Starting now',
    blocks: [
      { p: `${NAME},` },
      { p: "We're starting in 15 minutes." },
      { btn: { text: 'Join now', url: JOIN } },
      { small: 'Come on in.' },
    ],
  },

  // ------------------------------------------------------------- DAY 1 (SPLIT)
  {
    file: '06-day1-noshow',
    subject: 'You missed it — replay inside (48 hours)',
    blocks: [
      { p: `${NAME},` },
      {
        p: "You registered and didn't make it. That's usually a load, a breakdown, or a day that got away — not a lack of interest.",
      },
      { p: 'So here is the recording.' },
      { btn: { text: 'Watch the replay', url: REPLAY } },
      { small: "It's up for 48 hours." },
      {
        p: 'If you only have ten minutes, watch the section on fraud. $725 million vanished from this industry last year and brand-new authorities were the number one target. That segment alone is worth your time.',
      },
      { h: 'Or skip the video' },
      {
        p: 'If you would rather just talk it through, that works too. We will look at which lane fits you and what your first step actually is.',
      },
      { btn: { text: 'Book your setup call', url: BOOK } },
    ],
  },

  {
    file: '07-day1-attended',
    subject: 'Thank you for being there',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Thanks for showing up on a Tuesday evening. That says something about how serious you are.',
      },
      { btn: { text: 'Watch the replay', url: REPLAY } },
      { h: 'The three things to hold onto' },
      {
        list: [
          '<strong>Every lane starts the same.</strong> Carrier, dispatcher, broker, forwarder — none of them can operate until you legally exist as a business.',
          '<strong>Sequence beats speed.</strong> Building in the right order costs the same as building backwards. It just does not have to be undone later.',
          '<strong>Fraud targets the unprepared.</strong> New authorities are the number one mark. A legitimate, verifiable business identity is your first line of defense.',
        ],
      },
      { h: "What's next" },
      {
        p: 'The setup call is exactly what it sounds like. We look at your situation, work out which lane fits, and get your foundation built — the right way, in the right order.',
      },
      { btn: { text: 'Book your setup call', url: BOOK } },
    ],
  },

  // ------------------------------------------------------------------- NURTURE
  {
    file: '08-day3-backwards',
    subject: 'Building in the wrong order',
    blocks: [
      { p: `${NAME},` },
      { p: 'I see the same four moves every week. All of them feel like progress.' },
      { h: 'Looking for loads before you can legally haul them' },
      {
        p: 'Time spent on load boards you cannot book from. Brokers will not touch you without authority, insurance, and a W-9 with a real entity behind it.',
      },
      { h: 'Buying the truck before the business exists' },
      {
        p: 'The truck feels like the business, so it goes first. Then it sits, because the paperwork that lets it earn was never started.',
      },
      { h: 'Chasing a bond or authority before the entity is formed' },
      {
        p: 'A broker bond is $75,000 in BMC-84 coverage. You cannot get one as a person with an idea. The entity comes first, and the order is not negotiable.',
      },
      { h: 'Hunting clients with no foundation to stand on' },
      {
        p: 'A dispatcher without an entity cannot invoice. A forwarder without one cannot contract. You can find the work and still have no way to get paid for it.',
      },
      {
        p: 'The result is always the same — wasted money, lost months, and a business that stalls before it starts.',
      },
      { btn: { text: 'Get the order right', url: BOOK } },
    ],
  },

  {
    file: '09-day5-front-door',
    subject: "You can't do any of it until you legally exist",
    blocks: [
      { p: `${NAME},` },
      { p: 'Whatever lane you are aiming at, the front door is the same.' },
      {
        list: [
          'A <strong>dispatcher</strong> cannot invoice without it.',
          'A <strong>broker</strong> cannot get authority without it.',
          'An <strong>owner-operator</strong> cannot run without it.',
          'A <strong>forwarder</strong> cannot contract without it.',
        ],
      },
      { h: 'Everything stacks on Launch' },
      {
        p: 'Protect sits on Generate Revenue. Generate Revenue sits on Operate. Operate sits on Launch. Nothing above the foundation stands if the foundation is shaky.',
      },
      {
        p: 'And Launch is the cheapest part of the entire journey. It is also the only part that gets dramatically more expensive to fix later than to do correctly now.',
      },
      { h: 'The honest test' },
      {
        p: 'If your business took a serious hit tomorrow — an accident, a claim, a customer who does not pay — is your personal property separate from it?',
      },
      {
        p: 'If you cannot answer that with certainty, that is the thing to fix before anything else.',
      },
      { btn: { text: 'Book your setup call', url: BOOK } },
    ],
  },

  {
    file: '10-day7-fraud',
    subject: '$725M vanished last year. New authorities were the target.',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'This industry has a dark side, and the people getting hit hardest are the ones who just started.',
      },
      {
        p: '<strong>$725 million was lost to freight fraud in 2025.</strong> Brand-new authorities are the number one target, because scammers know they are booking their own loads and have not seen it before.',
      },
      { h: 'The three you will meet first' },
      {
        p: "<strong>Double brokering.</strong> A fake carrier re-posts your load, pockets the pay, and vanishes.",
      },
      {
        p: '<strong>Identity and MC cloning.</strong> Scammers copy a real carrier&apos;s authority to steal freight and payments.',
      },
      {
        p: '<strong>Phishing and fake rate cons.</strong> Forged documents and spoofed emails used to reroute loads or funds.',
      },
      { h: 'Red flags' },
      {
        list: [
          'Rates that seem too good to be true',
          'Pressure to accept immediately',
          'Personal email instead of a company domain',
          'Mismatched or brand-new MC numbers',
          'Requests to skip the rate confirmation',
        ],
      },
      { h: 'How you protect yourself' },
      {
        p: 'Verify FMCSA authority every time. Never haul without a signed rate confirmation. And build on a legitimate, verifiable business identity — the operators who get hit hardest are the ones set up sloppily and running blind.',
      },
      { btn: { text: 'Get set up properly', url: BOOK } },
    ],
  },

  {
    file: '11-day10-which-pillar',
    subject: 'Which of the four pillars is missing?',
    blocks: [
      { p: `${NAME},` },
      { p: 'Quick self-check. Four pillars, four questions.' },
      { h: '1. Launch — do you legally exist?' },
      {
        p: 'Entity formed, EIN issued, registrations done in the right order. Not "in progress." Done.',
      },
      { h: '2. Operate — can it run without you holding it together?' },
      {
        p: 'Systems, clean books, compliance handled before a problem forces it.',
      },
      { h: '3. Generate Revenue — are you set up to get paid?' },
      {
        p: 'Credibility that makes shippers and partners trust you with real money, and a pipeline that is not luck.',
      },
      { h: '4. Protect — would one bad day end you?' },
      {
        p: 'Ongoing compliance, contracts, insurance, and knowing the fraud playbook before it is aimed at you.',
      },
      { h: 'I hear these a lot' },
      {
        p: '<strong>&ldquo;I&apos;ll sort it once I&apos;m making more money.&rdquo;</strong><br>The structure is what lets you make money safely. It is backwards.',
      },
      {
        p: '<strong>&ldquo;It&apos;s too late, I&apos;ve already started.&rdquo;</strong><br>Almost never true. Most of this is fixable, and it is cheaper the sooner you do it.',
      },
      {
        p: '<strong>&ldquo;I can&apos;t afford it right now.&rdquo;</strong><br>Every month unformed is income you cannot collect and risk you are carrying personally.',
      },
      { btn: { text: 'Book your setup call', url: BOOK } },
    ],
  },

  {
    file: '12-day14-faq',
    subject: 'The questions I get asked most',
    blocks: [
      { p: `${NAME},` },
      { p: 'The ones that come up every week.' },
      { h: 'Which lane should I pick?' },
      {
        p: 'Dispatching has the lowest barrier — an entity, systems, and carrier clients. Carrier needs authority, insurance, and BOC-3. Broker adds a $75,000 BMC-84 bond. Forwarder needs authority, a bond, and insurance. Different capital, different risk, same starting point.',
      },
      { h: 'Do I really need an LLC?' },
      {
        p: 'You can operate as a sole proprietor. It means your personal assets and your business are legally the same thing. In an industry where one accident can produce a claim larger than most people&apos;s net worth, that is a hard risk to justify.',
      },
      { h: 'How does the money actually work?' },
      {
        p: 'A shipper pays to move freight. A broker matches it to a truck and keeps roughly 15%. The carrier hauls it, owns the revenue, and pays the driver. A dispatcher books for the carrier and earns 5-10%. Every seat gets paid — the question is which one you want to own.',
      },
      { h: 'What does it cost to start properly?' },
      {
        p: 'Our setup is <strong>$997</strong>, one time — LLC formation, EIN registration, and everything filed in the correct order so none of it has to be redone. What it costs to start improperly is a much larger and much less predictable number.',
      },
      { h: 'Do you work in Spanish?' },
      { p: 'Yes. Every step, English or Spanish.' },
      { btn: { text: 'Ask your question on a call', url: BOOK } },
      DISCLAIMER,
    ],
  },

  {
    file: '13-day21-two-roads',
    subject: 'Two roads from here',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Three weeks ago you registered for the Blueprint. This is my last note on it, so let me leave you with the honest version.',
      },
      { h: 'Build it right' },
      {
        list: [
          'Scale past a one-person startup',
          'Stack new lanes and revenue streams on one foundation',
          'Access contracts and set-aside programs most never see',
          'Build real equity — an asset you can grow, sell, or hand down',
        ],
      },
      { h: 'Or the cost of waiting' },
      {
        list: [
          'Income you cannot collect — every month',
          'Personal assets exposed with no entity behind you',
          'Locked out of contracts and better freight',
          'Easy prey for the fraud aimed at new operators',
        ],
      },
      {
        p: '<strong>Doing nothing is a decision too — and it has a price.</strong>',
      },
      {
        p: 'You did not come to this to file paperwork. You came to build something. The gap between where you are and that business is one decision.',
      },
      { btn: { text: 'Book your setup call', url: BOOK } },
      {
        p: 'And if the timing is not right, that is genuinely fine. Nothing here expires, and you know where to find us.',
      },
      { small: 'One industry. Many lanes. One first step.' },
      DISCLAIMER,
    ],
  },

  // -------------------------------------------------------------- BOOKED PATH
  {
    file: '14-booked-confirmation',
    subject: 'Your setup call is confirmed',
    blocks: [
      { p: `${NAME},` },
      { box: [['Confirmed for:', '{{appointment.start_time}}']] },
      { p: 'The calendar invite with the meeting link is attached.' },
      { h: 'Before we talk' },
      {
        p: 'Two minutes on this, so I come prepared instead of spending our first ten on background.',
      },
      { btn: { text: 'Complete the intake form', url: INTAKE } },
      { h: 'What to expect' },
      {
        p: 'We work out which lane fits you, what your foundation needs to look like, and what order to build it in. If we are a fit to handle it for you, I will say so. If not, I will say that too.',
      },
      { small: 'Available in English or Spanish — just let us know.' },
    ],
  },

  {
    file: '15-booked-24h',
    subject: 'Tomorrow — your setup call',
    blocks: [
      { p: `${NAME},` },
      { p: 'Our call is tomorrow at <strong>{{appointment.start_time}}</strong>.' },
      { btn: { text: 'Join the call', url: MEET } },
      {
        p: `If you haven't done the intake form yet, now's the time — it makes a real difference to how useful the call is. <a href="${INTAKE}" style="color:${RED};">Complete it here</a>.`,
      },
      {
        small:
          'Have a rough idea of which lane interests you. Not sure yet is a perfectly good answer — that is part of what the call is for.',
      },
      { small: 'Need to move it? <a href="[RESCHEDULE LINK]">Reschedule here</a>.' },
    ],
  },

  {
    file: '16-booked-1h',
    subject: 'One hour',
    blocks: [
      { p: `${NAME},` },
      { p: 'We are on in an hour.' },
      { btn: { text: 'Join the call', url: MEET } },
      { small: 'Talk soon.' },
    ],
  },

  {
    file: '17-post-consult',
    subject: 'What we covered, and your next step',
    blocks: [
      { p: `${NAME},` },
      { p: 'Good talking with you.' },
      { h: 'Your lane' },
      { p: '[Which lane and why]' },
      { h: 'What to build first' },
      { p: '[Specific recommendation and order]' },
      {
        p: 'If you want us to handle the foundation — LLC formation, EIN, everything filed in the right order — here is the link to get moving.',
      },
      { btn: { text: 'Get my foundation built — $997', url: '[OFFER LINK]' } },
      {
        small:
          'And if you would rather do it yourself, everything I described is doable on your own. Take the notes and run with it. The offer stands either way.',
      },
    ],
  },
];
