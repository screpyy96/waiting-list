export interface BlogAuthor {
  name: string;
  avatar: string;
  role: string;
}

export interface BlogContentSection {
  type: 'paragraph' | 'heading' | 'image' | 'quote';
  content: string;
  caption?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  author: BlogAuthor;
  content: BlogContentSection[];
  tags: string[];
  readTime: number;
} 