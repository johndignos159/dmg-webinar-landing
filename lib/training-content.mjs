/**
 * Spanish Group Dispatch Training — page copy.
 *
 * The curriculum below is Cora's, supplied 2026-09-28. It replaces the twelve
 * modules I had drafted from the dispatch page. Do not edit these to sound
 * better: all sales are final, so anything promised here and not taught has no
 * refund route and goes to a card dispute instead.
 */

// ---------------------------------------------------------------- DAY ONE ---
export const DAY_1 = {
  title: 'Aprende a hacer el trabajo',
  intro:
    'El primer día nos enfocamos en cómo funciona el dispatching y cómo hacer el trabajo de un dispatcher.',
  items: [
    'Cómo funciona la industria del transporte',
    'Load boards y cómo buscar cargas',
    'Cómo leer rate confirmations',
    'Cómo comunicarte con brokers y carriers',
    'Negociación de tarifas',
    'Documentos y procesos esenciales',
    'Cómo manejar el día a día de un dispatcher',
  ],
};

// ---------------------------------------------------------------- DAY TWO ---
export const DAY_2 = {
  title: 'Construye tu cartera de clientes',
  intro:
    'El segundo día nos enfocamos en convertir lo que aprendiste en un negocio.',
  items: [
    'Cómo encontrar tus primeros carriers',
    'Estrategias para conseguir clientes',
    'Cómo crear una red de referidos',
    'Cómo presentar y vender tus servicios',
    'Cómo organizar y crecer tu negocio de dispatch',
    'Cómo construir relaciones para depender menos de los load boards',
  ],
};

// The line that sits above both day cards.
export const CURRICULUM_KICKER = '2 días. De cero a tu propio negocio de dispatch.';

// ------------------------------------------------------- LANGUAGE BARRIER ---
// Sits directly under the two day cards. This is the objection that stops this
// audience buying more than price does, so it gets its own section rather than
// a line in the FAQ.
export const LANGUAGE = {
  heading: '¿Y si mi inglés no es muy fuerte?',
  lead: 'No dejes que el idioma te detenga.',
  body: [
    'La industria del transporte opera mucho en inglés, pero eso no significa que tengas que esperar para comenzar.',
    'Durante el entrenamiento hablamos de herramientas y estrategias que puedes utilizar para superar la barrera del idioma mientras fortaleces tu inglés, incluyendo formas de comunicarte con brokers y manejar procesos en inglés.',
    'También existe una gran comunidad de conductores y dueños de camiones hispanohablantes que prefieren trabajar con un dispatcher que hable español.',
  ],
  close: 'Tu español puede ser una ventaja. Te enseñamos cómo navegar el resto.',
};

// Who this is for. Answers "is this me?" before the price is mentioned.
export const AUDIENCE = [
  'Personas que quieren entrar al transporte de carga y no saben por dónde empezar',
  'Despachadores nuevos que ya empezaron pero van improvisando',
  'Dueños de camión que quieren despachar sus propias cargas en vez de pagarle a alguien',
  'Cualquiera que quiera trabajar desde casa en una industria que nunca se detiene',
];

// The objections that stop someone buying, other than language.
export const OBJECTIONS = [
  {
    q: '¿Necesito experiencia previa?',
    a: 'No. El día 1 empieza desde cero. Si nunca has visto un load board, ese es exactamente el punto de partida.',
  },
  {
    q: '¿Necesito un camión o una licencia CDL?',
    a: 'Ninguno de los dos. El despachador no maneja y no es dueño del equipo. Trabajas desde una computadora.',
  },
  {
    q: '¿Está saturado el mercado?',
    a: 'Es una industria de $900 mil millones que nunca deja de moverse. Siempre hay lugar para alguien que trabaja con orden y responde el teléfono.',
  },
  {
    q: '¿Y si no puedo asistir en vivo?',
    a: 'El entrenamiento es en vivo los dos días. Es donde puedes preguntar sobre tu situación específica, y esa parte no se puede grabar.',
  },
];
