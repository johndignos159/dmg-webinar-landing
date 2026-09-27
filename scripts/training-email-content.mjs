/**
 * Spanish Group Dispatch Training — every email, in one file.
 *
 * Two tracks:
 *   PAID      seven emails from payment through the morning of day 2
 *   RECOVERY  three emails over four days for people who registered and did
 *             not pay
 *
 * Everything factual — dates, times, the room, the price — comes from
 * lib/training-config.mjs so the emails cannot disagree with the landing page.
 * Change a date there, re-run the generator, and all ten move together.
 *
 * Block types: p, h, small, list, btn, box. Same set as the webinar emails.
 */

import {
  DAY_1_DISPLAY,
  DAY_2_DISPLAY,
  DAY_1_SHORT,
  DAY_2_SHORT,
  START_TIME,
  TIMEZONE_LABEL,
  PRICE,
  MEETING_URL,
  MEETING_ID,
  MEETING_PASSCODE,
  CHECKOUT_URL,
  LANDING_URL,
  SUPPORT_EMAIL,
  REFUND_POLICY_ES,
} from '../lib/training-config.mjs';

export const NAME = '{{contact.first_name}}';

const RED = '#E23B3B';

// The same three-row fact box appears in most of the paid emails. Built once
// so a date change cannot update five of them and miss the sixth.
const WHEN_BOX = {
  box: [
    ['Día 1:', DAY_1_DISPLAY],
    ['Día 2:', DAY_2_DISPLAY],
    ['Hora:', `${START_TIME} ${TIMEZONE_LABEL} (ambos días)`],
  ],
};

const ACCESS_BOX = {
  box: [
    ['Enlace:', `<a href="${MEETING_URL}" style="color:${RED};">Entrar a Zoom</a>`],
    ['ID de reunión:', MEETING_ID],
    ['Código de acceso:', MEETING_PASSCODE],
  ],
};

