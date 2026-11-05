/**
 * Copy for the Spanish webinar emails (Nov 18, 2026, 6:00 PM ET).
 *
 * The English webinar emails (email-content.mjs) in Spanish, with this
 * session's date, time and Zoom room. Same block types: p, h, small, list,
 * btn, box. Built by build-webinar-es-emails.mjs into emails-webinar-es/.
 *
 * The follow-up emails (day 1–21) are not here yet: the Spanish webinar ends
 * with the Spanish dispatch training instead of the $997 setup call, so they
 * need their offer rewritten, not only translated.
 */

export const NAME = '{{contact.first_name}}';
export const JOIN =
  'https://us06web.zoom.us/j/89680364902?pwd=PDdah07kP1GH8RBttmvv3kY2ZhJP1b.1';
const ZOOM_ID = 'ID de reunión: 896 8036 4902 · Código: 682537';

const CAL_TITLE = 'El Blueprint del Emprendedor en Transporte (en español) — DMG Agency Core';
const CAL_DETAILS = `Una industria. Muchos caminos. Un primer paso.\n\nZoom: ${JOIN}\n${ZOOM_ID}`;
// Nov 18 2026, 6:00–6:45 PM EST = 23:00–23:45 UTC.
export const CAL =
  'https://calendar.google.com/calendar/render?action=TEMPLATE' +
  `&text=${encodeURIComponent(CAL_TITLE)}` +
  '&dates=20261118T230000Z/20261118T234500Z' +
  `&details=${encodeURIComponent(CAL_DETAILS)}` +
  `&location=${encodeURIComponent(JOIN)}`;

const RED = '#DC143C';
const WHEN = ['Cuándo:', 'Miércoles, 18 de noviembre de 2026'];
const TIME = ['Hora:', '6:00 PM hora del Este / 3:00 PM hora del Pacífico'];
const LENGTH = ['Duración:', '45 minutos, más preguntas y respuestas en vivo'];

