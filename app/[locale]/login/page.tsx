"use client";

import { useState, useEffect, use } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function LoginPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const { t, i18n } = useTranslation();
  const { isRTL } = useLanguage();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const ArrowIcon = isRTL ? ArrowRight : ArrowLeft;
  const currentLogo = i18n.language === "ar" ? "/ENS-AR.png" : "/ENS-EN.png";

  /* Language Init */
  useEffect(() => {
    if (locale && locale !== i18n.language) {
      i18n.changeLanguage(locale);
    }
    setIsReady(true);
  }, [locale, i18n]);

  /* Remember Me */
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      if (!email || !password) {
        toast.error(
          i18n.language === "ar"
            ? "يرجى ملء جميع الحقول"
            : "Please fill all fields"
        );
        setIsLoading(false);
        return;
      }

      if (rememberMe) {
        localStorage.setItem("rememberEmail", email);
      } else {
        localStorage.removeItem("rememberEmail");
      }

      localStorage.setItem("isLoggedIn", "true");
      toast.success(t("login.loginButton"));
      router.push(`/${locale}`);
    }, 900);
  };

  if (!isReady) return null;

  return (
    <main className="min-h-screen bg-gradient-hero relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow delay-1000" />
      </div>

      <div className="container mx-auto px-4 py-10 relative z-10">
        {/* Back */}
        <a
          href={`/${locale}`}
          className="inline-flex items-center gap-2 text-foreground/70 hover:text-primary transition mb-8 group"
        >
          <ArrowIcon
            className={`w-5 h-5 transition-transform ${
              isRTL
                ? "group-hover:translate-x-1"
                : "group-hover:-translate-x-1"
            }`}
          />
          {t("login.backToHome")}
        </a>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-md mx-auto"
        >
          <div className="bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl p-8 md:p-10">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <img src={currentLogo} alt="ENS Logo" className="h-16" />
            </div>

            {/* Title */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">
                {t("login.title")}
              </h1>
              <p className="text-muted-foreground">
                {t("login.subtitle")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email */}
              <div className="space-y-2">
                <Label className="flex gap-2 items-center">
                  <Mail className="w-4 h-4 text-primary" />
                  {t("login.email")}
                </Label>
                <Input
                  type="email"
                  placeholder={t("login.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label className="flex gap-2 items-center">
                  <Lock className="w-4 h-4 text-primary" />
                  {t("login.password")}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder={t("login.passwordPlaceholder")}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 pr-10"
                  />
                  <button
                    type="button"
                    aria-pressed={showPassword}
                    aria-label={
                      showPassword
                        ? t("login.hidePassword")
                        : t("login.showPassword")
                    }
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={rememberMe}
                    onCheckedChange={(v) => setRememberMe(!!v)}
                  />
                  <Label className="text-sm cursor-pointer">
                    {t("login.rememberMe")}
                  </Label>
                </div>

                <a className="text-sm text-primary hover:underline">
                  {t("login.forgotPassword")}
                </a>
              </div>

              {/* Submit */}
              <Button
                type="submit"
                variant="hero"
                size="lg"
                disabled={isLoading}
                className="w-full h-12 text-lg transition hover:scale-[1.03]"
              >
                {isLoading ? (
                  <span className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                ) : (
                  t("login.loginButton")
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              {t("login.noAccount")}{" "}
              <a
                href={`/${locale}#contact`}
                className="text-primary font-medium hover:underline"
              >
                {t("login.createAccount")}
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
