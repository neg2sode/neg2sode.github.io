import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

// ─────────────────────────────────────────────────────────────────────────────
//  Localisation. One language is shown at a time: Chinese if the visitor's
//  system language is Chinese, English otherwise (Japanese/French → English,
//  never a half-translated mix). A manual toggle overrides this and is saved
//  to localStorage.
// ─────────────────────────────────────────────────────────────────────────────

export type Locale = 'zh' | 'en';

const STORAGE_KEY = 'site.locale';

export function detectLocale(): Locale {
  const lang = (navigator.language || 'en').toLowerCase();
  return lang.startsWith('zh') ? 'zh' : 'en';
}

function loadSaved(): Locale | null {
  try {
    const v = localStorage.getItem(STORAGE_KEY);
    return v === 'zh' || v === 'en' ? v : null;
  } catch {
    return null;
  }
}

// Pick the string for the given locale. First argument English, second Chinese.
export function pick(locale: Locale, en: string, zh: string): string {
  return locale === 'zh' ? zh : en;
}

interface LocaleContextValue {
  locale: Locale;
  isZh: boolean;
  toggleLocale: () => void;
  // Shorthand bound to the current locale: t('Home', '去主页').
  t: (en: string, zh: string) => string;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => loadSaved() ?? detectLocale());

  const toggleLocale = useCallback(() => {
    setLocale((cur) => {
      const next: Locale = cur === 'zh' ? 'en' : 'zh';
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Ignore storage failures (e.g. private browsing).
      }
      return next;
    });
  }, []);

  const value = useMemo<LocaleContextValue>(() => {
    const t = (en: string, zh: string) => pick(locale, en, zh);
    return { locale, isZh: locale === 'zh', toggleLocale, t };
  }, [locale, toggleLocale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error('useLocale must be used inside <LocaleProvider>');
  return ctx;
}
