import type { Metadata } from 'next';
import { Montserrat, Inter } from 'next/font/google';
import MetaPixel, { MetaPixelNoScript } from '@/components/meta-pixel';
import { WEBINAR_DATE_DISPLAY, WEBINAR_TIME_DISPLAY } from '@/lib/webinar-config';
import './globals.css'; // Global styles

const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const TITLE = 'The Transportation Entrepreneur Blueprint | DMG Agency Core';
const DESCRIPTION = `A free live masterclass on building a transportation business in the right order. ${WEBINAR_DATE_DISPLAY} at ${WEBINAR_TIME_DISPLAY}. No recording — live only.`;

export const metadata: Metadata = {
  // Needed for the relative openGraph image below to resolve to an absolute
  // URL. Facebook's scraper rejects relative paths.
  metadataBase: new URL('https://webinar.dmgagencycore.com'),
  title: TITLE,
  description: DESCRIPTION,
  // These drive the link preview card when the page is shared or run as a Meta
  // ad destination. Without them Facebook picks whatever it finds first, which
  // is usually the logo on a white square.
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: '/',
    siteName: 'DMG Agency Core',
    images: [{ url: '/images/hero-truck.jpg', width: 2400, height: 1600 }],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/images/hero-truck.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <head>
        <MetaPixel />
      </head>
      <body
        className="font-sans antialiased text-[#1a1a1a] bg-white"
        suppressHydrationWarning
      >
        {children}
        <MetaPixelNoScript />
      </body>
    </html>
  );
}
