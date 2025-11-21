export enum AppMode {
  DECODE = 'DECODE',
  ENCODE = 'ENCODE'
}

export interface TranslationResult {
  hieroglyphs?: string; // For text-to-hiero
  transliteration?: string;
  translation: string; // French translation
  historicalContext?: string;
}

export interface LoadingState {
  isLoading: boolean;
  message: string;
}

export enum AIModel {
  GEMINI_FLASH = 'gemini-2.5-flash'
}