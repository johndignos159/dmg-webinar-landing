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
import RegistrationForm from '@/components/registration-form';
import Reveal from '@/components/reveal';
import FlipCard from '@/components/flip-card';
import TiltCard from '@/components/tilt-card';
import {
  WEBINAR_DATE_DISPLAY,
  WEBINAR_TIME_DISPLAY,
  WEBINAR_DURATION_MINUTES,
} from '@/lib/webinar-config';

// The four promises made on the "What you'll walk away with" slide. These are
// the open loops the session pays off, so the page should make exactly these
// four and no others.
const PROMISES = [
  {
    icon: TrendingUp,
    title: 'What the opportunity is worth',
    body: 'Exactly what this industry pays — and who actually collects it.',
  },
  {
    icon: Layers,
    title: 'The four pillars',
    body: 'What every transportation business that survives is built on.',
  },
  {
    icon: AlertTriangle,
    title: 'The traps that wipe people out',
    body: 'The fraud and mistakes ending businesses before they ever start.',
  },
  {
    icon: KeyRound,
    title: 'The one first step',
    body: 'The single move that separates owners from wishful thinkers.',
  },
];

// Four entry points into the industry. The page previously spoke only to
// owner-operators, which left three of these audiences out entirely.
// Front faces from the "Common entry points" slide, back faces from
// "What it takes to start". Every list ends up starting with the same item,
// which is the point the whole section is making.
const LANES = [
  {
    icon: <Truck className="w-6 h-6" />,
    name: 'Carrier / Owner-Operator',
    body: 'You move the freight and own the authority.',
    requirements: [
      'Business entity',
      'USDOT + MC authority',
      'Insurance',
      'BOC-3 filing',
    ],
  },
  {
    icon: <Phone className="w-6 h-6" />,
    name: 'Dispatcher',
    body: 'You book loads and manage drivers for carriers.',
    requirements: [
      'Business entity',
      'Systems + carrier clients',
      'The lowest barrier to start',
    ],
  },
  {
    icon: <Briefcase className="w-6 h-6" />,
    name: 'Freight Broker',
    body: 'You connect shippers with carriers for a margin.',
    requirements: [
      'Business entity',
      'Broker authority',
      '$75,000 BMC-84 bond',
      'BOC-3 filing',
    ],
  },
  {
    icon: <Package className="w-6 h-6" />,
    name: 'Freight Forwarder',
    body: 'You arrange and coordinate shipping for shippers.',
    requirements: [
      'Business entity',
      'Forwarder authority',
      'Bond',
      'Insurance',
    ],
  },
];

const PILLARS = [
  { n: '1', name: 'Launch', tag: 'Legally exist' },
  { n: '2', name: 'Operate', tag: 'Run it clean' },
  { n: '3', name: 'Generate Revenue', tag: 'Get paid' },
  { n: '4', name: 'Protect', tag: 'Stay alive' },
];

