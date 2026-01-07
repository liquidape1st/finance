import { TagResponse } from "./schema.tag.respone"

export type BlogResponse = {
    id: string
    featured: boolean
    uiType: string
    contentType: string
    enabled: boolean
    image: string
    estimatedReadTime: number
    category: {
        id: string // UUID
    }
    tags: TagResponse[]
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
