"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { PhoneNumberSelector } from "@/componets/ui/phone-number-selector";
import Image from "next/image";

export default function LoginPage() {
  const t = useTranslations("login");
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+351",
    name: "Portugal",
    flag: "/assets/images/countries/portugal.svg"
  });
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1f35] to-[#0d2940] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
        {/* Left side - Login Form */}
        <div className="w-full lg:w-1/2 max-w-md">
          {/* Logo */}
          <div className="mb-12">
            <h1 className="text-white text-3xl font-bold">Jeton</h1>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h2 className="text-white text-3xl md:text-4xl font-bold mb-3">
              {t("title")}
            </h2>
            <p className="text-white/70 text-base">
              {t("subtitle")}
            </p>
          </div>

          {/* Phone Number Input */}
          <div className="mb-6">
            <PhoneNumberSelector
              selectedCountry={selectedCountry}
              onCountryChange={setSelectedCountry}
              phoneNumber={phoneNumber}
              onPhoneNumberChange={setPhoneNumber}
            />
          </div>

          {/* Continue Button */}
          <button className="w-full bg-jeton-green hover:bg-jeton-green/90 text-black font-semibold py-4 rounded-xl transition-colors">
            {t("continue")}
          </button>

          {/* Footer Links */}
          <div className="mt-12 flex items-center gap-6 text-sm">
            <button className="text-white/70 hover:text-white transition-colors">
              English (United Kingdom)
            </button>
            <a href="#" className="text-white/70 hover:text-white transition-colors">
              {t("privacy")}
            </a>
          </div>
        </div>

        {/* Right side - QR Code */}
        <div className="w-full lg:w-1/2 max-w-sm">
          <div className="bg-white rounded-3xl p-8 text-center">
            {/* QR Code Placeholder */}
            <div className="bg-white border-4 border-gray-200 rounded-2xl p-6 mb-6 aspect-square flex items-center justify-center">
              <div className="w-full h-full bg-gray-100 rounded-xl flex items-center justify-center">
                <svg
                  className="w-full h-full"
                  viewBox="0 0 200 200"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Simple QR-like pattern */}
                  <rect x="10" y="10" width="60" height="60" fill="black" />
                  <rect x="130" y="10" width="60" height="60" fill="black" />
                  <rect x="10" y="130" width="60" height="60" fill="black" />
                  <rect x="25" y="25" width="30" height="30" fill="white" />
                  <rect x="145" y="25" width="30" height="30" fill="white" />
                  <rect x="25" y="145" width="30" height="30" fill="white" />
                  <text x="100" y="105" fontSize="20" fontWeight="bold" textAnchor="middle" fill="black">R</text>
                </svg>
              </div>
            </div>

            <h3 className="text-gray-900 text-xl font-bold mb-2">
              {t("qrTitle")}
            </h3>
            <p className="text-gray-600 text-sm">
              {t("qrSubtitle")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
