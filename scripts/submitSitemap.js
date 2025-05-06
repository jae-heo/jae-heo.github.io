// scripts/submitSitemap.js
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// Create authentication client using environment variable
const createAuthClient = () => {
  // Check if the key is provided
  if (!process.env.GOOGLE_SEARCH_CONSOLE_KEY) {
    throw new Error('GOOGLE_SEARCH_CONSOLE_KEY environment variable is not set');
  }
  
  try {
    // Decode the base64 string to get the JSON content
    const decodedKey = Buffer.from(process.env.GOOGLE_SEARCH_CONSOLE_KEY, 'base64').toString('utf-8');
    
    // Parse the JSON content
    const keys = JSON.parse(decodedKey);
    
    return new JWT({
      email: keys.client_email,
      key: keys.private_key,
      scopes: ['https://www.googleapis.com/auth/webmasters'],
    });
  } catch (error) {
    console.error('Failed to decode or parse GOOGLE_SEARCH_CONSOLE_KEY:', error.message);
    throw new Error('GOOGLE_SEARCH_CONSOLE_KEY must be a valid base64-encoded JSON string');
  }
};

// Submit sitemap to Google Search Console
const submitSitemap = async () => {
  try {
    console.log('Starting sitemap submission process...');
    
    // Your website URL (must match exactly how it appears in Search Console)
    const siteUrl = process.env.SITE_URL || 'https://jae-heo.github.io';
    
    // Your sitemap URL
    const sitemapUrl = process.env.SITEMAP_URL || 'https://jae-heo.github.io/sitemap.xml';
    
    console.log(`Submitting sitemap ${sitemapUrl} for site ${siteUrl}...`);
    
    // Create auth client
    const client = createAuthClient();
    const searchconsole = google.searchconsole('v1');
    
    google.options({ auth: client });
    
    // Submit the sitemap
    await searchconsole.sitemaps.submit({
      siteUrl: siteUrl,
      feedpath: sitemapUrl, 
    });
    
    console.log('Sitemap submitted successfully to Google Search Console!');
  } catch (error) {
    console.error('Error submitting sitemap:', error.message);
    // Print more detailed error information
    if (error.stack) {
      console.error('Error stack:', error.stack);
    }
    
    // Don't exit with error to prevent deployment failure
    if (error.message && error.message.includes('insufficient permission')) {
      console.log('ERROR: Make sure the service account has been added to your Search Console property with Owner permissions.');
    }
    
    // We don't exit with an error code to prevent the entire workflow from failing
    // process.exit(1);
  }
};

// Execute the submission
submitSitemap();