// Import the i18n functions from configs
import { useI18n, useCurrentLocale, useChangeLocale } from '@/configs/i18n';

// Export a custom hook to use i18n in components
export const useTranslation = () => {
  const t = useI18n();
  const currentLocale = useCurrentLocale();
  const changeLocale = useChangeLocale();

  return { t, currentLocale, changeLocale };
};
