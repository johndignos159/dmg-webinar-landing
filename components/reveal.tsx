'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  /** Position in a group — each step adds 90ms so items cascade in. */
  index?: number;
  className?: string;
};

/**
 * Fades and lifts its children into view the first time they are scrolled to.
 *
 * Uses IntersectionObserver rather than an animation library. The page already
 * ships 102kB of JS; a scroll reveal is about thirty lines and does not need
 * another dependency to do it.
 */
export default function Reveal({ children, index = 0, className = '' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    // Reduced-motion users get the finished state immediately — no drift, no
    // fade, just the content.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          // One-shot: re-animating on every scroll past is distracting.
          observer.disconnect();
        }
      },
      // Fires slightly before the element reaches the viewport edge, so the
      // animation is already underway by the time it is properly on screen.
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'reveal-shown' : ''} ${className}`}
      style={{ transitionDelay: `${index * 90}ms` }}
    >
      {/* Without JS the items would sit at opacity 0 forever. This only
          applies when scripting is disabled. */}
      <noscript>
        <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
      </noscript>
      {children}
    </div>
  );
}
