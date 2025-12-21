import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import ar from './locales/ar.json';
import en from './locales/en.json';

const resources = {
  ar: { translation: ar },
  en: { translation: en },
};

// Check if we're running on client side
const isClient = typeof window !== 'undefined';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ar',
    lng: 'ar', // Default to Arabic
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
    },
    react: {
      useSuspense: false, // Disable suspense to avoid hydration issues
    },
  });

// Sync with Next.js locale from URL if on client
if (isClient) {
  const pathLocale = window.location.pathname.split('/')[1];
  if (pathLocale === 'ar' || pathLocale === 'en') {
    i18n.changeLanguage(pathLocale);
  }
}

export default i18n;
