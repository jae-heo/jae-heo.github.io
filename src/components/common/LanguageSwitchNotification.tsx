// src/components/common/LanguageSwitchNotification.tsx
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { getLanguageFilteredBlogPosts } from '../../utils/languageFilteredBlogLoader';
import styles from './LanguageSwitchNotification.module.css';

interface LanguageSwitchNotificationProps {
  onClose?: () => void;
}

/**
 * 언어 전환 시 현재 언어로 된 게시물 수를 보여주는 알림 컴포넌트
 */
function LanguageSwitchNotification({ onClose }: LanguageSwitchNotificationProps) {
  const { t, i18n } = useTranslation();
  const [postCount, setPostCount] = useState<number | null>(null);
  const [visible, setVisible] = useState(true);
  const [animationClass, setAnimationClass] = useState('');
  
  // Get current language display name
  const languageDisplay = i18n.language === 'ko' ? '한국어' : 'English';
  
  useEffect(() => {
    // 언어가 변경될 때마다 게시물 수 계산
    async function fetchPostCount() {
      try {
        const posts = await getLanguageFilteredBlogPosts();
        setPostCount(posts.length);
        
        // 알림 표시 및 애니메이션 설정
        setVisible(true);
        setAnimationClass(styles.show);
        
        // 5초 후 알림 숨기기
        const timer = setTimeout(() => {
          setAnimationClass(styles.hide);
          setTimeout(() => setVisible(false), 500);
        }, 5000);
        
        return () => clearTimeout(timer);
      } catch (error) {
        console.error('Failed to fetch post count:', error);
      }
    }
    
    fetchPostCount();
  }, [i18n.language]);
  
  // 알림이 표시되지 않으면 렌더링하지 않음
  if (!visible || postCount === null) {
    return null;
  }
  
  const handleClose = () => {
    setAnimationClass(styles.hide);
    setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 500);
  };
  
  return (
    <div className={`${styles.notification} ${animationClass}`}>
      <div className={styles.content}>
        <span className={styles.language}>{languageDisplay}</span>
        <span className={styles.message}>
          {postCount > 0 
            ? t('notification.postsInLanguage', { count: postCount, language: languageDisplay })
            : t('notification.noPostsInLanguage', { language: languageDisplay })}
        </span>
      </div>
      <button className={styles.closeButton} onClick={handleClose}>
        &times;
      </button>
    </div>
  );
}

export default LanguageSwitchNotification;