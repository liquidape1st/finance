export type CategoryResponse = {
    id: string
    translations: CategoryTranslationResponse[],
}

export type LangCode = 'vi' | 'en'

export type CategoryTranslationResponse = {
    id: string
    lang: LangCode
    slug: string
    name: string
}
