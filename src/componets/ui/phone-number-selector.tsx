"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import angolaFlag from "@/assets/images/countries/angola.svg";
import brazilFlag from "@/assets/images/countries/brazil.svg";
import canadaFlag from "@/assets/images/countries/canada.svg";
import capeVerdeFlag from "@/assets/images/countries/cape-verde.svg";
import equatorialGuineaFlag from "@/assets/images/countries/equatorial-guinea.svg";
import franceFlag from "@/assets/images/countries/france.svg";
import guineaBissauFlag from "@/assets/images/countries/guinea-bissau.svg";
import italyFlag from "@/assets/images/countries/italy.svg";
import mozambiqueFlag from "@/assets/images/countries/mozambique.svg";
import portugalFlag from "@/assets/images/countries/portugal.svg";
import spainFlag from "@/assets/images/countries/spain.svg";
import ukFlag from "@/assets/images/countries/united-kingdom.svg";
import usFlag from "@/assets/images/countries/united-states.svg";

export interface Country {
  code: string;
  name: string;
  flag: any;
}

export const COUNTRIES: Country[] = [
  { code: "+244", name: "Angola", flag: angolaFlag },
  { code: "+55", name: "Brazil", flag: brazilFlag },
  { code: "+1", name: "Canada", flag: canadaFlag },
  { code: "+238", name: "Cape Verde", flag: capeVerdeFlag },
  { code: "+240", name: "Equatorial Guinea", flag: equatorialGuineaFlag },
  { code: "+33", name: "France", flag: franceFlag },
  { code: "+245", name: "Guinea-Bissau", flag: guineaBissauFlag },
  { code: "+39", name: "Italy", flag: italyFlag },
  { code: "+258", name: "Mozambique", flag: mozambiqueFlag },
  { code: "+351", name: "Portugal", flag: portugalFlag },
  { code: "+34", name: "Spain", flag: spainFlag },
  { code: "+44", name: "United Kingdom", flag: ukFlag },
  { code: "+1", name: "United States", flag: usFlag },
];

interface PhoneNumberSelectorProps {
  selectedCountry: Country;
  onCountryChange: (country: Country) => void;
  phoneNumber: string;
  onPhoneNumberChange: (value: string) => void;
}

export function PhoneNumberSelector({
  selectedCountry,
  onCountryChange,
  phoneNumber,
  onPhoneNumberChange,
}: PhoneNumberSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = COUNTRIES.filter(
    (country) =>
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.includes(searchQuery)
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchQuery("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="flex gap-3">
      {/* Country Code Selector */}
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-white/10 hover:bg-white/15 text-white rounded-xl px-4 py-4 flex items-center gap-2 transition-colors border border-white/10 min-w-[120px]"
        >
          <Image
            src={selectedCountry.flag}
            alt={selectedCountry.name}
            width={24}
            height={24}
            className="rounded-sm"
          />
          <span className="font-medium">{selectedCountry.code}</span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 mt-2 w-80 bg-[#1a2f45] rounded-xl shadow-2xl overflow-hidden z-50 border border-white/10"
            >
              {/* Search Input */}
              <div className="p-4 border-b border-white/10">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 text-white placeholder:text-white/50 rounded-lg px-4 py-3 pr-10 outline-none focus:ring-2 focus:ring-jeton-green"
                    autoFocus
                  />
                  <svg
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>

              {/* Country List */}
              <div className="max-h-80 overflow-y-auto">
                {filteredCountries.map((country) => (
                  <button
                    key={`${country.code}-${country.name}`}
                    onClick={() => {
                      onCountryChange(country);
                      setIsOpen(false);
                      setSearchQuery("");
                    }}
                    className="w-full flex items-center gap-3 px-4 py-3 hover:bg-white/10 transition-colors text-left"
                  >
                    <Image
                      src={country.flag}
                      alt={country.name}
                      width={28}
                      height={28}
                      className="rounded-sm flex-shrink-0"
                    />
                    <span className="text-white/80 font-medium flex-shrink-0 w-16">
                      {country.code}
                    </span>
                    <span className="text-white flex-1">{country.name}</span>
                  </button>
                ))}
                {filteredCountries.length === 0 && (
                  <div className="px-4 py-8 text-center text-white/50">
                    No countries found
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Phone Number Input */}
      <input
        type="tel"
        placeholder="Phone number"
        value={phoneNumber}
        onChange={(e) => onPhoneNumberChange(e.target.value)}
        className="flex-1 bg-white/10 hover:bg-white/15 focus:bg-white/15 text-white placeholder:text-white/50 rounded-xl px-4 py-4 outline-none focus:ring-2 focus:ring-jeton-green transition-colors border border-white/10"
      />
    </div>
  );
}
