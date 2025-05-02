// src/pages/AboutPage.tsx
import { useTranslation } from 'react-i18next';
import Layout from '../components/layout/Layout';
import blogConfig from '../config/blog';

interface AboutPageProps {
  showLayoutControls?: boolean;
}

function AboutPage({ showLayoutControls = false }: AboutPageProps) {
  const { t } = useTranslation();
  
  return (
    <Layout showLayoutControls={showLayoutControls}>
      <section className="about-section">
        <h1 className="page-title">{t('nav.about')}</h1>
        
        <div className="about-content">
          <div className="author-info">
            {blogConfig.blog.authorImageUrl && (
              <div className="author-image">
                <img 
                  src={blogConfig.blog.authorImageUrl} 
                  alt={blogConfig.blog.author} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-profile.jpg';
                  }}
                />
              </div>
            )}
            
            <div className="author-bio">
              <h2>{blogConfig.blog.author}</h2>
              <p>{blogConfig.blog.authorBio}</p>
            </div>
          </div>
          
          <div className="about-blog">
            <h2>{t('blog.title')}</h2>
            <p>{t('blog.description')}</p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;