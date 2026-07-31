import type {Metadata} from 'next';
import { Montserrat, Inter } from 'next/font/google';
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

export const metadata: Metadata = {
  title: 'DMG Agency Core | Webinar',
  description: 'Learn how to scale your trucking business 3X in 12 months with DMG Agency Core.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className={`${montserrat.variable} ${inter.variable}`}>
      <body className="font-sans antialiased text-[#1a1a1a] bg-white" suppressHydrationWarning>{children}</body>
    </html>
  );
}
