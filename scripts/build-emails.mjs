/**
 * Generates brand-styled, email-client-safe HTML for every webinar email.
 *
 *   node scripts/build-emails.mjs
 *
 * Output lands in emails/. Each file is one complete email ready to paste into
 * a GoHighLevel template of type "html".
 *
 * Why tables and inline styles: Outlook renders with Word's engine, and Gmail
 * strips <style> blocks in several contexts. Table layout plus inline CSS is
 * the only combination that survives everywhere.
 */

import { writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'emails');
mkdirSync(OUT, { recursive: true });

const RED = '#DC143C';
const NAVY = '#1a1a1a';
const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Inter,Helvetica,Arial,sans-serif";

// --- block renderers -------------------------------------------------------

const p = (t) =>
  `<p style="margin:0 0 16px;font-family:${FONT};font-size:16px;line-height:1.65;color:${NAVY};">${t}</p>`;

const h = (t) =>
  `<p style="margin:28px 0 12px;font-family:${FONT};font-size:13px;font-weight:700;letter-spacing:1.2px;text-transform:uppercase;color:${RED};">${t}</p>`;

const small = (t) =>
  `<p style="margin:0 0 16px;font-family:${FONT};font-size:14px;line-height:1.6;color:#666;">${t}</p>`;

const list = (items) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 16px;">${items
    .map(
      (i) =>
        `<tr><td valign="top" style="padding:0 10px 10px 0;font-family:${FONT};font-size:16px;color:${RED};line-height:1.65;">&bull;</td><td style="padding:0 0 10px;font-family:${FONT};font-size:16px;line-height:1.65;color:${NAVY};">${i}</td></tr>`,
    )
    .join('')}</table>`;

const btn = ({ text, url }) =>
  `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 24px;"><tr><td style="background:${RED};border-radius:999px;"><a href="${url}" style="display:inline-block;padding:15px 34px;font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff;text-decoration:none;letter-spacing:0.4px;">${text}</a></td></tr></table>`;

const box = (rows) =>
  `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:0 0 20px;background:#f7f7f7;border-left:3px solid ${RED};border-radius:4px;"><tr><td style="padding:18px 20px;">${rows
    .map(
      ([k, v]) =>
        `<p style="margin:0 0 6px;font-family:${FONT};font-size:15px;line-height:1.5;color:${NAVY};"><strong>${k}</strong> ${v}</p>`,
    )
    .join('')}</td></tr></table>`;

const RENDER = { p, h, small, list, btn, box };

function shell(subject, blocks) {
  const body = blocks
    .map((b) => {
      const [kind, value] = Object.entries(b)[0];
      return RENDER[kind](value);
    })
    .join('\n        ');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#f0f0f0;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f0f0f0;">
  <tr><td align="center" style="padding:24px 12px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border-radius:10px;overflow:hidden;">

      <tr><td style="background:${NAVY};padding:22px;text-align:center;">
        <span style="font-family:${FONT};font-size:15px;font-weight:800;letter-spacing:1.5px;text-transform:uppercase;color:#ffffff;">DMG Agency Core</span>
      </td></tr>

      <tr><td style="padding:32px 28px 12px;">
        ${body}
      </td></tr>

      <tr><td style="padding:20px 28px 28px;border-top:1px solid #eee;">
        <p style="margin:0;font-family:${FONT};font-size:12px;line-height:1.6;color:#999;">
          DMG Agency Core LLC<br>
          <a href="{{location.website}}" style="color:#999;">dmgagencycore.com</a> &nbsp;&middot;&nbsp;
          <a href="{{unsubscribe_link}}" style="color:#999;">Unsubscribe</a>
        </p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}

// --- content ---------------------------------------------------------------

const NAME = '{{contact.first_name}}';
const JOIN = '[JOIN LINK]';
const CAL = '[CALENDAR LINK]';
const REPLAY = '[REPLAY LINK]';
const BOOK = '[BOOKING LINK]';
const MEET = '[MEETING LINK]';
const INTAKE = '[INTAKE FORM LINK]';

