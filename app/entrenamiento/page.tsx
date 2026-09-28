import type { Metadata } from 'next';
import Image from 'next/image';
import {
  ArrowRight,
  CheckCircle2,
  Calendar,
  Clock,
  Video,
  ShieldCheck,
  AlertTriangle,
  Laptop,
  Languages,
} from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CountdownTimer from '@/components/countdown-timer';
import Reveal from '@/components/reveal';
import IlluminatedHeading from '@/components/illuminated-heading';
import TrainingRegistration from '@/components/training-registration';
import {
  DAY_1,
  DAY_2,
  AUDIENCE,
  OBJECTIONS,
  CURRICULUM_KICKER,
  LANGUAGE,
} from '@/lib/training-content.mjs';
import {
  DAY_1_SHORT,
  DAY_2_SHORT,
  DAY_1_DISPLAY,
  DAY_2_DISPLAY,
  DAY_1_TIME,
  DAY_2_TIME,
  PRICE,
  TRAINING_TIMESTAMP,
  REFUND_POLICY_ES,
} from '@/lib/training-config.mjs';

type DayContent = { title: string; intro: string; items: string[] };
type Objection = { q: string; a: string };

const TITLE = 'Entrenamiento de Despacho en Español | DMG Agency Core';
const DESCRIPTION = `Entrenamiento en vivo de 2 días para aprender despacho de camiones desde cero. ${DAY_1_SHORT} y ${DAY_2_SHORT} de 2026. $${PRICE} USD.`;

export const metadata: Metadata = {
  metadataBase: new URL('https://entrenamiento.dmgagencycore.com'),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: 'DMG Agency Core',
    images: [{ url: '/images/hero-truck.jpg', width: 2400, height: 1600 }],
    locale: 'es_US',
    type: 'website',
  },
};

const CTA_CLASS =
  'btn-glow w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 px-6 sm:px-10 rounded-full max-[359px]:text-sm text-base sm:text-lg';

const INCLUDED = [
  'Dos días completos de entrenamiento en vivo',
  'Preguntas y respuestas en vivo los dos días',
  'Todo el material en español',
  'Plantillas y guiones que puedes usar de inmediato',
];

const STATS = [
  { stat: '$900 mil M', label: 'tamaño de la industria del transporte en EE. UU.' },
  { stat: '72%', label: 'de toda la carga en EE. UU. se mueve por camión' },
  { stat: '$0', label: 'en equipo — el despachador trabaja desde una computadora' },
];

