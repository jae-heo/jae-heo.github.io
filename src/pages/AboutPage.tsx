// src/pages/AboutPage.tsx
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import blogConfig from '../config/blog';

interface AboutPageProps {
  showLayoutControls?: boolean;
}

function AboutPage({ showLayoutControls = false }: AboutPageProps) {
  const { t, i18n } = useTranslation();
  
  // Get localized author information based on current language
  const currentLang = i18n.language;
  const authorName = blogConfig.languages.info[currentLang]?.authorName || blogConfig.blog.author;
  const authorBio = blogConfig.languages.info[currentLang]?.authorBio || blogConfig.blog.authorBio;
  
  // Update page title when language changes
  useEffect(() => {
    document.title = t('meta.pageTitle', { title: t('pages.about.title') });
  }, [i18n.language, t]);
  
  return (
    <Layout showLayoutControls={showLayoutControls}>
      <section className="about-section">
        <h1 className="page-title">{t('pages.about.title')}</h1>
        
        <div className="about-content">
          <div className="author-info">
            {blogConfig.blog.authorImageUrl && (
              <div className="author-image">
                <img 
                  src={blogConfig.blog.authorImageUrl} 
                  alt={authorName} 
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/placeholder-profile.jpg';
                  }}
                />
              </div>
            )}
            
            <div className="author-bio">
              <h2>{t('pages.about.aboutMe')}</h2>
              <h3>{authorName}</h3>
              <p>{authorBio}</p>
            </div>
          </div>
          
          <div className="about-blog">
            <h2>{t('pages.about.aboutBlog')}</h2>
            <p>{t('blog.description')}</p>
          </div>
          
          <div className="skills-section">
            <h3>{t('pages.about.skills')}</h3>
            <div className="skills-grid">
              <div className="skill-item">React</div>
              <div className="skill-item">TypeScript</div>
              <div className="skill-item">JavaScript</div>
              <div className="skill-item">HTML/CSS</div>
              <div className="skill-item">Node.js</div>
              <div className="skill-item">Git</div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;