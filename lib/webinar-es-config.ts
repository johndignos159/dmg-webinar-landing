// ============================================================================
// SPANISH WEBINAR CONFIG — the only file you edit to run the Spanish webinar.
// Same masterclass as the English one (lib/webinar-config.ts), presented in
// Spanish. /es and /es/confirmado read everything from here.
// ============================================================================

// ---------------------------------------------------------------------------
// 1. WHEN IS IT? Eastern Time, 24-hour clock.
//   -04:00 (EDT) mid-March to early November · -05:00 (EST) the rest of the year
// Nov 18 2026 is after DST ends (Nov 1), so -05:00.
// ---------------------------------------------------------------------------
export const WEBINAR_ES_DATE_ISO = '2026-11-18T18:00:00-05:00';

/** How long the session runs, in minutes. Same deck as the English webinar. */
export const WEBINAR_ES_DURATION_MINUTES = 45;

// ---------------------------------------------------------------------------
// 2. ZOOM — Cora's room for Nov 18 (sent Nov 5). Shown on /es/confirmado and
// used in every reminder email.
// ---------------------------------------------------------------------------
export const JOIN_URL_ES =
  'https://us06web.zoom.us/j/89680364902?pwd=PDdah07kP1GH8RBttmvv3kY2ZhJP1b.1';
export const ZOOM_MEETING_ID_ES = '896 8036 4902';
export const ZOOM_PASSCODE_ES = '682537';

// ---------------------------------------------------------------------------
// 3. GHL REGISTRATION FORM — the Spanish copy of "Webinar Registration".
// Until it is set, the page shows "Inscripciones abren pronto" instead of an
// iframe: an empty id loads GHL's 404, which reads as a broken page.
// After submit, the form must redirect to /es/confirmado.
// ---------------------------------------------------------------------------
export const REGISTRATION_FORM_ID_ES = 'Ri94L9ntWuYf3eXl96rU';

/** Taken from data-height in the embed code GHL generates for the form. */
export const REGISTRATION_FORM_HEIGHT_ES = 923;

// ============================================================================
// Below this line is derived automatically.
// ============================================================================

const WEBINAR_DATE = new Date(WEBINAR_ES_DATE_ISO);

// An explicit timeZone keeps the server-rendered text and the browser's text
// identical, whatever timezone the visitor is in.
const DATE_FORMATTER = new Intl.DateTimeFormat('es-US', {
  timeZone: 'America/New_York',
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

// en-US on purpose: "6:00 PM", the way the Spanish training pages write times.
const TIME_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

const PACIFIC_FORMATTER = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/Los_Angeles',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
});

/** "miércoles, 18 de noviembre de 2026" */
export const WEBINAR_ES_DATE_DISPLAY = DATE_FORMATTER.format(WEBINAR_DATE);

/** "6:00 PM hora del Este" */
export const WEBINAR_ES_TIME_DISPLAY = `${TIME_FORMATTER.format(WEBINAR_DATE)} hora del Este`;

/** "3:00 PM hora del Pacífico" — the audience spans every US timezone. */
export const WEBINAR_ES_TIME_PACIFIC = `${PACIFIC_FORMATTER.format(WEBINAR_DATE)} hora del Pacífico`;

/** Epoch milliseconds — what the countdown counts down to. */
export const WEBINAR_ES_TIMESTAMP = WEBINAR_DATE.getTime();

// ---------------------------------------------------------------------------
// Calendar links, generated from the date above.
// ---------------------------------------------------------------------------
export const WEBINAR_ES_TITLE =
  'El Blueprint del Emprendedor en Transporte (en español) — DMG Agency Core';
const SUMMARY =
  'Una industria. Muchos caminos. Un primer paso. Masterclass gratis en español sobre cómo construir un negocio de transporte en el orden correcto.';
const DETAILS = `${SUMMARY}\n\nZoom: ${JOIN_URL_ES}\nID de reunión: ${ZOOM_MEETING_ID_ES} · Código: ${ZOOM_PASSCODE_ES}`;

const WEBINAR_END = new Date(WEBINAR_ES_TIMESTAMP + WEBINAR_ES_DURATION_MINUTES * 60_000);

/** Calendar formats want UTC as YYYYMMDDTHHMMSSZ with no punctuation. */
function toCalendarStamp(d: Date): string {
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

const START_STAMP = toCalendarStamp(WEBINAR_DATE);
const END_STAMP = toCalendarStamp(WEBINAR_END);

export const GOOGLE_CALENDAR_URL_ES =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent(WEBINAR_ES_TITLE)}` +
  `&dates=${START_STAMP}/${END_STAMP}` +
  `&details=${encodeURIComponent(DETAILS)}` +
  `&location=${encodeURIComponent(JOIN_URL_ES)}`;

// .ics for Apple Calendar and Outlook. CRLF line endings are required by the
// spec, and commas, semicolons and newlines inside text values are escaped.
const icsText = (s: string) => s.replace(/[\\;,]/g, (c) => `\\${c}`).replace(/\n/g, '\\n');
const ICS_CONTENT = [
  'BEGIN:VCALENDAR',
  'VERSION:2.0',
  'PRODID:-//DMG Agency Core//Webinar ES//ES',
  'CALSCALE:GREGORIAN',
  'METHOD:PUBLISH',
  'BEGIN:VEVENT',
  `UID:webinar-es-${START_STAMP}@dmgagencycore.com`,
  `DTSTAMP:${START_STAMP}`,
  `DTSTART:${START_STAMP}`,
  `DTEND:${END_STAMP}`,
  `SUMMARY:${icsText(WEBINAR_ES_TITLE)}`,
  `DESCRIPTION:${icsText(DETAILS)}`,
  `LOCATION:${icsText(JOIN_URL_ES)}`,
  'STATUS:CONFIRMED',
  'BEGIN:VALARM',
  'TRIGGER:-PT1H',
  'ACTION:DISPLAY',
  'DESCRIPTION:La masterclass empieza en 1 hora',
  'END:VALARM',
  'END:VEVENT',
  'END:VCALENDAR',
].join('\r\n');

export const ICS_DATA_URI_ES = `data:text/calendar;charset=utf-8,${encodeURIComponent(ICS_CONTENT)}`;
