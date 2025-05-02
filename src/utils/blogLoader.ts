// src/utils/blogLoader.ts
import { BlogPost, Category } from '../types/blog';
import matter from 'gray-matter';
import { marked } from 'marked';

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
    // Import all .md files from the posts directory
    const postFiles = import.meta.glob('../content/posts/*.md', { as: 'raw' });
    const posts: BlogPost[] = [];

    // Process each file
    for (const path in postFiles) {
      // Get the file content
      const content = await postFiles[path]();
      
      // Parse frontmatter and content
      const { data, content: markdownContent } = matter(content);
      
      // Extract slug from filename
      const filename = path.split('/').pop() || '';
      const slug = filename.replace(/\.md$/, '');
      
      // Convert markdown to HTML
      const htmlContent = marked(markdownContent);
      
      // Create BlogPost object
      posts.push({
        id: data.id || slug,
        title: data.title,
        description: data.description,
        content: htmlContent,
        rawContent: markdownContent, // Optional: keep the raw markdown
        date: data.date,
        author: data.author,
        tags: data.tags || [],
        imageUrl: data.imageUrl,
        slug: slug
      });
    }
    
    // Sort posts by date (newest first)
    const sortedPosts = posts.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    // Cache the sorted posts
    postsCache = sortedPosts;
    
    return sortedPosts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
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