// Import the i18n functions from configs
import { useTranslation as useI18n, defaultLocale, loadDictionary, locales } from '@/configs/i18n';
import { useEffect, useState } from 'react';

// Preload dictionaries for all locales
Promise.all(locales.map(locale => loadDictionary(locale)));

// Local storage key for saving language preference
const LANGUAGE_KEY = 'app_language';

// Export a custom hook to use i18n in components
export const useTranslation = () => {
  // Initialize locale from localStorage if available, otherwise use default
  const [locale, setLocale] = useState<string>(() => {
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem(LANGUAGE_KEY);
      return savedLocale && locales.includes(savedLocale) ? savedLocale : defaultLocale;
    }
    return defaultLocale;
  });

  const { t } = useI18n(locale);

  // Function to change locale
  const changeLocale = (newLocale: string) => {
    if (locales.includes(newLocale)) {
      console.log(`Setting locale to ${newLocale}`);
      setLocale(newLocale);

      // Save preference to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem(LANGUAGE_KEY, newLocale);
      }

      // Ensure dictionary is loaded
      loadDictionary(newLocale);
    } else {
      console.error(`Invalid locale: ${newLocale}`);
    }
  };

  // Load dictionary on mount and when locale changes
  useEffect(() => {
    loadDictionary(locale).then(() => {
      console.log(`Loaded dictionary for ${locale}`);
    });
  }, [locale]);

  return {
    t,
    currentLocale: locale,
    changeLocale
  };
};
