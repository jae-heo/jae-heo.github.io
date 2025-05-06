// scripts/generateSitemap.ts
import { generateSitemap } from '../src/utils/sitemapGenerator';
import path from 'path';

// Get the base URL from environment variable or fallback
const baseUrl = process.env.SITE_BASE_URL || 'https://jae-heo.github.io';
const outputPath = path.resolve(process.env.SITEMAP_OUTPUT_PATH || 'dist/sitemap.xml');

// Generate the sitemap
generateSitemap(baseUrl, outputPath)
  .then(() => console.log(`Sitemap generated successfully for ${baseUrl}`))
  .catch(err => {
    console.error('Error generating sitemap:', err);
    process.exit(1);
  });