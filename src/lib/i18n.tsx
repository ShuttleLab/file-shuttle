"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export type Language = "zh" | "en";

export const translations: Record<
  Language,
  Record<string, Record<string, string>>
> = {
  zh: {
    common: {
      appName: "ShuttleLab",
      about: "关于",
      contact: "联系我们",
      otherTools: "ShuttleLab 旗下其他产品",
      allRightsReserved: "保留所有权利",
    },
  },
  en: {
    common: {
      appName: "ShuttleLab",
      about: "About",
      contact: "Contact",
      otherTools: "Other tools by ShuttleLab",
      allRightsReserved: "All rights reserved.",
    },
  },
};

interface I18nContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  toggle: () => void;
  t: (typeof translations)["zh"];
}

const I18nContext = createContext<I18nContextValue | null>(null);

function getInitialLang(): Language {
  if (typeof window === "undefined") return "zh";
  const stored = localStorage.getItem("lang") as Language | null;
  if (stored === "zh" || stored === "en") return stored;
  if (navigator.language && !navigator.language.toLowerCase().startsWith("zh")) return "en";
  return "zh";
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>(getInitialLang);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  const setLang = (next: Language) => {
    setLangState(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("lang", next);
    }
  };

  const toggle = () => setLang(lang === "zh" ? "en" : "zh");

  const value = useMemo<I18nContextValue>(
    () => ({ lang, setLang, toggle, t: translations[lang] }),
    [lang, setLang, toggle]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
