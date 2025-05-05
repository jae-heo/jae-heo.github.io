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
  language?: string; // Add this line to specify the post language explicitly
}
export interface Category {
  id: string;
  name: string;
  slug: string;
  count: number;
}