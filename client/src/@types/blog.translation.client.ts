export type BlogTranslationClient = {
    id: string;
    langCode: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    image: string;
    view: number;
    author: string | null;
    featured: boolean;
    estimatedReadTime: number;
    category: CategoryTranslation;
    createdAt: string;   // ISO datetime
    updatedAt: string;   // ISO datetime
}

export interface CategoryTranslation {
  id: string;
  name: string;
}