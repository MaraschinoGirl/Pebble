// apps/web/src/app/layout.tsx (SERVER COMPONENT)
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import A11yToggles from '@/components/A11yToggles';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pebble',
  description: 'Low-commitment, research-backed habit tracker',
  manifest: '/manifest.json',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-dvh`}>
        {/* Client-only UI controls that toggle classes on <body> */}
        <A11yToggles />
        {children}
      </body>
    </html>
  );
}
