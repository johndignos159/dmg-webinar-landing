'use client';

import { useRef, useState, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** Maximum rotation in degrees. Kept low so text stays readable. */
  max?: number;
};

/**
 * Tilts toward the cursor to give a card a sense of depth.
 *
 * Written with a plain mouse handler rather than framer-motion. The whole
 * effect is one transform string, and the page is a paid-traffic landing page —
 * not somewhere to add an animation library for a single card.
 *
 * Only runs on devices with a real pointer. On touch there is no hover, so a
 * tilt would either never fire or latch on tap and stay stuck.
 */
export default function TiltCard({ children, className = '', max = 7 }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState<string>();

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const r = el.getBoundingClientRect();
    // -0.5 .. 0.5 from the centre of the card
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;

    // Y follows horizontal travel, X inverts vertical travel so the card leans
    // toward the cursor rather than away from it.
    setTransform(
      `perspective(1100px) rotateX(${(-py * max).toFixed(2)}deg) rotateY(${(px * max).toFixed(2)}deg) scale(1.015)`,
    );
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTransform(undefined)}
      style={{
        transform,
        // Snap back slowly on leave, follow quickly while tracking.
        transition: transform ? 'transform 120ms ease-out' : 'transform 520ms cubic-bezier(0.22,1,0.36,1)',
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {children}
    </div>
  );
}
