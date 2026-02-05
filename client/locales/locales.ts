import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import vi from './lang/vi.json'
import { } from 'dayjs'
import { PERSIST_STORE_NAME } from '@/constants/app.constant'
import deepParseJson from '@/utils/deepParseJson'

const resources = {
    en: {
        translation: en,
    },
    vi: {
        translation: vi,
    },
}

// Get saved language from localStorage or use default
const getSavedLanguage = (): 'vi' | 'en' => {
    if (typeof window === 'undefined') return 'vi';

    const browserLang =
        navigator.language.split('-')[0] === 'en' ? 'en' : 'vi'

    try {
        const locale =
            (deepParseJson(localStorage.getItem(PERSIST_STORE_NAME) || '{}') as {
                locale?: { currentLang?: string }
            }).locale?.currentLang

        return locale === 'en' || locale === 'vi'
            ? locale
            : browserLang
    } catch {
        return browserLang
    }
}


i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'vi',
    lng: getSavedLanguage(),
    interpolation: {
        escapeValue: false,
    },
})

// Save language preference when it changes
i18n.on('languageChanged', (lng) => {
    try {
        if (typeof window !== 'undefined') {
            localStorage.setItem('i18nextLng', lng)
        }
    } catch (e) {
        // localStorage might not be available
    }
})

export const dateLocales: {
    [key: string]: () => Promise<ILocale>
} = {
    en: () => import('dayjs/locale/en'),
    vn: () => import('dayjs/locale/vi'),
}

export default i18n
