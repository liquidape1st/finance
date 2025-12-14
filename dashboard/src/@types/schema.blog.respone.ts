export type BlogResponse = {
    id?: string
    featured: boolean
    image: string
    estimatedReadTime: number
    category: {
        id: string // UUID
    }
    translations: BlogTranslationResponse[]
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
