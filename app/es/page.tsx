import type { Metadata } from 'next';
import {
  ArrowRight,
  CheckCircle2,
  TrendingUp,
  ShieldCheck,
  Users,
  Clock,
  Calendar,
  Star,
  CircleDot,
  Truck,
  Briefcase,
  Package,
  Phone,
  AlertTriangle,
  KeyRound,
  Layers,
} from 'lucide-react';
import Image from 'next/image';
import CountdownTimer from '@/components/countdown-timer';
import Typewriter from '@/components/typewriter';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import WebinarEsRegistration from '@/components/webinar-es-registration';
import Reveal from '@/components/reveal';
import FlipCard from '@/components/flip-card';
import TiltCard from '@/components/tilt-card';
import IlluminatedHeading from '@/components/illuminated-heading';
import { UNITS_ES, FLIP_TEXT_ES } from '@/lib/ui-text-es';
import {
  WEBINAR_ES_DATE_DISPLAY,
  WEBINAR_ES_TIME_DISPLAY,
  WEBINAR_ES_TIME_PACIFIC,
  WEBINAR_ES_DURATION_MINUTES,
  WEBINAR_ES_TIMESTAMP,
} from '@/lib/webinar-es-config';

// The English webinar page (app/page.tsx) in Spanish: same masterclass, same
// sections, same order. Copy is Cora's, translated; she reviews it before ads run.

const TITLE = 'El Blueprint del Emprendedor en Transporte™ | Webinar gratis en español';
const DESCRIPTION =
  'Masterclass gratis en español: cómo construir un negocio de transporte en el orden correcto. Miércoles 18 de noviembre, 6:00 PM hora del Este.';

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: '/es' },
  openGraph: { title: TITLE, description: DESCRIPTION, url: '/es', locale: 'es_US' },
  twitter: { title: TITLE, description: DESCRIPTION },
};

const PROMISES = [
  {
    icon: TrendingUp,
    title: 'Cuánto vale la oportunidad',
    body: 'Exactamente cuánto paga esta industria — y quién se queda con ese dinero.',
  },
  {
    icon: Layers,
    title: 'Los cuatro pilares',
    body: 'La base de todo negocio de transporte que sobrevive.',
  },
  {
    icon: AlertTriangle,
    title: 'Las trampas que acaban con la gente',
    body: 'El fraude y los errores que terminan con los negocios antes de que empiecen.',
  },
  {
    icon: KeyRound,
    title: 'El primer paso',
    body: 'El único movimiento que separa a los dueños de los que solo sueñan.',
  },
];

const LANES = [
  {
    icon: <Truck className="w-6 h-6" />,
    name: 'Carrier / Owner-Operator',
    body: 'Tú mueves la carga y tienes la autoridad.',
    requirements: ['Una entidad de negocio', 'Autoridad USDOT + MC', 'Seguro', 'Registro BOC-3'],
  },
  {
    icon: <Phone className="w-6 h-6" />,
    name: 'Despachador',
    body: 'Reservas cargas y coordinas choferes para los carriers.',
    requirements: [
      'Una entidad de negocio',
      'Sistemas + carriers como clientes',
      'La forma más fácil de empezar',
    ],
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    name: 'Broker de carga',
    body: 'Conectas a quien envía la carga con carriers, a cambio de un margen.',
    requirements: [
      'Una entidad de negocio',
      'Autoridad de broker',
      'Fianza BMC-84 de $75,000',
      'Registro BOC-3',
    ],
  },
  {
    icon: <Package className="w-6 h-6" />,
    name: 'Freight Forwarder',
    body: 'Organizas y coordinas los envíos de quien envía la carga.',
    requirements: ['Una entidad de negocio', 'Autoridad de forwarder', 'Fianza', 'Seguro'],
  },
];

const OBJECTIONS = [
  {
    q: 'No tengo dinero para un camión.',
    a: 'No lo necesitas. El despacho y el brokerage nunca tocan un camión — y los carriers primero forman el negocio y después financian el equipo.',
  },
  {
    q: 'No tengo licencia CDL.',
    a: 'Los despachadores y los brokers no manejan. Y muchos carriers contratan choferes en vez de manejar ellos mismos.',
  },
  {
    q: '¿El mercado no está saturado?',
    a: 'Es una industria de $900 mil millones que nunca deja de moverse. Siempre hay lugar para alguien que lo maneja como un negocio de verdad.',
  },
  {
    q: 'No sé por dónde empezar.',
    a: 'De eso se trata. El Blueprint te dice por dónde empezar — en el orden correcto, y con ayuda.',
  },
];

