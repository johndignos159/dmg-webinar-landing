import type { Metadata } from 'next';
import { CheckCircle2, Calendar, AlertTriangle, Mail } from 'lucide-react';
import SiteHeader from '@/components/site-header';
import SiteFooter from '@/components/site-footer';
import CountdownTimer from '@/components/countdown-timer';
import {
  SESSION_1,
  SESSION_2,
  DAY_1_DISPLAY,
  DAY_2_DISPLAY,
  DAY_1_TIME,
  DAY_2_TIME,
  TRAINING_TIMESTAMP,
  SUPPORT_EMAIL,
} from '@/lib/training-en-config.mjs';

export const metadata: Metadata = {
  title: "You're in | DMG Agency Core",
  description: 'Your seat at the Group Dispatch Training is confirmed.',
  // Never index a confirmation page. Anyone arriving from a search result
  // would skip both the form and the payment, and both Zoom links are on it.
  robots: { index: false, follow: false },
};

type Session = {
  meetingUrl: string;
  meetingId: string;
  passcode: string;
};

const STEPS = [
  {
    title: 'Check your email now',
    body: 'We just sent your confirmation with both links. If it has not arrived in a few minutes, check your spam folder and mark it "not spam" so the reminders reach you.',
  },
  {
    title: 'Save both links separately',
    body: 'Each day has its own Zoom room and its own start time. Day 1’s link will not let you in on day 2.',
  },
  {
    title: 'We will remind you',
    body: 'You will get reminders as the date approaches: two weeks before, one week before, three days, one day, and the morning of each day.',
  },
];

/**
 * One day's access details. Rendered twice, because the two sessions have
 * different rooms — printing them in a single shared block is how someone ends
 * up in an empty meeting on the second morning.
 */
function AccessCard({
  session,
  label,
  date,
  time,
}: {
  session: Session;
  label: string;
  date: string;
  time: string;
}) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="w-4 h-4 text-brand-teal shrink-0" />
        <p className="text-xs font-bold uppercase tracking-widest text-brand-teal">
          {label}
        </p>
      </div>

      <p className="font-bold leading-snug mb-1">{date}</p>
      <p className="text-brand-red font-bold mb-5">{time}</p>

      <a
        href={session.meetingUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-glow inline-flex items-center justify-center w-full bg-brand-red hover:bg-brand-red-hover text-white font-bold py-3 px-6 rounded-full text-sm"
      >
        Join on Zoom
      </a>

      <div className="mt-5 pt-4 border-t border-white/10 grid grid-cols-2 gap-3">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Meeting ID
          </p>
          <p className="text-sm font-medium text-gray-200 tabular-nums">
            {session.meetingId}
          </p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
            Passcode
          </p>
          <p className="text-sm font-medium text-gray-200 tabular-nums">
            {session.passcode}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function TrainingEnConfirmedPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <SiteHeader ctaLabel="Reserve my seat" ctaHref="/training#register" />

      <section className="relative bg-brand-navy text-white overflow-hidden flex-1">
        <div className="absolute inset-0 z-0 bg-brand-navy">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy via-brand-navy/90 to-brand-navy" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 pt-32 pb-24 md:pt-40 md:pb-32 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-brand-red/15 border border-brand-red flex items-center justify-center mb-8">
            <CheckCircle2 className="w-8 h-8 text-brand-red" />
          </div>

          <div className="inline-block bg-brand-red/10 border border-brand-red text-brand-red px-4 py-1.5 rounded-full text-sm font-bold tracking-wider mb-6">
            PAYMENT CONFIRMED
          </div>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-tight mb-6">
            You&apos;re in
          </h1>

          <p className="text-lg md:text-xl text-gray-200 max-w-xl mb-10 leading-relaxed">
            Your seat is reserved. Check your email — we just sent your
            confirmation with everything you need to join.
          </p>

          {/* The two rooms differ, and so do the start times. Say it once,
              loudly, before showing them. */}
          <div className="w-full max-w-xl mb-8 rounded-2xl border border-brand-red/60 bg-brand-red/10 p-5 flex items-start gap-3 text-left">
            <AlertTriangle className="w-5 h-5 text-brand-red shrink-0 mt-0.5" />
            <p className="text-sm text-gray-100 leading-relaxed">
              <strong>Each day has a different link and a different time.</strong>{' '}
              Save both separately — day 1&apos;s link will not let you in on day 2.
            </p>
          </div>

          <div className="w-full grid sm:grid-cols-2 gap-4 mb-12">
            <AccessCard
              session={SESSION_1 as Session}
              label="Day 1"
              date={DAY_1_DISPLAY}
              time={DAY_1_TIME}
            />
            <AccessCard
              session={SESSION_2 as Session}
              label="Day 2"
              date={DAY_2_DISPLAY}
              time={DAY_2_TIME}
            />
          </div>

          <CountdownTimer target={TRAINING_TIMESTAMP} label="Day 1 starts in" />
        </div>
      </section>

      <section className="py-20 md:py-24 bg-brand-gray">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-heading text-2xl md:text-3xl font-bold uppercase text-brand-navy mb-4 text-center">
            What happens next
          </h2>
          <div className="w-24 h-1 bg-brand-red mx-auto rounded-full mb-12" />

          <ol className="space-y-6">
            {STEPS.map((step, i) => (
              <li key={step.title} className="flex gap-5">
                <div className="shrink-0 w-9 h-9 rounded-full bg-brand-red text-white font-bold flex items-center justify-center">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-bold text-brand-navy text-lg mb-1">
                    {step.title}
                  </h3>
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
              <p className="font-bold text-brand-navy mb-1">
                Confirmation not arriving?
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                Email us at{' '}
                <a
                  href={`mailto:${SUPPORT_EMAIL}`}
                  className="text-brand-red font-medium hover:underline"
                >
                  {SUPPORT_EMAIL}
                </a>{' '}
                and we will sort it out.
              </p>
            </div>
          </div>
        </div>
      </section>

      <SiteFooter
        tagline="Launch · Operate · Earn · Protect"
        rightsText="All rights reserved."
      />
    </div>
  );
}
