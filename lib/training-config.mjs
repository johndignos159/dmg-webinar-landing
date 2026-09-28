// ============================================================================
// SPANISH GROUP DISPATCH TRAINING — the only file you edit to run a new one.
//
// Imported by the Next.js pages AND by the email generator, so a change here
// moves the page, the countdown and all ten emails together. .mjs rather than
// .ts so plain `node` can import it too; tsconfig has allowJs, so the pages
// import it with no extra tooling.
// ============================================================================

// ---------------------------------------------------------------------------
// THE TWO SESSIONS
//
// Confirmed by Cora 2026-09-28. These are NOT symmetrical and that is the
// single most important fact in this file:
//
//   · different start times   — 11:00 AM on day 1, 3:00 PM on day 2
//   · DIFFERENT ZOOM ROOMS    — a separate meeting id and passcode each day
//
// Anyone who saves day 1's link and turns up with it on day 2 lands in an
// empty room. Every page and email therefore labels the two rooms explicitly
// rather than saying "the same link both days", which is what the copy said
// while there was only one room.
//
// DAYLIGHT SAVING ENDS AT 2 AM ON 1 NOVEMBER, between the sessions. Day 1 is
// EDT (-04:00) and day 2 is EST (-05:00). The offsets below are per session
// for that reason — a single shared offset would put day 2 an hour out.
// ---------------------------------------------------------------------------

export const SESSION_1 = {
  iso: '2026-10-31',
  offset: '-04:00', // EDT
  start: '11:00 AM',
  end: '2:00 PM',
  meetingUrl:
    'https://us06web.zoom.us/j/88927881365?pwd=JYysgAB9Yz0kI8iNHtq6SKaitWZhAP.1',
  meetingId: '889 2788 1365',
  passcode: '331181',
};

export const SESSION_2 = {
  iso: '2026-11-01',
  offset: '-05:00', // EST — DST has ended by day 2
  start: '3:00 PM',
  end: '6:00 PM',
  meetingUrl:
    'https://us06web.zoom.us/j/83796003919?pwd=1H91x1PKanhFySSvQvWfoTVlXnQyli.1',
  meetingId: '837 9600 3919',
  passcode: '190302',
};

export const TIMEZONE_LABEL = 'ET';

// End times confirmed 2026-09-28 from Cora's promotional graphic: three hours
// each day. Both sessions now print as a range, which is what someone needs to
// decide whether they can give up the Saturday.

// ---------------------------------------------------------------------------
// Derived display strings. es-US lowercases weekday and month names; that is
// correct Spanish, do not "fix" it to title case.
// ---------------------------------------------------------------------------
const FMT_FULL = new Intl.DateTimeFormat('es-US', {
  timeZone: 'America/New_York',
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});
const FMT_SHORT = new Intl.DateTimeFormat('es-US', {
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
  if (!m) throw new Error(`training-config: cannot parse time "${t}"`);
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
// ---------------------------------------------------------------------------

// Spanish registration form. Its "on submit" redirect points at CHECKOUT_URL,
// which is what carries someone from registering to paying.
export const REGISTRATION_FORM_ID = 'arxMryfXfCK31Rj6JrpZ';

// GHL payment link for the $197 product. fastpaydirect.com is GoHighLevel's
// white-label payment domain, not a third party.
export const CHECKOUT_URL =
  'https://link.fastpaydirect.com/payment-link/6ab8697cbaea3cadef54f885';

export const LANDING_URL = 'https://entrenamiento.dmgagencycore.com';
export const CONFIRM_URL = 'https://entrenamiento.dmgagencycore.com/confirmado';
export const SUPPORT_EMAIL = 'admin@dmgagencycore.com';
export const BUSINESS = 'DMG Agency Core LLC';

// ---------------------------------------------------------------------------
// POLICY — all sales final, chosen 2026-09-25.
// Stated on the landing page and again at checkout. A buyer surprised by this
// later files a card dispute, which costs more than the refund would have.
// ---------------------------------------------------------------------------
export const REFUND_POLICY_ES =
  'Todas las ventas son finales. No se ofrecen reembolsos una vez completado el pago.';
