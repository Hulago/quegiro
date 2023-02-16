export interface Language {
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

export interface LanguageState {
  supportedLanguages: Language[];
  fallbackLanguage: string | null;
}
