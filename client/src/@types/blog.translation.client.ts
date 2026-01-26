import { CategoryTranslation } from "./blog.category.client";

export type BlogTranslationClient = {
    id: string;
    langCode: string;
    slug: string;
    title: string;
    content: string;
    excerpt: string;
    uiType: 'NEWS' | 'LEARN' | 'MARKET';
    contentType: string;
    image: string;
    view: number;
    author: string | null;
    featured: boolean;
    estimatedReadTime: number;
    category: CategoryTranslation;
    createdAt: string;   // ISO datetime
    updatedAt: string;   // ISO datetime

    slugs?: Slug[];
    tags: Tag[]
}

export type Slug = {
    slug: string;
    langCode: string;
}

export type Tag = {
    id: string
    name: string
    langCode: string
}