const emails = [
  {
    file: '01-immediate-youre-in',
    subject: "You're in — here's your seat for the Trucking Business Masterclass",
    blocks: [
      { p: `${NAME},` },
      { p: 'Your seat is confirmed.' },
      {
        box: [
          ['When:', 'Saturday, August 15, 2026'],
          ['Time:', '2:00 PM Eastern / 11:00 AM Pacific'],
          ['Length:', '60 minutes, plus live Q&amp;A'],
        ],
      },
      { btn: { text: 'Add to my calendar', url: CAL } },
      { small: `Your join link: <a href="${JOIN}" style="color:${RED};">${JOIN}</a>` },
      { h: "What we're covering" },
      {
        list: [
          "How to start a trucking business the right way, so you're not unwinding expensive mistakes six months in",
          'The errors I watch new carriers make every single week',
          'What actually separates a profitable carrier from a busy one',
          'The framework we use with every client: Launch, Operate, Generate Revenue, Protect, Grow',
        ],
      },
      { h: 'One thing worth saying plainly' },
      { p: 'Come live if you can.' },
      {
        p: 'The recording never covers everything. The Q&amp;A at the end is where people ask the specific question about their own authority, their own lane, their own numbers — and that part is not in any replay.',
      },
      { p: 'See you Saturday.' },
    ],
  },
  {
    file: '02-t-minus-3-days',
    subject: 'Why most trucking businesses fail in their first year',
    blocks: [
      { p: `${NAME},` },
      { p: 'Three days until we go live. Here is a piece of it early.' },
      {
        p: "Most new carriers don't fail because rates are bad or fuel is expensive. They fail because of decisions made before the first load ever moved.",
      },
      { h: 'The pattern' },
      {
        p: 'The LLC gets filed in the wrong state, or filed correctly but never maintained. Authority goes active before there is a single broker packet ready. Insurance is bought on price instead of coverage. And nobody calculated cost per mile, so every load feels profitable right up until the quarter closes and it was not.',
      },
      {
        p: 'None of that shows up as a problem in month one. It shows up in month seven, when there is no cash to fix it.',
      },
      {
        p: "The fix isn't complicated. It's sequence. Do the right things in the right order and most of these never become problems at all.",
      },
      { p: 'That sequence is what Saturday is about.' },
      { btn: { text: 'Join Saturday, 2PM ET', url: JOIN } },
    ],
  },
  {
    file: '03-t-minus-1-day',
    subject: 'Tomorrow — your trucking business roadmap',
    blocks: [
      { p: `${NAME},` },
      { p: 'Tomorrow.' },
      {
        box: [
          ['When:', 'Saturday, August 15'],
          ['Time:', '2:00 PM Eastern / 11:00 AM Pacific'],
        ],
      },
      { h: "What you're walking away with" },
      {
        list: [
          'The correct order to launch — LLC, EIN, authority, insurance, BOC-3 — and what breaks when you do it out of sequence',
          'The mistakes that quietly cost new carriers thousands, and how to spot them before they cost you',
          'How to know your real cost per mile, so you stop hauling loads that lose money',
          'The full Launch, Operate, Generate Revenue, Protect, Grow framework',
        ],
      },
      { h: 'Two things that will make tomorrow worth more' },
      {
        p: 'Come with your single biggest question ready. We do live Q&amp;A at the end, and specific questions get specific answers.',
      },
      {
        p: 'And join from somewhere you can actually take notes. This is not a session to half-watch while doing something else.',
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
      { p: '<strong>2:00 PM Eastern / 11:00 AM Pacific</strong>' },
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
        p: 'If you only have ten minutes, skip to the section on cost per mile. That one changes how people price freight the same week they watch it.',
      },
      { h: 'Or just talk it through' },
      {
        p: "If you'd rather skip an hour of video, that works too. We do free 30-minute strategy calls — your business, your numbers, no pitch.",
      },
      { btn: { text: 'Book a free strategy call', url: BOOK } },
    ],
  },
  {
    file: '07-day1-attended',
    subject: 'Thank you for being there',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Thanks for showing up live on a Saturday. That says something about how serious you are.',
      },
      { btn: { text: 'Watch the replay', url: REPLAY } },
      { h: 'The three things to act on' },
      {
        list: [
          '<strong>Sequence beats speed.</strong> Filing in the right order costs the same and saves months of unwinding.',
          '<strong>Know your cost per mile</strong> before you accept another load. Most carriers are guessing, and guessing is why margins vanish.',
          '<strong>Compliance is cheaper to build than to fix.</strong> Every time.',
        ],
      },
      { h: "What's next" },
      {
        p: 'I offered a free 30-minute strategy session at the end. That offer is real and it is open.',
      },
      {
        p: 'Your business, your numbers, and a straight answer about where you actually stand. No pitch, no obligation.',
      },
      { btn: { text: 'Book my strategy session', url: BOOK } },
    ],
  },
  {
    file: '08-day3-mistakes',
    subject: 'The startup mistakes I see every single week',
    blocks: [
      { p: `${NAME},` },
      {
        p: "I have this conversation most weeks. The details change, the mistakes don't.",
      },
      { h: 'Filing the LLC in the wrong state' },
      {
        p: 'Someone reads that Wyoming or Delaware is better, files there, then discovers they operate in Florida and now owe foreign qualification, a registered agent, and two sets of fees. File where you operate.',
      },
      { h: 'Getting authority active with no packet ready' },
      {
        p: "Authority goes live, the clock starts, and there's no insurance certificate, no W-9, no notice of assignment. Weeks of paying for authority that can't move freight.",
      },
      { h: 'Buying insurance on price' },
      {
        p: "The cheap policy has exclusions you won't read until you need them. The gap between cheap and correct is smaller than the gap between correct and one uncovered claim.",
      },
      { h: 'No idea what a mile costs' },
      {
        p: "The one that quietly kills companies. You cannot price freight you can't cost. Everything looks profitable until it isn't.",
      },
      { p: 'Any of these sound familiar?' },
      { btn: { text: 'Book a free strategy call', url: BOOK } },
    ],
  },
  {
    file: '09-day5-spend',
    subject: 'Before you spend another dollar on your trucking business',
    blocks: [
      { p: `${NAME},` },
      { p: 'Most people starting out spend in exactly the wrong order.' },
      {
        p: 'The truck comes first, because the truck feels like the business. Then insurance, because it is required. Then, eventually, whatever is left goes to the structure that was supposed to protect all of it.',
      },
      { p: '<strong>Backwards.</strong>' },
      { h: 'What actually comes first' },
      {
        p: 'The legal structure. LLC, EIN, and the compliance filings that make you a real operating business instead of a person with a truck and exposure.',
      },
      {
        p: 'It is the cheapest part of the whole thing. It is also the only part that protects everything else — and the only part that gets dramatically more expensive to fix later than to do correctly now.',
      },
      {
        p: 'Fixing a badly formed entity after you have trucks, drivers, and contracts costs multiples of doing it right on day one. Sometimes it means dissolving and starting over.',
      },
      { h: 'The honest test' },
      {
        p: 'If your business took a serious hit tomorrow — an accident, a claim, a customer who does not pay — is your personal house separate from it?',
      },
      {
        p: 'If you cannot answer that with certainty, that is the thing to fix before anything else.',
      },
      { btn: { text: '30 minutes, free, no pitch', url: BOOK } },
    ],
  },
  {
    file: '10-day7-story',
    subject: 'How one small decision saved this carrier thousands',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'A carrier came to us running three trucks. Busy constantly. Barely profitable, and he could not work out why.',
      },
      {
        p: 'He was pricing off what other people said rates should be. Never calculated his own cost per mile.',
      },
      {
        p: 'We ran the numbers. His true cost — fuel, maintenance, insurance, payments, driver pay, and the overhead nobody counts — was <strong>34 cents higher per mile</strong> than he thought.',
      },
      {
        p: 'He had been running one lane for eight months. Felt fine. It was losing money on every load.',
      },
      {
        p: 'He dropped the lane, repriced two others, kept the same trucks and the same drivers, and his margin moved within a quarter.',
      },
      {
        p: 'Nothing about his operation changed. He just knew a number he had not known before.',
      },
      { h: 'The point' },
      {
        p: 'The difference between a busy trucking company and a profitable one is usually not more freight. It is knowing which freight to say no to.',
      },
      {
        p: 'That is the first thing we look at on a strategy call. Bring your numbers, or bring your best guess — either works.',
      },
      { btn: { text: 'Book my call', url: BOOK } },
    ],
  },
  {
    file: '11-day10-ready',
    subject: 'Is your trucking business actually ready?',
    blocks: [
      { p: `${NAME},` },
      { p: "Quick self-check. Answer honestly — nobody's watching." },
      {
        list: [
          'Is your LLC filed in the state where you actually operate, and current on its annual filings?',
          'Do you know your cost per mile to within a few cents?',
          'If a broker asked for your packet right now, could you send it in under ten minutes?',
          'Does your insurance cover what you actually haul, or what the cheapest quote covered?',
          'If a claim hit tomorrow, is your personal property genuinely separate from the business?',
          'Do you know which of your current lanes is the least profitable?',
        ],
      },
      { p: 'Four or more solid yeses and you are in better shape than most.' },
      {
        p: 'Fewer than four, and none of it is a crisis — but they compound. Every one of these gets more expensive the longer it sits.',
      },
      { h: 'I hear these a lot' },
      {
        p: "<strong>&ldquo;I'll sort it once I'm making more money.&rdquo;</strong><br>The structure is what lets you make more money safely. It's backwards.",
      },
      {
        p: "<strong>&ldquo;It's too late, I've already started.&rdquo;</strong><br>Almost never true. Most of this is fixable. It's just cheaper the sooner you do it.",
      },
      {
        p: "<strong>&ldquo;I can't afford it right now.&rdquo;</strong><br>That's exactly why the call is free. Thirty minutes, and you'll know where you stand.",
      },
      { btn: { text: 'Book my free session', url: BOOK } },
    ],
  },
  {
    file: '12-day14-faq',
    subject: 'The questions I get asked most',
    blocks: [
      { p: `${NAME},` },
      { p: 'The ones that come up every week.' },
      { h: 'Do I need an LLC, or can I operate as a sole proprietor?' },
      {
        p: "You can operate as a sole proprietor. It means your personal assets and your business are the same thing legally. In an industry where one accident can produce a claim larger than most people's net worth, that's a hard risk to justify against the cost of forming properly.",
      },
      { h: 'Which state should I file in?' },
      {
        p: 'Where you operate. The Wyoming and Delaware advice circulating online is aimed at businesses with a very different profile. For a carrier, filing out of state usually means paying twice and complying twice.',
      },
      { h: 'How long until I can haul?' },
      {
        p: 'Authority typically takes a few weeks. What determines your actual start date is whether insurance, BOC-3, and your broker packet are ready when it activates. People who prepare in parallel start hauling immediately. People who do it in sequence pay for idle authority.',
      },
      { h: 'Do I need my own authority, or should I lease on?' },
      {
        p: 'Depends on capital, risk tolerance, and whether you want to build an asset or earn income now. Both are legitimate. They are very different businesses.',
      },
      { h: 'What does it cost to start properly?' },
      {
        p: 'Our full setup is <strong>$997</strong> — LLC formation, EIN, BOI filing, BOC-3. What it costs to start improperly is a much larger and much less predictable number.',
      },
      { btn: { text: 'Ask your question on a call', url: BOOK } },
    ],
  },
  {
    file: '13-day21-final',
    subject: 'Closing this out',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Three weeks ago you registered for the masterclass. I have sent a fair amount since then, so this is the last one on it.',
      },
      {
        p: 'The free strategy session is still open. Thirty minutes, your business, straight answers about where you stand and what to fix first. No pitch — if we are not a fit, I will tell you and point you somewhere useful.',
      },
      { btn: { text: 'Book my strategy session', url: BOOK } },
      {
        p: 'If the timing is not right, that is genuinely fine. Nothing here expires, and you know where to find us.',
      },
      { h: 'One last thing' },
      {
        p: 'The carriers who make it are not the ones who started with the most money or the best truck. They are the ones who got the boring parts right early — structure, numbers, compliance — so that when the good opportunities came, they were in a position to take them.',
      },
      { p: 'Good luck out there.' },
    ],
  },
  {
    file: '14-booked-confirmation',
    subject: 'Your strategy session is confirmed',
    blocks: [
      { p: `${NAME},` },
      { box: [['Confirmed for:', '{{appointment.start_time}}']] },
      { p: 'The calendar invite with the meeting link is attached.' },
      { h: 'Before we talk' },
      {
        p: 'Two minutes on this, so I can come prepared instead of spending our first ten minutes on background.',
      },
      { btn: { text: 'Complete the intake form', url: INTAKE } },
      { h: 'What to expect' },
      {
        p: 'Thirty minutes. I will ask about your situation, tell you honestly where the gaps are, and give you a straight recommendation on what to fix first.',
      },
      { p: 'If we are a fit to help, I will say so. If not, I will say that too.' },
    ],
  },
  {
    file: '15-booked-24h',
    subject: 'Tomorrow — your strategy session',
    blocks: [
      { p: `${NAME},` },
      { p: 'Our call is tomorrow at <strong>{{appointment.start_time}}</strong>.' },
      { btn: { text: 'Join the call', url: MEET } },
      {
        p: `If you haven't done the intake form yet, now's the time — it makes a real difference to how useful the thirty minutes are. <a href="${INTAKE}" style="color:${RED};">Complete it here</a>.`,
      },
      {
        small:
          'Have your rough numbers handy if you are already operating. Best guesses are fine.',
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
      { h: 'What we covered' },
      { p: '[Filled in by whoever ran the call]' },
      { h: "What I'd do first" },
      { p: '[Specific recommendation]' },
      { p: 'If you want us to handle it, here is the link to get moving.' },
      { btn: { text: 'Get started', url: '[OFFER LINK]' } },
      {
        small:
          'And if you would rather do it yourself, everything I described is doable on your own — take the notes and run with it. The offer stands either way.',
      },
    ],
  },
];

