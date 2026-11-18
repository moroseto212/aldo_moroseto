import type { Metadata, Viewport } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import MotionProvider from "@/components/MotionProvider";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TabBar from "@/components/layout/TabBar";
import { IdentityJsonLd } from "@/components/seo/JsonLd";
import { site } from "@/data/site";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#0b0b0c",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} / ${site.tagline}`,
    template: `%s / ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Aldo Moroseto",
    "Aldo Moroseto website developer",
    "website developer",
    "website developer bekasi",
    "web developer indonesia",
    "frontend developer indonesia",
    "React developer",
    "Next.js developer",
    "jasa pembuatan website",
    "jasa website",
    "jasa bikin website",
    "website company profile",
    "landing page profesional",
    "web application developer",
  ],
  authors: [{ name: site.author }],
  applicationName: site.name,
  verification: {
    google: "McRkQw_PHYHdmxDkZcR1VIDD2qkaZ5jJXkpSbELrCHk",
  },
  appleWebApp: {
    capable: true,
    title: site.name,
    statusBarStyle: "black-translucent",
  },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} / ${site.tagline}`,
    description: site.description,
    images: [
      {
        url: "/og-icon.png",
        width: 1200,
        height: 630,
        alt: `${site.name} / ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} / ${site.tagline}`,
    description: site.description,
    images: ["/og-icon.png"],
  },
  robots: { index: true, follow: true },
};

const themeScript = `(function(){try{var k="theme",s=localStorage.getItem(k),t=s==="light"||s==="dark"?s:(matchMedia("(prefers-color-scheme: light)").matches?"light":"dark"),r=document.documentElement;r.dataset.theme=t;r.style.colorScheme=t;var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?"#f4f1ea":"#0b0b0c");}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${archivo.variable} ${plexMono.variable} h-full antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <IdentityJsonLd />
        {/* Ikon tab, Apple touch icon, dan /favicon.ico disediakan otomatis
            oleh app/icon.png, app/apple-icon.png, dan app/favicon.ico. */}
      </head>
      <body id="top" className="flex min-h-full flex-col">
        <MotionProvider>
          <Header />
          <main className="relative z-10 flex-1 bg-background">{children}</main>
          <Footer />
          <TabBar />
        </MotionProvider>
      </body>
    </html>
  );
}
