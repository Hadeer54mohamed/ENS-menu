import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, MessageCircle, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";

const ContactSection = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;
  
  const [formData, setFormData] = useState({
    restaurantName: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: t("contact.successTitle"),
      description: t("contact.successDescription"),
    });
    setFormData({ restaurantName: "", phone: "" });
  };

  return (
    <section id="contact" className="py-20 md:py-32 bg-gradient-dark text-primary-foreground relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl animate-spin-slow" />
        
        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/40 rounded-full animate-float" />
        <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary/30 rounded-full animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 right-1/3 w-2 h-2 bg-primary/50 rounded-full animate-float" style={{ animationDelay: "2s" }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className={`text-center ${isRTL ? 'lg:text-right' : 'lg:text-left'}`}>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-slide-up">
                <span suppressHydrationWarning>{t("contact.title1")}</span>
                <br />
                <span className="text-primary animate-pulse" suppressHydrationWarning>{t("contact.title2")}</span>
              </h2>
              <p className="text-lg opacity-80 mb-8 animate-slide-up" style={{ animationDelay: "0.1s" }} suppressHydrationWarning>
                {t("contact.description")}
              </p>
              
              {/* WhatsApp Button */}
              <a
                href="https://wa.me/966555482808"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 bg-green-500 hover:bg-green-600 rounded-xl transition-all duration-300 font-semibold hover:scale-105 shadow-lg hover:shadow-green-500/30 animate-slide-up"
                style={{ animationDelay: "0.2s" }}
                suppressHydrationWarning
              >
                <MessageCircle className="w-5 h-5 animate-bounce" />
                {t("contact.whatsapp")}
              </a>
            </div>

            {/* Contact Form */}
            <div className="bg-card text-card-foreground p-8 rounded-3xl shadow-2xl animate-scale-in hover:shadow-primary/10 transition-shadow duration-500">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
                  <label className="block text-sm font-medium mb-2" suppressHydrationWarning>
                    {t("contact.restaurantName")} *
                  </label>
                  <Input
                    type="text"
                    placeholder={t("contact.restaurantPlaceholder")}
                    value={formData.restaurantName}
                    onChange={(e) =>
                      setFormData({ ...formData, restaurantName: e.target.value })
                    }
                    required
                    className="h-12 text-base transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                    suppressHydrationWarning
                  />
                </div>

                <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
                  <label className="block text-sm font-medium mb-2" suppressHydrationWarning>
                    {t("contact.phone")} *
                  </label>
                  <Input
                    type="tel"
                    placeholder={t("contact.phonePlaceholder")}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    required
                    className="h-12 text-base transition-all duration-300 focus:scale-[1.02] focus:shadow-lg"
                    dir="ltr"
                    suppressHydrationWarning
                  />
                </div>

                <Button 
                  variant="hero" 
                  size="xl" 
                  className="w-full group hover:scale-105 transition-all duration-300 shadow-lg animate-fade-in" 
                  type="submit"
                  style={{ animationDelay: "0.3s" }}
                  suppressHydrationWarning
                >
                  {t("contact.submit")}
                  <Send className={`w-5 h-5 transition-transform duration-300 ${isRTL ? 'group-hover:-translate-x-1 rotate-180' : 'group-hover:translate-x-1'}`} />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;