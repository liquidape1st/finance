export type TagResponse = {
    id: string
    translations: TagTranslationResponse[],
}

export type LangCode = 'vi' | 'en'

export type TagTranslationResponse = {
    id: string
    langCode: LangCode
    slug: string
    name: string
}
