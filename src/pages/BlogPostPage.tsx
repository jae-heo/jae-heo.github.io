// src/pages/BlogPostPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BlogPostDetail from '../components/blog/BlogPostDetail';
import { getBlogPostBySlug } from '../utils/blogLoader';
import { BlogPost } from '../types';
import { useI18n } from '../hooks/useI18n';
import './BlogPostPage.css';

/**
 * Blog post page component
 * Displays a single blog post
 */
function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useI18n();
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
        const fetchedPost = await getBlogPostBySlug(slug);
        
        if (fetchedPost) {
          setPost(fetchedPost);
          // Set page title to post title
          document.title = fetchedPost.title;
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
  }, [slug, navigate]);
  
  return (
    <Layout>
      {loading ? (
        <div className="loading">{t('post.loading')}</div>
      ) : (
        post && <BlogPostDetail post={post} />
      )}
    </Layout>
  );
}

export default BlogPostPage;