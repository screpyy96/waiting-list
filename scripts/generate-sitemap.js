const fs = require('fs');
const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');

// Define your routes with their priorities and change frequencies
const routes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/#despre', changefreq: 'monthly', priority: 0.8 },
  { url: '/#cum-functioneaza', changefreq: 'monthly', priority: 0.8 },
  { url: '/#beneficii', changefreq: 'monthly', priority: 0.8 },
  { url: '/#lista-asteptare', changefreq: 'weekly', priority: 0.9 },
  { url: '/#contact', changefreq: 'monthly', priority: 0.7 },
];

async function generateSitemap() {
  try {
    const stream = new SitemapStream({ hostname: 'https://farm2door.ro' });
    
    // Add all routes to the sitemap
    routes.forEach(route => {
      stream.write({
        url: route.url,
        changefreq: route.changefreq,
        priority: route.priority,
        lastmod: new Date().toISOString()
      });
    });

    stream.end();

    const data = await streamToPromise(Readable.from(stream));
    fs.writeFileSync('./public/sitemap.xml', data.toString());
    console.log('Sitemap generated successfully!');
  } catch (error) {
    console.error('Error generating sitemap:', error);
    process.exit(1);
  }
}

generateSitemap(); 