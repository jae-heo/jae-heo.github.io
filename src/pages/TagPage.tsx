// src/pages/TagPage.tsx
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import BlogPostList from '../components/blog/BlogPostList';
import { getBlogPostsByTag } from '../utils/blogLoader';
import { BlogPost } from '../types/blog';

interface TagPageProps {
  showLayoutControls?: boolean;
}

function TagPage({ showLayoutControls = false }: TagPageProps) {
  const { tag } = useParams<{ tag: string }>();
  const [taggedPosts, setTaggedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    async function loadPosts() {
      if (!tag) return;
      
      try {
        const posts = await getBlogPostsByTag(tag);
        setTaggedPosts(posts);
      } catch (error) {
        console.error(`Failed to load posts with tag: ${tag}`, error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [tag]);
  
  return (
    <Layout showLayoutControls={showLayoutControls}>
      <section className="tag-posts-section">
        <h1 className="page-title">
          #{tag}
        </h1>
        {loading ? (
          <div className="loading">Loading posts...</div>
        ) : (
          <BlogPostList 
            posts={taggedPosts} 
            title={`${taggedPosts.length} ${taggedPosts.length === 1 ? 'post' : 'posts'}`}
          />
        )}
      </section>
    </Layout>
  );
}

export default TagPage;