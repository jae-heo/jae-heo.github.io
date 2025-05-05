// src/pages/BlogPostPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BlogPostDetail from '../components/blog/BlogPostDetail';
import { getLanguageFilteredPostBySlug } from '../utils/languageFilteredBlogLoader';
import { BlogPost } from '../types';
import { useI18n } from '../hooks/useI18n';
import styles from './BlogPostPage.module.css';

function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t, currentLang } = useI18n();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        navigate('/blog');
        return;
      }
      
      try {
        setLoading(true);
        const fetchedPost = await getLanguageFilteredPostBySlug(slug);
        
        if (fetchedPost) {
          setPost(fetchedPost);
          // Set page title to post title
          document.title = fetchedPost.title;
        } else {
          // Post not found in current language, redirect to blog list
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
  }, [slug, navigate, currentLang]);
  
  return (
    <Layout>
      <div className={styles.container}>
        {loading ? (
          <div className="loading">{t('post.loading')}</div>
        ) : (
          post && <BlogPostDetail post={post} />
        )}
      </div>
    </Layout>
  );
}

export default BlogPostPage;