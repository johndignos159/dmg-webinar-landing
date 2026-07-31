import Image from 'next/image';

export default function SiteFooter() {
  return (
    <footer className="bg-brand-teal-deep text-gray-300 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Image
            src="/images/dmgagency-logo.png"
            alt=""
            width={80}
            height={80}
            className="h-16 w-16"
          />
          <div>
            <p className="font-heading text-base font-black uppercase tracking-wide text-white">
              DMG Agency Core
            </p>
            <p className="text-sm mt-1">
              Helping trucking entrepreneurs launch, operate, and grow.
            </p>
          </div>
        </div>

        <div className="text-sm">
          {/* White rather than brand red: red on this teal measures 2.3:1,
              well below the 4.5:1 minimum for body text. */}
          <a
            href="https://dmgagencycore.com"
            className="text-white hover:text-brand-red font-medium transition-colors"
          >
            dmgagencycore.com
          </a>
          <p className="mt-2 text-gray-400">
            &copy; {new Date().getFullYear()} DMG Agency Core LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
