import "@/styles/globals.css";
import Providers from "@/components/Providers";
import { use } from "react";

export const metadata = {
  title: {
    default: "منيو إلكتروني QR Code للمطاعم | ENS",
    en: "Digital Menu QR Code for Restaurants | ENS"
  },
  description: {
    default:
      "أنشئ منيو إلكتروني ذكي لمطعمك باستخدام QR كود. طلب ودفع بدون عمولات، إعداد سريع، ودعم فني مستمر. جرّب ENS الآن.",
    en:
      "Create a smart digital menu for your restaurant using QR code. No commissions, fast setup, and continuous support. Try ENS now."
  }
};



export function generateStaticParams() {
  return [{ locale: 'ar' }, { locale: 'en' }];
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = use(params);
  const dir = locale === 'ar' ? 'rtl' : 'ltr';
  
  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

