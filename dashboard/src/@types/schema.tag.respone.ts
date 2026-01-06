export type TagResponse = {
    id: string
    translations: TagTranslationResponse[],
    publishedAt: number
    updatedAt: string
}

export type LangCode = 'vi' | 'en'

export type TagTranslationResponse = {
    id: string
    lang: LangCode
    slug: string
    name: string
}
