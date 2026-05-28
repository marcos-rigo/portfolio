"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationSchema } from "@/lib/translations";

export type Locale = "es" | "en";

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TranslationSchema;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  // Detectar e hidratar idioma preferido desde el navegador o almacenamiento local
  useEffect(() => {
    const saved = localStorage.getItem("marcosrigo-locale") as Locale;
    if (saved === "es" || saved === "en") {
      setLocaleState(saved);
    } else {
      const browserLang = navigator.language.split("-")[0] as Locale;
      if (browserLang === "es" || browserLang === "en") {
        setLocaleState(browserLang);
        localStorage.setItem("marcosrigo-locale", browserLang);
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("marcosrigo-locale", newLocale);
  };

  const t = translations[locale];

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
