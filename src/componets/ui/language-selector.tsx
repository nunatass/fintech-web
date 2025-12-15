"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "@/componets/icons";
import { useRouter, usePathname } from "@/i18n/routing";
import { type Locale } from "@/i18n/config";
import Image from "next/image";

import ukFlag from "@/assets/images/countries/united-kingdom.svg";
import portugalFlag from "@/assets/images/countries/portugal.svg";

type Language = {
  code: Locale;
  nameKey: string;
  flag: typeof ukFlag;
};

const languages: Language[] = [
  { code: "en", nameKey: "en", flag: ukFlag },
  { code: "pt", nameKey: "pt", flag: portugalFlag },
];

type LanguageSelectorProps = {
  className?: string;
  size?: "default" | "lg";
};

export function LanguageSelector({ className, size = "default" }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("languages");

  const selectedLang = languages.find(lang => lang.code === locale) || languages[0];

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (lang: Language) => {
    setIsOpen(false);
    startTransition(() => {
      router.replace(pathname, { locale: lang.code });
    });
  };

  return (
    <motion.div 
      ref={dropdownRef} 
      layout
      className={cn("relative", className)}
      transition={{ layout: { duration: 0.3, ease: [0.32, 0.72, 0, 1] } }}
    >
      {/* Trigger button */}
      <motion.button
        type="button"
        layout
        onClick={() => setIsOpen(!isOpen)}
        disabled={isPending}
        whileHover={{ scale: 0.97 }}
        whileTap={{ scale: 0.95 }}
        transition={{ 
          duration: 0.2, 
          ease: [0.33, 1, 0.68, 1],
          layout: { duration: 0.3, ease: [0.32, 0.72, 0, 1] }
        }}
        className={cn(
          "flex items-center gap-2",
          "text-black text-sm font-medium",
          "border-2 border-black/50 rounded-xl",
          "bg-transparent",
          "hover:border-black/70 hover:bg-black/10",
          "transition-colors duration-200",
          "focus:outline-none focus:ring-2 focus:ring-black/40",
          "disabled:opacity-50",
          size === "default" ? "px-4 py-2.5" : "px-5 py-3"
        )}
        aria-label={t("selectLanguage")}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <Image
          src={selectedLang.flag}
          alt={t(selectedLang.nameKey)}
          width={20}
          height={20}
          className="w-5 h-5 rounded-sm object-cover"
        />
        <span>{selectedLang.code.toUpperCase()}</span>
        <ChevronDownIcon className={cn(
          "w-4 h-4 opacity-70 transition-transform duration-200",
          isOpen && "rotate-180"
        )} />
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.96 }}
            transition={{ 
              duration: 0.2, 
              ease: [0.32, 0.72, 0, 1]
            }}
            className={cn(
              "absolute top-full left-0 mt-2 z-50",
              "min-w-[180px] py-2",
              "bg-white rounded-2xl shadow-xl",
              "border border-neutral-100"
            )}
            role="listbox"
          >
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleSelect(lang)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3",
                  "text-left text-sm font-medium",
                  "transition-colors duration-150",
                  selectedLang.code === lang.code
                    ? "text-jeton-green bg-jeton-green/5"
                    : "text-neutral-700 hover:bg-neutral-50"
                )}
                role="option"
                aria-selected={selectedLang.code === lang.code}
              >
                <Image
                  src={lang.flag}
                  alt={t(lang.nameKey)}
                  width={24}
                  height={24}
                  className="w-6 h-6 rounded-sm object-cover"
                />
                <span className="flex-1">{t(lang.nameKey)}</span>
                {selectedLang.code === lang.code && (
                  <svg
                    className="w-5 h-5 text-jeton-green"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
