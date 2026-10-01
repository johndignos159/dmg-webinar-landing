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
} from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CountdownTimer from '@/components/countdown-timer';
import Reveal from '@/components/reveal';
import IlluminatedHeading from '@/components/illuminated-heading';
import TrainingEnRegistration from '@/components/training-en-registration';
import {
  DAY_1,
  DAY_2,
  AUDIENCE,
  OBJECTIONS,
  CURRICULUM_KICKER,
  EARNINGS,
  BENEFITS,
} from '@/lib/training-en-content.mjs';
import {
  DAY_1_SHORT,
  DAY_2_SHORT,
  DAY_1_DISPLAY,
  DAY_2_DISPLAY,
  DAY_1_TIME,
  DAY_2_TIME,
  PRICE,
  TRAINING_TIMESTAMP,
  REFUND_POLICY,
} from '@/lib/training-en-config.mjs';

type DayContent = { title: string; intro: string; items: string[] };
type EarningStep = {
  value: string;
  label: string;
  op: string | null;
  highlight?: boolean;
};
type Objection = { q: string; a: string };

const TITLE = 'Group Dispatch Training | DMG Agency Core';
const DESCRIPTION = `Live 2-day training to learn truck dispatching from scratch. ${DAY_1_SHORT} and ${DAY_2_SHORT}, 2026. $${PRICE} USD.`;

export const metadata: Metadata = {
  metadataBase: new URL('https://training.dmgagencycore.com'),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: 'DMG Agency Core',
    images: [{ url: '/images/hero-truck.jpg', width: 2400, height: 1600 }],
    locale: 'en_US',
    type: 'website',
  },
};

const CTA_CLASS =
  'btn-glow w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 px-6 sm:px-10 rounded-full max-[359px]:text-sm text-base sm:text-lg';

