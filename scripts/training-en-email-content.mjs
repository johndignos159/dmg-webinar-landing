/**
 * English Group Dispatch Training — every email, in one file.
 *
 * Two tracks:
 *   PAID      seven emails from payment through the morning of day 2
 *   RECOVERY  three emails over four days for people who registered and did
 *             not pay
 *
 * Everything factual comes from lib/training-en-config.mjs so the emails cannot
 * disagree with the landing page.
 *
 * THE TWO DAYS ARE NOT THE SAME. Different start times, different Zoom rooms.
 * Every email that mentions access prints both, labelled, and the day 2 email
 * leads with the fact that the link changed. Someone who saves day 1's link
 * and turns up with it on day 2 lands in an empty room, and they have paid
 * $197 for the privilege.
 *
 * Sibling of training-email-content.mjs, which is the Spanish set. The recovery
 * track here drops the Spanish version's "my English is not strong" objection,
 * which does not apply to this audience, and replaces it with the one that
 * does: the price.
 */

import {
  SESSION_1,
  SESSION_2,
  DAY_1_DISPLAY,
  DAY_2_DISPLAY,
  DAY_1_SHORT,
  DAY_1_TIME,
  DAY_2_TIME,
  PRICE,
  CHECKOUT_URL,
  LANDING_URL,
  SUPPORT_EMAIL,
  REFUND_POLICY,
} from '../lib/training-en-config.mjs';

export const NAME = '{{contact.first_name}}';

const RED = '#E23B3B';

/**
 * Where the "pay now" buttons point.
 *
 * CHECKOUT_URL is empty until the GHL payment link exists (see
 * TRAINING-EN-FUNNEL.md §1). Until then these fall back to the landing page,
 * which has the registration form on it — a working page rather than a dead
 * button. The generator prints a loud warning while the fallback is in use.
 *
 * Re-run the generator once CHECKOUT_URL is set so the recovery emails link
 * straight to payment instead of asking someone to register a second time.
 */
export const PAY_URL = CHECKOUT_URL || LANDING_URL;
export const USING_FALLBACK_PAY_URL = !CHECKOUT_URL;

// When the two days are. Used wherever an email needs to restate the schedule.
const WHEN_BOX = {
  box: [
    ['Day 1:', `${DAY_1_DISPLAY} — <strong>${DAY_1_TIME}</strong>`],
    ['Day 2:', `${DAY_2_DISPLAY} — <strong>${DAY_2_TIME}</strong>`],
  ],
};

// Access details for one day. Always rendered as a labelled pair so the two
// rooms can never be mistaken for one.
const access = (session, label, time) => ({
  box: [
    [`${label} — ${time}`, `<a href="${session.meetingUrl}" style="color:${RED};">Join on Zoom</a>`],
    ['Meeting ID:', session.meetingId],
    ['Passcode:', session.passcode],
  ],
});

const ACCESS_1 = access(SESSION_1, 'Day 1', DAY_1_TIME);
const ACCESS_2 = access(SESSION_2, 'Day 2', DAY_2_TIME);

const DIFFERENT_LINKS_WARNING = {
  p: '<strong>Important:</strong> each day has its own link and its own start time. Day 1&rsquo;s link will not work on day 2. Save both separately.',
};

