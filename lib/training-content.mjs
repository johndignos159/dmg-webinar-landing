/**
 * Spanish Group Dispatch Training — all copy in one place.
 *
 * DRAFT CURRICULUM, 2026-09-25. Written from what dmgagencycore.com already
 * claims to do for carriers — load sourcing, broker communication, rate
 * negotiation, weekly invoicing — plus the freight-fraud material from the
 * webinar deck.
 *
 * John must verify every module below is genuinely taught before this page
 * goes live. The refund policy is all-sales-final, so a buyer who does not get
 * what the page promised has no refund route and goes straight to a card
 * dispute instead. Promising a module nobody delivers is the most expensive
 * mistake available on this page.
 */

// ---------------------------------------------------------------- DAY ONE ---
// Foundations. Someone who has never dispatched should finish day 1 able to
// read a load board and say why a given load is or is not worth taking.
export const DAY_1 = {
  title: 'Fundamentos del despacho',
  subtitle: 'De cero a entender cómo se mueve el dinero en la carga',
  modules: [
    {
      n: '1',
      title: 'Cómo se mueve la carga en Estados Unidos',
      body: 'Shipper, broker, carrier, despachador — quién es quién, quién le paga a quién, y dónde está tu lugar en esa cadena.',
    },
    {
      n: '2',
      title: 'Qué hace realmente un despachador',
      body: 'El trabajo real, hora por hora. Lo que sí es tu responsabilidad y lo que no lo es — la confusión aquí es la que quema a la gente nueva.',
    },
    {
      n: '3',
      title: 'Tus herramientas de trabajo',
      body: 'Load boards (DAT, Truckstop), hojas de cálculo y sistemas de seguimiento. Qué necesitas de verdad para empezar y qué puede esperar.',
    },
    {
      n: '4',
      title: 'Leer un rate confirmation',
      body: 'Línea por línea. Qué revisar antes de aceptar, y las cláusulas que cuestan dinero cuando nadie las lee.',
    },
    {
      n: '5',
      title: 'Costo por milla',
      body: 'El número que decide si una carga vale la pena. Cómo calcularlo y por qué una tarifa alta puede seguir siendo un mal negocio.',
    },
    {
      n: '6',
      title: 'Encontrar y calificar cargas',
      body: 'Cómo filtrar cientos de publicaciones hasta las pocas que sirven, y qué descartar de inmediato.',
    },
  ],
};

// ---------------------------------------------------------------- DAY TWO ---
// Operating. Day 2 is the part that separates someone who can find a load from
// someone who can run this as a business and get paid for it.
export const DAY_2 = {
  title: 'Operar como un negocio',
  subtitle: 'Negociar, cobrar, protegerte y conseguir tus primeros clientes',
  modules: [
    {
      n: '7',
      title: 'Negociación de tarifas',
      body: 'Qué decir, en qué orden, y cuándo retirarte. Guiones que puedes usar el lunes por la mañana.',
    },
    {
      n: '8',
      title: 'Comunicación con brokers',
      body: 'Cómo construir la relación que hace que te llamen a ti primero cuando sale una buena carga.',
    },
    {
      n: '9',
      title: 'Documentación y facturación',
      body: 'BOL, POD y el paquete de facturación. Cómo cobrar completo y a tiempo, sin perseguir a nadie.',
    },
    {
      n: '10',
      title: 'Factoring y flujo de caja',
      body: 'Cuándo conviene, cuánto cuesta realmente, y cómo sobrevivir los 30 días que tarda un broker en pagar.',
    },
    {
      n: '11',
      title: 'Fraude en el transporte',
      body: 'Doble corretaje, clonación de MC y cargas falsas. Se perdieron $725 millones en 2025 y los operadores nuevos son el blanco número uno. Las señales de alerta que delatan cada uno.',
    },
    {
      n: '12',
      title: 'Conseguir tus primeros carriers',
      body: 'Dónde están, qué les importa y qué ofrecerles para que trabajen contigo en lugar de con el despachador que ya tienen.',
    },
  ],
};

// Who this is for. Answers "is this me?" before the price is mentioned.
export const AUDIENCE = [
  'Personas que quieren entrar al transporte de carga y no saben por dónde empezar',
  'Despachadores nuevos que ya empezaron pero van improvisando',
  'Dueños de camión que quieren despachar sus propias cargas en vez de pagarle a alguien',
  'Cualquiera que quiera trabajar desde casa en una industria que nunca se detiene',
];

// The objections that stop someone buying. Same job as the webinar page's
// "What you might be thinking" section.
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