const PILLARS = [
  {
    n: '1',
    name: 'Lanzar',
    tag: 'Existir legalmente',
    points: [
      ['Elige tu modelo de negocio', 'La estructura que encaja con la forma en que de verdad vas a ganar dinero.'],
      ['Forma la entidad + EIN', 'La línea entre un pasatiempo y un negocio que los bancos y los brokers respetan.'],
      ['Registros y licencias', 'En el orden correcto, para que nada de lo que construyas después se venga abajo.'],
    ],
    warning: 'Sáltate esto, y todo lo demás se derrumba.',
  },
  {
    n: '2',
    name: 'Operar',
    tag: 'Trabajar en orden',
    points: [
      ['Sistemas y organización', 'Para que el negocio funcione sin que tengas que cargarlo todo en la cabeza.'],
      ['Cumplimiento y finanzas', 'Mantente en regla y lleva cuentas limpias antes de que un problema te obligue.'],
      ['Tecnología + un equipo de asesores de confianza', 'Las personas y herramientas que te mantienen avanzando cuando se pone difícil.'],
    ],
    warning: 'Sáltate esto, y el crecimiento se vuelve un caos.',
  },
  {
    n: '3',
    name: 'Generar ingresos',
    tag: 'Cobrar',
    points: [
      ['Construye credibilidad', 'La razón por la que clientes y socios te confían dinero de verdad.'],
      ['Marketing y clientes', 'El motor que llena tu cartera en vez de rezar para que salgan cargas.'],
      ['Alianzas estratégicas', 'Relaciones que te pagan una y otra vez con el tiempo.'],
    ],
    warning: 'Sáltate esto, y tienes un camión — no un negocio.',
  },
  {
    n: '4',
    name: 'Proteger',
    tag: 'Seguir en pie',
    points: [
      ['Cumplimiento continuo', 'Protegerte no es algo de una sola vez — es cómo sigues en el negocio.'],
      ['Contratos, seguros e impuestos', 'Las barreras que evitan que un mal día acabe contigo.'],
      ['Alerta contra el fraude', 'La amenaza que está acabando con los nuevos operadores ahora mismo.'],
    ],
    warning: 'Sáltate esto, y un mal día puede borrar años.',
  },
];

const CTA_CLASS =
  'btn-glow w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 px-6 sm:px-10 rounded-full max-[359px]:text-sm text-base sm:text-lg';

