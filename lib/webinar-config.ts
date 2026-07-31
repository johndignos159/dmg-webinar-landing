// ============================================================================
// WEBINAR CONFIG — the only file you edit to run a new webinar.
// The countdown timer, the Date/Time block, and both REGISTER buttons all
// read from here, so they can never drift out of sync.
// ============================================================================

// ---------------------------------------------------------------------------
// 1. WHEN IS THE WEBINAR?
//
// Format: YYYY-MM-DDTHH:MM:SS followed by the Eastern Time offset.
// Use a 24-hour clock: 2:00 PM = 14:00, 10:00 AM = 10:00, 7:30 PM = 19:30.
//
// WHICH OFFSET DO I USE? Eastern Time changes twice a year:
//   -04:00  (EDT)  →  mid-March through early November   ← summer
//   -05:00  (EST)  →  early November through mid-March    ← winter
//
// Aug 15 2026 falls in the summer window, so it is -04:00.
// Get this wrong and the countdown hits zero an hour off for every viewer.
// ---------------------------------------------------------------------------
export const WEBINAR_DATE_ISO = '2026-08-15T14:00:00-04:00';

// ---------------------------------------------------------------------------
// 2. WHERE DOES THE REGISTER BUTTON GO?
// Paste your Meta ad / lead form URL. Include the https://
// Both REGISTER buttons on the page use this.
// ---------------------------------------------------------------------------
export const REGISTER_URL = 'https://www.facebook.com/';

// ---------------------------------------------------------------------------
// 3. HOW THE DATE/TIME READS ON THE PAGE
// Change the label if you ever run a webinar outside Eastern Time.
// ---------------------------------------------------------------------------
export const TIMEZONE_LABEL = 'EST';

// ============================================================================
// Below this line is derived automatically — you should not need to edit it.
// ============================================================================

const WEBINAR_DATE = new Date(WEBINAR_DATE_ISO);

// Both formatters pin an explicit timeZone so the server-rendered HTML and the
// browser produce identical text. Without it, the output would follow whatever
// timezone the machine happens to be in and React would flag a hydration
// mismatch on any visitor outside Eastern Time.
const DATE_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  weekday: 'long',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

const TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

/** e.g. "Saturday, August 15, 2026" */
export const WEBINAR_DATE_DISPLAY = DATE_FORMATTER.format(WEBINAR_DATE);

/** e.g. "2:00 PM EST" */
export const WEBINAR_TIME_DISPLAY = `${TIME_FORMATTER.format(WEBINAR_DATE)} ${TIMEZONE_LABEL}`;

/** Epoch milliseconds — what the countdown counts down to. */
export const WEBINAR_TIMESTAMP = WEBINAR_DATE.getTime();
