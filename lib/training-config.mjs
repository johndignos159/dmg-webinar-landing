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

// Times are unset until Cora confirms them. While TIMES_CONFIRMED is false the
// pages print "Horario exacto por correo" instead of a time. We never ship a
// bracketed placeholder into anything a customer sees — [MEETING LINK] went
// out as literal text once and that is the whole reason for this flag.
export const TIMES_CONFIRMED = false;
export const START_TIME = ''; // e.g. '10:00 AM'
export const END_TIME = ''; // e.g. '2:00 PM'
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

// What the countdown counts to. Without a confirmed start time it aims at 9 AM
// ET on day 1 — early enough that the clock never reads zero while the page
// still says the training is upcoming.
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

// GHL form that captures the registration. Must be a NEW Spanish form — not
// the webinar form. Its redirect points at CHECKOUT_URL.
export const REGISTRATION_FORM_ID = '';

// GHL product checkout page, generated when the $197 product is saved.
export const CHECKOUT_URL = '';

// The room attendees join, both days.
//
// CAUTION: this is currently the same room as the free webinar, which is
// already printed in five webinar emails and on the confirmation page. Every
// webinar registrant can therefore walk into a paid training. See the note in
// SPANISH-TRAINING-FUNNEL.md before launch.
export const MEETING_URL = 'https://us05web.zoom.us/j/81236507956';

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
