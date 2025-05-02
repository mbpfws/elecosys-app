// Import the i18n functions from next-international
import { useI18n, useCurrentLocale, useChangeLocale } from '@/configs/i18n';

// Export a custom hook to use i18n in components
export const useTranslation = () => {
  try {
    const t = useI18n();
    const currentLocale = useCurrentLocale();
    const changeLocale = useChangeLocale();
    return { t, currentLocale, changeLocale };
  } catch (error) {
    // Fallback for when I18nProvider is not available (e.g., during SSR)
    return {
      t: (key: string) => key,
      currentLocale: 'en',
      changeLocale: () => {},
    };
  }
};
