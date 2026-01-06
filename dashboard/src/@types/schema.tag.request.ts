export type TagRequest = {
    id: string
    translations: TagTranslationRequest[],
}

export type LangCode = 'vi' | 'en'

export type TagTranslationRequest = {
    id: string
    lang: LangCode
    slug: string
    name: string
}
