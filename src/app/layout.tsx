import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'BenaaOps | بنا السحابي - Saudi Civil Construction Management Portal',
  description: 'Enterprise Civil Engineering & Site Operations Portal for Kingdom of Saudi Arabia (KSA). SBC 301-305 compliance, RFIs, WIRs, Hot Weather Concrete Controls & BBS.',
  keywords: 'BenaaOps, Saudi Building Code, SBC 304, RFI Civil, Concrete Pouring, Hot Weather Concrete, KSA Construction',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-slate-50 text-slate-900 antialiased flex flex-col">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
