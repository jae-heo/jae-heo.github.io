import { BlogPost, Category } from '../types';
import matter from 'gray-matter';

// Cache for blog posts and categories
let postsCache: BlogPost[] | null = null;
let categoriesCache: Category[] | null = null;

/**
 * Load blog posts from markdown files
 */
export async function loadBlogPosts(): Promise<BlogPost[]> {
  // Return cached posts if available
  if (postsCache) {
    return postsCache;
  }

  try {
    // Use import.meta.glob to load markdown files
    const postFiles = import.meta.glob('../content/posts/*.md', { query: '?raw', import: 'default' });
    
    // If no files found, return empty array
    if (Object.keys(postFiles).length === 0) {
      console.warn('No markdown files found in /src/content/posts/');
      postsCache = [];
      return postsCache;
    }

    const posts: BlogPost[] = [];

    // Process each markdown file
    for (const [path, loader] of Object.entries(postFiles)) {
      try {
        const fileContent = await loader() as string;
        
        // Parse frontmatter and content using gray-matter
        const { data: frontmatter, content } = matter(fileContent);

        // Validate required frontmatter fields
        if (!frontmatter.id || !frontmatter.title || !frontmatter.slug) {
          console.warn(`Skipping invalid post at ${path}: missing required frontmatter fields (id, title, or slug)`);
          continue;
        }

        // Construct BlogPost object
        const post: BlogPost = {
          id: frontmatter.id.toString(),
          title: frontmatter.title,
          description: frontmatter.description || '',
          content: content.trim(),
          date: frontmatter.date || new Date().toISOString().split('T')[0],
          author: frontmatter.author || 'Anonymous',
          tags: Array.isArray(frontmatter.tags) ? frontmatter.tags : [],
          imageUrl: frontmatter.imageUrl || '/images/default.jpg',
          slug: frontmatter.slug,
          language: frontmatter.language || 'en' // Default to 'en' if not specified
        };

        posts.push(post);
      } catch (error) {
        console.error(`Error processing file ${path}:`, error);
      }
    }

    // Log if no valid posts were loaded
    if (posts.length === 0) {
      console.warn('No valid posts loaded from markdown files');
    }

    // Cache and return the loaded posts
    postsCache = posts;
    return postsCache;

  } catch (error) {
    console.error('Error loading blog posts:', error);
    postsCache = [];
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
 * Get blog posts by language
 */
export async function getBlogPostsByLanguage(language: string): Promise<BlogPost[]> {
  const posts = await loadBlogPosts();
  return posts.filter(post => post.language?.toLowerCase() === language.toLowerCase());
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