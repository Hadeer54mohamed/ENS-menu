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
import { useEffect, use } from "react";
import { useTranslation } from "react-i18next";

export default function LocalePage({ params }: { params: Promise<{ locale: string }> }) {
  const { i18n } = useTranslation();
  const { locale } = use(params);

  useEffect(() => {
    if (locale && (locale === 'ar' || locale === 'en')) {
      i18n.changeLanguage(locale);
    }
  }, [locale, i18n]);

  return (
    <main className="min-h-screen">
    
      <Navbar />
      <HeroSection />
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

