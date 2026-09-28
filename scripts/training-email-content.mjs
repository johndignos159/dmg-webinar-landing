/**
 * Spanish Group Dispatch Training — every email, in one file.
 *
 * Two tracks:
 *   PAID      seven emails from payment through the morning of day 2
 *   RECOVERY  three emails over four days for people who registered and did
 *             not pay
 *
 * Everything factual comes from lib/training-config.mjs so the emails cannot
 * disagree with the landing page.
 *
 * THE TWO DAYS ARE NOT THE SAME. Different start times, different Zoom rooms.
 * Every email that mentions access prints both, labelled, and the day 2 email
 * leads with the fact that the link changed. Someone who saves day 1's link
 * and turns up with it on day 2 lands in an empty room, and they have paid
 * $197 for the privilege.
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
  REFUND_POLICY_ES,
} from '../lib/training-config.mjs';

export const NAME = '{{contact.first_name}}';

const RED = '#E23B3B';

// When the two days are. Used wherever an email needs to restate the schedule.
const WHEN_BOX = {
  box: [
    ['Día 1:', `${DAY_1_DISPLAY} — <strong>${DAY_1_TIME}</strong>`],
    ['Día 2:', `${DAY_2_DISPLAY} — <strong>${DAY_2_TIME}</strong>`],
  ],
};

// Access details for one day. Always rendered as a labelled pair so the two
// rooms can never be mistaken for one.
const access = (session, label, time) => ({
  box: [
    [`${label} — ${time}`, `<a href="${session.meetingUrl}" style="color:${RED};">Entrar a Zoom</a>`],
    ['ID de reunión:', session.meetingId],
    ['Código de acceso:', session.passcode],
  ],
});

const ACCESS_1 = access(SESSION_1, 'Día 1', DAY_1_TIME);
const ACCESS_2 = access(SESSION_2, 'Día 2', DAY_2_TIME);

const DIFFERENT_LINKS_WARNING = {
  p: '<strong>Importante:</strong> cada día tiene su propio enlace y su propia hora. El enlace del día 1 no funciona el día 2. Guarda los dos por separado.',
};

export const emails = [
  // ======================================================= PAID TRACK =======
  {
    file: '01-payment-confirmed',
    ghl: 'TRAINING - payment confirmed',
    en: "You're in. Both Zoom links, IDs and passcodes, with a warning that the two days differ. What to bring. No refunds.",
    track: 'paid',
    trigger: 'Immediately on payment',
    subject: 'Estás inscrito — Entrenamiento de Despacho',
    blocks: [
      { p: `${NAME},` },
      { p: 'Tu pago se procesó y tu lugar está reservado. Bienvenido.' },
      WHEN_BOX,
      DIFFERENT_LINKS_WARNING,
      { h: 'Tu acceso del día 1' },
      ACCESS_1,
      { h: 'Tu acceso del día 2' },
      ACCESS_2,
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
    file: '02-2-weeks-before',
    ghl: 'TRAINING - 2 weeks before',
    en: 'Two weeks out. Calendar nudge, plus go look at a load board to get familiar.',
    track: 'paid',
    trigger: 'Wait until 17/10/2026 10:00 AM',
    subject: 'Faltan dos semanas — prepárate así',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Faltan dos semanas para tu entrenamiento. Nada que hacer todavía, solo un recordatorio para que lo tengas en el calendario.',
      },
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
    file: '03-1-week-before',
    ghl: 'TRAINING - 1 week before',
    en: 'One week out. The full list of what day 1 and day 2 each cover.',
    track: 'paid',
    trigger: 'Wait until 24/10/2026 10:00 AM',
    subject: 'Una semana — esto es lo que vamos a cubrir',
    blocks: [
      { p: `${NAME},` },
      { p: 'Falta una semana. Aquí está lo que vas a salir sabiendo hacer.' },
      { h: 'Día 1 — aprende a hacer el trabajo' },
      {
        list: [
          'Cómo funciona la industria del transporte',
          'Load boards y cómo buscar cargas',
          'Cómo leer rate confirmations',
          'Cómo comunicarte con brokers y carriers',
          'Negociación de tarifas',
          'Documentos y procesos esenciales',
          'Cómo manejar el día a día de un dispatcher',
        ],
      },
      { h: 'Día 2 — construye tu cartera de clientes' },
      {
        list: [
          'Cómo encontrar tus primeros carriers',
          'Estrategias para conseguir clientes',
          'Cómo crear una red de referidos',
          'Cómo presentar y vender tus servicios',
          'Cómo organizar y crecer tu negocio de dispatch',
          'Cómo construir relaciones para depender menos de los load boards',
        ],
      },
      WHEN_BOX,
      DIFFERENT_LINKS_WARNING,
    ],
  },

  {
    file: '04-3-days-before',
    ghl: 'TRAINING - 3 days before',
    en: 'Three days out. Test your Zoom today, not Saturday morning. Both links repeated.',
    track: 'paid',
    trigger: 'Wait until 28/10/2026 10:00 AM',
    subject: 'Faltan 3 días — revisa tus enlaces',
    blocks: [
      { p: `${NAME},` },
      { p: 'Faltan tres días. Buen momento para hacer una prueba rápida.' },
      { h: 'Haz esto hoy, no el sábado' },
      {
        list: [
          'Abre el enlace del día 1 y confirma que Zoom funciona en tu computadora',
          'Revisa tu micrófono y tus audífonos',
          'Agrega las dos fechas a tu calendario, cada una con su hora',
        ],
      },
      DIFFERENT_LINKS_WARNING,
      { h: 'Día 1' },
      ACCESS_1,
      { h: 'Día 2' },
      ACCESS_2,
      {
        p: 'Si algo no funciona, escríbenos ahora y lo resolvemos con calma. El sábado a las 11 ya no hay tiempo.',
      },
    ],
  },

  {
    file: '05-1-day-before',
    ghl: 'TRAINING - 1 day before',
    en: 'Tomorrow. Day 1 link and time, plus come with a specific question for Q&A.',
    track: 'paid',
    trigger: 'Wait until 30/10/2026 5:00 PM',
    subject: 'Mañana empezamos',
    blocks: [
      { p: `${NAME},` },
      { p: `Mañana, ${DAY_1_SHORT}, a las <strong>${DAY_1_TIME}</strong>.` },
      ACCESS_1,
      {
        small:
          'Ese es el enlace del día 1. El del día 2 es distinto y te lo recordamos el domingo.',
      },
      { h: 'Llega con una pregunta' },
      {
        p: 'Los dos días tienen preguntas y respuestas en vivo. La gente que más se lleva es la que llega con algo específico que quiere resolver — su situación, su lane, su número.',
      },
      { p: 'Piensa cuál es la tuya y tenla lista.' },
      { small: 'Conéctate unos minutos antes para no perderte el arranque.' },
    ],
  },

  {
    file: '06-day-1-morning',
    ghl: 'TRAINING - day 1 morning',
    en: `Today at ${DAY_1_TIME}. Join button, ID, passcode. Bring something to take notes with.`,
    track: 'paid',
    trigger: 'Wait until 31/10/2026 9:00 AM',
    subject: `Hoy a las ${SESSION_1.start} — día 1`,
    blocks: [
      { p: `${NAME},` },
      { p: `Hoy es el día. Empezamos a las <strong>${DAY_1_TIME}</strong>.` },
      { btn: { text: 'Entrar a Zoom — día 1', url: SESSION_1.meetingUrl } },
      {
        box: [
          ['ID de reunión:', SESSION_1.meetingId],
          ['Código de acceso:', SESSION_1.passcode],
        ],
      },
      { p: 'Trae algo para tomar notas. Nos vemos en un rato.' },
    ],
  },

  {
    file: '07-day-2-morning',
    ghl: 'TRAINING - day 2 morning',
    en: `Day 2 today at ${DAY_2_TIME} — leads with the fact that the link AND the time are different from yesterday.`,
    track: 'paid',
    trigger: 'Wait until 01/11/2026 9:00 AM',
    subject: `Día 2 hoy a las ${SESSION_2.start} — enlace nuevo`,
    blocks: [
      { p: `${NAME},` },
      {
        p: '<strong>Dos cosas cambian hoy:</strong> la hora y el enlace. El de ayer no te va a dejar entrar.',
      },
      { p: `Hoy empezamos a las <strong>${DAY_2_TIME}</strong>.` },
      { btn: { text: 'Entrar a Zoom — día 2', url: SESSION_2.meetingUrl } },
      {
        box: [
          ['ID de reunión:', SESSION_2.meetingId],
          ['Código de acceso:', SESSION_2.passcode],
        ],
      },
      { h: 'Hoy es la parte del negocio' },
      {
        p: 'Cómo encontrar tus primeros carriers, cómo conseguir clientes y cómo construir las relaciones que hacen que dejes de depender de los load boards.',
      },
      { p: 'Nos vemos ahora.' },
    ],
  },

  // =================================================== RECOVERY TRACK =======
  // Short on purpose: they already understand the offer, what is missing is
  // the decision. A longer sequence reads as pressure and costs unsubscribes.
  {
    file: '08-recovery-1-hour',
    ghl: 'TRAINING - recovery 1 hour',
    en: 'Your seat is not reserved — payment did not complete. Finish it here.',
    track: 'recovery',
    trigger: 'Wait 1 hour after registering',
    subject: 'Tu lugar todavía no está reservado',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Empezaste tu registro para el Entrenamiento de Despacho, pero el pago no se completó — así que tu lugar aún no está apartado.',
      },
      {
        p: 'Si fue un problema con la tarjeta o simplemente se te fue el tiempo, puedes terminarlo aquí:',
      },
      { btn: { text: `Completar mi pago — $${PRICE}`, url: CHECKOUT_URL } },
      WHEN_BOX,
      {
        small: `¿Tuviste algún problema con el pago? Escríbenos a <a href="mailto:${SUPPORT_EMAIL}" style="color:${RED};">${SUPPORT_EMAIL}</a> y lo resolvemos.`,
      },
    ],
  },

  {
    file: '09-recovery-day-2',
    ghl: 'TRAINING - recovery day 2',
    en: 'Answers four objections: no experience, no truck or CDL, weak English, cannot attend.',
    track: 'recovery',
    trigger: 'Wait 2 days',
    subject: '¿Te quedó alguna duda?',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Te registraste hace un par de días y no completaste el pago. Normalmente es por una de estas razones.',
      },
      { h: '"No tengo experiencia"' },
      {
        p: 'El día 1 empieza desde cero. Si nunca has visto un load board, ese es exactamente el punto de partida.',
      },
      { h: '"No tengo camión ni CDL"' },
      {
        p: 'No hacen falta ninguno de los dos. El despachador no maneja y no es dueño del equipo — trabajas desde una computadora.',
      },
      { h: '"Mi inglés no es muy fuerte"' },
      {
        p: 'Hablamos de herramientas y estrategias para superar la barrera del idioma mientras fortaleces tu inglés. Y hay una gran comunidad de dueños de camiones hispanohablantes que prefieren trabajar con un dispatcher que hable español. Tu español puede ser una ventaja.',
      },
      { h: '"No sé si voy a poder asistir"' },
      {
        p: 'Son dos días de fin de semana, sábado y domingo, justamente para que no tengas que pedir permiso en el trabajo.',
      },
      { btn: { text: `Reservar mi lugar — $${PRICE}`, url: CHECKOUT_URL } },
      WHEN_BOX,
    ],
  },

  {
    file: '10-recovery-day-4',
    ghl: 'TRAINING - recovery day 4',
    en: 'Last email about this training. Limited seats. If it is a no, that is fine.',
    track: 'recovery',
    trigger: 'Wait 2 more days (day 4)',
    subject: 'Último aviso sobre tu lugar',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Este es el último correo que te enviamos sobre este entrenamiento. No queremos llenarte la bandeja.',
      },
      {
        p: 'El grupo es limitado y los lugares se están llenando. Si todavía lo quieres, este es el momento.',
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
