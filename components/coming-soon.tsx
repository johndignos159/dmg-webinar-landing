import { ArrowRight, CalendarClock } from 'lucide-react';

/**
 * Shown on the webinar pages while no next date is set (NEXT_DATE_ANNOUNCED in
 * lib/webinar-config.ts, NEXT_DATE_ANNOUNCED_ES in lib/webinar-es-config.ts).
 * Without it, a page whose date has passed tells visitors the masterclass is
 * "live now" and lets them register for a session that is over.
 */

/** Takes the countdown's place in the hero. */
export function ComingSoonBadge({ text }: { text: string }) {
  return (
    <div className="mb-10 flex flex-col items-center">
      <div className="inline-flex items-center gap-3 bg-white/5 border border-white/20 backdrop-blur-sm rounded-2xl px-6 sm:px-8 py-5">
        <CalendarClock className="w-6 h-6 shrink-0 text-brand-red" aria-hidden="true" />
        <span className="font-heading text-base sm:text-lg md:text-xl font-black uppercase tracking-wide text-white">
          {text}
        </span>
      </div>
    </div>
  );
}

/**
 * Takes the registration form's place. Keeps the form's anchor id, so the
 * header button and old links that point at #register / #registro still land here.
 */
export function ComingSoonSection({
  id,
  heading,
  body,
  ctaLabel,
  ctaHref,
  ctaClassName,
}: {
  id: string;
  heading: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  ctaClassName: string;
}) {
  return (
    <section id={id} className="blueprint-bg py-16 md:py-24 scroll-mt-8 px-6">
      <div className="max-w-3xl mx-auto text-center bg-white rounded-3xl shadow-xl border border-gray-100 px-6 py-12 md:px-12">
        <CalendarClock className="w-12 h-12 mx-auto mb-6 text-brand-red" aria-hidden="true" />
        <h2 className="font-heading text-2xl md:text-4xl font-black uppercase text-brand-navy mb-5 leading-tight">
          {heading}
        </h2>
        <p className="text-lg text-gray-600 leading-relaxed mb-10">{body}</p>
        <a href={ctaHref} className={ctaClassName}>
          {ctaLabel}
          <ArrowRight className="ml-2 w-5 h-5" />
        </a>
      </div>
    </section>
  );
}
