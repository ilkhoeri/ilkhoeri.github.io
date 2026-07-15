import { cn } from "@/lib/utils";
import { ThemeProvider } from "../components/theme";
import { Geist, Geist_Mono, Google_Sans_Flex } from "next/font/google";
import type { Metadata } from "next";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});
const googleSansFlex = Google_Sans_Flex({
  variable: "--font-google-sans-flex",
  subsets: ["latin"]
});

const siteConfig = {
  creator: "ilkhoeri",
  name: "ilkhoeri.github.io",
  url: "https://ilkhoeri.github.io/",
  description: "Personal pages",
  keywords: ["ilkhoeri", "modules", "open-source"],
  links: {
    github: "https://github.com/ilkhoeri"
  }
} as const;

const META_THEME_COLORS = {
  light: "#ffffff",
  dark: "#090a15"
} as const;

export const metadata: Metadata = {
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name
  },
  applicationName: siteConfig.name,
  description: siteConfig.description,
  category: "Campuss Platform",
  manifest: "/manifest.json",
  generator: siteConfig.name,
  publisher: siteConfig.name,
  referrer: "origin-when-cross-origin",
  keywords: [...siteConfig.keywords],
  creator: siteConfig.creator,
  authors: [
    { name: siteConfig.creator },
    { name: siteConfig.creator, url: siteConfig.links.github }
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/assets/images/screenshoot-app.webp",
        width: 1200,
        height: 630
      }
    ],
    locale: "en_US",
    type: "website"
  },
  alternates: {
    canonical: "/",
    languages: {
      id: "/",
      en: "/en",
      ar: "/ar",
      ja: "/ja",
      jv: "/jv",
      ms: "/ms",
      th: "/th"
    }
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  other: {
    hostname: siteConfig.url,
    "expected-hostname": siteConfig.url,
    "msapplication-config": "/browserconfig.xml",
    "mobile-web-app-capable": "yes",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": siteConfig.name,
    "format-detection": "telephone=no",
    "msapplication-TileColor": "#ffffff",
    "msapplication-TileImage": "/favicon/ms-icon-144x144.png",
    "msapplication-tap-highlight": "no"
  }
};

export const viewport = {
  minimumScale: 1,
  maximumScale: 1,
  initialScale: 1,
  userScalable: true,
  width: "device-width",
  height: "device-height",
  viewportFit: "cover",
  interactiveWidget: "overlays-content",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: META_THEME_COLORS.light },
    { media: "(prefers-color-scheme: dark)", color: META_THEME_COLORS.dark }
  ]
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          googleSansFlex.variable,
          "h-full antialiased min-h-full flex flex-col"
        )}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
