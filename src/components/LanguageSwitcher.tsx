import { Globe } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { Button } from "@/components/ui/button";

const LanguageSwitcher = () => {
  const { currentLanguage, toggleLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="flex items-center gap-2 hover:bg-primary/10 transition-all duration-300"
      suppressHydrationWarning
    >
      <Globe className="w-4 h-4" />
      <span className="font-medium" suppressHydrationWarning>
        {currentLanguage === 'ar' ? 'EN' : 'عربي'}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;
