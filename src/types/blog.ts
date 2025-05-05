export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  author: string;
  tags: string[];
  imageUrl?: string;
  slug: string;
  language?: string; // Explicit language identifier
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}

export interface MultilingualBlogPost extends BlogPost {
  translations?: {
    [langCode: string]: Partial<BlogPost>;
  };
}