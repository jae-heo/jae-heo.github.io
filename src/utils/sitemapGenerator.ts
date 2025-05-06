// src/utils/sitemapGenerator.ts
import fs from 'fs';
import { getBlogPosts } from './blogLoader';

interface SitemapUrlEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generate sitemap.xml file for the blog
 * @param baseUrl The base URL of your site
 * @param outputPath Path to output the sitemap.xml file
 */
export async function generateSitemap(baseUrl: string, outputPath: string): Promise<void> {
  // Remove trailing slash if present
  const normalizedBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  
  // Create an array to hold all URLs
  const urlEntries: SitemapUrlEntry[] = [];
  
  // Add static pages
  const staticPages = [
    { url: '/', priority: 1.0 },
    { url: '/blog', priority: 0.8 },
    { url: '/about', priority: 0.7 },
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
  
  // Add blog posts
  try {
    const posts = await getBlogPosts();
    
    // Add blog posts to entries
    posts.forEach(post => {
      urlEntries.push({
        url: `${normalizedBaseUrl}/blog/${post.slug}`,
        lastmod: new Date(post.date).toISOString().split('T')[0],
        changefreq: 'monthly',
        priority: 0.6
      });
    });
    
    // Add tag pages based on unique tags from posts
    const uniqueTags = new Set<string>();
    posts.forEach(post => {
      post.tags.forEach(tag => uniqueTags.add(tag.toLowerCase()));
    });
    
    uniqueTags.forEach(tag => {
      urlEntries.push({
        url: `${normalizedBaseUrl}/tag/${tag}`,
        changefreq: 'weekly',
        priority: 0.5
      });
    });
    
  } catch (error) {
    console.error('Error loading blog posts for sitemap:', error);
  }
  
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
  
  // Write sitemap.xml file
  fs.writeFileSync(outputPath, sitemapContent);
  console.log(`Sitemap generated successfully at ${outputPath}!`);
}