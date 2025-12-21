import { useTranslation } from "react-i18next";
import { 
  Palette, 
  BarChart3, 
  CreditCard, 
  HeadphonesIcon, 
  Building2, 
  TrendingUp,
  Settings,
  Languages
} from "lucide-react";

const icons = [Palette, BarChart3, CreditCard, Settings, Building2, TrendingUp, HeadphonesIcon, Languages];

const FeaturesSection = () => {
  const { t } = useTranslation();
  const features = t("features.items", { returnObjects: true }) as Array<{ title: string; description: string }>;

  return (
    <section id="features" className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-accent text-accent-foreground rounded-full text-sm font-medium mb-4 animate-bounce-in" suppressHydrationWarning>
            {t("features.badge")}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slide-up">
            <span suppressHydrationWarning>{t("features.title")}</span> <span className="text-gradient" suppressHydrationWarning>{t("features.titleHighlight")}</span> <span suppressHydrationWarning>{t("features.titleEnd")}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto animate-slide-up" style={{ animationDelay: "0.1s" }} suppressHydrationWarning>
            {t("features.description")}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = icons[index];
            return (
              <div
                key={index}
                className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 transition-all duration-500 hover:shadow-lg hover:-translate-y-2 hover:shadow-primary/10 animate-fade-in opacity-0"
                style={{ animationDelay: `${index * 0.1}s`, animationFillMode: "forwards" }}
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg shadow-primary/20">
                  <Icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300" suppressHydrationWarning>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed" suppressHydrationWarning>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;