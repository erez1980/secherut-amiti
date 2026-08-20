import Script from "next/script";
import "./globals.css";

export const metadata = {
  title: "שכירות אמיתית",
  description: "מחשבון מגורים שעושה סדר בשכר הדירה, ארנונה, ועד בית והחשבונות — לפני שחותמים.",
  metadataBase: new URL("https://rent.erez-sites.app"),
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="he" dir="rtl">
      <body>
        {children}
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
