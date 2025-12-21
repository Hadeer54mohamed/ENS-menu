"use client";

import { useState, useEffect, use } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Mail, Lock } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isReady, setIsReady] = useState(false);
  
  const { locale } = use(params);

  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;
  const currentLogo =
    isMounted && i18n.language === "ar" ? "/ENS-AR.png" : "/ENS-EN.png";

  useEffect(() => {
    const initLanguage = async () => {
      if (locale && (locale === 'ar' || locale === 'en') && i18n.language !== locale) {
        await i18n.changeLanguage(locale);
      }
      setIsMounted(true);
      setIsReady(true);
    };
    
    initLanguage();
  }, [locale, i18n]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt:", { email, password, rememberMe });
  };

  if (!isReady) {
    return null;
  }

  return (
    <main className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div
          className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"
          style={{ animationDelay: "1s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl animate-spin-slow" />
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Back to Home */}
        <a
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition-colors mb-8 group"
          suppressHydrationWarning
        >
          <ArrowIcon
            className={`w-5 h-5 transition-transform duration-300 ${
              isRTL ? "group-hover:translate-x-1" : "group-hover:-translate-x-1"
            }`}
          />
          {t("login.backToHome")}
        </a>

        {/* Login Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-background/80 backdrop-blur-md border border-border rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img
                src={currentLogo}
                alt="ENS Logo"
                className="h-16 w-auto"
                suppressHydrationWarning
              />
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2" suppressHydrationWarning>
                {t("login.title")}
              </h1>
              <p className="text-muted-foreground" suppressHydrationWarning>
                {t("login.subtitle")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2"
                  suppressHydrationWarning
                >
                  <Mail className="w-4 h-4 text-primary" />
                  {t("login.email")}
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder={t("login.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                  suppressHydrationWarning
                />
              </div>

              {/* Password */}
              <div className="relative space-y-2">
                <Label
                  htmlFor="password"
                  className="flex items-center gap-2"
                  suppressHydrationWarning
                >
                  <Lock className="w-4 h-4 text-primary" />
                  {t("login.password")}
                </Label>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder={t("login.passwordPlaceholder")}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="h-12 pr-10" 
                  suppressHydrationWarning
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) =>
                      setRememberMe(checked as boolean)
                    }
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm cursor-pointer"
                    suppressHydrationWarning
                  >
                    {t("login.rememberMe")}
                  </Label>
                </div>
                <a
                  href="#"
                  className="text-sm text-primary hover:underline"
                  suppressHydrationWarning
                >
                  {t("login.forgotPassword")}
                </a>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                className="w-full h-12 text-lg hover:scale-105 transition-transform duration-300"
                suppressHydrationWarning
              >
                {t("login.loginButton")}
              </Button>
            </form>

            {/* Create Account */}
            <div className="mt-8 text-center">
              <p
                className="text-sm text-muted-foreground mb-3"
                suppressHydrationWarning
              >
                {t("login.noAccount")}
              </p>
              <a
                href={`/${locale}#contact`}
                className="text-primary hover:underline font-medium"
                suppressHydrationWarning
              >
                {t("login.createAccount")}
              </a>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p suppressHydrationWarning>
              {t("footer.privacy")} • {t("footer.terms")}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
