// Import the i18n functions from configs
import { useTranslation as useI18n, defaultLocale, loadDictionary } from '@/configs/i18n';
import { useEffect, useState } from 'react';

// Load dictionaries for both locales
loadDictionary('en');
loadDictionary('vi');

// Export a custom hook to use i18n in components
export const useTranslation = () => {
  const [locale, setLocale] = useState(defaultLocale);
  const { t } = useI18n(locale);

  // Function to change locale
  const changeLocale = (newLocale: string) => {
    setLocale(newLocale);
    // Load dictionary if needed
    loadDictionary(newLocale);
  };

  // Load dictionary on mount
  useEffect(() => {
    loadDictionary(locale);
  }, [locale]);

  return {
    t,
    currentLocale: locale,
    changeLocale
  };
};
