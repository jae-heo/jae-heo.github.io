// src/pages/BlogPostPage.tsx
import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import BlogPostDetail from '../components/blog/BlogPostDetail';
import { getBlogPostBySlug } from '../data/blogPosts';

function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const post = slug ? getBlogPostBySlug(slug) : null;
  
  useEffect(() => {
    if (!post && slug) {
      // Post not found, redirect to 404 or blog list
      navigate('/blog');
    }
    
    // Update page title
    if (post) {
      document.title = `${post.title} | ${t('blog.title')}`;
    }
    
    return () => {
      // Reset title when unmounting
      document.title = t('blog.title');
    };
  }, [post, slug, navigate, t]);
  
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