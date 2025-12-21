"use client";

import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface WhyUsItemProps {
  text: string;
  index: number;
}

const WhyUsItem: React.FC<WhyUsItemProps> = ({ text, index }) => (
  <div 
    className="group relative bg-gradient-to-br from-background/40 to-background/20 backdrop-blur-sm border border-border/50 rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:border-primary/50 animate-fade-in"
    style={{ animationDelay: `${index * 0.1}s` }}
  >
    {/* Glow Effect */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
    
    {/* Icon */}
    <div className="relative flex items-start gap-4">
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
        <Check className="w-5 h-5 text-primary group-hover:scale-110 transition-transform duration-300" />
      </div>
      
      {/* Text */}
      <p className="relative text-lg font-medium text-foreground/90 group-hover:text-foreground transition-colors duration-300 leading-relaxed">
        {text}
      </p>
    </div>

    {/* Sparkle Effect on Hover */}
    <Sparkles className="absolute top-4 right-4 w-4 h-4 text-primary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
  </div>
);

export default function WhyUsSection() {
  const { t } = useTranslation();
  const { isRTL, isMounted } = useLanguage();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const title = t("whyUs.title");
  const items = t("whyUs.items", { returnObjects: true }) as string[];

  if (!isReady || !isMounted) {
    return null;
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden bg-gradient-to-b from-background to-secondary/20">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Title */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-sm font-medium text-primary" suppressHydrationWarning>
              {t("whyUs.title")}
            </span>
          </div>
          <h2 
            className="text-4xl md:text-5xl font-bold mb-4 text-gradient animate-gradient" 
            suppressHydrationWarning
          >
            {title}
          </h2>
        </div>

        {/* Items Grid */}
        <div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          dir={isRTL ? "rtl" : "ltr"}
        >
          {items.map((item, idx) => (
            <WhyUsItem key={idx} text={item} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
