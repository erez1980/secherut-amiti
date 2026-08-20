import Script from "next/script";
import "./globals.css";

const siteUrl = "https://erez1980.github.io/secherut-amiti";
const title = "שכירות אמיתית | מחשבון עלות מגורים";
const description = "מחשבון מגורים ישראלי שמחשב את העלות האמיתית של שכירות, ארנונה, ועד בית וחשבונות — לפני שחותמים.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: title,
    template: "%s | שכירות אמיתית",
  },
  description,
  applicationName: "שכירות אמיתית",
  keywords: ["מחשבון שכירות", "עלות מגורים", "ארנונה", "ועד בית", "דירה להשכרה"],
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "he_IL",
    url: "/",
    siteName: "שכירות אמיתית",
    title,
    description,
  },
  twitter: {
    card: "summary",
    title,
    description,
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "שכירות אמיתית",
  description,
  url: siteUrl,
  applicationCategory: "FinanceApplication",
  operatingSystem: "Web",
  inLanguage: "he-IL",
  offers: { "@type": "Offer", price: "0", priceCurrency: "ILS" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        {children}
        <Script id="structured-data" type="application/ld+json" strategy="beforeInteractive">
          {JSON.stringify(structuredData)}
        </Script>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-N8D446QHJE"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-N8D446QHJE');`}
        </Script>
      </body>
    </html>
  );
}