export default function WebinarEsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <SiteHeader ctaLabel="Reservar mi lugar" ctaHref="/es#registro" />

        <div className="absolute inset-0 z-0 bg-brand-navy">
          <Image
            src="/images/hero-truck.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={85}
            className="object-cover object-[35%_center] opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-navy/40 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-44 lg:pb-40 flex flex-col items-center text-center">
          <div className="inline-block bg-brand-red/10 border border-brand-red text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            MASTERCLASS GRATIS DE {WEBINAR_ES_DURATION_MINUTES} MINUTOS · EN ESPAÑOL
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight max-w-4xl leading-tight mb-6">
            El <Typewriter text="Blueprint" className="text-brand-red" />
            <span className="text-brand-red align-super text-xl md:text-2xl">™</span>{' '}
            del Emprendedor en Transporte
          </h1>

          <p className="font-heading text-lg md:text-xl text-white/90 mb-4 tracking-wide">
            Una industria. Muchos caminos. Un primer paso.
          </p>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            La mayoría de las personas que entran a esta industria quiebran o desaparecen
            en menos de un año. Casi nunca es porque no pudieran hacer el trabajo — es
            porque nadie les enseñó el orden correcto para construir.
          </p>

          <CountdownTimer
            target={WEBINAR_ES_TIMESTAMP}
            label="Las inscripciones cierran en"
            units={UNITS_ES}
            liveText="La masterclass está en vivo ahora"
          />

          <a href="#registro" className={CTA_CLASS}>
            REGÍSTRATE GRATIS
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-gray-400 font-medium">
            No necesitas tarjeta de crédito. Los lugares son limitados.
          </p>
        </div>
      </section>

      {/* THE NUMBERS */}
      <section className="bg-brand-navy border-t border-white/10 py-14 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-10 text-center">
          {[
            { stat: '$900B+', label: 'Tamaño de la industria del transporte por camión en EE. UU. (2024)' },
            { stat: '72%', label: 'de toda la carga en EE. UU. se mueve por camión' },
            { stat: '$150K–$220K+', label: 'ingresos brutos potenciales de un owner-operator*' },
          ].map((s) => (
            <div key={s.label}>
              <p className="font-heading text-3xl md:text-4xl font-black text-brand-red mb-2">
                {s.stat}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="max-w-3xl mx-auto mt-8 text-center text-xs text-gray-500 leading-relaxed">
          *Rangos de la industria según datos públicos de 2024–25 (ATA, ATRI). Son
          ilustrativos, no una garantía — el ingreso neto varía mucho según cómo se
          construye y se maneja el negocio.
        </p>
      </section>

      <WebinarEsRegistration />

      {/* WHAT YOU'LL WALK AWAY WITH */}
      <section className="illuminated-bg py-24 md:py-32 bg-black">
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="font-heading text-3xl md:text-5xl font-black uppercase text-white mb-6 leading-tight">
              <IlluminatedHeading text="Lo que te vas a llevar" />
            </h2>
            <p className="text-lg text-gray-400">Un mapa — no solo motivación.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROMISES.map(({ icon: Icon, title, body }, i) => (
              <Reveal
                key={title}
                index={i}
                className="bg-white/[0.04] backdrop-blur-sm p-8 rounded-2xl border border-white/10 hover:border-brand-red/60 transition-colors relative overflow-hidden group h-full"
              >
                <div className="absolute -top-4 -right-4 p-4 opacity-[0.07] group-hover:opacity-[0.14] transition-opacity transform group-hover:scale-110 duration-300">
                  <Icon className="w-32 h-32 text-white" />
                </div>
                <div className="w-12 h-12 bg-brand-red/15 rounded-full flex items-center justify-center mb-6 relative z-10">
                  <CircleDot className="w-6 h-6 text-brand-red" />
                </div>
                <h3 className="font-heading text-lg font-bold text-white mb-3 relative z-10">
                  {title}
                </h3>
                <p className="text-gray-400 leading-relaxed relative z-10 text-sm">
                  {body}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FOUR LANES */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
              Cuatro formas de entrar
            </h2>
            <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600">
              No necesitas un camión para ganar dinero en esta industria. Estas son las
              cuatro formas de entrar — y la llave que abre cada una.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Pasa el cursor o toca una tarjeta para ver qué se necesita en cada una.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {LANES.map((lane, i) => (
              <Reveal key={lane.name} index={i}>
                <FlipCard {...lane} text={FLIP_TEXT_ES} />
              </Reveal>
            ))}
          </div>

          <div className="bg-brand-navy rounded-2xl p-8 md:p-10 text-center">
            <p className="font-heading text-xl md:text-2xl font-bold text-white leading-relaxed">
              Caminos distintos — el mismo primer paso.{' '}
              <span className="text-brand-red">
                Tu negocio tiene que existir legalmente.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* OBJECTIONS */}
      <section className="py-20 md:py-28 bg-brand-gray">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
              Lo que quizás estás pensando
            </h2>
            <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600">
              Las razones con las que la gente se convence de no hacerlo.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            {OBJECTIONS.map(({ q, a }, i) => (
              <Reveal
                key={q}
                index={i}
                className="bg-white rounded-2xl p-7 border border-gray-200 h-full"
              >
                <p className="font-heading text-lg font-bold text-brand-navy mb-3">
                  &ldquo;{q}&rdquo;
                </p>
                <p className="text-gray-600 leading-relaxed">{a}</p>
              </Reveal>
            ))}
          </div>

          <p className="text-center font-heading text-lg md:text-xl font-bold text-brand-navy">
            Cada una de estas es una razón para{' '}
            <span className="text-brand-red">empezar bien</span> — no una razón para
            esperar.
          </p>
        </div>
      </section>

      {/* THE FOUR PILLARS */}
      <section className="py-20 md:py-28 bg-brand-navy">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-white mb-4">
              El Blueprint
            </h2>
            <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-300">
              Hay cuatro pilares entre tú y un negocio que te pague. El orden no es un
              detalle — es todo.
            </p>
          </div>

          {/* Scroll stack. No Reveal wrapper: a transform on an ancestor breaks sticky. */}
          <div className="max-w-3xl mx-auto">
            {PILLARS.map(({ n, name, tag, points, warning }, i) => (
              <div
                key={n}
                className="pillar-card"
                style={{ '--i': i } as React.CSSProperties}
              >
                <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 md:p-10">
                  <div className="flex items-center gap-5 mb-8">
                    <div className="w-14 h-14 shrink-0 rounded-full bg-brand-red text-white font-heading font-black text-2xl flex items-center justify-center">
                      {n}
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl md:text-3xl font-black uppercase text-brand-navy leading-none">
                        {name}
                      </h3>
                      <p className="text-brand-red font-bold text-sm uppercase tracking-widest mt-1.5">
                        {tag}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-5 mb-8">
                    {points.map(([title, body]) => (
                      <li key={title} className="flex items-start">
                        <CheckCircle2 className="w-5 h-5 text-brand-red mr-3 shrink-0 mt-0.5" />
                        <div>
                          <p className="font-bold text-brand-navy">{title}</p>
                          <p className="text-gray-600 text-sm leading-relaxed mt-0.5">
                            {body}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <p className="border-t border-gray-100 pt-5 text-sm font-bold text-brand-navy">
                    <span className="text-brand-red mr-1.5">→</span>
                    {warning}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-gray-400 mt-10 max-w-2xl mx-auto leading-relaxed">
            Sáltate el primero y todo lo demás se derrumba. Hazlo bien, en orden, y los
            otros tres por fin tienen algo sólido en qué apoyarse.
          </p>
        </div>
      </section>

      {/* DETAILS + TRUST */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
                  Todo lo que necesitas saber
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Esto no es relleno. Son {WEBINAR_ES_DURATION_MINUTES} minutos del orden
                  exacto para construir, más preguntas y respuestas en vivo al final.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-brand-teal/10 p-3 rounded-xl mr-4 text-brand-teal">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-lg">Fecha</h4>
                    <p className="text-gray-600 font-medium">{WEBINAR_ES_DATE_DISPLAY}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 bg-brand-teal/10 p-3 rounded-xl mr-4 text-brand-teal">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-lg">Hora</h4>
                    <p className="text-gray-600 font-medium">
                      {WEBINAR_ES_TIME_DISPLAY}{' '}
                      <span className="text-gray-500 font-normal">
                        ({WEBINAR_ES_DURATION_MINUTES} min)
                      </span>
                    </p>
                    <p className="text-gray-500 text-sm">{WEBINAR_ES_TIME_PACIFIC}</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-gray p-8 rounded-2xl border-l-4 border-brand-red">
                <h3 className="font-heading text-xl font-bold text-brand-navy mb-5">
                  ¿Quién debería asistir?
                </h3>
                <ul className="space-y-4">
                  {[
                    'Cualquiera que quiera entrar al transporte pero todavía no ha formado legalmente su negocio',
                    'Owner-operators y carriers que van camino a tener su propia autoridad',
                    'Despachadores y brokers que quieren manejarlo como un negocio de verdad, no como un trabajo extra',
                    'Cualquiera que ya empezó y sospecha que lo hizo en el orden equivocado',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-brand-red mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Fraud callout */}
            <TiltCard className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-brand-teal rounded-3xl transform translate-x-4 translate-y-4 opacity-20 hidden md:block"></div>
              <div className="bg-brand-navy rounded-3xl p-8 md:p-10 relative z-10 text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6 text-brand-red">
                  <AlertTriangle className="w-8 h-8" />
                  <span className="font-heading text-sm font-bold uppercase tracking-widest">
                    Conoce el juego
                  </span>
                </div>

                <p className="font-heading text-3xl md:text-4xl font-black text-brand-red mb-4">
                  $725M
                </p>
                <p className="text-xl md:text-2xl font-heading leading-relaxed mb-8 text-gray-100">
                  perdidos por fraude de carga en 2025 — y las autoridades nuevas son el
                  blanco número uno.
                </p>

                <p className="text-gray-300 leading-relaxed mb-6">
                  Explicamos el doble brokering, la clonación de MC y los rate cons falsos —
                  y las señales de alerta que delatan cada uno antes de que te cuesten.
                </p>

                <div className="pt-6 border-t border-gray-700/50 flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold tracking-widest text-gray-400 uppercase">
                  <span>Todo en español</span>
                  <span className="text-brand-red">Preguntas en vivo</span>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-brand-navy text-center py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red via-brand-navy to-brand-navy"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white mb-6 leading-tight">
            No estás construyendo un empleo. Estás construyendo un patrimonio.
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            No hacer nada también es una decisión — y tiene un precio. Cada mes sin
            formar tu negocio es dinero que no puedes cobrar.
          </p>
          <a href="#registro" className={CTA_CLASS}>
            REGÍSTRATE GRATIS
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-gray-400 font-medium text-sm">
            <span className="flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-brand-teal" /> 100% gratis
            </span>
            <span className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-brand-teal" /> Lugares limitados
            </span>
            <span className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-brand-teal" /> Preguntas en vivo
            </span>
          </div>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="bg-white py-10 px-6 border-t border-gray-100">
        <p className="max-w-3xl mx-auto text-center text-xs text-gray-500 leading-relaxed">
          DMG Agency Core ofrece educación y consultoría de negocios — no asesoría legal,
          fiscal ni financiera. No somos abogados, contadores públicos (CPA) ni asesores
          fiscales con licencia. Para tu situación específica, consulta a un profesional
          con licencia. Todo lo que se presenta es informativo. Los resultados varían —
          nada de esto garantiza ingresos ni el éxito de un negocio.
        </p>
      </section>

      <SiteFooter
        tagline="Lanzar · Operar · Generar ingresos · Proteger"
        rightsText="Todos los derechos reservados."
      />
    </div>
  );
}