export const emails = [
  {
    file: '01-estas-dentro',
    ghl: 'WEBINAR ES | 01 Estás dentro',
    subject: 'Estás dentro — El Blueprint del Emprendedor en Transporte',
    preview: 'Tu lugar está confirmado: miércoles 18 de noviembre, 6:00 PM hora del Este.',
    blocks: [
      { p: `${NAME},` },
      { p: 'Tu lugar está confirmado.' },
      { box: [WHEN, TIME, LENGTH] },
      { btn: { text: 'Agregar a mi calendario', url: CAL } },
      {
        small: `Tu enlace de Zoom: <a href="${JOIN}" style="color:${RED};">${JOIN}</a><br>${ZOOM_ID}`,
      },
      { h: 'Lo que te vas a llevar' },
      {
        list: [
          '<strong>Cuánto vale la oportunidad</strong> — exactamente cuánto paga esta industria, y quién se queda con ese dinero',
          '<strong>Los cuatro pilares</strong> — la base de todo negocio de transporte que sobrevive',
          '<strong>Las trampas que acaban con la gente</strong> — el fraude y los errores que terminan con los negocios antes de que empiecen',
          '<strong>El primer paso</strong> — el único movimiento que separa a los dueños de los que solo sueñan',
        ],
      },
      { h: 'Una industria. Muchos caminos. Un primer paso.' },
      {
        p: 'No necesitas un camión para ganar dinero en el transporte. Carrier, despachador, broker, forwarder — cuatro caminos distintos, y todos empiezan con el mismo paso.',
      },
      { p: 'De ese paso se trata el miércoles.' },
      { h: 'No habrá grabación' },
      {
        p: 'Es solo en vivo, y es a propósito: en las preguntas y respuestas del final, la gente pregunta por su propio camino, su propia situación y sus propios números — y esa mitad del valor no sobrevive a una grabación.',
      },
      { p: 'Así que agrégalo a tu calendario. Nos vemos el miércoles.' },
    ],
  },

  {
    file: '02-faltan-3-dias',
    ghl: 'WEBINAR ES | 02 Faltan 3 días',
    subject: 'La mayoría nunca lo logra. Esta es la razón.',
    preview: 'Faltan tres días. Aquí tienes una parte por adelantado.',
    blocks: [
      { p: `${NAME},` },
      { p: 'Faltan tres días. Aquí tienes una parte por adelantado.' },
      {
        p: 'El transporte es una industria de <strong>$900 mil millones</strong> en EE. UU. Cerca del <strong>72% de toda la carga</strong> se mueve por camión, y nunca deja de moverse.',
      },
      { p: 'Y la mayoría de las personas que entran a ella quiebran o desaparecen en menos de un año.' },
      {
        p: 'Casi nunca es porque no pudieran hacer el trabajo. Son personas trabajadoras que pusieron sus ahorros y su esperanza. Es una sola cosa que nadie les enseña.',
      },
      { h: 'Construyen en el orden equivocado' },
      {
        p: 'Buscan cargas antes de poder transportarlas legalmente. Compran el camión antes de que exista el negocio. Persiguen una fianza o una autoridad antes de formar la entidad. Buscan clientes sin una base en qué apoyarse.',
      },
      {
        p: 'Todo eso se siente como avanzar. Nada de eso lo es. El resultado es dinero perdido, meses perdidos y un negocio que se frena antes de empezar.',
      },
      { p: 'El orden no es un detalle. Es la diferencia entre construir un negocio y enterrarlo.' },
      { p: 'El miércoles te doy el orden.' },
      { btn: { text: 'Entrar el miércoles, 6 PM hora del Este', url: JOIN } },
    ],
  },

  {
    file: '03-manana',
    ghl: 'WEBINAR ES | 03 Mañana',
    subject: 'Mañana — cuatro formas de entrar, un primer paso',
    preview: 'Mañana a las 6:00 PM hora del Este. Trae tu pregunta más importante.',
    blocks: [
      { p: `${NAME},` },
      { p: 'Es mañana.' },
      { box: [['Cuándo:', 'Miércoles, 18 de noviembre'], TIME, LENGTH] },
      { h: 'Cuatro formas de entrar a esta industria' },
      {
        list: [
          '<strong>Carrier / Owner-Operator</strong> — tú mueves la carga y tienes la autoridad',
          '<strong>Despachador</strong> — reservas cargas y coordinas choferes para los carriers',
          '<strong>Broker de carga</strong> — conectas a quien envía la carga con carriers, a cambio de un margen',
          '<strong>Freight Forwarder</strong> — organizas y coordinas los envíos de quien envía la carga',
        ],
      },
      {
        p: 'Caminos distintos. El mismo primer paso. Vamos a ver qué pide cada uno, cuánto paga cada uno y el paso que todos comparten.',
      },
      { h: 'Cinco cosas que te voy a mostrar' },
      {
        list: [
          'El error de registro que acaba en silencio con las autoridades nuevas antes de su primera carga',
          'El camino del que casi nadie habla y que cuesta casi nada para empezar',
          'La revisión de 10 segundos que detiene la estafa que está golpeando a los nuevos operadores ahora mismo',
          'El primer paso que es igual para carriers, despachadores y brokers',
          'El estatus fiscal que la mayoría de los owner-operators no sabe que puede elegir',
        ],
      },
      {
        p: 'Si te pierdes cualquiera de estas, te cuesta. No habrá grabación, así que mañana es el único lugar para obtenerlas.',
      },
      { h: 'Dos cosas para aprovechar más mañana' },
      {
        p: 'Ven con tu pregunta más importante lista. Al final hay preguntas y respuestas en vivo, y las preguntas específicas reciben respuestas específicas.',
      },
      { p: 'Y conéctate desde un lugar donde puedas tomar notas — lo que escribes es lo que te queda.' },
      { btn: { text: 'Entrar mañana', url: JOIN } },
    ],
  },

  {
    file: '04-falta-1-hora',
    ghl: 'WEBINAR ES | 04 Falta 1 hora',
    subject: 'Falta una hora',
    preview: 'Empezamos en vivo a las 6:00 PM hora del Este.',
    blocks: [
      { p: `${NAME},` },
      { p: 'Empezamos en vivo en una hora.' },
      { p: '<strong>6:00 PM hora del Este / 3:00 PM hora del Pacífico</strong>' },
      { btn: { text: 'Entrar a la masterclass', url: JOIN } },
      { small: `Trae tu pregunta más importante. Responderemos todas las que podamos.<br>${ZOOM_ID}` },
    ],
  },

  {
    file: '05-empezamos',
    ghl: 'WEBINAR ES | 05 Empezamos',
    subject: 'Empezamos ya',
    preview: 'Empezamos en 15 minutos.',
    blocks: [
      { p: `${NAME},` },
      { p: 'Empezamos en 15 minutos.' },
      { btn: { text: 'Entrar ahora', url: JOIN } },
      { small: `¡Te esperamos!<br>${ZOOM_ID}` },
    ],
  },
];
