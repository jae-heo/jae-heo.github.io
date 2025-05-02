// src/utils/contentLanguageDetector.ts

/**
 * Simple utility to detect the probable language of a text content
 * This is a basic implementation - for production, consider using a library
 * like franc or a more sophisticated approach
 */

// Common words in Korean
const koreanWordPatterns = [
  /[가-힣]+/,         // Hangul characters
  /은|는|이|가|을|를|에|의|로|도|만|게/,  // Common Korean particles
  /안녕하세요|감사합니다|반갑습니다/  // Common Korean phrases
];

// Common words in English
const englishWordPatterns = [
  /\b(the|a|an|of|in|on|at|for|with|by|to|from)\b/i,  // Common English articles and prepositions
  /\b(is|are|was|were|be|being|been|have|has|had|do|does|did)\b/i,  // Common English verbs
  /\b(hello|thank you|welcome|please|sorry)\b/i  // Common English phrases
];

/**
 * Detects if the text is primarily in Korean
 * @param text The text to analyze
 * @returns True if the text appears to be Korean
 */
export function isKoreanContent(text: string): boolean {
  // If text is very short, check for Hangul characters
  if (text.length < 20) {
    return /[가-힣]/.test(text);
  }
  
  // Count Korean pattern matches
  const koreanMatchCount = koreanWordPatterns.reduce((count, pattern) => {
    const matches = text.match(new RegExp(pattern, 'g'));
    return count + (matches ? matches.length : 0);
  }, 0);
  
  // If strong Korean indicators are present, return true
  if (koreanMatchCount > 5) {
    return true;
  }
  
  // Count English pattern matches
  const englishMatchCount = englishWordPatterns.reduce((count, pattern) => {
    const matches = text.match(new RegExp(pattern, 'g'));
    return count + (matches ? matches.length : 0);
  }, 0);
  
  // Compare and determine the more likely language
  return koreanMatchCount > englishMatchCount;
}

/**
 * Detects if the text is primarily in English
 * @param text The text to analyze
 * @returns True if the text appears to be English
 */
export function isEnglishContent(text: string): boolean {
  return !isKoreanContent(text);
}

/**
 * Determine the probable language of the text content
 * @param text The text to analyze
 * @returns Language code ('ko' or 'en')
 */
export function detectContentLanguage(text: string): 'ko' | 'en' {
  return isKoreanContent(text) ? 'ko' : 'en';
}

export default {
  isKoreanContent,
  isEnglishContent,
  detectContentLanguage
};