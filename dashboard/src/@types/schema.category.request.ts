export type CategoryRequest = {
    id: string
    translations: CategoryTranslationRequest[],
}

export type LangCode = 'vi' | 'en'

export type CategoryTranslationRequest = {
    id: string
    langCode: LangCode
    slug: string
    name: string
}
