// Import the i18n functions from next-international
import { useI18n } from '@/configs/i18n';

// Export a custom hook to use i18n in components
export const useTranslation = () => {
  const t = useI18n();
  return { t };
};
