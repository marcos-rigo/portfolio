"use client";

import React from "react";
import { Mail, FileDown } from "lucide-react";
import { personalInfo } from "@/lib/data";
import Magnetic from "@/components/magnetic";
import { useLanguage } from "@/components/language-provider";

const Github = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function Footer() {
  const { t } = useLanguage();

  const navItems = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.portfolio, href: "#portfolio" },
    { name: t.nav.contact, href: "#contact" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetEl = document.getElementById(href.replace("#", ""));
    if (!targetEl) return;

    const header = document.querySelector("header");
    const navbarHeight = header ? header.getBoundingClientRect().height + 12 : 80;
    const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;
    window.scrollTo({ top: targetPosition, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full bg-[#0E2440] border-t border-white/10 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Columna 1: Identidad */}
        <div className="flex flex-col gap-4">
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="flex items-center gap-2 group cursor-pointer w-fit"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-heading font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110">
              R
            </div>
            <span className="font-heading font-semibold text-lg tracking-tight text-white transition-colors duration-300 group-hover:text-accent">
              Rigo<span className="text-primary font-bold">.</span>Marcos
            </span>
          </a>
          <p className="text-sm text-white/60 leading-relaxed font-sans max-w-xs">
            {t.footer.tagline}
          </p>
          <p className="text-xs text-white/40 font-sans mt-2">
            © {new Date().getFullYear()} {personalInfo.fullName}. {t.footer.rights}
          </p>
        </div>

        {/* Columna 2: Navegación rápida */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/50">
            {t.footer.navTitle}
          </h3>
          <nav className="flex flex-col gap-3">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-sm text-white/70 hover:text-accent transition-colors duration-300 w-fit cursor-pointer"
              >
                {item.name}
              </a>
            ))}
          </nav>
        </div>

        {/* Columna 3: Contacto y redes */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/50">
            {t.footer.contactTitle}
          </h3>
          <div className="flex flex-col gap-3">
            <Magnetic range={40} strength={0.3}>
              <a
                href={`mailto:${personalInfo.email}`}
                className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors duration-300 w-fit cursor-pointer"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span className="break-all">{personalInfo.email}</span>
              </a>
            </Magnetic>
            <Magnetic range={40} strength={0.3}>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors duration-300 w-fit cursor-pointer"
              >
                <Github className="w-4 h-4 shrink-0" />
                <span>GitHub</span>
              </a>
            </Magnetic>
            <Magnetic range={40} strength={0.3}>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors duration-300 w-fit cursor-pointer"
              >
                <Linkedin className="w-4 h-4 shrink-0" />
                <span>LinkedIn</span>
              </a>
            </Magnetic>
            <Magnetic range={40} strength={0.3}>
              <a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-white/70 hover:text-accent transition-colors duration-300 w-fit cursor-pointer"
              >
                <FileDown className="w-4 h-4 shrink-0" />
                <span>CV</span>
              </a>
            </Magnetic>
          </div>
        </div>

        {/* Columna 4: Detalle técnico */}
        <div className="flex flex-col gap-4">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-white/50">
            {t.footer.techTitle}
          </h3>
          <p className="text-sm text-white/60 leading-relaxed font-sans">
            {t.footer.techDescription}
          </p>
        </div>
      </div>
    </footer>
  );
}
