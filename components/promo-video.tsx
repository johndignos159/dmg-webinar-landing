'use client';

import { useRef, useState } from 'react';
import { Play } from 'lucide-react';

type Fbq = (...args: unknown[]) => void;

type Props = {
  /** MP4 hosted in GHL Media (files.leadconnectorhq.com serves byte ranges, which iPhone Safari needs). */
  src: string;
  /** Still from the video, served from public/. */
  poster: string;
  /** Read by screen readers for the video itself. */
  label: string;
  /** Text under the play button, e.g. "Watch the 1-min video". */
  cta: string;
  /** Sent with the Meta event so plays can be split by page. */
  language: 'en' | 'es';
};

/**
 * Cora's vertical promo video in the hero.
 *
 * Click to play, with sound: the captions are burned into the video, so it also
 * works for anyone who turns the sound off. preload="none" keeps the 10 MB file
 * off the network until someone asks for it; the poster is all the page loads.
 *
 * The first play fires a custom Meta event (PromoVideoPlay). It does not change
 * what the campaign optimises for (that stays Lead on /confirmed); it lets Cora
 * build a "watched the video" audience for retargeting.
 */
export default function PromoVideo({ src, poster, label, cta, language }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const reported = useRef(false);

  const start = () => {
    setStarted(true);
    // If the browser refuses (rare after a click), the native controls are now
    // showing and the visitor can press play there.
    ref.current?.play().catch(() => {});
  };

  const onPlay = () => {
    if (reported.current) return;
    reported.current = true;
    const fbq = (window as { fbq?: Fbq }).fbq;
    fbq?.('trackCustom', 'PromoVideoPlay', { language });
  };

  return (
    <div className="relative mx-auto mb-10 w-[min(78vw,340px)] md:w-[360px] aspect-[9/16] overflow-hidden rounded-3xl border border-white/15 bg-black shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]">
      <video
        ref={ref}
        src={src}
        poster={poster}
        preload="none"
        playsInline
        controls={started}
        onPlay={onPlay}
        aria-label={label}
        className="absolute inset-0 h-full w-full object-cover"
      />
      {!started && (
        // The button sits low, over her shoulders, so it never covers her face
        // or the caption at the top of the poster.
        <button
          type="button"
          onClick={start}
          aria-label={cta}
          className="group absolute inset-0 flex flex-col items-center justify-end pb-12 bg-gradient-to-t from-black/70 via-black/0 to-black/0"
        >
          <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-red shadow-lg ring-8 ring-brand-red/25 transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-95">
            <Play className="ml-1 h-8 w-8 fill-white text-white" aria-hidden="true" />
          </span>
          <span className="mt-4 text-sm font-bold uppercase tracking-widest text-white">
            {cta}
          </span>
        </button>
      )}
    </div>
  );
}
