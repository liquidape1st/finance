import { BlogPostCategoryEntityResponse } from '@/@types/schema.blog.post.category.respone'

export type BlogPostEntityResponse = {
    id: string;
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    image: string;
    author: string;

    blogCategory: BlogPostCategoryEntityResponse;

    estimatedReadTime: number;
    publishedAt: number; // timestamp
    createdAt: number; // timestamp
    updatedAt: number; // timestamp
}