'use client';

import { useEffect, useState } from 'react';

type Props = {
  text: string;
  /** Milliseconds per character. */
  speed?: number;
  /** Pause before the first character appears. */
  startDelay?: number;
  className?: string;
};

export default function Typewriter({
  text,
  speed = 65,
  startDelay = 500,
  className = '',
}: Props) {
  const [typed, setTyped] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Anyone who has asked their OS to reduce motion gets the finished
    // headline immediately rather than a crawling animation.
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      setTyped(text.length);
      setDone(true);
      return;
    }

    let interval: ReturnType<typeof setInterval>;

    const startTimer = setTimeout(() => {
      interval = setInterval(() => {
        setTyped((n) => {
          if (n >= text.length) {
            clearInterval(interval);
            setDone(true);
            return n;
          }
          return n + 1;
        });
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(interval);
    };
  }, [text, speed, startDelay]);

  return (
    <span className={`whitespace-pre-wrap ${className}`}>
      {/* With JS disabled this component never mounts, so the characters would
          sit at opacity 0 forever and the headline would look cut off. A
          noscript stylesheet only applies in exactly that case. */}
      <noscript>
        <style>{`.tw-char{opacity:1!important}.tw-cursor{display:none!important}`}</style>
      </noscript>

      {/* Screen readers get the finished sentence once, not one letter at a time. */}
      <span className="sr-only">{text}</span>

      <span aria-hidden="true">
        {/* Every character is always in the DOM and always occupies its space —
            only opacity changes. That keeps the heading from reflowing as it
            types, which matters most on mobile where the line wraps. */}
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="tw-char"
            style={{ opacity: i < typed ? 1 : 0 }}
          >
            {char}
          </span>
        ))}
        <span
          className={`tw-cursor ${done ? 'tw-cursor-done' : ''}`}
          style={{ backgroundColor: 'currentColor' }}
        />
      </span>
    </span>
  );
}
