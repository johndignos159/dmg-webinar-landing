'use client';

import { useState, type ReactNode } from 'react';

type Props = {
  /**
   * An already-rendered icon element, not the component itself. Lucide icons
   * are functions, and functions cannot be serialised across the server to
   * client boundary — passing the component would fail the build.
   */
  icon: ReactNode;
  name: string;
  body: string;
  /** Back face — what this lane requires before it can operate. */
  requirements: string[];
};

/**
 * Two-sided card. Hovers to flip on desktop, taps to flip on touch.
 *
 * Rendered as a <button> rather than a <div> so it is reachable by keyboard and
 * announced as interactive — a hover-only flip hides its back face from anyone
 * navigating without a mouse.
 *
 * Height is fixed because both faces are absolutely positioned; without it the
 * card would collapse to zero.
 */
export default function FlipCard({ icon, name, body, requirements }: Props) {
  const [flipped, setFlipped] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-expanded={flipped}
      aria-label={`${name}. ${body} Show what it takes to start.`}
      className={`flip-card h-64 w-full text-left ${flipped ? 'is-flipped' : ''}`}
    >
      <div className="flip-inner">
        {/* FRONT */}
        <div className="flip-face border border-gray-200 rounded-2xl p-6 bg-white">
          <div className="bg-brand-teal/10 w-12 h-12 rounded-xl flex items-center justify-center text-brand-teal mb-5">
            {icon}
          </div>
          <h3 className="font-heading text-lg font-bold text-brand-navy mb-2">{name}</h3>
          <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
          <span className="mt-auto text-xs font-bold uppercase tracking-widest text-brand-red">
            What it takes →
          </span>
        </div>

        {/* BACK */}
        <div className="flip-face flip-back rounded-2xl p-6 bg-brand-navy border border-brand-red">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-red mb-4">
            What it takes to start
          </p>
          <ul className="space-y-2.5">
            {requirements.map((r) => (
              <li key={r} className="flex items-start text-sm text-gray-200 leading-relaxed">
                <span className="text-brand-red mr-2.5 mt-0.5 shrink-0">•</span>
                <span>{r}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </button>
  );
}
