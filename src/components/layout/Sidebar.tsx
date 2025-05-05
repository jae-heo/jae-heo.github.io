// src/components/layout/Sidebar.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLanguageFilteredBlogPosts } from '../../utils/languageFilteredBlogLoader';
import { getCategories } from '../../utils/blogLoader';
import { BlogPost, Category } from '../../types/blog';
import AuthorProfile from '../common/AuthorProfile';
import styles from './Sidebar.module.css';

interface SidebarProps {
  position: 'left' | 'right';
  className?: string;
}

/**
 * Unified sidebar component that handles both left and right sidebars
 * Left sidebar: Author profile and categories
 * Right sidebar: Recent posts, archives, tags
 * All counts are filtered by current language
 */
function Sidebar({ position, className }: SidebarProps) {
  const { t, i18n } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [recentPosts, setRecentPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Load data based on current language
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        
        // Get language-filtered posts
        const filteredPosts = await getLanguageFilteredBlogPosts();
        
        if (position === 'left') {
          // Load all categories first
          const allCategories = await getCategories();
          setCategories(allCategories);
          
          // Then create language-filtered category counts
          const tagCountMap = new Map<string, number>();
          
          // Count posts per tag for the current language only
          filteredPosts.forEach(post => {
            post.tags.forEach(tag => {
              const tagLower = tag.toLowerCase();
              const count = tagCountMap.get(tagLower) || 0;
              tagCountMap.set(tagLower, count + 1);
            });
          });
          
          // Create filtered categories with updated counts
          const updatedCategories = allCategories.map(category => {
            const tagCount = tagCountMap.get(category.slug) || 0;
            return {
              ...category,
              count: tagCount
            };
          }).filter(category => category.count > 0); // Only show categories with posts
          
          setFilteredCategories(updatedCategories);
        } else {
          // Get recent posts for right sidebar (already filtered by language)
          const recent = filteredPosts
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 5);
            
          setRecentPosts(recent);
        }
      } catch (error) {
        console.error(`Failed to load sidebar data for ${position} sidebar:`, error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [position, i18n.language]); // Reload when language changes
  
  // Determine sidebar classes
  const sidebarClasses = [
    styles.sidebar,
    position === 'left' ? styles.left : styles.right,
    className
  ].filter(Boolean).join(' ');
  
  // Left sidebar content
  if (position === 'left') {
    return (
      <aside className={sidebarClasses}>
        {/* Author Profile Section */}
        <div className={styles.section}>
          <h3>{t('sidebar.about')}</h3>
          <AuthorProfile compact={true} />
        </div>
        
        {/* Categories Section - Now filtered by language */}
        <div className={styles.section}>
          <h3>{t('sidebar.categories')}</h3>
          {loading ? (
            <div>Loading...</div>
          ) : filteredCategories.length === 0 ? (
            <p className={styles.noCategories}>{t('sidebar.noCategories')}</p>
          ) : (
            <ul className={styles.categoryList}>
              {filteredCategories.map(category => (
                <li key={category.id}>
                  <Link to={`/tag/${category.slug}`}>
                    {category.name} ({category.count})
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    );
  }
  
  // Right sidebar content
  return (
    <aside className={sidebarClasses}>
      {/* Recent Posts Section - Already filtered by language */}
      <div className={styles.section}>
        <h3>{t('sidebar.recentPosts')}</h3>
        {loading ? (
          <div>Loading...</div>
        ) : recentPosts.length === 0 ? (
          <p className={styles.noPosts}>{t('sidebar.noPosts')}</p>
        ) : (
          <ul className={styles.recentPostsList}>
            {recentPosts.map(post => (
              <li key={post.id}>
                <Link to={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
                <span className={styles.postDate}>
                  {new Date(post.date).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
      
      {/* Social Media Section */}
      <div className={styles.section}>
        <h3>{t('sidebar.socialMedia')}</h3>
        <div className={styles.socialLinks}>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>
      
      {/* Tag Cloud Section - Using filtered categories to show only tags with posts */}
      <div className={styles.section}>
        <h3>{t('sidebar.tagCloud')}</h3>
        {loading ? (
          <div>Loading...</div>
        ) : filteredCategories.length === 0 ? (
          <p className={styles.noTags}>{t('sidebar.noTags')}</p>
        ) : (
          <div className={styles.tagCloud}>
            {filteredCategories.map(category => (
              <Link 
                key={category.id} 
                to={`/tag/${category.slug}`} 
                className={styles.tag}
                // Make tag size proportional to post count
                style={{ 
                  fontSize: `${Math.max(0.8, Math.min(1.4, 0.8 + category.count * 0.1))}rem`
                }}
              >
                #{category.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;