export const emails = [
  // ======================================================= PAID TRACK =======
  {
    file: '01-pago-confirmado',
    ghl: 'TRAINING - payment confirmed',
    track: 'paid',
    trigger: 'Immediately on payment',
    subject: 'Estás inscrito — Entrenamiento de Despacho',
    blocks: [
      { p: `${NAME},` },
      { p: 'Tu pago se procesó y tu lugar está reservado. Bienvenido.' },
      WHEN_BOX,
      { h: 'Guarda estos datos' },
      ACCESS_BOX,
      {
        small:
          'Es el mismo enlace los dos días. Guárdalo ahora en tu calendario y no tendrás que buscarlo después.',
      },
      { h: 'Qué necesitas' },
      {
        list: [
          'Una computadora con internet estable',
          'Audífonos, si estarás en un lugar con ruido',
          'Algo para tomar notas — vas a querer apuntar los guiones de negociación',
        ],
      },
      {
        p: 'No necesitas camión, ni CDL, ni ninguna experiencia previa. El día 1 empieza desde cero.',
      },
      {
        p: `Si tienes cualquier duda antes del entrenamiento, escríbenos a <a href="mailto:${SUPPORT_EMAIL}" style="color:${RED};">${SUPPORT_EMAIL}</a>.`,
      },
      { small: REFUND_POLICY_ES },
    ],
  },

  {
    file: '02-dos-semanas',
    ghl: 'TRAINING - 2 weeks before',
    track: 'paid',
    trigger: 'Wait until 17/10/2026 10:00 AM',
    subject: 'Faltan dos semanas — prepárate así',
    blocks: [
      { p: `${NAME},` },
      { p: 'Faltan dos semanas para tu entrenamiento. Nada que hacer todavía, solo un recordatorio para que lo tengas en el calendario.' },
      WHEN_BOX,
      { h: 'Una cosa que puedes hacer desde ya' },
      {
        p: 'Entra a un load board gratuito y mira cómo se ven las cargas publicadas. No tienes que entender nada todavía — solo familiarízate con la pantalla.',
      },
      {
        p: 'El día 1 vamos a leer esa misma pantalla juntos, y llegar habiéndola visto antes hace que todo entre más rápido.',
      },
      { btn: { text: 'Ver el temario completo', url: LANDING_URL } },
    ],
  },

  {
    file: '03-una-semana',
    ghl: 'TRAINING - 1 week before',
    track: 'paid',
    trigger: 'Wait until 24/10/2026 10:00 AM',
    subject: 'Una semana — esto es lo que vamos a cubrir',
    blocks: [
      { p: `${NAME},` },
      { p: 'Falta una semana. Aquí está lo que vas a salir sabiendo hacer.' },
      { h: 'Día 1 — los fundamentos' },
      {
        list: [
          'Cómo se mueve la carga y quién le paga a quién',
          'Qué hace un despachador, hora por hora',
          'Leer un rate confirmation sin que se te escape nada',
          'Calcular costo por milla — el número que decide si una carga sirve',
        ],
      },
      { h: 'Día 2 — operarlo como negocio' },
      {
        list: [
          'Negociar tarifas, con guiones que puedes usar el lunes',
          'Facturar y cobrar completo, sin perseguir a nadie',
          'Factoring: cuándo conviene y cuánto cuesta de verdad',
          'Fraude: doble corretaje, clonación de MC y cómo detectarlos',
        ],
      },
      WHEN_BOX,
      { small: 'Mismo enlace los dos días. Ya lo tienes en el correo de confirmación.' },
    ],
  },

  {
    file: '04-tres-dias',
    ghl: 'TRAINING - 3 days before',
    track: 'paid',
    trigger: 'Wait until 28/10/2026 10:00 AM',
    subject: 'Faltan 3 días — revisa tu enlace',
    blocks: [
      { p: `${NAME},` },
      { p: 'Faltan tres días. Buen momento para hacer una prueba rápida.' },
      { h: 'Haz esto hoy, no el sábado' },
      {
        list: [
          'Abre el enlace de Zoom y confirma que la aplicación funciona',
          'Revisa tu micrófono y tus audífonos',
          'Agrega las dos fechas a tu calendario si aún no lo hiciste',
        ],
      },
      ACCESS_BOX,
      {
        p: 'Si algo no funciona, escríbenos ahora y lo resolvemos con calma. El sábado a las 11 ya no hay tiempo.',
      },
      WHEN_BOX,
    ],
  },

  {
    file: '05-un-dia',
    ghl: 'TRAINING - 1 day before',
    track: 'paid',
    trigger: 'Wait until 30/10/2026 5:00 PM',
    subject: 'Mañana empezamos',
    blocks: [
      { p: `${NAME},` },
      { p: `Mañana, ${DAY_1_SHORT}, a las ${START_TIME} ${TIMEZONE_LABEL}.` },
      ACCESS_BOX,
      { h: 'Llega con una pregunta' },
      {
        p: 'Los dos días tienen preguntas y respuestas en vivo. La gente que más se lleva es la que llega con algo específico que quiere resolver — su situación, su lane, su número.',
      },
      { p: 'Piensa cuál es la tuya y tenla lista.' },
      { small: 'Conéctate unos minutos antes para no perderte el arranque.' },
    ],
  },

  {
    file: '06-hoy-dia-1',
    ghl: 'TRAINING - day 1 morning',
    track: 'paid',
    trigger: 'Wait until 31/10/2026 9:00 AM',
    subject: `Hoy a las ${START_TIME} — día 1`,
    blocks: [
      { p: `${NAME},` },
      { p: `Hoy es el día. Empezamos a las ${START_TIME} ${TIMEZONE_LABEL}.` },
      { btn: { text: 'Entrar a Zoom', url: MEETING_URL } },
      {
        box: [
          ['ID de reunión:', MEETING_ID],
          ['Código de acceso:', MEETING_PASSCODE],
        ],
      },
      { p: 'Trae algo para tomar notas. Nos vemos en un rato.' },
    ],
  },

  {
    file: '07-hoy-dia-2',
    ghl: 'TRAINING - day 2 morning',
    track: 'paid',
    trigger: 'Wait until 01/11/2026 9:00 AM',
    subject: `Día 2 hoy a las ${START_TIME}`,
    blocks: [
      { p: `${NAME},` },
      {
        p: `Segundo y último día. Misma hora, ${START_TIME} ${TIMEZONE_LABEL}, y el mismo enlace de ayer.`,
      },
      { btn: { text: 'Entrar a Zoom', url: MEETING_URL } },
      {
        box: [
          ['ID de reunión:', MEETING_ID],
          ['Código de acceso:', MEETING_PASSCODE],
        ],
      },
      { h: 'Hoy es la parte del negocio' },
      {
        p: 'Negociación, facturación, factoring, fraude y cómo conseguir tus primeros carriers. Es el día que convierte lo de ayer en ingresos.',
      },
      { p: 'Nos vemos ahora.' },
    ],
  },

  // =================================================== RECOVERY TRACK =======
  // Three emails over four days for people who registered and never paid.
  // Short on purpose: the offer is already understood, what is missing is the
  // decision. A long sequence here reads as pressure and costs unsubscribes.
  {
    file: '08-recuperacion-1h',
    ghl: 'TRAINING - recovery 1 hour',
    track: 'recovery',
    trigger: 'Wait 1 hour after registering',
    subject: 'Tu lugar todavía no está reservado',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Empezaste tu registro para el Entrenamiento de Despacho, pero el pago no se completó — así que tu lugar aún no está apartado.',
      },
      { p: 'Si fue un problema con la tarjeta o simplemente se te fue el tiempo, puedes terminarlo aquí:' },
      { btn: { text: `Completar mi pago — $${PRICE}`, url: CHECKOUT_URL } },
      WHEN_BOX,
      {
        small: `¿Tuviste algún problema con el pago? Escríbenos a <a href="mailto:${SUPPORT_EMAIL}" style="color:${RED};">${SUPPORT_EMAIL}</a> y lo resolvemos.`,
      },
    ],
  },

  {
    file: '09-recuperacion-dia-2',
    ghl: 'TRAINING - recovery day 2',
    track: 'recovery',
    trigger: 'Wait 2 days',
    subject: '¿Te quedó alguna duda?',
    blocks: [
      { p: `${NAME},` },
      { p: 'Te registraste hace un par de días y no completaste el pago. Normalmente es por una de estas tres razones.' },
      { h: '"No tengo experiencia"' },
      { p: 'El día 1 empieza desde cero. Si nunca has visto un load board, ese es exactamente el punto de partida.' },
      { h: '"No tengo camión ni CDL"' },
      { p: 'No hacen falta ninguno de los dos. El despachador no maneja y no es dueño del equipo — trabajas desde una computadora.' },
      { h: '"No sé si voy a poder asistir"' },
      {
        p: 'Son dos días de fin de semana, sábado y domingo, justamente para que no tengas que pedir permiso en el trabajo.',
      },
      { btn: { text: `Reservar mi lugar — $${PRICE}`, url: CHECKOUT_URL } },
      WHEN_BOX,
    ],
  },

  {
    file: '10-recuperacion-dia-4',
    ghl: 'TRAINING - recovery day 4',
    track: 'recovery',
    trigger: 'Wait 2 more days (day 4)',
    subject: 'Último aviso sobre tu lugar',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Este es el último correo que te enviamos sobre este entrenamiento. No queremos llenarte la bandeja.',
      },
      {
        p: `El grupo es limitado y los lugares se están llenando. Si todavía lo quieres, este es el momento.`,
      },
      { btn: { text: `Reservar mi lugar — $${PRICE}`, url: CHECKOUT_URL } },
      WHEN_BOX,
      {
        p: 'Y si decidiste que no es para ti ahora mismo, está bien. No te escribiremos más sobre esto.',
      },
      { small: REFUND_POLICY_ES },
    ],
  },
];
