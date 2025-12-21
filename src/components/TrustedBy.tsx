import { useTranslation } from "react-i18next";

const TrustedBy = () => {
  const { t } = useTranslation();
  const partners = t("trustedBy.partners", { returnObjects: true }) as string[];

  return (
    <section className="py-12 bg-ens-charcoal text-primary-foreground overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <p className="text-center text-lg md:text-xl opacity-90 animate-fade-in" suppressHydrationWarning>
          {t("trustedBy.title")}
        </p>
      </div>
      
      {/* Marquee Animation */}
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="mx-8 md:mx-12 flex items-center"
            >
              <div className="bg-primary-foreground/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-primary-foreground/20 hover:bg-primary-foreground/20 hover:border-primary/50 transition-all duration-300 hover:scale-105">
                <span className="text-lg font-semibold opacity-80" suppressHydrationWarning>{partner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;