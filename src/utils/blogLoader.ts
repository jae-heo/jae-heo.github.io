import { BlogPost, Category } from '../types';
import matter from 'gray-matter';

// Cache for blog posts and categories
let postsCache: BlogPost[] | null = null;
let categoriesCache: Category[] | null = null;

/**
 * Load blog posts from markdown files recursively from all subdirectories
 */
export async function loadBlogPosts(): Promise<BlogPost[]> {
  // Return cached posts if available
  if (postsCache) {
    return postsCache;
  }

  try {
    // Use import.meta.glob to load markdown files from all directories and subdirectories
    // The double asterisk ** syntax tells Vite to search recursively
    const postFiles = import.meta.glob('../content/posts/**/*.md', { query: '?raw', import: 'default' });
    
    // If no files found, return empty array
    if (Object.keys(postFiles).length === 0) {
      console.warn('No markdown files found in /src/content/posts/ or its subdirectories');
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

        // Skip files without necessary frontmatter
        if (!frontmatter.id || !frontmatter.title || !frontmatter.slug) {
          console.warn(`Skipping blog post ${path}: Missing required frontmatter fields (id, title, or slug)`);
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
      } catch (err) {
        console.error(`Error processing file ${path}:`, err);
      }
    }
    
    // Sort posts by date (newest first)
    const sortedPosts = posts.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    console.log(`Found ${sortedPosts.length} blog posts across all directories`);
    
    // Cache the posts
    postsCache = sortedPosts;
    return sortedPosts;
  } catch (err) {
    console.error('Error scanning blog posts:', err);
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