import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pebble",
  description: "Low-commitment, research-backed habit tracker",
  manifest: "/manifest.json",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    'use client';
import { useState, useEffect } from 'react';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [highContrast, setHighContrast] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    document.body.classList.toggle('contrast', highContrast);
    document.body.classList.toggle('reduce-motion', reduceMotion);
  }, [highContrast, reduceMotion]);

  return (
    <html lang="en">
      <body className="min-h-dvh bg-neutral-950 text-neutral-100">
        <div className="fixed bottom-4 left-4 space-x-2 z-50 text-xs">
          <button onClick={() => setHighContrast(!highContrast)} className="underline">
            {highContrast ? 'Normal' : 'High Contrast'}
          </button>
          <button onClick={() => setReduceMotion(!reduceMotion)} className="underline">
            {reduceMotion ? 'Motion On' : 'Motion Off'}
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}
