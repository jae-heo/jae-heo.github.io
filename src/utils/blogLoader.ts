// src/utils/blogLoader.ts

import { BlogPost, Category } from '../types/blog';

// Import sample blog posts from our data directory
// This is a fallback in case the file-based approach doesn't work
import { blogPosts as sampleBlogPosts } from '../data/blogPosts';

// In-memory cache to avoid reading files multiple times
let postsCache: BlogPost[] | null = null;
let categoriesCache: Category[] | null = null;

// Function to load blog posts from markdown files
export async function loadBlogPosts(): Promise<BlogPost[]> {
  // Return cached posts if available
  if (postsCache) {
    return postsCache;
  }

  try {
    // Try to use the file-based approach with import.meta.glob
    try {
      // Use the updated syntax for Vite's import.meta.glob
      const postFiles = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default' });
      
      // If there are no files, throw an error to fall back to the sample data
      if (Object.keys(postFiles).length === 0) {
        throw new Error('No markdown files found');
      }
      
      // Process will continue here if files are found
      console.log('Found markdown files:', Object.keys(postFiles).length);
      
      // Actual file processing would happen here...
      // But for now, we'll just use the sample data
      throw new Error('Processing not implemented yet');
      
    } catch (error) {
      // Log but don't re-throw - we'll fall back to sample data
      console.warn('Error using file-based approach:', error);
      console.log('Falling back to sample data');
      
      // Use the sample data from blogPosts.ts instead
      postsCache = [...sampleBlogPosts]; // Clone to avoid modifying the original
      return postsCache;
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
    
    // Fallback to sample data in case of any error
    postsCache = [...sampleBlogPosts];
    return postsCache;
  }
}

// Get all blog posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  return loadBlogPosts();
}

// Get a specific blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await loadBlogPosts();
  return posts.find(post => post.slug === slug);
}

// Get blog posts by tag
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await loadBlogPosts();
  return posts.filter(post => 
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

// Get recent blog posts
export async function getRecentBlogPosts(count: number = 3): Promise<BlogPost[]> {
  const posts = await loadBlogPosts();
  return posts.slice(0, count);
}

// Calculate and get categories with post counts
export async function getCategories(): Promise<Category[]> {
  // Return cached categories if available
  if (categoriesCache) {
    return categoriesCache;
  }

  const posts = await loadBlogPosts();
  const categoryMap = new Map<string, { id: string, name: string, slug: string, count: number }>();
  
  // Process all tags from all posts
  posts.forEach(post => {
    post.tags.forEach(tag => {
      const tagLower = tag.toLowerCase();
      const slug = tagLower.replace(/\s+/g, '-');
      
      if (categoryMap.has(slug)) {
        // Increment count if category exists
        categoryMap.get(slug)!.count += 1;
      } else {
        // Create new category if it doesn't exist
        categoryMap.set(slug, {
          id: slug,
          name: tag,
          slug: slug,
          count: 1
        });
      }
    });
  });
  
  // Convert map to array and sort by name
  const categories = Array.from(categoryMap.values())
    .sort((a, b) => a.name.localeCompare(b.name));
  
  // Cache the categories
  categoriesCache = categories;
  
  return categories;
}

// Clear cache (useful if you want to reload posts, e.g., in development)
export function clearCache(): void {
  postsCache = null;
  categoriesCache = null;
}