const INCLUDED = [
  'Two full days of live training',
  'Live Q&A on both days',
  'Templates and scripts you can use immediately',
  'Time to ask about your own situation',
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

export default function TrainingEnPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO — dusk landscape treatment, see .hero-dusk in globals.css */}
      <section className="hero-dusk relative text-white overflow-hidden">
        <SiteHeader ctaLabel="Reserve my seat" ctaHref="/training#register" />

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
            LIVE &middot; 2 DAYS &middot; IN ENGLISH
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight max-w-4xl leading-tight mb-6">
            Learn to dispatch trucks{' '}
            <span className="text-brand-red">from scratch</span>
          </h1>

          <p className="font-heading text-lg md:text-xl text-white/90 mb-4 tracking-wide">
            No truck. No CDL. No experience needed.
          </p>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            Two live days to learn how to find loads, negotiate rates, get paid on
            time and build your own book of clients.
          </p>

          <CountdownTimer
            target={TRAINING_TIMESTAMP}
            label="The training starts in"
          />

          <a href="#register" className={CTA_CLASS}>
            RESERVE MY SEAT — ${PRICE}
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-gray-400 font-medium">
            {DAY_1_SHORT} and {DAY_2_SHORT} &middot; limited seats
          </p>
        </div>
      </section>

      {/* THE MATHS — Cora's framing. Shows the mechanism rather than asserting
          an outcome, which is both more persuasive and the only defensible way
          to put an income figure on a sales page. The disclaimer travels with
          the number and is not optional. */}
      <section className="bg-brand-navy border-t border-white/10 py-16 md:py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <p className="font-heading text-2xl md:text-3xl font-bold text-white leading-tight">
              {EARNINGS.lead}
            </p>
            <p className="font-heading text-5xl md:text-7xl font-black text-white leading-none mt-2">
              {EARNINGS.amount}{' '}
              <span className="text-brand-red text-3xl md:text-5xl align-middle">
                {EARNINGS.period}*
              </span>
            </p>
            <p className="text-gray-400 max-w-2xl mx-auto mt-6 leading-relaxed">
              {EARNINGS.sub}
            </p>
          </div>

          {/* The equation. Wraps to a column on phones rather than shrinking
              the figures to the point of illegibility. */}
          <div className="flex flex-wrap items-stretch justify-center gap-3">
            {(EARNINGS.steps as EarningStep[]).map((step) => (
              <div key={step.label} className="flex items-stretch gap-3">
                <div
                  className={`rounded-2xl px-5 py-4 text-center min-w-[9rem] flex flex-col justify-center ${
                    step.highlight
                      ? 'bg-brand-red text-white'
                      : 'bg-white/[0.06] border border-white/10 text-white'
                  }`}
                >
                  <p className="font-heading text-2xl md:text-3xl font-black leading-none">
                    {step.value}
                  </p>
                  <p
                    className={`text-[11px] leading-snug mt-2 ${
                      step.highlight ? 'text-white/85' : 'text-gray-400'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>

                {step.op && (
                  <span className="self-center font-heading text-2xl font-black text-brand-red">
                    {step.op}
                  </span>
                )}
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto mt-8">
            *{EARNINGS.disclaimer}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
            {(BENEFITS as string[]).map((b) => (
              <div key={b} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
                <span className="text-gray-200 font-medium leading-snug text-sm">
                  {b}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CURRICULUM — the centrepiece. Someone deciding on $197 decides here.
          Unlike the Spanish page there is no language-barrier section below
          this: that objection belongs to that audience, not this one. */}
      <section className="py-20 md:py-28 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
              What you will learn
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
                label={`Day 1 · ${DAY_1_SHORT}`}
                time={DAY_1_TIME}
              />
            </Reveal>
            <Reveal index={1}>
              <Day
                day={DAY_2 as DayContent}
                label={`Day 2 · ${DAY_2_SHORT}`}
                time={DAY_2_TIME}
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* WHO IT IS FOR + the fraud hook */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="flex-1">
              <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
                Is this for you?
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
                  What nobody tells you
                </span>
              </div>
              <p className="font-heading text-3xl md:text-4xl font-black text-brand-red mb-4">
                $725 million
              </p>
              <p className="text-xl font-heading leading-relaxed mb-6 text-gray-100">
                was lost to freight fraud in 2025 — and new operators are target
                number one.
              </p>
              <p className="text-gray-300 leading-relaxed">
                Learning to read a rate confirmation and verify who you are dealing
                with is part of day 1, before it costs you money.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRICE */}
      <section className="illuminated-bg py-24 md:py-32 bg-black">
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="font-heading text-3xl md:text-5xl font-black uppercase text-white mb-6 leading-tight">
            <IlluminatedHeading text="One price. Everything included." />
          </h2>

          <div className="mt-12 bg-white/[0.04] backdrop-blur-sm border border-white/10 rounded-3xl p-10 md:p-12">
            <p className="font-heading text-6xl md:text-7xl font-black text-brand-red leading-none">
              ${PRICE}
            </p>
            <p className="text-sm font-bold uppercase tracking-widest text-gray-400 mt-3 mb-10">
              USD &middot; one-time payment
            </p>

            <ul className="space-y-4 text-left max-w-md mx-auto mb-10">
              {INCLUDED.map((i) => (
                <li key={i} className="flex items-start">
                  <CheckCircle2 className="w-5 h-5 text-brand-red mr-3 shrink-0 mt-0.5" />
                  <span className="text-gray-200 leading-relaxed">{i}</span>
                </li>
              ))}
            </ul>

            <a href="#register" className={CTA_CLASS}>
              RESERVE MY SEAT
              <ArrowRight className="ml-2 w-5 h-5" />
            </a>

            <p className="text-xs text-gray-500 mt-6 leading-relaxed">
              {REFUND_POLICY}
            </p>
          </div>
        </div>
      </section>

      {/* DETAILS */}
      <section className="py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4 text-center">
            The details
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-14" />

          <div className="grid sm:grid-cols-2 gap-6">
            {[
              {
                icon: Calendar,
                label: 'Day 1',
                value: `${DAY_1_DISPLAY} · ${DAY_1_TIME}`,
              },
              {
                icon: Calendar,
                label: 'Day 2',
                value: `${DAY_2_DISPLAY} · ${DAY_2_TIME}`,
              },
              {
                icon: Clock,
                label: 'Watch the time',
                value: 'Each day starts at a different hour. Check both.',
              },
              {
                icon: Video,
                label: 'Where',
                value: 'Live on Zoom — you get the links as soon as payment clears',
              },
              {
                icon: Laptop,
                label: 'What you need',
                value: 'A computer and internet. That is it.',
              },
              {
                icon: ShieldCheck,
                label: 'Language',
                value: 'The entire training is in English',
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
              What you might be thinking
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

      <TrainingEnRegistration />

      {/* DISCLAIMER */}
      <section className="bg-white py-10 px-6 border-t border-gray-100">
        <p className="max-w-3xl mx-auto text-center text-xs text-gray-500 leading-relaxed">
          DMG Agency Core provides business education and consulting — not legal,
          tax or financial advice. We are not attorneys, CPAs or licensed tax
          advisors. For your specific situation, consult a licensed professional.
          Results vary and nothing here guarantees income or business success.
        </p>
      </section>

      <SiteFooter
        tagline="Launch · Operate · Earn · Protect"
        rightsText="All rights reserved."
      />
    </div>
  );
}
