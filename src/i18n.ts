import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    detection: {
      order: ['path', 'localStorage', 'htmlTag', 'cookie'],
      caches: ['localStorage', 'cookie'],
    },
  })
  .catch((error: unknown) => {
    console.error('i18n initialization error:', error)
  })

export default i18n
