// src/pages/BlogListPage.tsx - Add showLayoutControls prop
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { getBlogPosts } from '../utils/blogLoader'; 
import { BlogPost } from '../types/blog';

interface BlogListPageProps {
  showLayoutControls?: boolean;
}

function BlogListPage({ showLayoutControls = false }: BlogListPageProps) {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const posts = await getBlogPosts();
        setAllPosts(posts);
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);
  
  return (
    <Layout showLayoutControls={showLayoutControls}>
      <section className="blog-list-section">
        <h1 className="page-title">Blog</h1>
        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : (
          <BlogPostList posts={allPosts} />
        )}
      </section>
    </Layout>
  );
}

export default BlogListPage;