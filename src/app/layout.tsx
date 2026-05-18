import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeSync } from "@/components/theme-sync";
import { I18nProvider } from "@/lib/i18n";
import Footer from "@/components/footer";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fff1f2" },
    { media: "(prefers-color-scheme: dark)", color: "#2c0a14" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "File Shuttle",
  applicationCategory: "WebApplication",
  operatingSystem: "Web",
  description: "Fast, secure, self-destruct file transfer service.",
  url: "https://file.shuttlelab.org",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

export const metadata: Metadata = {
  metadataBase: new URL("https://file.shuttlelab.org"),
  title: "文件穿梭机 | File Shuttle",
  description:
    "极速 · 安全 · 自动销毁 | Fast · Secure · Self-destruct file transfer",
  alternates: {
    canonical: "/",
  },
  // verification: {
  //   google: "<paste-google-search-console-verification-code-here>",
  // },
  openGraph: {
    title: "文件穿梭机 | File Shuttle",
    description:
      "极速 · 安全 · 自动销毁 | Fast · Secure · Self-destruct file transfer",
    siteName: "File Shuttle",
    type: "website",
    locale: "zh_CN",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "文件穿梭机 | File Shuttle",
    description: "极速 · 安全 · 自动销毁 | Fast · Secure · Self-destruct file transfer",
  },
  icons: {
    icon: "/icon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <ThemeSync />
        <I18nProvider>
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
