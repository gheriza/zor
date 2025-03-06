import { useState } from 'react';

type TextContent = {
  about: string;
  inscription: string;
};

type Language = "en" | "fr" | "es" | "it" | "zh" | "ja";

const textContent: Record<Language, TextContent> = {
  en: { about: "About", inscription: "Inscription" },
  fr: { about: "À propos", inscription: "Inscription" },
  es: { about: "Sobre", inscription: "Inscripción" },
  it: { about: "informazioni", inscription: "Iscrizione" },
  zh: { about: "关于", inscription: "注册" },
  ja: { about: "について", inscription: "登録" },
};

const flagPaths: Record<Language, string> = {
  en: "/flags/flag.png",
  fr: "/flags/france_flag.png",
  es: "/flags/3253482_flag_spain_country_world_icon.png",
  it: "/flags/italy.png",
  zh: "/flags/china.png",
  ja: "/flags/japan.png",
};

export const useLanguage = () => {
  const [language, setLanguage] = useState<Language>("en");

  const toggleLanguage = () => {
    const languages: Language[] = ["en", "fr", "es", "it", "zh", "ja"];
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  const flagPath = flagPaths[language];
  console.log("Flag Path:", flagPath); // Debug the flag path

  return {
    language,
    toggleLanguage,
    textContent: textContent[language],
    flagPath,
  };
};