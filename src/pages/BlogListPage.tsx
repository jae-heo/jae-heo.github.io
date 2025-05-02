// src/pages/BlogListPage.tsx
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { getBlogPosts } from '../data/blogPosts';

function BlogListPage() {
  const allPosts = getBlogPosts();
  
  return (
    <Layout>
      <section className="blog-list-section">
        <h1 className="page-title">Blog</h1>
        <BlogPostList posts={allPosts} />
      </section>
    </Layout>
  );
}

export default BlogListPage;