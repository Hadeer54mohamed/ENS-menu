import { useTranslation } from "react-i18next";
import { Package, ListPlus, Share2 } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

const icons = [Package, ListPlus, Share2];

const HowItWorks = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const steps = t("howItWorks.steps", { returnObjects: true }) as Array<{ number: string; title: string; description: string }>;

  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-muted relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent animate-shimmer" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4 animate-bounce-in" suppressHydrationWarning>
            {t("howItWorks.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slide-up" suppressHydrationWarning>
            {t("howItWorks.title")} <span className="text-gradient">{t("howItWorks.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }} suppressHydrationWarning>
            {t("howItWorks.description")}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="relative group animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.2}s`, animationFillMode: "forwards" }}
                suppressHydrationWarning
              >
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <div className={`hidden md:block absolute top-16 ${isRTL ? '-left-4' : '-right-4'} w-8 h-0.5 bg-primary/30`} />
                )}
                
                <div className="bg-card p-8 rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:-translate-y-2 text-center group-hover:shadow-primary/10">
                  {/* Step Number */}
                  <div className="text-6xl font-bold text-primary/10 mb-4 group-hover:text-primary/20 transition-colors duration-300 group-hover:scale-110">
                    {step.number}
                  </div>
                  
                  {/* Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-primary/20">
                    <Icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300" suppressHydrationWarning>
                    {step.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" suppressHydrationWarning>
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;