// scripts/submitSitemap.js
const { google } = require('googleapis');
const { JWT } = require('google-auth-library');

// Create authentication client using environment variable
const createAuthClient = () => {
  const keys = JSON.parse(Buffer.from(process.env.GOOGLE_SEARCH_CONSOLE_KEY, 'base64').toString('utf-8'));
  
  return new JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: ['https://www.googleapis.com/auth/webmasters'],
  });
};

// Submit sitemap to Google Search Console
const submitSitemap = async () => {
  try {
    const client = createAuthClient();
    const searchconsole = google.searchconsole('v1');
    
    google.options({ auth: client });
    
    // Your website URL (must match exactly how it appears in Search Console)
    const siteUrl = process.env.SITE_URL || 'https://jae-heo.github.io';
    
    // Your sitemap URL
    const sitemapUrl = process.env.SITEMAP_URL || 'https://jae-heo.github.io/sitemap.xml';
    
    console.log(`Submitting sitemap ${sitemapUrl} for site ${siteUrl}...`);
    
    await searchconsole.sitemaps.submit({
      siteUrl: siteUrl,
      feedpath: sitemapUrl, 
    });
    
    console.log('Sitemap submitted successfully to Google Search Console!');
  } catch (error) {
    console.error('Error submitting sitemap:', error.message);
    // Don't exit with error to prevent deployment failure
    if (error.message && error.message.includes('insufficient permission')) {
      console.log('ERROR: Make sure the service account has been added to your Search Console property with Owner permissions.');
    }
  }
};

// Execute the submission
submitSitemap();