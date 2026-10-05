import type { CSSProperties } from 'react';

const DIGITS = '01234567890123456789';

/**
 * A figure whose digits roll into place like an odometer.
 *
 * Each digit is a column holding 0-9 twice over. Resting, the column sits on
 * the digit's second occurrence; armed, it is wound back to the top, so playing
 * it spins through at least one full turn before landing. Symbols and
 * separators ($ , %) do not move.
 *
 * Purely presentational: it holds no state and animates only when an enclosing
 * RollGroup changes phase. Rendered outside one it just shows the figure.
 *
 * The visible columns are hidden from assistive tech, which would otherwise
 * read twenty digits per column. A screen-reader-only copy carries the value.
 */
export default function RollingNumber({
  value,
  className = '',
}: {
  value: string;
  className?: string;
}) {
  let digitIndex = 0;

  return (
    <span className={`roll-number ${className}`}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="roll-number-inner">
        {Array.from(value).map((ch, i) => {
          if (ch < '0' || ch > '9') {
            return (
              <span key={i} className="roll-char">
                {ch}
              </span>
            );
          }

          const style = {
            // Row to rest on: the second run of the digit.
            '--row': 10 + Number(ch),
            // Position among the digits, so they settle left to right.
            '--k': digitIndex++,
          } as CSSProperties;

          return (
            <span key={i} className="roll-digit">
              <span className="roll-strip" style={style}>
                {Array.from(DIGITS).map((d, j) => (
                  <span key={j} className="roll-cell">
                    {d}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
