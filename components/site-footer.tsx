import Image from 'next/image';

export default function SiteFooter() {
  return (
    <footer className="bg-[#0d0d0d] text-gray-400 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <Image
            src="/dmg-mark.png"
            alt=""
            width={42}
            height={39}
            className="h-9 w-auto"
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
          <a
            href="https://dmgagencycore.com"
            className="text-brand-red hover:underline font-medium"
          >
            dmgagencycore.com
          </a>
          <p className="mt-2 text-gray-500">
            &copy; {new Date().getFullYear()} DMG Agency Core LLC. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
