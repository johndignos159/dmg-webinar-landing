'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
};

type Phase = 'static' | 'armed' | 'play';

/**
 * Runs the rolling-number sequence for everything inside it, once, the first
 * time it scrolls into view.
 *
 * Three phases rather than two, because the server-rendered HTML has to show
 * the real figures. Without JavaScript, or with reduced motion, the group never
 * leaves `static` and the numbers simply read as written. Only once the script
 * is running does it wind the digits back (`armed`) and then let them roll
 * (`play`). The motion itself is all CSS, keyed off the phase class: see
 * "Rolling numbers" in globals.css.
 */
export default function RollGroup({ children, className = '', style }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('static');

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    setPhase('armed');

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase('play');
          // One-shot, same as Reveal: replaying on every pass is distracting.
          observer.disconnect();
        }
      },
      // Later than Reveal fires: the calculation is the point of the section,
      // so it should start once it is properly on screen, not at the fold.
      { threshold: 0.35 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`roll-${phase} ${className}`} style={style}>
      {children}
    </div>
  );
}
