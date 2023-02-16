import { computed, reactive, toRefs } from '@vue/composition-api';
import { useStorage } from '@/next';

interface Language {
  /**
   * Language code
   */
  code: string;

  /**
   * Language locale
   */
  locale: string;

  /**
   * Language name
   */
  name: string;
}

interface LanguageState {
  supportedLanguages: Language[];
  fallbackLanguage: string | null;
}

const state = reactive<LanguageState>({
  fallbackLanguage: null,
  supportedLanguages: []
});

export const useLang = (appName: string) => {
  const storage = useStorage(appName);

  const getCurrentLanguage = async () => {
    // get lang from storage
    let language = await storage.getItem('currentLanguage');

    if (language === null) {
      // if not found from storage validate if navigator lang match a supported language
      language = state.supportedLanguages.find(lang =>
        navigator.language.toLowerCase().match(lang.code)
      );

      if (!language) {
        // if navigator lang is not a supported language, return fallback
        language = state.supportedLanguages.find(
          lang => lang.code === state.fallbackLanguage
        );
      }
    }
    return language;
  };

  const setCurrentLanguage = async (currentLang: Language) => {
    const lang = state.supportedLanguages.find(
      lang => lang.code === currentLang.code
    );

    if (lang !== undefined) {
      await storage.setItem('currentLanguage', lang);
    } else {
      throw new Error('Language not supported');
    }

    return currentLang;
  };

  const setFallback = (code: string) => {
    const fallback = state.supportedLanguages.find(lang => lang.code === code);

    if (fallback !== undefined) {
      state.fallbackLanguage = fallback.code;
    } else {
      throw new Error('fallback language not supported');
    }
  };

  const setSupportedLanguages = (supportedLanguages: Language[]) => {
    state.supportedLanguages = [...supportedLanguages];
  };

  const supportedLanguages = computed(() => state.supportedLanguages);

  return {
    ...toRefs(state),
    getCurrentLanguage,
    setCurrentLanguage,
    setFallback,
    setSupportedLanguages,
    supportedLanguages
  };
};
