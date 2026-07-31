'use client';

import { useEffect, useState } from 'react';
import { WEBINAR_TIMESTAMP } from '@/lib/webinar-config';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  expired: boolean;
};

function getTimeLeft(): TimeLeft {
  // Recomputed from the target timestamp on every tick rather than decrementing
  // a counter, so the clock stays accurate even when a background tab has its
  // timers throttled by the browser.
  const distance = WEBINAR_TIMESTAMP - Date.now();

  if (distance <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
  }

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance % 86_400_000) / 3_600_000),
    minutes: Math.floor((distance % 3_600_000) / 60_000),
    seconds: Math.floor((distance % 60_000) / 1000),
    expired: false,
  };
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      {/* Sized to fit four units plus gaps inside a 320px viewport without
          wrapping or overflowing, then scales up from there. */}
      <div className="bg-white/5 border border-white/10 backdrop-blur-sm rounded-2xl w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 flex items-center justify-center">
        <span className="font-heading text-2xl sm:text-3xl md:text-4xl font-black text-brand-red tabular-nums">
          {value}
        </span>
      </div>
      <span className="mt-3 text-[0.65rem] sm:text-[0.7rem] md:text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
        {label}
      </span>
    </div>
  );
}

export default function CountdownTimer() {
  // Starts null on purpose. The page is prerendered at build time, so computing
  // the remaining time during SSR would bake stale numbers into the HTML and
  // React would report a hydration mismatch the moment the browser recomputed
  // them. Rendering placeholders until the first effect runs keeps the server
  // and client markup identical.
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    setTimeLeft(getTimeLeft());

    const interval = setInterval(() => {
      const next = getTimeLeft();
      setTimeLeft(next);

      if (next.expired) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (timeLeft?.expired) {
    return (
      <div className="mb-10 flex flex-col items-center">
        <div className="inline-flex items-center gap-3 bg-brand-red/15 border border-brand-red rounded-2xl px-8 py-5">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-red opacity-75" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-brand-red" />
          </span>
          <span className="font-heading text-lg md:text-xl font-black uppercase tracking-wide text-white">
            The masterclass is live now
          </span>
        </div>
      </div>
    );
  }

  const pad = (n: number) => String(n).padStart(2, '0');

  return (
    <div className="mb-10 flex flex-col items-center" role="timer">
      <p className="mb-5 text-xs font-bold uppercase tracking-[0.2em] text-gray-400">
        Registration closes in
      </p>
      <div className="flex gap-2 sm:gap-3 md:gap-5">
        <Unit value={timeLeft ? String(timeLeft.days) : '--'} label="Days" />
        <Unit value={timeLeft ? pad(timeLeft.hours) : '--'} label="Hours" />
        <Unit value={timeLeft ? pad(timeLeft.minutes) : '--'} label="Minutes" />
        <Unit value={timeLeft ? pad(timeLeft.seconds) : '--'} label="Seconds" />
      </div>
    </div>
  );
}
