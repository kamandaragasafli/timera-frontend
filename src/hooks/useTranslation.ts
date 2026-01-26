'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { useTranslation as useTranslationData, Translations } from '@/lib/translations';

export const useTranslation = (): Translations => {
  const { language } = useLanguage();
  return useTranslationData(language);
};

