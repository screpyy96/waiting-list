import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Farm2Door - Produse proaspete direct de la fermieri",
  description: "Farm2Door conectează fermierii locali cu clienții care doresc produse proaspete și sănătoase, livrate direct la ușa ta.",
  keywords: "produse proaspete, fermieri locali, livrare legume, fructe proaspete, agricultura locala, produse organice, farm to table, farm2door",
  authors: [{ name: "Farm2Door" }],
  creator: "Farm2Door",
  publisher: "Farm2Door",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://farm2door.ro"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Farm2Door - Produse proaspete direct de la fermieri",
    description: "Farm2Door conectează fermierii locali cu clienții care doresc produse proaspete și sănătoase, livrate direct la ușa ta.",
    url: "https://farm2door.ro",
    siteName: "Farm2Door",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Farm2Door - Produse proaspete direct de la fermieri",
      },
    ],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Farm2Door - Produse proaspete direct de la fermieri",
    description: "Farm2Door conectează fermierii locali cu clienții care doresc produse proaspete și sănătoase, livrate direct la ușa ta.",
    images: ["/images/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  category: "food",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ro">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#2E7D32" />
        <link rel="canonical" href="https://farm2door.ro" />
        <meta name="geo.region" content="RO" />
        <meta name="geo.placename" content="București" />
        <meta property="og:locale" content="ro_RO" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Farm2Door" />
        <meta name="twitter:card" content="summary_large_image" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
