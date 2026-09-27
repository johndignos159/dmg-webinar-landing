// ============================================================================
// SPANISH GROUP DISPATCH TRAINING — the only file you edit to run a new one.
//
// Imported by the Next.js pages AND by the email generator, so a date changed
// here changes the page, the countdown and all nine emails together. That is
// deliberate: the webinar taught us that two copies of a date drift within a
// week, and the copy nobody remembers is the one that reaches a customer.
//
// .mjs rather than .ts so plain `node` can import it too. tsconfig has
// allowJs, so the pages import it with no extra tooling.
// ============================================================================

// ---------------------------------------------------------------------------
// WHEN
//
// Saturday 31 October and Sunday 1 November 2026 — a weekend, so attendees do
// not need time off work.
//
// DAYLIGHT SAVING ENDS AT 2 AM ON 1 NOVEMBER, between day 1 and day 2. Day 1
// is EDT (-04:00), day 2 is EST (-05:00). "10 AM ET" means the same wall clock
// both days, so attendees are fine — but every absolute timestamp below must
// use the correct offset for its own day or the countdown and any calendar
// file land an hour out on day 2.
// ---------------------------------------------------------------------------
export const DAY_1_ISO = '2026-10-31';
export const DAY_2_ISO = '2026-11-01';
export const DAY_1_OFFSET = '-04:00'; // EDT
export const DAY_2_OFFSET = '-05:00'; // EST — DST has ended by day 2

// Confirmed by Cora 2026-09-26: 11:00 AM Eastern, both days.
//
// END_TIME is still unknown. The pages handle start-only and print
// "11:00 AM ET" rather than inventing a finish time — a buyer who plans their
// Saturday around a guessed end time and is wrong has a worse experience than
// one who was simply not told yet.
//
// The Zoom meeting recurs daily at 11:00 AM Eastern, so Zoom shifts it with
// the DST change automatically and both days are 11:00 AM wall clock.
export const TIMES_CONFIRMED = true;
export const START_TIME = '11:00 AM';
export const END_TIME = ''; // fill in when Cora confirms the finish time
export const TIMEZONE_LABEL = 'ET';

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

// es-US lowercases weekday and month names. That is correct Spanish — do not
// "fix" it to title case.
export const DAY_1_DISPLAY = FMT_FULL.format(new Date(`${DAY_1_ISO}T12:00:00${DAY_1_OFFSET}`));
export const DAY_2_DISPLAY = FMT_FULL.format(new Date(`${DAY_2_ISO}T12:00:00${DAY_2_OFFSET}`));
export const DAY_1_SHORT = FMT_SHORT.format(new Date(`${DAY_1_ISO}T12:00:00${DAY_1_OFFSET}`));
export const DAY_2_SHORT = FMT_SHORT.format(new Date(`${DAY_2_ISO}T12:00:00${DAY_2_OFFSET}`));

// What the countdown counts to: day 1 at the confirmed start time.
const COUNTDOWN_TIME = TIMES_CONFIRMED && START_TIME ? START_TIME : '9:00 AM';
export const TRAINING_TIMESTAMP = new Date(
  `${DAY_1_ISO}T${to24h(COUNTDOWN_TIME)}${DAY_1_OFFSET}`,
).getTime();

function to24h(t) {
  const m = /^(\d{1,2}):(\d{2})\s*(AM|PM)$/i.exec(t.trim());
  if (!m) throw new Error(`training-config: cannot parse time "${t}"`);
  let h = Number(m[1]) % 12;
  if (/pm/i.test(m[3])) h += 12;
  return `${String(h).padStart(2, '0')}:${m[2]}:00`;
}

// ---------------------------------------------------------------------------
// PRICE — must match the GHL product exactly.
// ---------------------------------------------------------------------------
export const PRICE = '197';
export const CURRENCY = 'USD';

// ---------------------------------------------------------------------------
// LINKS
//
// Anything empty below is not yet supplied. The pages check for empty and
// render an honest "coming soon" state rather than a dead link or an iframe
// pointing at nothing.
// ---------------------------------------------------------------------------

// Spanish registration form. Its "on submit" redirect must point at
// CHECKOUT_URL, which is what carries someone from registering to paying.
export const REGISTRATION_FORM_ID = 'arxMryfXfCK31Rj6JrpZ';

// GHL payment link for the $197 product. fastpaydirect.com is GoHighLevel's
// white-label payment domain, not a third party.
export const CHECKOUT_URL =
  'https://link.fastpaydirect.com/payment-link/6ab8697cbaea3cadef54f885';

// A dedicated room, created 2026-09-26 — deliberately NOT the webinar room,
// whose link sits in five webinar emails and would have let any free
// registrant walk into a paid training.
//
// Recurs daily at 11:00 AM Eastern, so the same link works both days and Zoom
// handles the DST change itself.
export const MEETING_URL =
  'https://us06web.zoom.us/j/88927881365?pwd=JYysgAB9Yz0kI8iNHtq6SKaitWZhAP.1';

// Shown alongside the link. The pwd in the URL fills the passcode in
// automatically, but email clients mangle long query strings often enough that
// a paying attendee needs a manual route in.
export const MEETING_ID = '889 2788 1365';
export const MEETING_PASSCODE = '331181';

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
