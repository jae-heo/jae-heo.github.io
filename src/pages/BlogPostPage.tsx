// src/pages/BlogPostPage.tsx
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import BlogPostDetail from '../components/blog/BlogPostDetail';
import { getBlogPostBySlug } from '../utils/blogLoader'; // Updated import
import { BlogPost } from '../types/blog';

function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadPost() {
      if (!slug) {
        navigate('/blog');
        return;
      }
      
      try {
        const fetchedPost = await getBlogPostBySlug(slug);
        if (fetchedPost) {
          setPost(fetchedPost);
          // Update page title
          document.title = `${fetchedPost.title} | ${t('blog.title')}`;
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
      document.title = t('blog.title');
    };
  }, [slug, navigate, t]);
  
  if (loading) {
    return (
      <Layout>
        <div className="loading">Loading post...</div>
      </Layout>
    );
  }
  
  if (!post) {
    return null; // Will redirect in useEffect
  }
  
  return (
    <Layout>
      <BlogPostDetail post={post} />
    </Layout>
  );
}

export default BlogPostPage;