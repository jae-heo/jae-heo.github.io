// scripts/generateSitemap.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Generate sitemap.xml file for the blog
 * @param {string} baseUrl The base URL of your site
 * @param {string} outputPath Path to output the sitemap.xml file
 */
async function generateSitemap(baseUrl, outputPath) {
  // Remove trailing slash if present
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Create an array to hold all URLs
  const urlEntries = [];
  
  // Add static pages
  const staticPages = [
    { url: '/', priority: 1.0 },
    { url: '/blog', priority: 0.8 },
    { url: '/about', priority: 0.7 },
    { url: '/portfolio', priority: 0.7 },
    { url: '/contact', priority: 0.6 },
  ];
  
  // Add static pages to entries
  staticPages.forEach(page => {
    urlEntries.push({
      url: `${normalizedBaseUrl}${page.url}`,
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'weekly',
      priority: page.priority
    });
  });
  
  // Generate XML content
  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapContent += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add each URL entry
  urlEntries.forEach(entry => {
    sitemapContent += '  <url>\n';
    sitemapContent += `    <loc>${entry.url}</loc>\n`;
    if (entry.lastmod) {
      sitemapContent += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    }
    if (entry.changefreq) {
      sitemapContent += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    }
    if (entry.priority !== undefined) {
      sitemapContent += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    }
    sitemapContent += '  </url>\n';
  });
  
  sitemapContent += '</urlset>';
  
  // Make sure the directory exists
  const dir = path.dirname(outputPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  // Write sitemap.xml file
  fs.writeFileSync(outputPath, sitemapContent);
  console.log(`Sitemap generated successfully at ${outputPath}!`);
  
  return sitemapContent;
}

// Get the base URL from environment variable or fallback
const baseUrl = process.env.SITE_BASE_URL || 'https://jae-heo.github.io';
const outputPath = process.env.SITEMAP_OUTPUT_PATH || 'dist/sitemap.xml';

// Generate the sitemap
generateSitemap(baseUrl, outputPath)
  .then(() => console.log(`Sitemap generation completed for ${baseUrl}`))
  .catch(err => {
    console.error('Error generating sitemap:', err);
    process.exit(1);
  });