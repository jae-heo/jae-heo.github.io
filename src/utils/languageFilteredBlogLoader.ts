// src/utils/languageFilteredBlogLoader.ts
import { BlogPost } from '../types';
import { getBlogPosts, getBlogPostBySlug } from './blogLoader';
import i18n from '../i18n';
import { detectContentLanguage } from './contentLanguageDetector';

/**
 * Get all blog posts filtered by the current language
 */
export async function getLanguageFilteredBlogPosts(): Promise<BlogPost[]> {
  const currentLang = i18n.language;
  const allPosts = await getBlogPosts();
  
  // Filter posts based on language
  return allPosts.filter(post => {
    // If post has explicit language property, use it
    if (post.language) {
      return post.language === currentLang;
    }
    
    // Otherwise, detect language from content
    const detectedLanguage = detectContentLanguage(post.title + ' ' + post.content);
    return detectedLanguage === currentLang;
  });
}

/**
 * Get recent blog posts filtered by the current language
 */
export async function getRecentLanguageFilteredPosts(count: number = 3): Promise<BlogPost[]> {
  const posts = await getLanguageFilteredBlogPosts();
  return [...posts]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count);
}

/**
 * Get blog posts by tag filtered by the current language
 */
export async function getLanguageFilteredPostsByTag(tag: string): Promise<BlogPost[]> {
  const posts = await getLanguageFilteredBlogPosts();
  return posts.filter(post => 
    post.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
  );
}

/**
 * Get a specific blog post by slug, ensuring it matches the current language
 * If the post doesn't match the current language, return undefined
 */
export async function getLanguageFilteredPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const currentLang = i18n.language;
  const post = await getBlogPostBySlug(slug);
  
  if (!post) return undefined;
  
  // If post has explicit language property, use it
  if (post.language) {
    return post.language === currentLang ? post : undefined;
  }
  
  // Otherwise, detect language from content
  const detectedLanguage = detectContentLanguage(post.title + ' ' + post.content);
  return detectedLanguage === currentLang ? post : undefined;
}