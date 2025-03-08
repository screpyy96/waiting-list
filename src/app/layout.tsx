import * as React from 'react';
import { Inter } from 'next/font/google';
import { type Metadata } from 'next';
import { config } from '@/core/constants/config';
import '@/styles/globals.css';

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: {
    default: config.siteName,
    template: `%s | ${config.siteName}`,
  },
  description: 'Farm2Door - Direct from farmers to your door',
  metadataBase: new URL(config.siteUrl),
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={inter.variable}>
      <body className="min-h-screen bg-white font-sans antialiased">
        {children}
      </body>
    </html>
  );
} 