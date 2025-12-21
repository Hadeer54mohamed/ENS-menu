"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import TrustedBy from "@/components/TrustedBy";
import FeaturesSection from "@/components/FeaturesSection";
import HowItWorks from "@/components/HowItWorks";
import PricingSection from "@/components/PricingSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { useEffect, use, useState } from "react";
import { useTranslation } from "react-i18next";
import WhyUsSection from "@/components/WhyUsSection";

export default function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { i18n } = useTranslation();
  const { locale } = use(params);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const initLanguage = async () => {
      if (locale && (locale === 'ar' || locale === 'en') && i18n.language !== locale) {
        await i18n.changeLanguage(locale);
      }
      setIsReady(true);
    };
    
    initLanguage();
  }, [locale, i18n]);

  if (!isReady) {
    return null;
  }

  return (
    <main className="min-h-screen">
    
      <Navbar />
      <HeroSection />
      <WhyUsSection />
      <TrustedBy />
      <FeaturesSection />
      <HowItWorks />
      <PricingSection />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </main>
  );
}

