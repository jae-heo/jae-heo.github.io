// src/pages/AboutPage.tsx
import { useEffect } from 'react';
import Layout from '../components/layout/Layout';
import AuthorProfile from '../components/common/AuthorProfile';
import { useI18n } from '../hooks/useI18n';
import './AboutPage.css';

/**
 * About page component
 * Displays author information and blog details
 */
function AboutPage() {
  const { t, getPageTitle } = useI18n();
  
  useEffect(() => {
    // Set page title
    document.title = getPageTitle('pages.about.title');
  }, [getPageTitle]);
  
  return (
    <Layout>
      <section className="about-section">
        <h1 className="page-title">{t('pages.about.title')}</h1>
        
        <div className="about-content">
          {/* Author information */}
          <div className="author-container">
            <h2>{t('pages.about.aboutMe')}</h2>
            <AuthorProfile />
          </div>
          
          {/* About the blog */}
          <div className="about-blog">
            <h2>{t('pages.about.aboutBlog')}</h2>
            <p>{t('blog.description')}</p>
          </div>
          
          {/* Skills section */}
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