import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();
  const ensLogo = "/ens-logo.png";

  const navLinks = [
    { href: "#features", label: t("nav.features") },
    { href: "#packages", label: t("nav.packages") },
    { href: "#how-it-works", label: t("nav.howItWorks") },
    { href: "#contact", label: t("nav.contact") },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground py-8 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6 group">
              <img
                src={ensLogo}
                alt="ENS Logo"
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
              />
              <span className="text-3xl font-bold transition-colors duration-300 group-hover:text-primary">
                ENS
              </span>
            </div>
            <p
              className="text-secondary-foreground/70 max-w-md mb-6 leading-relaxed"
              suppressHydrationWarning
            >
              {t("footer.description")}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6" suppressHydrationWarning>
              {t("footer.quickLinks")}
            </h4>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-secondary-foreground/70 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                    suppressHydrationWarning
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-6" suppressHydrationWarning>
              {t("footer.contactUs")}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 group">
                <Phone className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                <a
                  href="tel:+201000000000"
                  className="text-secondary-foreground/70 hover:text-primary transition-colors"
                  dir="ltr"
                >
                  +20 100 000 0000
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail className="w-5 h-5 text-primary transition-transform duration-300 group-hover:scale-110" />
                <a
                  href="mailto:info@ens.sa"
                  className="text-secondary-foreground/70 hover:text-primary transition-colors"
                >
                  info@ens.sa
                </a>
              </li>
              <li className="flex items-start gap-3 group">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110" />
                <span
                  className="text-secondary-foreground/70"
                  suppressHydrationWarning
                >
                  {t("footer.location")}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary-foreground/10 pt-5">
          <div className="flex flex-col items-center gap-6">
            {/* Copyright - Center & Larger */}
            <p
              className="text-secondary-foreground/60 text-base md:text-lg flex items-center gap-2 font-bold"
              suppressHydrationWarning
            >
              © {currentYear}{" "}
              <a
                href="https://www.facebook.com/ENSEGYPTEG"
                className="text-primary hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                ENS
              </a>
              <Heart className="w-5 h-5 text-primary animate-pulse" />
              {t("footer.copyright")}
            </p>

            {/* Links */}
            <div className="flex gap-8">
              <a
                href="#"
                className="text-secondary-foreground/50 hover:text-primary text-sm transition-colors duration-300"
                suppressHydrationWarning
              >
                {t("footer.privacy")}
              </a>
              <a
                href="#"
                className="text-secondary-foreground/50 hover:text-primary text-sm transition-colors duration-300"
                suppressHydrationWarning
              >
                {t("footer.terms")}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
