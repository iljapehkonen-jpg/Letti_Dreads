import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { languages, translations } from "./translations";

const STORAGE_KEY = "letti-language";

const LanguageContext = createContext(null);

const getInitialLanguage = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && languages.includes(saved)) {
    return saved;
  }

  const browser = navigator.language?.slice(0, 2)?.toLowerCase();
  return languages.includes(browser) ? browser : "en";
};

const getByPath = (object, path) =>
  path.split(".").reduce((current, key) => current?.[key], object);

const interpolate = (value, params = {}) => {
  if (typeof value !== "string") {
    return value;
  }

  return value.replace(/\{\{(\w+)\}\}/g, (_, key) => params[key] ?? "");
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(getInitialLanguage);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language;
  }, [language]);

  const value = useMemo(() => {
    const t = (path, params) => {
      const translation = getByPath(translations[language], path);
      return translation ? interpolate(translation, params) : path;
    };

    return {
      language,
      setLanguage,
      languages,
      t,
    };
  }, [language]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);

  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }

  return context;
}
