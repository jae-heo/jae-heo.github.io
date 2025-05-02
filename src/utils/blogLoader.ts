// src/utils/blogLoader.ts
import { BlogPost, Category } from '../types';
import { blogPosts as sampleBlogPosts } from '../data/blogPosts';

// Cache for blog posts and categories
let postsCache: BlogPost[] | null = null;
let categoriesCache: Category[] | null = null;

/**
 * Load blog posts from markdown files or sample data
 */
export async function loadBlogPosts(): Promise<BlogPost[]> {
  // Return cached posts if available
  if (postsCache) {
    return postsCache;
  }

  try {
    // Try to use file-based approach with import.meta.glob
    try {
      const postFiles = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default' });
      
      // If no files, fall back to sample data
      if (Object.keys(postFiles).length === 0) {
        throw new Error('No markdown files found');
      }
      
      // File processing would happen here in a real implementation
      // For now, fall back to sample data
      throw new Error('File processing not implemented');
      
    } catch (error) {
      console.log('Using sample blog data');
      
      // Use sample data from blogPosts.ts
      postsCache = [...sampleBlogPosts]; 
      return postsCache;
    }
  } catch (error) {
    console.error('Error loading blog posts:', error);
    
    // Fallback to sample data
    postsCache = [...sampleBlogPosts];
    return postsCache;
  }
}

/**
 * Get all blog posts
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  return loadBlogPosts();
}

/**
 * Get a specific blog post by slug
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const posts = await loadBlogPosts();
  return posts.find(post => post.slug === slug);
}

/**
 * Get blog posts by tag
 */
export async function getBlogPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await loadBlogPosts();
  return posts.filter(post => 
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/**
 * Get recent blog posts
 */
export async function getRecentBlogPosts(count: number = 3): Promise<BlogPost[]> {
  const posts = await loadBlogPosts();
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

/**
 * Get all categories with post counts
 */
export async function getCategories(): Promise<Category[]> {
  // Return cached categories if available
  if (categoriesCache) {
    return categoriesCache;
  }

  const posts = await loadBlogPosts();
  const categoryMap = new Map<string, Category>();
  
  // Process tags from all posts to build categories
  posts.forEach(post => {
    post.tags.forEach(tag => {
      const tagLower = tag.toLowerCase();
      const slug = tagLower.replace(/\s+/g, '-');
      
      if (categoryMap.has(slug)) {
        // Increment count if category exists
        const category = categoryMap.get(slug)!;
        category.count += 1;
      } else {
        // Create new category
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

/**
 * Clear cache (for development)
 */
export function clearCache(): void {
  postsCache = null;
  categoriesCache = null;
}