function Day({
  day,
  label,
  time,
}: {
  day: DayContent;
  label: string;
  time: string;
}) {
  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 md:p-10 h-full flex flex-col">
      {/* The time sits beside the day label because the two days start at
          different hours. Putting it only in the details grid lower down
          would let someone plan around the wrong one. */}
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
        <p className="text-brand-red font-bold text-sm uppercase tracking-widest">
          {label}
        </p>
        <span className="text-xs font-bold uppercase tracking-widest text-gray-400">
          {time}
        </span>
      </div>

      <h3 className="font-heading text-2xl md:text-3xl font-black uppercase text-brand-navy leading-tight mb-3">
        {day.title}
      </h3>
      <p className="text-gray-600 mb-8 leading-relaxed">{day.intro}</p>

      <ul className="space-y-4 mt-auto">
        {day.items.map((item) => (
          <li key={item} className="flex items-start">
            <CheckCircle2 className="w-5 h-5 text-brand-red mr-3 shrink-0 mt-0.5" />
            <span className="text-brand-navy font-medium leading-snug">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function TrainingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO — dusk landscape treatment, see .hero-dusk in globals.css */}
      <section className="hero-dusk relative text-white overflow-hidden">
        <SiteHeader ctaLabel="Reservar mi lugar" ctaHref="/entrenamiento#registro" />

        <div className="absolute inset-0 z-0">
          <div className="hero-dusk-sky" />
          <Image
            src="/images/hero-truck.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            quality={85}
            className="hero-dusk-terrain object-cover object-[40%_bottom] opacity-[0.55]"
          />
          <div className="hero-dusk-horizon" />
          <div className="hero-dusk-vignette" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-44 lg:pb-40 flex flex-col items-center text-center">
          <div className="inline-block bg-brand-red/10 border border-brand-red text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            EN VIVO · 2 DÍAS · EN ESPAÑOL
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight max-w-4xl leading-tight mb-6">
            Aprende a despachar camiones{' '}
            <span className="text-brand-red">desde cero</span>
          </h1>

          <p className="font-heading text-lg md:text-xl text-white/90 mb-4 tracking-wide">
            Sin camión. Sin CDL. Sin experiencia previa.
          </p>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            Dos días en vivo para aprender cómo encontrar cargas, negociar tarifas,
            cobrar a tiempo y construir tu propia cartera de clientes.
          </p>

          <CountdownTimer
            target={TRAINING_TIMESTAMP}
            label="El entrenamiento empieza en"
          />

          <a href="#registro" className={CTA_CLASS}>
            RESERVAR MI LUGAR — ${PRICE}
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-gray-400 font-medium">
            {DAY_1_SHORT} y {DAY_2_SHORT} · cupo limitado
          </p>
        </div>
      </section>

      {/* THE NUMBERS */}
      <section className="bg-brand-navy border-t border-white/10 py-14 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-10 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="font-heading text-3xl md:text-4xl font-black text-brand-red mb-2">
                {s.stat}
              </p>
              <p className="text-sm text-gray-400 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CURRICULUM — the centrepiece. Someone deciding on $197 decides here. */}
      <section className="py-20 md:py-28 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
              Lo que vas a aprender
            </h2>
            <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-6" />
            <p className="font-heading text-lg md:text-xl font-bold text-brand-navy uppercase tracking-wide">
              {CURRICULUM_KICKER}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Reveal index={0}>
              <Day
                day={DAY_1 as DayContent}
                label={`Día 1 · ${DAY_1_SHORT}`}
                time={DAY_1_TIME}
              />
            </Reveal>
            <Reveal index={1}>
              <Day
                day={DAY_2 as DayContent}
                label={`Día 2 · ${DAY_2_SHORT}`}
                time={DAY_2_TIME}
              />
            </Reveal>
          </div>

          {/* LANGUAGE — the objection that stops this audience buying more than
              price does, so it sits directly under the curriculum rather than
              among the smaller FAQ cards further down. */}
          <Reveal index={2} className="mt-8">
            <div className="bg-brand-navy rounded-3xl p-8 md:p-12 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-6 text-brand-red">
                <Languages className="w-7 h-7" />
                <span className="font-heading text-sm font-bold uppercase tracking-widest">
                  Hablemos del idioma
                </span>
              </div>

              <h3 className="font-heading text-2xl md:text-4xl font-black uppercase leading-tight mb-4">
                {LANGUAGE.heading}
              </h3>

              <p className="font-heading text-xl md:text-2xl text-brand-red font-bold mb-8">
                {LANGUAGE.lead}
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {(LANGUAGE.body as string[]).map((para) => (
                  <p key={para} className="text-gray-300 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>

              <p className="font-heading text-lg md:text-xl font-bold border-t border-white/10 pt-6">
                {LANGUAGE.close}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* WHO IT IS FOR + the fraud hook */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
                ¿Es para ti?
              </h2>
              <div className="w-24 h-1 bg-brand-red rounded-full mb-8" />
              <ul className="space-y-4">
                {(AUDIENCE as string[]).map((a) => (
                  <li key={a} className="flex items-start">
                    <CheckCircle2 className="w-5 h-5 text-brand-red mr-3 shrink-0 mt-1" />
                    <span className="text-gray-700 font-medium leading-relaxed">{a}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex-1 w-full bg-brand-navy rounded-3xl p-8 md:p-10 text-white shadow-2xl">
              <div className="flex items-center gap-3 mb-6 text-brand-red">
                <AlertTriangle className="w-7 h-7" />
                <span className="font-heading text-sm font-bold uppercase tracking-widest">
                  Lo que nadie te cuenta
                </span>
              </div>
              <p className="font-heading text-3xl md:text-4xl font-black text-brand-red mb-4">
                $725 millones
              </p>
              <p className="text-xl font-heading leading-relaxed mb-6 text-gray-100">
                se perdieron por fraude en el transporte en 2025 — y los operadores
                nuevos son el blanco número uno.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Aprender a leer un rate confirmation y a verificar con quién estás
                tratando es parte del día 1, antes de que te cueste dinero.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section className="illuminated-bg py-24 md:py-32 bg-black">
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-black uppercase text-white mb-6 leading-tight">
            <IlluminatedHeading text="Un precio. Todo incluido." />
          </h2>

          <div className="mt-12 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl p-10 md:p-12">
            <p className="font-heading text-6xl md:text-7xl font-black text-brand-red leading-none">
              ${PRICE}
            </p>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-3 mb-10">
              USD · pago único
            </p>

            <ul className="space-y-4 text-left max-w-md mx-auto mb-10">
              {INCLUDED.map((i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-brand-red mr-3 shrink-0 mt-0.5" />
                  <span className="text-gray-200 leading-relaxed">{i}</span>
                </li>
              ))}
            </ul>

            <a href="#registro" className={CTA_CLASS}>
              RESERVAR MI LUGAR
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>

            <p className="text-xs text-gray-500 mt-6 leading-relaxed">
              {REFUND_POLICY_ES}
            </p>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4 text-center">
            Los detalles
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-14" />

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Calendar,
                label: 'Día 1',
                value: `${DAY_1_DISPLAY} · ${DAY_1_TIME}`,
              },
              {
                icon: Calendar,
                label: 'Día 2',
                value: `${DAY_2_DISPLAY} · ${DAY_2_TIME}`,
              },
              {
                icon: Clock,
                label: 'Ojo con la hora',
                value: 'Cada día empieza a una hora distinta. Revisa las dos.',
              },
              {
                icon: Video,
                label: 'Dónde',
                value: 'En vivo por Zoom — recibes los enlaces al completar tu pago',
              },
              {
                icon: Laptop,
                label: 'Qué necesitas',
                value: 'Una computadora e internet. Nada más.',
              },
              {
                icon: ShieldCheck,
                label: 'Idioma',
                value: 'Todo el entrenamiento es en español',
              },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-start gap-4 bg-brand-gray rounded-2xl p-6"
              >
                <div className="mt-0.5 shrink-0 text-brand-teal">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                    {label}
                  </p>
                  <p className="font-medium text-brand-navy leading-snug">{value}</p>
                </div>
              </div>
            ))}
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
            <div className="w-24 h-1 bg-brand-red mx-auto rounded-full" />
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {(OBJECTIONS as Objection[]).map(({ q, a }, i) => (
              <Reveal
                key={q}
                index={i}
                className="bg-white rounded-2xl p-7 border border-gray-200 h-full"
              >
                <p className="font-heading text-lg font-bold text-brand-navy mb-3">
                  {q}
                </p>
                <p className="text-gray-600 leading-relaxed">{a}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TrainingRegistration />

      {/* DISCLAIMER */}
      <section className="bg-white py-10 px-6 border-t border-gray-100">
        <p className="max-w-3xl mx-auto text-center text-xs text-gray-500 leading-relaxed">
          DMG Agency Core ofrece educación y consultoría de negocios — no asesoría
          legal, fiscal ni financiera. No somos abogados, contadores públicos ni
          asesores fiscales autorizados. Para tu situación específica, consulta a un
          profesional con licencia. Los resultados varían y nada aquí garantiza
          ingresos ni éxito comercial.
        </p>
      </section>

      <SiteFooter
        tagline="Lanzar · Operar · Generar ingresos · Proteger"
        rightsText="Todos los derechos reservados."
      />
    </div>
  );
}
