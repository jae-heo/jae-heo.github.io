// src/pages/BlogPostPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BlogPostDetail from '../components/blog/BlogPostDetail';
import { getLocalizedBlogPostBySlug } from '../utils/multilingualPostLoader';
import { BlogPost } from '../types/blog';
import { useI18n } from '../hooks/useI18n';
import { detectContentLanguage } from '../utils/contentLanguageDetector';

interface BlogPostPageProps {
  showLayoutControls?: boolean;
}

function BlogPostPage({ showLayoutControls = false }: BlogPostPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { getPageTitle, i18n, switchLanguage } = useI18n();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [contentLanguage, setContentLanguage] = useState<'ko' | 'en' | null>(null);
  
  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        navigate('/blog');
        return;
      }
      
      try {
        setLoading(true);
        const fetchedPost = await getLocalizedBlogPostBySlug(slug);
        
        if (fetchedPost) {
          setPost(fetchedPost);
          
          // Detect content language
          const detectedLanguage = detectContentLanguage(fetchedPost.content);
          setContentLanguage(detectedLanguage);
          
          // Update page title
          document.title = getPageTitle(fetchedPost.title);
          
          // If content language doesn't match UI language, suggest switching
          if (detectedLanguage !== i18n.language) {
            console.log(`Content is in ${detectedLanguage} but UI is in ${i18n.language}`);
            // This could trigger a language switch suggestion UI
          }
        } else {
          // Post not found, redirect to blog list
          navigate('/blog');
        }
      } catch (error) {
        console.error(`Failed to load post with slug: ${slug}`, error);
        navigate('/blog');
      } finally {
        setLoading(false);
      }
    }

    loadPost();
    
    return () => {
      // Reset title when unmounting
      document.title = getPageTitle('blog.title');
    };
  }, [slug, navigate, getPageTitle, i18n.language]);
  
  // Function to handle language switch suggestion
  const handleLanguageSwitch = (lang: string) => {
    switchLanguage(lang);
  };
  
  if (loading) {
    return (
      <Layout showLayoutControls={showLayoutControls}>
        <div className="loading">{useI18n().t('common.loading')}</div>
      </Layout>
    );
  }
  
  if (!post) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <Layout showLayoutControls={showLayoutControls}>
      {/* Optional language suggestion banner */}
      {contentLanguage && contentLanguage !== i18n.language && (
        <div className="language-suggestion-banner">
          <p>
            {i18n.language === 'ko' 
              ? '이 콘텐츠는 영어로 작성되었습니다. 영어로 전환하시겠습니까?' 
              : 'This content was written in Korean. Would you like to switch to Korean?'
            }
          </p>
          <button onClick={() => handleLanguageSwitch(contentLanguage)}>
            {i18n.language === 'ko' ? '영어로 전환' : 'Switch to Korean'}
          </button>
        </div>
      )}
      
      <BlogPostDetail post={post} />
    </Layout>
  );
}

export default BlogPostPage;