/**
 * Illuminated glow heading.
 *
 * An SVG filter stacks several Gaussian blurs, tints each one, offsets them
 * downward and merges the result under the original text. That layering is what
 * separates this from a plain text-shadow — you get a white-hot core, a bright
 * red bloom, and a deep red pool spilling below the letters.
 *
 * The reference version used eight layers in warm amber. This is five in brand
 * red: the three widest layers in the original all blurred at the same radius
 * and only differed by offset, so they collapse into two without changing the
 * look, and each feGaussianBlur is a real cost on a paid-traffic landing page.
 *
 * A gradient-filled copy of the text sits on top via ::before, giving the
 * letters a crisp bright edge over the blur underneath.
 */

const FILTER_ID = 'dmg-illuminate';

export default function IlluminatedHeading({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  return (
    <>
      <span
        data-text={text}
        style={{ filter: `url(#${FILTER_ID})` }}
        className={`illuminated relative inline-block ${className}`}
      >
        {text}
      </span>

      {/* Filter lives in a zero-size svg; it is referenced, never rendered. */}
      <svg className="absolute h-0 w-0 overflow-hidden" aria-hidden="true" focusable="false">
        <defs>
          <filter
            id={FILTER_ID}
            colorInterpolationFilters="sRGB"
            x="-50%"
            y="-200%"
            width="200%"
            height="500%"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b3" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b9" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="20" result="b20" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="34" result="b34" />

            {/* Tight, almost white core */}
            <feColorMatrix
              in="b3"
              result="c0"
              type="matrix"
              values="1 0 0 0 0
                      0 0.86 0 0 0
                      0 0 0.88 0 0
                      0 0 0 0.85 0"
            />
            {/* Bright brand red */}
            <feColorMatrix
              in="b9"
              result="c1"
              type="matrix"
              values="0.94 0 0 0 0
                      0 0.24 0 0 0
                      0 0 0.36 0 0
                      0 0 0 0.75 0"
            />
            <feOffset in="c1" result="o1" dx="0" dy="2" />
            {/* Deeper red bloom */}
            <feColorMatrix
              in="b20"
              result="c2"
              type="matrix"
              values="0.80 0 0 0 0
                      0 0.09 0 0 0
                      0 0 0.22 0 0
                      0 0 0 1 0"
            />
            <feOffset in="c2" result="o2" dx="0" dy="3" />
            {/* Wide crimson pool */}
            <feColorMatrix
              in="b34"
              result="c3"
              type="matrix"
              values="0.55 0 0 0 0
                      0 0.05 0 0 0
                      0 0 0.14 0 0
                      0 0 0 1 0"
            />
            <feOffset in="c3" result="o3" dx="0" dy="14" />
            {/* Dark spill beneath, grounds the letters */}
            <feColorMatrix
              in="b34"
              result="c4"
              type="matrix"
              values="0.24 0 0 0 0
                      0 0.03 0 0 0
                      0 0 0.08 0 0
                      0 0 0 0.8 0"
            />
            <feOffset in="c4" result="o4" dx="0" dy="44" />

            <feMerge>
              <feMergeNode in="o4" />
              <feMergeNode in="o3" />
              <feMergeNode in="o2" />
              <feMergeNode in="o1" />
              <feMergeNode in="c0" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>
    </>
  );
}
