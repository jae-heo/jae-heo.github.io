// src/utils/markdownLoader.ts
import { BlogPost, Category } from '../types';
import matter from 'gray-matter';

// Cache for blog posts and categories
let postsCache: BlogPost[] | null = null;
let categoriesCache: Category[] | null = null;

/**
 * Load blog posts from markdown files in the content/posts directory
 */
export async function loadBlogPosts(): Promise<BlogPost[]> {
  // Return cached posts if available
  if (postsCache) {
    return postsCache;
  }

  try {
    // Use Vite's import.meta.glob to get all markdown files
    const postModules = import.meta.glob('../content/posts/*.md', { eager: true, as: 'raw' });
    
    // If no modules found, return empty array
    if (Object.keys(postModules).length === 0) {
      console.warn('No markdown files found in content/posts directory');
      return [];
    }
    
    // Process each markdown file using gray-matter
    const posts: BlogPost[] = Object.entries(postModules).map(([path, content]) => {
      // Parse frontmatter and content using gray-matter
      const { data, content: markdownContent } = matter(content as string);
      
      // Extract the filename (slug) from the path
      // e.g., "../content/posts/my-post.md" -> "my-post"
      const filename = path.split('/').pop()?.replace('.md', '') || '';
      
      // Use the frontmatter data to populate the BlogPost object
      return {
        id: data.id || filename,
        title: data.title || 'Untitled',
        description: data.description || '',
        content: markdownContent,
        date: data.date || new Date().toISOString(),
        author: data.author || 'Anonymous',
        tags: data.tags || [],
        imageUrl: data.imageUrl || undefined,
        slug: data.slug || filename,
        language: data.language || detectLanguageFromContent(data.title + ' ' + markdownContent),
      };
    });
    
    // Sort posts by date (newest first)
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Cache the posts
    postsCache = sortedPosts;
    
    return sortedPosts;
  } catch (error) {
    console.error('Error loading blog posts from markdown files:', error);
    return [];
  }
}

/**
 * Simple language detection function
 * Detects if content is primarily Korean or English
 */
function detectLanguageFromContent(text: string): 'ko' | 'en' {
  // Count Korean characters (Hangul)
  const koreanPattern = /[가-힣]/g;
  const koreanMatches = text.match(koreanPattern) || [];
  
  // If more than 5 Korean characters, assume it's Korean
  if (koreanMatches.length > 5) {
    return 'ko';
  }
  
  // Default to English
  return 'en';
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