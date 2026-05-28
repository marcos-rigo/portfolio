import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bricolage_Grotesque } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import { personalInfo } from "@/lib/data";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Marcos Rigo | Desarrollador Web Full Stack & Estudiante de Ingeniería en Sistemas",
  description: "Portafolio premium de Marcos Rigo, Desarrollador Web Full Stack y Estudiante de Ingeniería en Sistemas de Información. Especialista en la creación de experiencias digitales interactivas, responsivas y de alto rendimiento.",
  keywords: ["Marcos Rigo", "Portfolio", "Full Stack Developer", "Ingeniería en Sistemas", "Desarrollador Web", "React", "Next.js", "Tucumán", "Argentina"],
  authors: [{ name: "Marcos Rigo" }],
  openGraph: {
    title: "Marcos Rigo | Desarrollador Web Full Stack",
    description: "Portafolio premium e interactivo de Marcos Rigo. Descubre mis proyectos de software, competencias tecnológicas y trayectoria profesional.",
    type: "website",
    locale: "es_AR",
  },
  icons: {
    icon: "/img/favicon.ico",
    shortcut: "/img/Logo .png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafafa" },
    { media: "(prefers-color-scheme: dark)", color: "#030303" },
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
  telephone: personalInfo.phone,
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
      className={`${geistSans.variable} ${geistMono.variable} ${bricolageGrotesque.variable} h-full antialiased`}
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
