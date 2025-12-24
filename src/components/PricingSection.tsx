import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Check, Star, Sparkles } from "lucide-react";

const PricingSection = () => {
  const { t } = useTranslation();
  const packages = t("pricing.packages", { returnObjects: true }) as Array<{
    name: string;
    originalPrice: string;
    price: string;
    features: string[];
    enterpriseCta: string;
  }>;

  return (
    <section id="packages" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-float opacity-30" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-primary rounded-full animate-float opacity-20" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-40 left-1/4 w-3 h-3 bg-primary rounded-full animate-float opacity-25" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-1/3 w-5 h-5 bg-primary rounded-full animate-float opacity-15" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slide-up">
            <span suppressHydrationWarning>{t("pricing.title")}</span> <span className="text-gradient" suppressHydrationWarning>{t("pricing.titleHighlight")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }} suppressHydrationWarning>
            {t("pricing.description")}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, index) => {
            const isPopular = index === 1;
            const isEnterprise = index === 2;
            
            return (
              <div
                key={index}
                className={`relative p-8 rounded-3xl border-2 transition-all duration-500 hover:-translate-y-3 animate-fade-in opacity-0 ${
                  isPopular
                    ? "border-primary bg-gradient-to-b from-accent to-background shadow-xl shadow-primary/10 scale-105 md:scale-110 z-10"
                    : "border-border bg-card hover:border-primary/30 hover:shadow-lg"
                }`}
                style={{ animationDelay: `${index * 0.15}s`, animationFillMode: "forwards" }}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-4 py-2 bg-gradient-primary rounded-full text-primary-foreground text-sm font-semibold animate-bounce-in shadow-lg" suppressHydrationWarning>
                      <Star className="w-4 h-4 fill-current animate-pulse" />
                      {t("pricing.mostPopular")}
                      <Sparkles className="w-4 h-4 animate-pulse" />
                    </div>
                  </div>
                )}

                {/* Discount Badge (for non-popular) */}
                {index === 0 && (
                  <div className="inline-block px-3 py-1 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4 animate-pulse" suppressHydrationWarning>
                    {t("pricing.save40")}
                  </div>
                )}

                {/* Package Name */}
                <h3 className="text-2xl font-bold mb-4" suppressHydrationWarning>{pkg.name}</h3>

                {/* Price */}
                <div className="mb-6">
                  {pkg.originalPrice && (
                    <span className="text-muted-foreground line-through text-lg ml-2" suppressHydrationWarning>
                      {pkg.originalPrice} {t("pricing.egp")}
                    </span>
                  )}
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gradient" suppressHydrationWarning>
                      {isEnterprise ? t("pricing.contactUs") : pkg.price}
                    </span>
                    {!isEnterprise && pkg.price && (
                      <span className="text-muted-foreground" suppressHydrationWarning>{t("pricing.egp")} / {t("pricing.yearly")}</span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature, fIndex) => (
                    <li 
                      key={fIndex} 
                      className="flex items-start gap-3 animate-fade-in opacity-0"
                      style={{ animationDelay: `${(index * 0.15) + (fIndex * 0.05)}s`, animationFillMode: "forwards" }}
                    >
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                        <Check className="w-3 h-3 text-primary" />
                      </div>
                      <span className="text-foreground/80" suppressHydrationWarning>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Button
                  variant={isPopular ? "hero" : "outline"}
                  size="lg"
                  className={`w-full transition-all duration-300 ${isPopular ? 'hover:scale-105 shadow-lg' : 'hover:bg-primary/10'}`}
                  asChild
                  suppressHydrationWarning
                >
                  <a href="#contact">{pkg.enterpriseCta}</a>
                </Button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;