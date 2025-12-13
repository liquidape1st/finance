export type CreateCategoryRequest = {
    name: string
}

export type ProductImageRequest = {
    imageUrl: string
    displayOrder?: number
    isPrimary?: boolean
}

export type ProductRequest = {
    code: string
    name: string
    categoryId: string
    price: number
    images?: ProductImageRequest[]
    description?: string
    stock?: number
    rating?: number
}


