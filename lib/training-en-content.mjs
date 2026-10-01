/**
 * English Group Dispatch Training — page copy.
 *
 * The curriculum mirrors the Spanish training's, which is Cora's own, supplied
 * 2026-09-28. Do not edit these to sound better: all sales are final, so
 * anything promised here and not taught has no refund route and goes to a card
 * dispute instead.
 *
 * ONE DELIBERATE DIFFERENCE FROM THE SPANISH PAGE: there is no language-barrier
 * section. That section exists because it is the objection that stops the
 * Spanish-speaking audience buying. It makes no sense to an English-speaking
 * buyer and would read as padding.
 */

// ---------------------------------------------------------------- DAY ONE ---
export const DAY_1 = {
  title: 'Learn how to do the job',
  intro:
    'Day one is about how dispatching actually works and how to do a dispatcher\u2019s job.',
  items: [
    'How the freight industry works',
    'Load boards and how to find loads',
    'How to read rate confirmations',
    'How to communicate with brokers and carriers',
    'Rate negotiation',
    'Essential documents and processes',
    'How to run a dispatcher\u2019s day to day',
  ],
};

// ---------------------------------------------------------------- DAY TWO ---
export const DAY_2 = {
  title: 'Build your book of clients',
  intro:
    'Day two is about turning what you learned into a business.',
  items: [
    'How to find your first carriers',
    'Strategies for landing clients',
    'How to build a referral network',
    'How to pitch and sell your services',
    'How to organise and grow your dispatch business',
    'How to build relationships so you depend less on load boards',
  ],
};

// The line that sits above both day cards.
export const CURRICULUM_KICKER = '2 days. From zero to your own dispatch business.';

// Who this is for. Answers "is this me?" before the price is mentioned.
export const AUDIENCE = [
  'People who want to get into freight and have no idea where to start',
  'New dispatchers who have started but are improvising their way through it',
  'Truck owners who want to dispatch their own loads instead of paying someone',
  'Anyone who wants to work from home in an industry that never stops',
];

// The objections that stop someone buying.
export const OBJECTIONS = [
  {
    q: 'Do I need previous experience?',
    a: 'No. Day 1 starts from zero. If you have never seen a load board, that is exactly the starting point.',
  },
  {
    q: 'Do I need a truck or a CDL?',
    a: 'Neither. A dispatcher does not drive and does not own the equipment. You work from a computer.',
  },
  {
    q: 'Is the market saturated?',
    a: 'It is a $900 billion industry that never stops moving. There is always room for someone who works with order and answers the phone.',
  },
  {
    q: 'What if I cannot attend live?',
    a: 'The training is live on both days. That is where you can ask about your own situation, and that part cannot be recorded.',
  },
];

// ------------------------------------------------------------- EARNINGS ----
// Cora's own framing, from the promotional graphic she supplied 2026-09-28.
// A prospect deciding on $197 wants to know what they could make, and the
// arithmetic shown step by step answers that far better than "$900 billion
// industry" ever did.
//
// The disclaimer is not optional decoration. An income figure without one is
// exactly what gets an ad rejected and a claim challenged — it travels with
// the number everywhere the number goes.
export const EARNINGS = {
  lead: 'Dispatch 5 trucks and you could make',
  amount: '$2,500',
  period: 'a week',
  sub: 'Learn to build your dispatch business from scratch, start to finish, in two days.',
  steps: [
    { value: '$5,000', label: 'gross per truck per week', op: '\u00d7' },
    { value: '10%', label: 'your dispatch fee', op: '=' },
    { value: '$500', label: 'per truck per week', op: '\u00d7' },
    { value: '5', label: 'trucks dispatched', op: '=' },
    { value: '$2,500', label: 'a week for you', op: null, highlight: true },
  ],
  disclaimer:
    'Example only. Gross varies by equipment and market. This is not a guarantee of income; your results depend on your work.',
};

// The four-point summary. Sits under the arithmetic as a quick answer to
// "what do I actually get". The Spanish version's fourth point is about the
// language barrier; here it is the negotiation skill that earns the fee.
export const BENEFITS = [
  'Dispatch fundamentals',
  'How to land clients',
  'Grow and scale your business',
  'Negotiate rates that hold',
];
