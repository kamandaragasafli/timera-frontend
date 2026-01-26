'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export function LanguageSelector() {
  const { language, setLanguage } = useLanguage();

  return (
    <Select value={language} onValueChange={(value) => setLanguage(value as 'aze' | 'eng' | 'rus')}>
      <SelectTrigger className="w-[120px] sm:w-[140px] bg-white/10 border-white/20 text-white hover:bg-white/15 text-xs sm:text-sm">
        <SelectValue>
          {language === 'aze' ? '🇦🇿 AZ' : language === 'rus' ? '🇷🇺 RU' : '🇬🇧 EN'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="eng">🇬🇧 English</SelectItem>
        <SelectItem value="aze">🇦🇿 Azərbaycan</SelectItem>
        <SelectItem value="rus">🇷🇺 Русский</SelectItem>
      </SelectContent>
    </Select>
  );
}

