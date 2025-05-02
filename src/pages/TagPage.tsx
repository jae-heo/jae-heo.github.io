// src/pages/TagPage.tsx
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { getBlogPostsByTag } from '../data/blogPosts';

function TagPage() {
  const { tag } = useParams<{ tag: string }>();
  const taggedPosts = tag ? getBlogPostsByTag(tag) : [];
  
  return (
    <Layout>
      <section className="tag-posts-section">
        <h1 className="page-title">
          #{tag}
        </h1>
        <BlogPostList 
          posts={taggedPosts} 
          title={`${taggedPosts.length} ${taggedPosts.length === 1 ? 'post' : 'posts'}`}
        />
      </section>
    </Layout>
  );
}

export default TagPage;