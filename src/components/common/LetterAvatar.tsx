// src/components/common/LetterAvatar.tsx
import { useMemo } from 'react';

interface LetterAvatarProps {
  title: string;
  size?: number;
  fontSize?: number;
  className?: string;
}

/**
 * Generate a letter avatar with the first letter of the title
 * Used as a fallback when an image is not available
 */
function LetterAvatar({ title, size = 200, fontSize, className = '' }: LetterAvatarProps) {
  // Extract first letter from title
  const letter = useMemo(() => {
    if (!title || title.length === 0) return '?';
    return title.charAt(0).toUpperCase();
  }, [title]);

  // Generate a consistent background color based on the title
  const backgroundColor = useMemo(() => {
    if (!title) return '#646cff'; // Default to primary color

    // Simple hash function to generate a color from string
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
      hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }

    // Convert to hex color
    let color = '#';
    for (let i = 0; i < 3; i++) {
      const value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }, [title]);

  // Calculate text color (white or black) based on background brightness
  const textColor = useMemo(() => {
    // Convert hex to RGB
    const hex = backgroundColor.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    // Calculate brightness using YIQ formula
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    
    // Return black for bright colors, white for dark colors
    return yiq >= 128 ? '#000000' : '#FFFFFF';
  }, [backgroundColor]);

  // Calculate font size as percentage of container size
  const calculatedFontSize = fontSize || Math.floor(size * 0.4);

  const style = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundColor,
    color: textColor,
    fontSize: `${calculatedFontSize}px`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    fontWeight: 'bold',
    overflow: 'hidden',
  };

  return (
    <div style={style} className={className} aria-label={`Avatar for ${title}`}>
      {letter}
    </div>
  );
}

export default LetterAvatar;