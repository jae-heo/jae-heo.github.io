// src/pages/BlogListPage.tsx
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { getBlogPosts } from '../utils/blogLoader'; // Updated import
import { BlogPost } from '../types/blog';

function BlogListPage() {
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
    <Layout>
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