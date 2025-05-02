// Available locales
export const locales = ['en', 'vi'];

// Default locale
export const defaultLocale = 'en';

// Locale names for display
export const localeNames = {
  en: 'English',
  vi: 'Tiếng Việt',
};

// Dictionary cache
let dictionaries: Record<string, any> = {};

// Load dictionary
export async function loadDictionary(locale: string) {
  if (!dictionaries[locale]) {
    try {
      const dictionary = await import(`../data/dictionaries/${locale}.json`);
      dictionaries[locale] = dictionary.default;
    } catch (error) {
      console.error(`Error loading dictionary for locale ${locale}:`, error);
      dictionaries[locale] = {};
    }
  }
  return dictionaries[locale];
}

// Simple i18n provider (no-op for now)
export function I18nProvider({ locale, children }: { locale: string; children: React.ReactNode }) {
  return children;
}

// Client-side translation function
export function useTranslation(locale = defaultLocale) {
  // Translation function
  const t = (key: string): string => {
    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value: any = dictionaries[locale] || {};

    // Traverse the dictionary object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Return the key if the translation is not found
        return key;
      }
    }

    return typeof value === 'string' ? value : key;
  };

  return { t, locale };
}
