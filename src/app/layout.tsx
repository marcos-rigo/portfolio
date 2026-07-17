import type { Metadata, Viewport } from "next";
import { Geist_Mono, Poppins } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { personalInfo } from "@/lib/data";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const siteDescription =
  "Desarrollador Full Stack en Tucumán, Argentina. React, Next.js y Node.js. Desarrollo aplicaciones web usadas por más de 50.000 usuarios mensuales en el sector público.";

export const metadata: Metadata = {
  metadataBase: new URL("https://marcosrigo.com"),
  title: "Marcos Rigo — Desarrollador Full Stack",
  description: siteDescription,
  keywords: ["Marcos Rigo", "Portfolio", "Full Stack Developer", "Ingeniería en Sistemas", "Desarrollador Web", "React", "Next.js", "Tucumán", "Argentina"],
  authors: [{ name: "Marcos Rigo" }],
  openGraph: {
    title: "Marcos Rigo — Desarrollador Full Stack",
    description: siteDescription,
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Marcos Rigo — Desarrollador Full Stack",
    description: siteDescription,
  },
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/Logo .png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0e2440" },
  ],
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: personalInfo.fullName,
  givenName: personalInfo.name,
  familyName: personalInfo.lastName,
  jobTitle: personalInfo.title,
  email: personalInfo.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "San Miguel de Tucumán",
    addressRegion: "Tucumán",
    addressCountry: "AR",
  },
  url: "https://marcosrigo.com",
  sameAs: [personalInfo.github, personalInfo.linkedin],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      suppressHydrationWarning
      className={`${poppins.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-background text-foreground transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
