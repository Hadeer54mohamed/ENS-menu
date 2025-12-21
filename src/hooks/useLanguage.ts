import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';

export const useLanguage = () => {
  const { i18n } = useTranslation();
  const router = useRouter();
  const params = useParams();
  const [isMounted, setIsMounted] = useState(false);

  // Get current locale from URL params safely
  const urlLocale = params?.locale as string | undefined;
  
  // Prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const currentLanguage = isMounted ? i18n.language : 'ar';
  const isRTL = currentLanguage === 'ar';

  const toggleLanguage = useCallback(() => {
    const newLang = currentLanguage === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    
    // Navigate to the new locale URL
    router.push(`/${newLang}`);
  }, [currentLanguage, i18n, router]);

  const setLanguage = useCallback((lang: 'ar' | 'en') => {
    i18n.changeLanguage(lang);
    
    // Navigate to the new locale URL
    router.push(`/${lang}`);
  }, [i18n, router]);

  useEffect(() => {
    if (isMounted) {
      document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
      document.documentElement.lang = currentLanguage;
      document.body.style.direction = isRTL ? 'rtl' : 'ltr';
    }
  }, [isRTL, currentLanguage, isMounted]);

  // Sync i18n with URL locale
  useEffect(() => {
    if (isMounted && urlLocale) {
      if ((urlLocale === 'ar' || urlLocale === 'en') && urlLocale !== currentLanguage) {
        i18n.changeLanguage(urlLocale);
      }
    }
  }, [urlLocale, isMounted, i18n, currentLanguage]);

  return {
    currentLanguage,
    isRTL,
    toggleLanguage,
    setLanguage,
    isMounted,
  };
};
