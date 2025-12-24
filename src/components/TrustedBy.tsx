import { useTranslation } from "react-i18next";

const TrustedBy = () => {
  const { t } = useTranslation();
  const partners = t("trustedBy.partners", { returnObjects: true }) as string[];

  return (
    <section className="py-12 text-primary-foreground overflow-hidden relative">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/bg.png)' }}
      />
      {/* Purple Gradient Overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-90" 
        style={{ background: 'linear-gradient(135deg,rgb(61, 31, 110),rgb(44, 13, 96))' }}
      />
      
      <div className="container mx-auto px-4 mb-8 relative z-10">
        <p className="text-center text-lg md:text-xl opacity-80 animate-fade-in" suppressHydrationWarning>
          {t("trustedBy.title")}
        </p>
      </div>
      
      {/* Marquee Animation */}
      <div className="relative z-10">
        <div className="flex animate-marquee whitespace-nowrap">
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={index}
              className="mx-8 md:mx-12 flex items-center"
            >
              <div className="bg-primary-foreground/5 backdrop-blur-sm px-6 py-3 rounded-lg border border-primary-foreground/10 hover:bg-primary-foreground/15 hover:border-primary/40 transition-all duration-300 hover:scale-105">
                <span className="text-lg font-semibold opacity-70" suppressHydrationWarning>{partner}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustedBy;