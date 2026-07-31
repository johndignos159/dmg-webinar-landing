import Image from 'next/image';
import { REGISTER_URL } from '@/lib/webinar-config';

/**
 * Solid bar above the hero, in the deep teal sampled from the hero gradient
 * on dmgagencycore.com.
 */
export default function SiteHeader() {
  return (
    <header className="bg-brand-teal-deep">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <a
          href="https://dmgagencycore.com"
          className="flex items-center gap-3 group"
          aria-label="DMG Agency Core home"
        >
          <Image
            src="/images/dmgagency-logo.png"
            alt=""
            width={64}
            height={64}
            priority
            className="h-11 w-11 md:h-14 md:w-14"
          />
          {/* The badge carries "AGENCY CORE" in its artwork, but at header size
              that type renders around 5px tall and is unreadable. The name is
              spelled out beside it so it actually registers. */}
          <span className="font-heading text-sm md:text-base font-black uppercase tracking-wide text-white whitespace-nowrap">
            DMG Agency Core
          </span>
        </a>

        <a
          href={REGISTER_URL}
          className="hidden sm:inline-flex items-center justify-center border-2 border-brand-red text-white hover:bg-brand-red font-bold text-xs md:text-sm uppercase tracking-wider py-2.5 px-6 rounded-full transition-colors duration-200"
        >
          Save My Seat
        </a>
      </div>
    </header>
  );
}
