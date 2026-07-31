import { ArrowRight, CheckCircle2, TrendingUp, ShieldCheck, Users, Clock, Calendar, Star, CircleDot } from 'lucide-react';
import Image from 'next/image';
import CountdownTimer from '@/components/countdown-timer';
import Typewriter from '@/components/typewriter';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import {
  REGISTER_URL,
  WEBINAR_DATE_DISPLAY,
  WEBINAR_TIME_DISPLAY,
} from '@/lib/webinar-config';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      <SiteHeader />

      {/* HERO SECTION */}
      <section className="relative bg-brand-navy text-white overflow-hidden">

        {/* Background Overlay */}
        <div className="absolute inset-0 z-0 bg-brand-navy">
          <Image
            src="https://picsum.photos/seed/trucking/1920/1080"
            alt="Trucking Business Background"
            fill
            className="object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/80 to-brand-navy/40 mix-blend-multiply"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32 lg:py-40 flex flex-col items-center text-center">
          <div className="inline-block bg-brand-red/10 border border-brand-red text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            FREE EXCLUSIVE WEBINAR
          </div>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight max-w-4xl leading-tight mb-6">
            Build A Stronger <span className="text-brand-red">Trucking Business</span> &{' '}
            <Typewriter text="Scale 3X in 12 Months" />
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mb-10 leading-relaxed">
            Discover the exact blueprint top carriers use to optimize operations, stay compliant, and skyrocket profitability without working 80-hour weeks.
          </p>

          <CountdownTimer />

          <a href={REGISTER_URL} className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-200 shadow-[0_0_20px_rgba(220,20,60,0.4)] hover:shadow-[0_0_30px_rgba(220,20,60,0.6)] transform hover:-translate-y-1">
            REGISTER FOR FREE WEBINAR
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <p className="mt-4 text-sm text-gray-400 font-medium">
            No credit card required. Spaces are strictly limited.
          </p>
        </div>
      </section>

      {/* VALUE PROPOSITIONS SECTION */}
      <section className="py-20 md:py-28 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
              What You'll Discover In This Masterclass
            </h2>
            <div className="w-24 h-1 bg-brand-red mx-auto rounded-full"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-300">
                 <TrendingUp className="w-40 h-40 text-brand-navy" />
              </div>
              <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 relative z-10">
                <CircleDot className="w-6 h-6 text-brand-red" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-navy mb-3 relative z-10">Profitability Acceleration</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">
                Uncover the hidden margin killers in your operations and implement proven strategies to instantly boost your bottom line.
              </p>
            </div>

            {/* Benefit 2 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-300">
                 <ShieldCheck className="w-40 h-40 text-brand-navy" />
              </div>
              <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 relative z-10">
                <CircleDot className="w-6 h-6 text-brand-red" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-navy mb-3 relative z-10">Bulletproof Compliance</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">
                Stop stressing over audits. Learn the automated systems that keep your fleet 100% compliant while you focus on growth.
              </p>
            </div>

            {/* Benefit 3 */}
            <div className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-shadow border border-gray-100 relative overflow-hidden group">
              <div className="absolute -top-4 -right-4 p-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-300">
                 <Users className="w-40 h-40 text-brand-navy" />
              </div>
              <div className="w-12 h-12 bg-brand-red/10 rounded-full flex items-center justify-center mb-6 relative z-10">
                <CircleDot className="w-6 h-6 text-brand-red" />
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-navy mb-3 relative z-10">Scalable Operations</h3>
              <p className="text-gray-600 leading-relaxed relative z-10">
                Transition from an owner-operator mindset to a true CEO. Build systems that allow your company to run and grow without you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WEBINAR DETAILS SECTION */}
      <section className="py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            {/* Left Content */}
            <div className="flex-1 space-y-8">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-brand-navy mb-4">
                  Everything You Need To Know
                </h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                  This isn't fluff. It's a highly actionable, no-nonsense session designed exclusively for ambitious trucking business owners.
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
                    <p className="text-gray-600 font-medium">{WEBINAR_TIME_DISPLAY}</p>
                  </div>
                </div>
              </div>

              <div className="bg-brand-gray p-8 rounded-2xl border-l-4 border-brand-red">
                <h3 className="font-heading text-xl font-bold text-brand-navy mb-5">Who Should Attend?</h3>
                <ul className="space-y-4">
                  {[
                    "Owner-operators looking to scale their first fleet",
                    "Established carriers struggling with razor-thin margins",
                    "Trucking entrepreneurs tired of working IN their business instead of ON it"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-brand-red mr-3 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Content - Speaker/Trust */}
            <div className="flex-1 w-full relative">
              <div className="absolute inset-0 bg-brand-teal rounded-3xl transform translate-x-4 translate-y-4 opacity-20 hidden md:block"></div>
              <div className="bg-brand-navy rounded-3xl p-8 md:p-10 relative z-10 text-white shadow-2xl">
                <div className="flex items-center gap-1.5 mb-8 text-brand-red">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-current" />
                  ))}
                </div>
                <blockquote className="text-xl md:text-2xl font-heading leading-relaxed mb-10 text-gray-100">
                  "After implementing the DMG Core framework, our fleet expanded from 3 to 15 trucks in under 18 months, and our profit margins doubled. This webinar is a game-changer."
                </blockquote>
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-full bg-gray-600 overflow-hidden relative border-2 border-brand-red">
                    <Image
                      src="https://picsum.photos/seed/speaker/150/150"
                      alt="Speaker placeholder"
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-white">Industry Expert</h4>
                    <p className="text-brand-teal font-medium">Logistics & Scaling Strategist</p>
                  </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-700/50 flex flex-wrap justify-between items-center text-sm font-bold tracking-widest text-gray-400 uppercase">
                  <span>Helped 200+ Companies</span>
                  <span className="text-brand-red">Proven Strategies</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="bg-brand-navy text-center py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red via-brand-navy to-brand-navy"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black uppercase text-white mb-6 leading-tight">
            Ready to transform your trucking operations?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            Stop leaving money on the table. Join the free masterclass and get the blueprint.
          </p>
          <a href={REGISTER_URL} className="inline-flex items-center justify-center bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 px-10 rounded-full text-lg transition-all duration-200 shadow-[0_0_20px_rgba(220,20,60,0.4)] hover:shadow-[0_0_30px_rgba(220,20,60,0.6)] transform hover:-translate-y-1">
            REGISTER FOR FREE WEBINAR
            <ArrowRight className="ml-2 w-5 h-5" />
          </a>
          <div className="mt-8 flex flex-wrap justify-center items-center gap-8 text-gray-400 font-medium text-sm">
             <span className="flex items-center"><ShieldCheck className="w-5 h-5 mr-2 text-brand-teal" /> 100% Free Training</span>
             <span className="flex items-center"><Users className="w-5 h-5 mr-2 text-brand-teal" /> Limited Seats Available</span>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
