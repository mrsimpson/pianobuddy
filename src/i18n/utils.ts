import { LocaleCode, SUPPORTED_LOCALES } from './constants';

export function getBrowserLocale(): LocaleCode {
  // Get browser language (e.g., "en-US" or "de")
  const browserLang = navigator.language.split('-')[0];
  
  // Check if browser language is supported, fallback to 'en'
  return Object.keys(SUPPORTED_LOCALES).includes(browserLang) 
    ? browserLang as LocaleCode 
    : 'en';
}

export function getInitialLocale(): LocaleCode {
  // Check localStorage first
  const savedLocale = localStorage.getItem('userLocale') as LocaleCode;
  if (savedLocale && Object.keys(SUPPORTED_LOCALES).includes(savedLocale)) {
    return savedLocale;
  }
  
  // Fallback to browser locale
  return getBrowserLocale();
}