export const emails = [
  // ======================================================= PAID TRACK =======
  {
    file: '01-payment-confirmed',
    ghl: 'TRAINING EN - payment confirmed',
    en: "You're in. Both Zoom links, IDs and passcodes, with a warning that the two days differ. What to bring. No refunds.",
    track: 'paid',
    trigger: 'Immediately on payment',
    subject: "You're in — Group Dispatch Training",
    blocks: [
      { p: `${NAME},` },
      { p: 'Your payment went through and your seat is reserved. Welcome.' },
      WHEN_BOX,
      DIFFERENT_LINKS_WARNING,
      { h: 'Your day 1 access' },
      ACCESS_1,
      { h: 'Your day 2 access' },
      ACCESS_2,
      { h: 'What you need' },
      {
        list: [
          'A computer with a stable internet connection',
          'Headphones, if you will be somewhere noisy',
          'Something to take notes with — you will want the negotiation scripts',
        ],
      },
      {
        p: 'You do not need a truck, a CDL, or any previous experience. Day 1 starts from zero.',
      },
      {
        p: `If anything comes up before the training, email us at <a href="mailto:${SUPPORT_EMAIL}" style="color:${RED};">${SUPPORT_EMAIL}</a>.`,
      },
      { small: REFUND_POLICY },
    ],
  },

  {
    file: '02-2-weeks-before',
    ghl: 'TRAINING EN - 2 weeks before',
    en: 'Two weeks out. Calendar nudge, plus go look at a load board to get familiar.',
    track: 'paid',
    trigger: 'Wait until 31/10/2026 10:00 AM',
    subject: 'Two weeks out — here is how to prepare',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Two weeks until your training. Nothing to do yet, just a reminder to get it in your calendar.',
      },
      WHEN_BOX,
      { h: 'One thing you can do now' },
      {
        p: 'Open a free load board and look at how posted loads appear. You do not need to understand any of it yet — just get familiar with the screen.',
      },
      {
        p: 'On day 1 we read that same screen together, and arriving having seen it before makes everything land faster.',
      },
      { btn: { text: 'See the full curriculum', url: LANDING_URL } },
    ],
  },

  {
    file: '03-1-week-before',
    ghl: 'TRAINING EN - 1 week before',
    en: 'One week out. The full list of what day 1 and day 2 each cover.',
    track: 'paid',
    trigger: 'Wait until 07/11/2026 10:00 AM',
    subject: 'One week — here is what we will cover',
    blocks: [
      { p: `${NAME},` },
      { p: 'One week to go. Here is what you will walk away knowing how to do.' },
      { h: 'Day 1 — learn how to do the job' },
      {
        list: [
          'How the freight industry works',
          'Load boards and how to find loads',
          'How to read rate confirmations',
          'How to communicate with brokers and carriers',
          'Rate negotiation',
          'Essential documents and processes',
          'How to run a dispatcher&rsquo;s day to day',
        ],
      },
      { h: 'Day 2 — build your book of clients' },
      {
        list: [
          'How to find your first carriers',
          'Strategies for landing clients',
          'How to build a referral network',
          'How to pitch and sell your services',
          'How to organise and grow your dispatch business',
          'How to build relationships so you depend less on load boards',
        ],
      },
      WHEN_BOX,
      DIFFERENT_LINKS_WARNING,
    ],
  },

  {
    file: '04-3-days-before',
    ghl: 'TRAINING EN - 3 days before',
    en: 'Three days out. Test your Zoom today, not Saturday morning. Both links repeated.',
    track: 'paid',
    trigger: 'Wait until 11/11/2026 10:00 AM',
    subject: 'Three days out — check your links',
    blocks: [
      { p: `${NAME},` },
      { p: 'Three days to go. Good moment for a quick test.' },
      { h: 'Do this today, not on Saturday' },
      {
        list: [
          'Open the day 1 link and confirm Zoom works on your computer',
          'Check your microphone and your headphones',
          'Add both dates to your calendar, each with its own time',
        ],
      },
      DIFFERENT_LINKS_WARNING,
      { h: 'Day 1' },
      ACCESS_1,
      { h: 'Day 2' },
      ACCESS_2,
      {
        p: 'If something does not work, email us now and we will sort it out calmly. At 11 on Saturday there is no time.',
      },
    ],
  },

  {
    file: '05-1-day-before',
    ghl: 'TRAINING EN - 1 day before',
    en: 'Tomorrow. Day 1 link and time, plus come with a specific question for Q&A.',
    track: 'paid',
    trigger: 'Wait until 13/11/2026 5:00 PM',
    subject: 'We start tomorrow',
    blocks: [
      { p: `${NAME},` },
      { p: `Tomorrow, ${DAY_1_SHORT}, at <strong>${DAY_1_TIME}</strong>.` },
      ACCESS_1,
      {
        small:
          'That is the day 1 link. Day 2 uses a different one and we will remind you on Sunday.',
      },
      { h: 'Come with a question' },
      {
        p: 'Both days have live Q&amp;A. The people who get the most out of it are the ones who arrive with something specific they want solved — their situation, their lane, their numbers.',
      },
      { p: 'Think about what yours is and have it ready.' },
      { small: 'Join a few minutes early so you do not miss the start.' },
    ],
  },

  {
    file: '06-day-1-morning',
    ghl: 'TRAINING EN - day 1 morning',
    en: `Today at ${DAY_1_TIME}. Join button, ID, passcode. Bring something to take notes with.`,
    track: 'paid',
    trigger: 'Wait until 14/11/2026 9:00 AM',
    subject: `Today at ${SESSION_1.start} — day 1`,
    blocks: [
      { p: `${NAME},` },
      { p: `Today is the day. We start at <strong>${DAY_1_TIME}</strong>.` },
      { btn: { text: 'Join on Zoom — day 1', url: SESSION_1.meetingUrl } },
      {
        box: [
          ['Meeting ID:', SESSION_1.meetingId],
          ['Passcode:', SESSION_1.passcode],
        ],
      },
      { p: 'Bring something to take notes with. See you shortly.' },
    ],
  },

  {
    file: '07-day-2-morning',
    ghl: 'TRAINING EN - day 2 morning',
    en: `Day 2 today at ${DAY_2_TIME} — leads with the fact that the link AND the time are different from yesterday.`,
    track: 'paid',
    trigger: 'Wait until 15/11/2026 9:00 AM',
    subject: `Day 2 today at ${SESSION_2.start} — new link`,
    blocks: [
      { p: `${NAME},` },
      {
        p: '<strong>Two things change today:</strong> the time and the link. Yesterday&rsquo;s will not let you in.',
      },
      { p: `Today we start at <strong>${DAY_2_TIME}</strong>.` },
      { btn: { text: 'Join on Zoom — day 2', url: SESSION_2.meetingUrl } },
      {
        box: [
          ['Meeting ID:', SESSION_2.meetingId],
          ['Passcode:', SESSION_2.passcode],
        ],
      },
      { h: 'Today is the business side' },
      {
        p: 'How to find your first carriers, how to land clients, and how to build the relationships that get you off the load boards.',
      },
      { p: 'See you shortly.' },
    ],
  },

  // =================================================== RECOVERY TRACK =======
  // Short on purpose: they already understand the offer, what is missing is
  // the decision. A longer sequence reads as pressure and costs unsubscribes.
  {
    file: '08-recovery-1-hour',
    ghl: 'TRAINING EN - recovery 1 hour',
    en: 'Your seat is not reserved — payment did not complete. Finish it here.',
    track: 'recovery',
    trigger: 'Wait 1 hour after registering',
    subject: 'Your seat is not reserved yet',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'You started registering for the Group Dispatch Training, but the payment did not go through — so your seat is not held yet.',
      },
      {
        p: 'If it was a card problem or you simply ran out of time, you can finish it here:',
      },
      { btn: { text: `Complete my payment — $${PRICE}`, url: PAY_URL } },
      WHEN_BOX,
      {
        small: `Trouble with the payment? Email us at <a href="mailto:${SUPPORT_EMAIL}" style="color:${RED};">${SUPPORT_EMAIL}</a> and we will sort it out.`,
      },
    ],
  },

  {
    file: '09-recovery-day-2',
    ghl: 'TRAINING EN - recovery day 2',
    en: 'Answers four objections: no experience, no truck or CDL, the price, cannot attend.',
    track: 'recovery',
    trigger: 'Wait 2 days',
    subject: 'Still deciding?',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'You registered a couple of days ago and did not complete the payment. Usually it comes down to one of these.',
      },
      { h: '"I have no experience"' },
      {
        p: 'Day 1 starts from zero. If you have never seen a load board, that is exactly the starting point.',
      },
      { h: '"I do not have a truck or a CDL"' },
      {
        p: 'You need neither. A dispatcher does not drive and does not own the equipment — you work from a computer.',
      },
      { h: '"$197 is a lot right now"' },
      {
        p: 'It is one payment, and it is roughly what a 10% dispatch fee earns you from a single truck in a fortnight. Day 2 is entirely about getting that first truck.',
      },
      { h: '"I am not sure I can attend"' },
      {
        p: 'It runs across a weekend, Saturday and Sunday, precisely so you do not have to take time off work.',
      },
      { btn: { text: `Reserve my seat — $${PRICE}`, url: PAY_URL } },
      WHEN_BOX,
    ],
  },

  {
    file: '10-recovery-day-4',
    ghl: 'TRAINING EN - recovery day 4',
    en: 'Last email about this training. Limited seats. If it is a no, that is fine.',
    track: 'recovery',
    trigger: 'Wait 2 more days (day 4)',
    subject: 'Last note about your seat',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'This is the last email we will send about this training. We do not want to fill your inbox.',
      },
      {
        p: 'The group is limited and seats are filling. If you still want it, now is the moment.',
      },
      { btn: { text: `Reserve my seat — $${PRICE}`, url: PAY_URL } },
      WHEN_BOX,
      {
        p: 'And if you have decided it is not for you right now, that is completely fine. We will not write to you about this again.',
      },
      { small: REFUND_POLICY },
    ],
  },
];
