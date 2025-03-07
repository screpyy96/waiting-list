import { NextResponse } from 'next/server';
import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

// Folosim ISR cu revalidare la fiecare oră
export const revalidate = 3600;

export async function GET() {
  try {
    // Create a stream for the sitemap
    const stream = new SitemapStream({
      hostname: process.env.SITE_URL || 'https://farm2door.ro'
    });

    // Define your static routes
    const staticPages = [
      { url: '/', changefreq: 'weekly', priority: 1.0, lastmod: new Date().toISOString() },
      { url: '/#despre', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { url: '/#cum-functioneaza', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { url: '/#beneficii', changefreq: 'monthly', priority: 0.8, lastmod: new Date().toISOString() },
      { url: '/#lista-asteptare', changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() },
      { url: '/#contact', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
    ];

    // Add all static pages to the stream
    for (const page of staticPages) {
      stream.write(page);
    }

    // End the stream
    stream.end();

    // Generate sitemap XML
    const data = await streamToPromise(Readable.from(stream));

    return new NextResponse(data, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=59',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
} 