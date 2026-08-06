import type { Metadata } from 'next';
import { CheckCircle2, Calendar, Clock, Mail, CalendarPlus, Download } from 'lucide-react';
import CountdownTimer from '@/components/countdown-timer';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import {
  WEBINAR_DATE_DISPLAY,
  WEBINAR_TIME_DISPLAY,
  WEBINAR_DURATION_MINUTES,
  GOOGLE_CALENDAR_URL,
  ICS_DATA_URI,
  JOIN_URL,
} from '@/lib/webinar-config';

export const metadata: Metadata = {
  title: "You're Registered | DMG Agency Core",
  description: 'Your seat for the DMG Agency Core trucking masterclass is confirmed.',
  // Thank-you pages should never appear in search results — anyone landing here
  // from Google would skip the form entirely and never become a lead.
  robots: { index: false, follow: false },
};

export default function ConfirmedPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader />

      <section className="relative bg-brand-navy text-white overflow-hidden flex-1">
        <div className="absolute inset-0 z-0 bg-brand-navy">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/90 to-brand-navy" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-brand-red/15 border border-brand-red flex items-center justify-center mb-8">
            <CheckCircle2 className="w-8 h-8 text-brand-red" />
          </div>

          <div className="inline-block bg-brand-red/10 border border-brand-red text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            SEAT CONFIRMED
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-6">
            You&apos;re In
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-12 leading-relaxed">
            Your seat is reserved. Check your inbox — we just sent your confirmation and
            joining details.
          </p>

          {/* Date and time, restated so nobody has to dig through email for it. */}
          <div className="w-full grid sm:grid-cols-2 gap-4 mb-12">
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 text-left">
              <div className="bg-brand-teal/15 p-3 rounded-xl text-brand-teal shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Date
                </p>
                <p className="font-bold">{WEBINAR_DATE_DISPLAY}</p>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center gap-4 text-left">
              <div className="bg-brand-teal/15 p-3 rounded-xl text-brand-teal shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">
                  Time
                </p>
                <p className="font-bold">
                  {WEBINAR_TIME_DISPLAY}{' '}
                  <span className="font-normal text-gray-400">
                    ({WEBINAR_DURATION_MINUTES} min)
                  </span>
                </p>
              </div>
            </div>
          </div>

          <CountdownTimer />

          {/* Join link shown here as well as emailed. Anyone reaching this page
              has just registered, and having the room one click away on the
              night beats digging through an inbox. */}
          <div className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
            <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
              Your Zoom room
            </p>
            <a
              href={JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-red hover:underline font-medium break-all text-sm"
            >
              {JOIN_URL}
            </a>
            <p className="text-xs text-gray-500 mt-3">
              Same link every time — save it now and it will work on the night.
            </p>
          </div>

          {/* Two formats: Google covers most people, .ics covers Apple and Outlook. */}
          <div className="w-full flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <a
              href={GOOGLE_CALENDAR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glow w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap bg-brand-red hover:bg-brand-red-hover text-white font-bold py-4 px-6 sm:px-8 rounded-full text-base"
            >
              <CalendarPlus className="mr-2 w-5 h-5" />
              Add to Google Calendar
            </a>

            <a
              href={ICS_DATA_URI}
              download="dmg-webinar.ics"
              className="btn-glow-soft w-full sm:w-auto inline-flex items-center justify-center whitespace-nowrap border-2 border-white/25 hover:border-white text-white font-bold py-4 px-6 sm:px-8 rounded-full text-base"
            >
              <Download className="mr-2 w-5 h-5" />
              Apple / Outlook
            </a>
          </div>

          <p className="text-sm text-gray-400 max-w-md">
            Adding it to your calendar is the single biggest thing you can do to actually
            make the session.
          </p>
        </div>
      </section>

      {/* WHAT HAPPENS NEXT */}
      <section className="py-20 md:py-24 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-brand-navy mb-4 text-center">
            What Happens Next
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-12" />

          <ol className="space-y-6">
            {[
              {
                title: 'Check your email now',
                body: 'Your confirmation is on its way with the link you will use to join. If it has not landed in a few minutes, check spam and mark it "not spam" so the reminders reach you.',
              },
              {
                title: 'We will remind you twice',
                body: 'Once the day before, once an hour before. No spam in between.',
              },
              {
                title: 'Show up — there is no recording',
                body: 'This one is live only, so there will be nothing to catch up on afterwards. Come a few minutes early, with your biggest question ready — there is live Q&A at the end.',
              },
            ].map((step, i) => (
              <li key={i} className="flex gap-5">
                <div className="shrink-0 w-9 h-9 rounded-full bg-brand-red text-white font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy text-lg mb-1">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-12 bg-white border border-gray-200 rounded-2xl p-6 flex items-start gap-4">
            <div className="bg-brand-teal/10 p-3 rounded-xl text-brand-teal shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-brand-navy mb-1">Confirmation not arriving?</p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Email{' '}
                <a
                  href="mailto:admin@dmgagencycore.com"
                  className="text-brand-red font-medium hover:underline"
                >
                  admin@dmgagencycore.com
                </a>{' '}
                and we will get your seat sorted.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
