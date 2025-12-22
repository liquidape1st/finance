export type BlogResponse = {
    id: string
    featured: boolean
    enabled: boolean
    image: string
    estimatedReadTime: number
    category: {
        id: string // UUID
    }
    translations: BlogTranslationResponse[],
    publishedAt: number
    updatedAt: string
    author: string
}

export type LangCode = 'vi' | 'en'

export type BlogTranslationResponse = {
    id?: string
    langCode: LangCode
    slug: string
    title: string
    content: string
    excerpt: string
}
