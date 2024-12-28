import { createI18n } from 'vue-i18n'
import en from './locales/en'
import de from './locales/de'
import { getInitialLocale } from './utils'

export const i18n = createI18n({
  legacy: false,
  locale: getInitialLocale(),
  fallbackLocale: 'en',
  messages: {
    en,
    de,
  },
})
