export type BlogRequest = {
    id?: string
    featured: boolean
    image: string
    estimatedReadTime: number
    category: {
        id: string // UUID
    }
    translations: BlogTranslationRequest[]
}

export type LangCode = 'vi' | 'en'

export type BlogTranslationRequest = {
    langCode: LangCode
    slug: string
    title: string
    content: string
    excerpt: string
}
