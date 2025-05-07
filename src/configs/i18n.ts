// Available locales
export const locales = ['en', 'vi'];

// Default locale
export const defaultLocale = 'en';

// Locale names for display
export const localeNames = {
  en: 'English',
  vi: 'Tiếng Việt',
};

// Simple i18n provider (no-op for now)
export function I18nProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  return children;
}
