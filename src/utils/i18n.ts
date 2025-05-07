// Import the i18n functions from configs
import { defaultLocale, locales } from '@/configs/i18n';
import { useEffect, useState } from 'react';

// Local storage key for saving language preference
const LANGUAGE_KEY = 'app_language';

// Dictionary cache
let dictionaries: Record<string, any> = {};

// Load dictionary
export async function loadDictionary(locale: string): Promise<Record<string, any>> {
  // If dictionary is already loaded, return it
  if (dictionaries[locale] && Object.keys(dictionaries[locale]).length > 0) {
    return dictionaries[locale];
  }

  try {
    // Dynamic import of the dictionary
    const dictionary = await import(`../data/dictionaries/${locale}.json`);
    dictionaries[locale] = dictionary.default;
    console.log(`Loaded dictionary for ${locale}`, Object.keys(dictionary.default).length, 'sections');
    return dictionaries[locale];
  } catch (error) {
    console.error(`Error loading dictionary for locale ${locale}:`, error);
    // Fallback to empty dictionary
    dictionaries[locale] = {};
    return dictionaries[locale];
  }
}

// Preload dictionaries for all locales
if (typeof window !== 'undefined') {
  Promise.all(locales.map(locale => loadDictionary(locale)));
}

// Export a custom hook to use i18n in components
export const useTranslation = () => {
  // Initialize with default locale for server-side rendering
  const [locale, setLocale] = useState<string>(defaultLocale);
  const [isClient, setIsClient] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize locale from localStorage after component mounts
  useEffect(() => {
    setIsClient(true);
    // Only access localStorage on the client side
    if (typeof window !== 'undefined') {
      const savedLocale = localStorage.getItem(LANGUAGE_KEY);
      if (savedLocale && locales.includes(savedLocale)) {
        setLocale(savedLocale);
      }
    }
  }, []);

  // Translation function
  const t = (key: string): string => {
    // If dictionary is not loaded yet or we're on the server, return a fallback
    if (!isClient || !dictionaries[locale]) {
      // For server-side rendering or before dictionary is loaded, return the last part of the key
      // This helps with hydration issues
      const parts = key.split('.');
      return parts[parts.length - 1];
    }

    // Split the key by dots to access nested properties
    const keys = key.split('.');
    let value: any = dictionaries[locale];

    // Traverse the dictionary object
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Return the last part of the key if the translation is not found
        const parts = key.split('.');
        return parts[parts.length - 1];
      }
    }

    return typeof value === 'string' ? value : key;
  };

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
      loadDictionary(newLocale).then(() => {
        setIsLoaded(true);
      });
    } else {
      console.error(`Invalid locale: ${newLocale}`);
    }
  };

  // Load dictionary on mount and when locale changes
  useEffect(() => {
    if (isClient) {
      loadDictionary(locale).then(() => {
        console.log(`Loaded dictionary for ${locale}`);
        setIsLoaded(true);
      });
    }
  }, [locale, isClient]);

  return {
    t,
    currentLocale: locale,
    changeLocale,
    isLoaded
  };
};
