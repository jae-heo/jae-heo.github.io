// src/types/blog.ts
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  rawContent?: string; // Optional: the original markdown content
  date: string;
  author: string;
  tags: string[];
  imageUrl?: string;
  slug: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}