// --- write -----------------------------------------------------------------

const index = [];

for (const e of emails) {
  writeFileSync(join(OUT, `${e.file}.html`), shell(e.subject, e.blocks), 'utf8');
  index.push(`| \`${e.file}.html\` | ${e.subject} |`);
}

writeFileSync(
  join(OUT, 'README.md'),
  `# Webinar emails

Generated by \`scripts/build-emails.mjs\`. Do not edit these files directly —
edit the script and re-run \`node scripts/build-emails.mjs\`.

## How to load one into GHL

1. Marketing → Emails → Templates → **New** → **Blank/Code**, template type **HTML**
2. Open the \`.html\` file, select all, copy
3. Paste into the code editor, save
4. Set the subject line from the table below

## Placeholders to replace

\`[JOIN LINK]\` \`[CALENDAR LINK]\` \`[REPLAY LINK]\` \`[BOOKING LINK]\`
\`[MEETING LINK]\` \`[INTAKE FORM LINK]\` \`[RESCHEDULE LINK]\` \`[OFFER LINK]\`

Merge fields (\`{{contact.first_name}}\`, \`{{appointment.start_time}}\`) are
already GHL syntax and need no change.

## Subject lines

| File | Subject |
| --- | --- |
${index.join('\n')}
`,
  'utf8',
);

console.log(`Wrote ${emails.length} emails + README to emails/`);