// Shadow and lift now come from .btn-glow in globals.css, so the one-off
// shadow utilities that used to live here are gone.
const CTA_CLASS =
  'btn-glow w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 px-6 sm:px-10 rounded-full max-[359px]:text-sm text-base sm:text-lg';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        <SiteHeader />

        <div className="absolute inset-0 z-0 bg-brand-navy">
          {/* Freightliner Cascadia on a US highway. Unsplash, free for
              commercial use, 2400x1600 monochrome.
              Focal point leans left because the truck sits around 35% across —
              on phones the container crops horizontally, and centring would
              slice the cab off. Opacity is higher than a colour photo would
              take, since monochrome cannot clash with the brand red. */}
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

        {/* Extra top padding clears the absolutely-positioned header. */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 lg:pt-44 lg:pb-40 flex flex-col items-center text-center">
          <div className="inline-block bg-brand-red/10 border border-brand-red text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            FREE {WEBINAR_DURATION_MINUTES}-MINUTE MASTERCLASS
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight max-w-4xl leading-tight mb-6">
            The Transportation Entrepreneur{' '}
            <Typewriter text="Blueprint" className="text-brand-red" />
            <span className="text-brand-red align-super text-xl md:text-2xl">™</span>
          </h1>

          <p className="font-heading text-lg md:text-xl text-white/90 mb-4 tracking-wide">
            One industry. Many lanes. One first step.
          </p>

          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mb-10 leading-relaxed">
            Most people who chase this industry are broke or gone within a year. It is
            almost never because they could not do the work — it is because nobody
            showed them the right order to build in.
          </p>

          <CountdownTimer />

          <a href="#register" className={CTA_CLASS}>
            REGISTER FOR FREE WEBINAR
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-gray-400 font-medium">
            No credit card required. Spaces are strictly limited.
          </p>
        </div>
      </section>

      {/* THE NUMBERS */}
      <section className="bg-brand-navy border-t border-white/10 py-14 px-6">
        <div className="max-w-5xl mx-auto grid sm:grid-cols-3 gap-10 text-center">
          {[
            { stat: '$900B+', label: 'U.S. trucking industry size (2024)' },
            { stat: '72%', label: 'of all U.S. freight moves by truck' },
            { stat: '$150K–$220K+', label: 'owner-operator gross revenue potential*' },
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
          *Industry ranges from public 2024–25 data (ATA, ATRI). Illustrative, not a
          guarantee — net income varies widely with how the business is built and run.
        </p>
      </section>

      <RegistrationForm />

      {/* WHAT YOU'LL WALK AWAY WITH */}
      <section className="py-20 md:py-28 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
              What You&apos;ll Walk Away With
            </h2>
            <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600">
              A map — not just motivation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROMISES.map(({ icon: Icon, title, body }, i) => (
              <Reveal
                key={title}
                index={i}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative overflow-hidden group h-full"
              >
                <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-300">
                  <Icon className="w-32 h-32 text-brand-navy" />
                </div>
                <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 relative z-10">
                  <CircleDot className="w-6 h-6 text-brand-red" />
                </div>
                <h3 className="font-heading text-lg font-bold text-brand-navy mb-3 relative z-10">
                  {title}
                </h3>
                <p className="text-gray-600 leading-relaxed relative z-10 text-sm">
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
              Four Doors In
            </h2>
            <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600">
              You do not need a truck to earn in this industry. Here are the four ways
              in — and the one key that opens every one of them.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Hover or tap a card to see what each one requires.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {LANES.map((lane, i) => (
              <Reveal key={lane.name} index={i}>
                <FlipCard {...lane} />
              </Reveal>
            ))}
          </div>

          <div className="bg-brand-navy rounded-2xl p-8 md:p-10 text-center">
            <p className="font-heading text-xl md:text-2xl font-bold text-white leading-relaxed">
              Different roads — same first move.{' '}
              <span className="text-brand-red">
                You have to legally exist as a business.
              </span>
            </p>
          </div>
        </div>
      </section>

      {/* THE FOUR PILLARS */}
      <section className="py-20 md:py-28 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
              The Blueprint
            </h2>
            <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-6"></div>
            <p className="text-lg text-gray-600">
              Four pillars stand between you and a business that pays you. The order is
              not a detail — it is the whole thing.
            </p>
          </div>

          {/* Staggered so the pillars arrive in order — the section is about
              sequence, so having them land 1, 2, 3, 4 reinforces the point. */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PILLARS.map(({ n, name, tag }, i) => (
              <Reveal key={n} index={i}>
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm text-center h-full">
                  <div className="w-12 h-12 rounded-full bg-brand-red text-white font-heading font-black text-xl flex items-center justify-center mx-auto mb-5">
                    {n}
                  </div>
                  <h3 className="font-heading text-xl font-bold text-brand-navy mb-2">
                    {name}
                  </h3>
                  <p className="text-brand-red font-medium text-sm uppercase tracking-wider">
                    {tag}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <p className="text-center text-gray-600 mt-10 max-w-2xl mx-auto leading-relaxed">
            Skip the first one and everything above it collapses. Get it right, in
            order, and the other three finally have something solid to stand on.
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
                  Everything You Need To Know
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  This isn&apos;t fluff. It&apos;s {WEBINAR_DURATION_MINUTES} minutes of
                  the exact order to build in, plus live Q&amp;A at the end.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="flex items-start">
                  <div className="mt-1 bg-brand-teal/10 p-3 rounded-xl mr-4 text-brand-teal">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-lg">Date</h4>
                    <p className="text-gray-600 font-medium">{WEBINAR_DATE_DISPLAY}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 bg-brand-teal/10 p-3 rounded-xl mr-4 text-brand-teal">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-lg">Time</h4>
                    <p className="text-gray-600 font-medium">
                      {WEBINAR_TIME_DISPLAY}{' '}
                      <span className="text-gray-500 font-normal">
                        ({WEBINAR_DURATION_MINUTES} min)
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-gray p-8 rounded-2xl border-l-4 border-brand-red">
                <h3 className="font-heading text-xl font-bold text-brand-navy mb-5">
                  Who Should Attend?
                </h3>
                <ul className="space-y-4">
                  {[
                    'Anyone who wants into transportation but has not legally formed a business yet',
                    'Owner-operators and carriers building toward their own authority',
                    'Dispatchers and brokers who want to run it as a real business, not a side hustle',
                    'Anyone who has already started and suspects they did it out of order',
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-brand-red mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Fraud callout — one of the strongest value hooks in the session. */}
            <TiltCard className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-brand-teal rounded-3xl transform translate-x-4 translate-y-4 opacity-20 hidden md:block"></div>
              <div className="bg-brand-navy rounded-3xl p-8 md:p-10 relative z-10 text-white shadow-2xl">
                <div className="flex items-center gap-3 mb-6 text-brand-red">
                  <AlertTriangle className="w-8 h-8" />
                  <span className="font-heading text-sm font-bold uppercase tracking-widest">
                    Know the game
                  </span>
                </div>

                <p className="font-heading text-3xl md:text-4xl font-black text-brand-red mb-4">
                  $725M
                </p>
                <p className="text-xl md:text-2xl font-heading leading-relaxed mb-8 text-gray-100">
                  lost to freight fraud in 2025 — and brand-new authorities are the
                  number one target.
                </p>

                <p className="text-gray-300 leading-relaxed mb-6">
                  We break down double brokering, MC cloning, and fake rate cons — plus
                  the red flags that give every one of them away before it costs you.
                </p>

                <div className="pt-6 border-t border-gray-700/50 flex flex-wrap gap-x-8 gap-y-3 text-sm font-bold tracking-widest text-gray-400 uppercase">
                  <span>Bilingual — English &amp; Spanish</span>
                  <span className="text-brand-red">Live Q&amp;A</span>
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
            You&apos;re not building a job. You&apos;re building an asset.
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Doing nothing is a decision too — and it has a price. Every month unformed
            is income you cannot collect.
          </p>
          <a href="#register" className={CTA_CLASS}>
            REGISTER FOR FREE WEBINAR
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-gray-400 font-medium text-sm">
            <span className="flex items-center">
              <ShieldCheck className="w-5 h-5 mr-2 text-brand-teal" /> 100% Free Training
            </span>
            <span className="flex items-center">
              <Users className="w-5 h-5 mr-2 text-brand-teal" /> Limited Seats Available
            </span>
            <span className="flex items-center">
              <Star className="w-5 h-5 mr-2 text-brand-teal" /> Live Q&amp;A
            </span>
          </div>
        </div>
      </section>

      {/* DISCLAIMER — mirrors the deck's own disclaimer slide. Required cover
          given the income figures shown above. */}
      <section className="bg-white py-10 px-6 border-t border-gray-100">
        <p className="max-w-3xl mx-auto text-center text-xs text-gray-500 leading-relaxed">
          DMG Agency Core provides business education and consulting — not legal, tax,
          or financial advice. We are not attorneys, CPAs, or licensed tax advisors. For
          your specific situation, consult a licensed professional. Everything presented
          is informational. Results vary — nothing here is a guarantee of income or
          business success.
        </p>
      </section>

      <SiteFooter />
    </div>
  );
}
