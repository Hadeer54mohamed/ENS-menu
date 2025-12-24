"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useParams } from "next/navigation";
import {
  Eye,
  ArrowRight,
  LogOut,
  Search,
  Filter,
  Globe,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function TemplatesPage() {
  const params = useParams();
  const locale = params.locale as string;

  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isReady, setIsReady] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentLogo =
    i18n.language === "ar" ? "/ENS-AR.png" : "/ENS-EN.png";

  // Toggle language while staying on Templates page
  const handleToggleLanguage = () => {
    const newLang = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLang);
    router.push(`/${newLang}/Templates`);
  };

  /* Init language */
  useEffect(() => {
    if (locale && locale !== i18n.language) {
      i18n.changeLanguage(locale);
    }
    setIsReady(true);
  }, [locale, i18n]);

  /* Auth Guard */
  useEffect(() => {
    if (!localStorage.getItem("isLoggedIn")) {
      router.replace(`/${locale}/login`);
    }
  }, [locale, router]);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    toast.success(t("templates.logoutSuccess"));
    router.push(`/${locale}`);
  };

  /* Templates Data (translation-based) */
  const templates = [
    {
      id: 1,
      title: t("templates.items.fineDining.title"),
      description: t("templates.items.fineDining.description"),
      category: t("templates.items.fineDining.category"),
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600",
    },
    {
      id: 2,
      title: t("templates.items.modernCafe.title"),
      description: t("templates.items.modernCafe.description"),
      category: t("templates.items.modernCafe.category"),
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600",
    },
    {
      id: 3,
      title: t("templates.items.fastFood.title"),
      description: t("templates.items.fastFood.description"),
      category: t("templates.items.fastFood.category"),
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600",
    },
    {
      id: 4,
      title: t("templates.items.pizza.title"),
      description: t("templates.items.pizza.description"),
      category: t("templates.items.pizza.category"),
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600",
    },
    {
      id: 5,
      title: t("templates.items.sushi.title"),
      description: t("templates.items.sushi.description"),
      category: t("templates.items.sushi.category"),
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600",
    },
    {
      id: 6,
      title: t("templates.items.bakery.title"),
      description: t("templates.items.bakery.description"),
      category: t("templates.items.bakery.category"),
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600",
    },
  ];
  

  const categories = [
    "all",
    ...Array.from(new Set(templates.map((t) => t.category))),
  ];

  const filteredTemplates = templates.filter((tpl) => {
    const matchSearch =
      tpl.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tpl.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory =
      selectedCategory === "all" || tpl.category === selectedCategory;

    return matchSearch && matchCategory;
  });

  if (!isReady) return null;

  return (
    <div
      className="min-h-screen bg-gradient-hero"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href={`/${locale}`} className="flex items-center">
              <img 
                src={currentLogo} 
                alt="ENS Logo" 
                className="h-8 hover:scale-110 transition-transform"
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href={`/${locale}#features`}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {t("nav.features")}
              </a>
              <a
                href={`/${locale}#packages`}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {t("nav.packages")}
              </a>
              <a
                href={`/${locale}#how-it-works`}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {t("nav.howItWorks")}
              </a>
              <a
                href={`/${locale}#contact`}
                className="text-foreground/80 hover:text-primary transition-colors font-medium"
              >
                {t("nav.contact")}
              </a>
            </div>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              {/* Language Switcher */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleLanguage}
                className="flex items-center gap-2 hover:bg-primary/10"
              >
                <Globe className="w-4 h-4" />
                <span className="font-medium">
                  {i18n.language === 'ar' ? 'EN' : 'عربي'}
                </span>
              </Button>

              {/* Logout Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                className="text-foreground/70 hover:text-primary"
              >
                <LogOut className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                {t("templates.logout")}
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleToggleLanguage}
                className="p-2"
              >
                <Globe className="w-5 h-5" />
              </Button>
              <button
                className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-border">
              <div className="flex flex-col gap-4">
                <a
                  href={`/${locale}#features`}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.features")}
                </a>
                <a
                  href={`/${locale}#packages`}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.packages")}
                </a>
                <a
                  href={`/${locale}#how-it-works`}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.howItWorks")}
                </a>
                <a
                  href={`/${locale}#contact`}
                  className="text-foreground/80 hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.contact")}
                </a>
                <Button
                  variant="outline"
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="mt-2"
                >
                  <LogOut className={`w-4 h-4 ${isRTL ? "ml-2" : "mr-2"}`} />
                  {t("templates.logout")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/10 blur-[120px]" />
      </div>

      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Page Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h1 className="text-4xl font-bold mb-3 text-gradient">
            {t("templates.pageTitle")}
          </h1>
          <p className="text-muted-foreground">
            {t("templates.pageSubtitle")}
          </p>
        </motion.div>

        {/* Search & Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="relative flex-1">
            <Search
              className={`absolute top-1/2 -translate-y-1/2 ${
                isRTL ? "right-4" : "left-4"
              } text-muted-foreground`}
            />
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("templates.searchPlaceholder")}
              className={`${isRTL ? "pr-12" : "pl-12"} h-12`}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto">
            {categories.map((cat) => (
              <Button
                key={cat}
                size="sm"
                variant={selectedCategory === cat ? "hero" : "outline"}
                onClick={() => setSelectedCategory(cat)}
                className="rounded-full"
              >
                {cat === "all" ? t("templates.categories.all") : cat}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((tpl, i) => (
            <motion.div
              key={tpl.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="group bg-background/60 backdrop-blur border border-border rounded-2xl overflow-hidden hover:-translate-y-2 transition"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={tpl.image}
                  alt={tpl.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent" />

                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    {t("templates.buttons.preview")}
                  </Button>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition">
                  {tpl.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {tpl.description}
                </p>

                <Button variant="hero" className="w-full">
                  {t("templates.buttons.useTemplate")}
                  <ArrowRight
                    className={`w-4 h-4 ${
                      isRTL ? "mr-2 rotate-180" : "ml-2"
                    }`}
                  />
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16">
            <Filter className="w-14 h-14 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {t("templates.emptyState.title")}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
