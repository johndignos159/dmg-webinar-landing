// ============================================================================
// ENGLISH GROUP DISPATCH TRAINING — the only file you edit to run a new one.
//
// Sibling of lib/training-config.mjs, which runs the Spanish training. The two
// are deliberately separate files rather than one file with a language switch:
// they have different dates, different Zoom rooms, different GHL forms and
// different buyers, and a shared file is how one gets edited and the other
// silently changes.
//
// Imported by the Next.js pages AND by the email generator, so a change here
// moves the page, the countdown and all ten emails together.
// ============================================================================

// ---------------------------------------------------------------------------
// THE TWO SESSIONS
//
// Supplied by John 2026-10-01. Same shape as the Spanish training — NOT
// symmetrical:
//
//   · different start times   — 11:00 AM on day 1, 3:00 PM on day 2
//   · DIFFERENT ZOOM ROOMS    — a separate meeting id and passcode each day
//
// Anyone who saves day 1's link and turns up with it on day 2 lands in an
// empty room, having paid $197.
//
// Both days fall after daylight saving ends on 1 November, so both are EST
// (-05:00). The Spanish training straddled that boundary and needed two
// different offsets; this one does not, but the per-session offset is kept so
// the two configs stay the same shape.
//
// SESSION LENGTH: three hours each, confirmed by John 2026-10-01 —
// 11:00 AM–2:00 PM and 3:00 PM–6:00 PM, matching the Spanish sessions. This is
// printed on the landing page and in the emails, and is what someone plans
// their weekend around.
// ---------------------------------------------------------------------------

export const SESSION_1 = {
  iso: '2026-11-14',
  offset: '-05:00', // EST
  start: '11:00 AM',
  end: '2:00 PM',
  meetingUrl:
    'https://us06web.zoom.us/j/81717580026?pwd=OCVn5paUWUeuERrlVXxZUL00sk16Cn.1',
  meetingId: '817 1758 0026',
  passcode: '985204',
};

export const SESSION_2 = {
  iso: '2026-11-15',
  offset: '-05:00', // EST
  start: '3:00 PM',
  end: '6:00 PM',
  meetingUrl:
    'https://us06web.zoom.us/j/85175792698?pwd=NWKTwaElNbnKrCOCF7HnRjBDOfjOgt.1',
  meetingId: '851 7579 2698',
  passcode: '651030',
};

export const TIMEZONE_LABEL = 'ET';

// ---------------------------------------------------------------------------
// Derived display strings. en-US, unlike the Spanish config's es-US, title
// cases weekday and month names.
// ---------------------------------------------------------------------------
const FMT_FULL = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const FMT_SHORT = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  weekday: 'long',
  day: 'numeric',
  month: 'long',
});

const noon = (s) => new Date(`${s.iso}T12:00:00${s.offset}`);

export const DAY_1_DISPLAY = FMT_FULL.format(noon(SESSION_1));
export const DAY_2_DISPLAY = FMT_FULL.format(noon(SESSION_2));
export const DAY_1_SHORT = FMT_SHORT.format(noon(SESSION_1));
export const DAY_2_SHORT = FMT_SHORT.format(noon(SESSION_2));

/** e.g. "11:00 AM – 2:00 PM ET" — falls back to the start alone if an end
 *  time is ever missing, rather than printing a dangling dash. */
const range = (s) =>
  s.end ? `${s.start} – ${s.end} ${TIMEZONE_LABEL}` : `${s.start} ${TIMEZONE_LABEL}`;

export const DAY_1_TIME = range(SESSION_1);
export const DAY_2_TIME = range(SESSION_2);

/** Just the start, for subject lines where the range is too long. */
export const DAY_1_START = `${SESSION_1.start} ${TIMEZONE_LABEL}`;
export const DAY_2_START = `${SESSION_2.start} ${TIMEZONE_LABEL}`;

function to24h(t) {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(t.trim());
  if (!m) throw new Error(`training-en-config: cannot parse time "${t}"`);
  let h = Number(m[1]) % 12;
  if (/pm/i.test(m[3])) h += 12;
  return `${String(h).padStart(2, '0')}:${m[2]}:00`;
}

/** What the countdown counts to: day 1, at its own start time. */
export const TRAINING_TIMESTAMP = new Date(
  `${SESSION_1.iso}T${to24h(SESSION_1.start)}${SESSION_1.offset}`,
).getTime();

// ---------------------------------------------------------------------------
// PRICE — must match the GHL product exactly.
// ---------------------------------------------------------------------------
export const PRICE = '197';
export const CURRENCY = 'USD';

// ---------------------------------------------------------------------------
// LINKS
//
// Both of these are EMPTY until you create them in GoHighLevel — see
// TRAINING-EN-FUNNEL.md §1. The page is built to degrade safely while they
// are: the registration section shows a "registration opens soon" panel
// instead of an iframe, and the email generator refuses to build rather than
// send a receipt with a dead payment link in it.
// ---------------------------------------------------------------------------

// English registration form. Its "on submit" redirect points at CHECKOUT_URL.
export const REGISTRATION_FORM_ID = 'MGW9yNhDGM7RE9KEBpfN';

// GHL payment link for the $197 English product. fastpaydirect.com is
// GoHighLevel's white-label payment domain, not a third party.
export const CHECKOUT_URL = 'https://link.fastpaydirect.com/payment-link/6abe9ce5c0e70c7fefb71d76';

export const LANDING_URL = 'https://training.dmgagencycore.com';
export const CONFIRM_URL = 'https://training.dmgagencycore.com/confirmed';
export const SUPPORT_EMAIL = 'admin@dmgagencycore.com';
export const BUSINESS = 'DMG Agency Core LLC';

// ---------------------------------------------------------------------------
// POLICY — all sales final, matching the Spanish training.
// Stated on the landing page and again at checkout. A buyer surprised by this
// later files a card dispute, which costs more than the refund would have.
// ---------------------------------------------------------------------------
export const REFUND_POLICY =
  'All sales are final. No refunds are offered once payment is complete.';
