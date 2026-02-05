import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  metadataBase: new URL("https://goinsight.org"),
  title: "Góc nhìn tài chính | GOInsight",
  description:
    "GOInsight - Nền tảng kiến thức tài chính cá nhân, tin tức cập nhất mới nhất mỗi ngày",
  applicationName: "GOInsight",
  keywords: [
    "tài chính cá nhân",
    "forex",
    "affiliate forex",
    "hoàn phí sàn",
    "crypto",
    "đầu tư",
    "trading",
    "rebate",
    "IB forex",
  ],
  authors: [{ name: "GOInsight" }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "https://goinsight.org/",
    title: "Góc nhìn tài chính | GOInsight",
    description:
      "GOInsight - Nền tảng kiến thức tài chính cá nhân, tin tức cập nhất mới nhất mỗi ngày",
    siteName: "GOInsight",
    locale: "vi_VN",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "GOInsight",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@goinsight",
    creator: "@goinsight",
    title: "Góc nhìn tài chính | GOInsight",
    description:
      "GOInsight - Nền tảng kiến thức tài chính cá nhân, tin tức cập nhất mới nhất mỗi ngày",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/logo.svg",
    apple: "/logo.png",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#141414",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body className="antialiased">
        <Providers>
          {children}
        </Providers>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-1QXLMBVCJX"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-1QXLMBVCJX');
          `}
        </Script>
        <Script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="nWqoxwSzkoluRINPzBhgQQ"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
