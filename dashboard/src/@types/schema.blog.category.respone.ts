export type BlogCategory = {
    id: string;
    name: string;
    translations: CategoryTranslation[]
}
export type CategoryTranslation = {
    id: string,
    langCode: string,
    name: string,
}