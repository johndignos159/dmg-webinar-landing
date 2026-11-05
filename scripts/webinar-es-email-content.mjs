/**
 * Copy for the Spanish webinar emails (Nov 18, 2026, 6:00 PM ET).
 *
 * The English webinar emails (email-content.mjs) in Spanish, with this
 * session's date, time and Zoom room. Same block types: p, h, small, list,
 * btn, box. Built by build-webinar-es-emails.mjs into emails-webinar-es/.
 *
 * The follow-up emails (day 1–21) keep the English lessons but not the English
 * offer: the Spanish webinar ends with the Spanish dispatch training (Cora's
 * choice, Nov 5), so every "Book your setup call" became the training page.
 * Training facts come from lib/training-content.mjs (Cora's copy) — keep them in
 * step if the training changes. Price: $197.
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

// The Spanish training page. Its address stays the same from class to class;
// the page always shows the next date. UTM tags show these clicks in GHL.
export const TRAIN =
  'https://entrenamiento.dmgagencycore.com/?utm_source=email&utm_medium=webinar-es&utm_campaign=webinar-es-2026-11-18';
// The Spanish sign-up for the 4 business services, for readers who still need an LLC.
export const START = 'https://dmgagencycore.com/start?lang=es';

const DISCLAIMER = {
  small:
    'DMG Agency Core ofrece educación y consultoría de negocios — no asesoría legal, fiscal ni financiera. Las cifras son rangos de la industria según datos públicos, solo ilustrativas, y no garantizan ingresos.',
};

const RED = '#DC143C';
const WHEN =['Cuándo:', 'Miércoles, 18 de noviembre de 2026'];
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

  // ------------------------------------------------------------------ DAY 1
  // For everyone, attended or not: it never thanks anyone for attending and
  // never tells anyone they missed it (as the English day 1).
  {
    file: '06-tu-siguiente-paso',
    ghl: 'WEBINAR ES | 06 Día 1 · Tu siguiente paso',
    subject: 'El Blueprint — tu siguiente paso',
    preview: 'Lo más importante de la sesión, en corto.',
    blocks: [
      { p: `${NAME},` },
      { p: 'La sesión terminó.' },
      { p: 'Hayas podido entrar o no, lo importante es lo mismo — así que aquí va, en corto.' },
      { h: 'Todos los caminos empiezan en el mismo lugar' },
      {
        p: 'Carrier, despachador, broker, forwarder. Cuatro caminos distintos para entrar a esta industria, y ninguno puede operar hasta que tu negocio exista legalmente. Ese es el Pilar Uno, y es el único paso que todos los caminos comparten.',
      },
      { h: 'El orden le gana a la velocidad' },
      {
        p: 'Construir en el orden correcto cuesta exactamente lo mismo que construir al revés. La diferencia es que no hay que deshacerlo después — y deshacerlo es donde la gente pierde meses y miles de dólares.',
      },
      { h: 'La amenaza de la que nadie te avisa' },
      {
        p: '$725 millones se perdieron por fraude de carga el año pasado, y las autoridades nuevas fueron el blanco número uno. Una identidad de negocio legítima y verificable es tu primera defensa, no un detalle para después.',
      },
      { h: 'Qué hacer ahora' },
      {
        p: 'Si el camino que más te llama es el despacho — la forma más fácil de empezar — tu siguiente paso es nuestro <strong>Entrenamiento de Despacho en Grupo</strong>: dos días en vivo, en español, para aprender a buscar cargas, negociar tarifas y conseguir tus primeros clientes. <strong>$197.</strong>',
      },
      { btn: { text: 'Ver el entrenamiento y las fechas', url: TRAIN } },
      { small: '¿Prefieres preguntar primero? Responde a este correo y te contestamos.' },
    ],
  },

  // --------------------------------------------------------------- NURTURE
  {
    file: '08-el-orden-equivocado',
    ghl: 'WEBINAR ES | 08 Día 3 · El orden equivocado',
    subject: 'Construir en el orden equivocado',
    preview: 'Los cuatro errores que veo cada semana.',
    blocks: [
      { p: `${NAME},` },
      { p: 'Veo los mismos cuatro errores cada semana. Todos se sienten como avanzar.' },
      { h: 'Buscar cargas antes de poder transportarlas legalmente' },
      {
        p: 'Tiempo perdido en load boards donde no puedes reservar nada. Los brokers no trabajan contigo sin autoridad, seguro y un W-9 con una entidad real detrás.',
      },
      { h: 'Comprar el camión antes de que exista el negocio' },
      {
        p: 'El camión se siente como el negocio, así que va primero. Después se queda parado, porque los papeles que le permiten generar dinero nunca se empezaron.',
      },
      { h: 'Buscar una fianza o una autoridad antes de formar la entidad' },
      {
        p: 'La fianza de un broker es de $75,000 en cobertura BMC-84. No la puedes obtener como una persona con una idea. Primero va la entidad, y ese orden no se negocia.',
      },
      { h: 'Buscar clientes sin una base en qué apoyarse' },
      {
        p: 'Un despachador sin entidad no puede facturar. Un forwarder sin entidad no puede firmar contratos. Puedes encontrar el trabajo y aun así no tener cómo cobrarlo.',
      },
      {
        p: 'El resultado siempre es el mismo — dinero perdido, meses perdidos y un negocio que se frena antes de empezar.',
      },
      {
        p: 'En el Entrenamiento de Despacho en Grupo aprendes a hacer el trabajo en el orden correcto desde el primer día.',
      },
      { btn: { text: 'Ver el entrenamiento', url: TRAIN } },
    ],
  },

  {
    file: '09-la-puerta-de-entrada',
    ghl: 'WEBINAR ES | 09 Día 5 · La puerta de entrada',
    subject: 'No puedes hacer nada de esto hasta que tu negocio exista legalmente',
    preview: 'Sea cual sea tu camino, la puerta de entrada es la misma.',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Sea cual sea el camino que quieras, la puerta de entrada es la misma: tu negocio tiene que existir legalmente.',
      },
      {
        list: [
          'Un <strong>despachador</strong> no puede facturar sin eso.',
          'Un <strong>broker</strong> no puede obtener su autoridad sin eso.',
          'Un <strong>owner-operator</strong> no puede operar sin eso.',
          'Un <strong>forwarder</strong> no puede firmar contratos sin eso.',
        ],
      },
      { h: 'Todo se apoya en Lanzar' },
      {
        p: 'Proteger se apoya en Generar ingresos. Generar ingresos se apoya en Operar. Operar se apoya en Lanzar. Nada de lo que está arriba se sostiene si la base está floja.',
      },
      {
        p: 'Y Lanzar es la parte más barata de todo el camino. También es la única que sale mucho más cara de arreglar después que de hacer bien ahora.',
      },
      { h: 'La prueba honesta' },
      {
        p: 'Si tu negocio recibiera un golpe fuerte mañana — un accidente, un reclamo, un cliente que no paga — ¿tus bienes personales están separados de él?',
      },
      { p: 'Si no puedes responder eso con seguridad, eso es lo primero que hay que arreglar.' },
      {
        p: 'Si tu camino es el despacho, el entrenamiento te enseña a montar tu negocio de dispatch y a conseguir tus primeros carriers.',
      },
      { btn: { text: 'Ver el entrenamiento', url: TRAIN } },
      {
        small: `¿Todavía necesitas formar tu LLC? También te ayudamos, en español: <a href="${START}" style="color:${RED};">dmgagencycore.com/start</a>`,
      },
    ],
  },

  {
    file: '10-fraude',
    ghl: 'WEBINAR ES | 10 Día 7 · Fraude',
    subject: '$725 millones desaparecieron el año pasado. Las autoridades nuevas eran el blanco.',
    preview: 'Las tres estafas que vas a ver primero, y las señales que las delatan.',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Esta industria tiene un lado oscuro, y los más golpeados son los que acaban de empezar.',
      },
      {
        p: '<strong>$725 millones se perdieron por fraude de carga en 2025.</strong> Las autoridades nuevas son el blanco número uno, porque los estafadores saben que están reservando sus propias cargas y nunca han visto esto antes.',
      },
      { h: 'Las tres que vas a ver primero' },
      {
        p: '<strong>Doble brokering.</strong> Un carrier falso vuelve a publicar tu carga, se queda con el pago y desaparece.',
      },
      {
        p: '<strong>Robo de identidad y clonación de MC.</strong> Los estafadores copian la autoridad de un carrier real para robar cargas y pagos.',
      },
      {
        p: '<strong>Phishing y rate cons falsos.</strong> Documentos falsificados y correos suplantados para desviar cargas o dinero.',
      },
      { h: 'Señales de alerta' },
      {
        list: [
          'Tarifas que parecen demasiado buenas para ser verdad',
          'Presión para aceptar de inmediato',
          'Correo personal en lugar de un dominio de empresa',
          'Números de MC que no coinciden o que son muy nuevos',
          'Que te pidan saltarte el rate confirmation',
        ],
      },
      { h: 'Cómo te proteges' },
      {
        p: 'Verifica la autoridad en FMCSA cada vez. Nunca muevas una carga sin un rate confirmation firmado. Y construye sobre una identidad de negocio legítima y verificable — los más golpeados son los que se montaron a la carrera y trabajan a ciegas.',
      },
      {
        p: 'En el entrenamiento aprendes a leer rate confirmations y a comunicarte con brokers y carriers — la base para reconocer estas señales.',
      },
      { btn: { text: 'Ver el entrenamiento', url: TRAIN } },
    ],
  },

  {
    file: '11-que-pilar-falta',
    ghl: 'WEBINAR ES | 11 Día 10 · Qué pilar falta',
    subject: '¿Cuál de los cuatro pilares te falta?',
    preview: 'Revisión rápida: cuatro pilares, cuatro preguntas.',
    blocks: [
      { p: `${NAME},` },
      { p: 'Revisión rápida. Cuatro pilares, cuatro preguntas.' },
      { h: '1. Lanzar — ¿tu negocio existe legalmente?' },
      {
        p: 'Entidad formada, EIN emitido, registros hechos en el orden correcto. No "en proceso". Hecho.',
      },
      { h: '2. Operar — ¿funciona sin que tú lo sostengas todo?' },
      { p: 'Sistemas, cuentas limpias y cumplimiento resuelto antes de que un problema te obligue.' },
      { h: '3. Generar ingresos — ¿estás listo para cobrar?' },
      {
        p: 'Credibilidad para que clientes y socios te confíen dinero de verdad, y una cartera de clientes que no dependa de la suerte.',
      },
      { h: '4. Proteger — ¿un mal día acabaría contigo?' },
      {
        p: 'Cumplimiento continuo, contratos, seguros, y conocer las tácticas del fraude antes de que las usen contra ti.',
      },
      { h: 'Esto lo escucho mucho' },
      {
        p: '<strong>&ldquo;Lo arreglo cuando gane más dinero.&rdquo;</strong><br>La estructura es lo que te permite ganar dinero con seguridad. Es al revés.',
      },
      {
        p: '<strong>&ldquo;Ya es tarde, ya empecé.&rdquo;</strong><br>Casi nunca es cierto. Casi todo se puede arreglar, y es más barato mientras antes lo hagas.',
      },
      {
        p: '<strong>&ldquo;Ahora no me alcanza.&rdquo;</strong><br>Cada mes sin formar tu negocio es dinero que no puedes cobrar y un riesgo que cargas tú personalmente.',
      },
      {
        p: 'Si empiezas por el despacho, el entrenamiento cuesta <strong>$197</strong>: dos días en vivo para aprender el trabajo y cómo conseguir tus primeros clientes.',
      },
      { btn: { text: 'Ver el entrenamiento', url: TRAIN } },
    ],
  },

  {
    file: '12-preguntas-frecuentes',
    ghl: 'WEBINAR ES | 12 Día 14 · Preguntas frecuentes',
    subject: 'Las preguntas que más me hacen',
    preview: '¿Qué camino elijo? ¿Necesito una LLC? ¿Cómo funciona el dinero?',
    blocks: [
      { p: `${NAME},` },
      { p: 'Las que salen cada semana.' },
      { h: '¿Qué camino debería elegir?' },
      {
        p: 'El despacho es la forma más fácil de empezar — una entidad, sistemas y carriers como clientes. Un carrier necesita autoridad, seguro y BOC-3. Un broker suma una fianza BMC-84 de $75,000. Un forwarder necesita autoridad, fianza y seguro. Distinto capital, distinto riesgo, el mismo punto de partida.',
      },
      { h: '¿De verdad necesito una LLC?' },
      {
        p: 'Puedes operar como persona física (sole proprietor). Eso significa que tus bienes personales y tu negocio son legalmente lo mismo. En una industria donde un solo accidente puede generar un reclamo más grande que todo lo que tiene la mayoría de la gente, es un riesgo difícil de justificar.',
      },
      { h: '¿Cómo funciona el dinero?' },
      {
        p: 'Quien envía la carga paga por moverla. Un broker la conecta con un camión y se queda con cerca del 15%. El carrier la transporta, recibe el ingreso y le paga al chofer. Un despachador reserva cargas para el carrier y gana entre el 5 y el 10%. Todos cobran — la pregunta es qué lugar quieres ocupar.',
      },
      { h: '¿Cuánto cuesta empezar como despachador?' },
      {
        p: 'El Entrenamiento de Despacho en Grupo cuesta <strong>$197</strong>: dos días en vivo, en español, desde cómo funciona la industria hasta cómo encontrar tus primeros carriers.',
      },
      { h: '¿Y si mi inglés no es muy fuerte?' },
      {
        p: 'No dejes que el idioma te detenga. En el entrenamiento vemos herramientas para comunicarte con brokers y manejar procesos en inglés mientras fortaleces tu inglés.',
      },
      { h: '¿Trabajan en español?' },
      { p: 'Sí. Cada paso, en español o en inglés.' },
      { btn: { text: 'Ver el entrenamiento', url: TRAIN } },
      {
        small: `¿Necesitas formar tu LLC? También te ayudamos: <a href="${START}" style="color:${RED};">dmgagencycore.com/start</a>`,
      },
      DISCLAIMER,
    ],
  },

  {
    file: '13-dos-caminos',
    ghl: 'WEBINAR ES | 13 Día 21 · Dos caminos',
    subject: 'Dos caminos desde aquí',
    preview: 'Mi última nota sobre el Blueprint.',
    blocks: [
      { p: `${NAME},` },
      {
        p: 'Hace tres semanas te registraste para el Blueprint. Esta es mi última nota sobre él, así que te dejo la versión honesta.',
      },
      { h: 'Hazlo bien' },
      {
        list: [
          'Crece más allá de un negocio de una sola persona',
          'Suma nuevos caminos y fuentes de ingreso sobre una misma base',
          'Accede a contratos y programas que la mayoría nunca ve',
          'Construye patrimonio real — un activo que puedes hacer crecer, vender o heredar',
        ],
      },
      { h: 'O el costo de esperar' },
      {
        list: [
          'Dinero que no puedes cobrar — cada mes',
          'Tus bienes personales expuestos, sin una entidad que te respalde',
          'Fuera de los contratos y de las mejores cargas',
          'Presa fácil del fraude dirigido a los nuevos operadores',
        ],
      },
      { p: '<strong>No hacer nada también es una decisión — y tiene un precio.</strong>' },
      {
        p: 'No llegaste hasta aquí para llenar papeles. Llegaste para construir algo. La distancia entre donde estás y ese negocio es una decisión.',
      },
      {
        p: 'Si empiezas por el despacho, el próximo Entrenamiento de Despacho en Grupo es tu primer paso.',
      },
      { btn: { text: 'Ver las próximas fechas', url: TRAIN } },
      {
        p: 'Y si no es el momento, está bien de verdad. Nada de esto vence, y ya sabes dónde encontrarnos.',
      },
      { small: 'Una industria. Muchos caminos. Un primer paso.' },
      DISCLAIMER,
    ],
  },
];
