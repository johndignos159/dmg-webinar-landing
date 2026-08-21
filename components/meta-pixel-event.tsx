'use client';

import { useEffect } from 'react';
import { META_PIXEL_ID } from '@/lib/meta-pixel';

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

/**
 * Fires one standard Meta event when the page mounts.
 *
 * Used on /confirmed to report a Lead. That event is what Meta optimises the
 * campaign against — without it the algorithm buys clicks rather than
 * registrations, and cost per registration stays high no matter the creative.
 *
 * Why the wait loop: the base pixel loads with strategy="afterInteractive", so
 * this effect can run before window.fbq exists. A plain call would be dropped
 * silently — no error, no event, and the campaign quietly optimises for nothing.
 * We poll briefly and give up rather than leaving a timer running forever.
 */
export default function MetaPixelEvent({ event }: { event: string }) {
  useEffect(() => {
    if (!META_PIXEL_ID) return;

    let attempts = 0;
    const timer = setInterval(() => {
      if (window.fbq) {
        window.fbq('track', event);
        clearInterval(timer);
      } else if (++attempts > 40) {
        // ~10s. The pixel is blocked or failed to load; nothing to report.
        clearInterval(timer);
      }
    }, 250);

    return () => clearInterval(timer);
  }, [event]);

  return null;
}
