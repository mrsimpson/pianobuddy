export const SUPPORTED_LOCALES = {
  en: {
    name: 'English',
    flag: '🇬🇧'
  },
  de: {
    name: 'Deutsch',
    flag: '🇩🇪'
  }
} as const;

export type LocaleCode = keyof typeof SUPPORTED_LOCALES;