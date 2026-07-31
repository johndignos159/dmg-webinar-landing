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
// 2. HOW THE DATE/TIME READS ON THE PAGE
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

// ---------------------------------------------------------------------------
// Calendar links
//
// Both formats are generated from WEBINAR_DATE_ISO above, so changing the date
// in one place updates the countdown, the on-page text, and both calendar
// buttons together.
// ---------------------------------------------------------------------------

/** How long the session runs, in minutes. */
export const WEBINAR_DURATION_MINUTES = 60;

export const WEBINAR_TITLE = 'DMG Agency Core — Free Trucking Masterclass';
export const WEBINAR_SUMMARY =
  'How to build a stronger trucking business and scale 3X in 12 months.';

const WEBINAR_END = new Date(
  WEBINAR_TIMESTAMP + WEBINAR_DURATION_MINUTES * 60_000,
);

/** Calendar formats want UTC as YYYYMMDDTHHMMSSZ with no punctuation. */
function toCalendarStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

const START_STAMP = toCalendarStamp(WEBINAR_DATE);
const END_STAMP = toCalendarStamp(WEBINAR_END);

/** Google Calendar "add event" URL. Covers most attendees. */
export const GOOGLE_CALENDAR_URL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent(WEBINAR_TITLE)}` +
  `&dates=${START_STAMP}/${END_STAMP}` +
  `&details=${encodeURIComponent(WEBINAR_SUMMARY)}` +
  `&location=${encodeURIComponent('Online')}`;

// Apple Calendar and Outlook want a downloadable .ics file. Serving it as a
// data URI avoids needing a route handler, since the content is fixed at build
// time. CRLF line endings are required by the spec — plain \n breaks Outlook.
const ICS_CONTENT = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//DMG Agency Core//Webinar//EN',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'BEGIN:VEVENT',
  `UID:webinar-${START_STAMP}@dmgagencycore.com`,
  `DTSTAMP:${START_STAMP}`,
  `DTSTART:${START_STAMP}`,
  `DTEND:${END_STAMP}`,
  `SUMMARY:${WEBINAR_TITLE}`,
  `DESCRIPTION:${WEBINAR_SUMMARY}`,
  'LOCATION:Online',
  'STATUS:CONFIRMED',
  'BEGIN:VALARM',
  'TRIGGER:-PT1H',
  'ACTION:DISPLAY',
  'DESCRIPTION:Masterclass starts in 1 hour',
  'END:VALARM',
  'END:VEVENT',
  'END:VCALENDAR',
].join('\r\n');

export const ICS_DATA_URI = `data:text/calendar;charset=utf-8,${encodeURIComponent(ICS_CONTENT)}`;
