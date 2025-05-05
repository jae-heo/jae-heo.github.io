// src/contexts/LanguageFilteredBlogContext.tsx
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { BlogPost } from '../types';
import { getLanguageFilteredBlogPosts } from '../utils/languageFilteredBlogLoader';

interface LanguageFilteredBlogContextType {
  posts: BlogPost[];
  loading: boolean;
  error: string | null;
  refreshPosts: () => Promise<void>;
}

const LanguageFilteredBlogContext = createContext<LanguageFilteredBlogContextType>({
  posts: [],
  loading: true,
  error: null,
  refreshPosts: async () => {},
});

export const useLanguageFilteredBlog = () => useContext(LanguageFilteredBlogContext);

interface LanguageFilteredBlogProviderProps {
  children: ReactNode;
}

export const LanguageFilteredBlogProvider: React.FC<LanguageFilteredBlogProviderProps> = ({ children }) => {
  const { i18n } = useTranslation();
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const filteredPosts = await getLanguageFilteredBlogPosts();
      setPosts(filteredPosts);
    } catch (err) {
      console.error('Failed to load language-filtered blog posts:', err);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  // Reload posts when language changes
  useEffect(() => {
    loadPosts();
  }, [i18n.language]);

  return (
    <LanguageFilteredBlogContext.Provider
      value={{
        posts,
        loading,
        error,
        refreshPosts: loadPosts,
      }}
    >
      {children}
    </LanguageFilteredBlogContext.Provider>
  );
};