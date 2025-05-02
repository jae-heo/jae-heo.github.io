// src/utils/multilingualPostLoader.ts
import { BlogPost } from '../types/blog';
import { getBlogPosts, getBlogPostBySlug } from './blogLoader';
import blogConfig from '../config/blog';
import i18n from '../i18n';

// Interface for multilingual posts (extends BlogPost)
export interface MultilingualBlogPost extends BlogPost {
  translations?: {
    [langCode: string]: Partial<BlogPost>;
  };
}

/**
 * Get localized version of a blog post for the current language
 * @param post The original blog post, potentially with translations
 * @returns A localized version of the blog post
 */
export function getLocalizedPost(post: MultilingualBlogPost): BlogPost {
  const currentLang = i18n.language;
  const defaultLang = blogConfig.languages.default;
  
  // If post doesn't have translations or current language matches post's original language,
  // return the original post
  if (!post.translations || Object.keys(post.translations).length === 0) {
    return post;
  }
  
  // If we have a translation for the current language, merge it with the original post
  if (post.translations[currentLang]) {
    return {
      ...post,
      ...post.translations[currentLang]
    };
  }
  
  // If no translation is available for the current language, return original post
  return post;
}

/**
 * Get all blog posts, localized for the current language
 */
export async function getLocalizedBlogPosts(): Promise<BlogPost[]> {
  try {
    const posts = await getBlogPosts() as MultilingualBlogPost[];
    return posts.map(getLocalizedPost);
  } catch (error) {
    console.error('Error loading localized blog posts:', error);
    return [];
  }
}

/**
 * Get a specific blog post by slug, localized for the current language
 */
export async function getLocalizedBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const post = await getBlogPostBySlug(slug) as MultilingualBlogPost | undefined;
    if (!post) return undefined;
    
    return getLocalizedPost(post);
  } catch (error) {
    console.error(`Error loading localized blog post with slug: ${slug}`, error);
    return undefined;
  }
}

/**
 * Create a multilingual blog post
 * This can be used to create posts with translations for different languages
 */
export function createMultilingualPost(
  basePost: BlogPost,
  translations: { [langCode: string]: Partial<BlogPost> }
): MultilingualBlogPost {
  return {
    ...basePost,
    translations
  };
}

export default {
  getLocalizedPost,
  getLocalizedBlogPosts,
  getLocalizedBlogPostBySlug,
  createMultilingualPost
};