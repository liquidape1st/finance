import { CategoryEntityResponse } from '@/@types/schema.category.respone'


export interface ProductEntityImage {
    id: string; // UUID
    filename: string;
    displayOrder: number;
    isPrimary: boolean;
}

export interface ProductEntityResponse {
    code: string;
    name: string;
    category: CategoryEntityResponse;
    price: number;
    images: ProductEntityImage[];
    description: string; // có thể chứa HTML
    slug: string; // có thể chứa HTML
    excerpt: string; // có thể chứa HTML
    stock: number;
    rating: number;
    soldCount: number;
    createdAt: number; // timestamp
    updatedAt: number; // timestamp
}