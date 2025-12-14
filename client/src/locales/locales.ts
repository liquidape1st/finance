import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './lang/en.json'
import vn from './lang/vn.json'
import {} from 'dayjs'
const resources = {
    en: {
        translation: en,
    },
    vn: {
        translation: vn,
    },
}

i18n.use(initReactI18next).init({
    resources,
    fallbackLng: "en",
    lng: "en",
    interpolation: {
        escapeValue: false,
    },
})

export const dateLocales: {
    [key: string]: () => Promise<ILocale>
} = {
    en: () => import('dayjs/locale/en'),
    vn: () => import('dayjs/locale/vi'),
}

export default i18n
