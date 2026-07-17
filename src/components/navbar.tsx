"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Briefcase, User, GraduationCap, FolderGit2, Mail } from "lucide-react";
import { useTheme } from "next-themes";
import { personalInfo } from "@/lib/data";
import Magnetic from "@/components/magnetic";
import { useLanguage } from "@/components/language-provider";

export default function Navbar() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { locale, setLocale, t } = useLanguage();

  const navItems = [
    { name: t.nav.about, href: "#about", icon: User },
    { name: t.nav.experience, href: "#experience", icon: Briefcase },
    { name: t.nav.skills, href: "#skills", icon: GraduationCap },
    { name: t.nav.portfolio, href: "#portfolio", icon: FolderGit2 },
    { name: t.nav.contact, href: "#contact", icon: Mail },
  ];

  // Asegurar hidratación correcta para evitar errores de renderizado de servidor con next-themes
  useEffect(() => {
    setMounted(true);
  }, []);

  // Controlar el color del navbar al hacer scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ScrollSpy para resaltar la sección activa en tiempo real
  useEffect(() => {
    const observers = navItems.map((item) => {
      const el = document.getElementById(item.href.replace("#", ""));
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(item.href.replace("#", ""));
          }
        },
        { rootMargin: "-45% 0px -45% 0px" } // Se activa cuando el centro de la sección cruza el centro de la pantalla
      );

      observer.observe(el);
      return { observer, el };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.el);
      });
    };
  }, []);

  const getNavbarHeight = () => {
    const header = document.querySelector("header");
    return header ? header.getBoundingClientRect().height + 12 : 80;
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    const targetEl = document.getElementById(href.replace("#", ""));
    if (targetEl) {
      const navbarHeight = getNavbarHeight();
      const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-5xl z-50 rounded-full bg-[#16355C]/90 dark:bg-[#0E2440]/90 backdrop-blur-xl border border-white/10 transition-all duration-300 ${
        scrolled ? "shadow-lg py-2" : "py-3"
      }`}
    >
      <div className="px-6 flex items-center justify-between">
        {/* Logotipo / Firma */}
        <Magnetic range={45} strength={0.25}>
          <a
            href="#about"
            onClick={(e) => handleNavClick(e, "#about")}
            className="flex items-center gap-2 group cursor-pointer animate-fade-in"
          >
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center font-heading font-bold text-white shadow-md transition-transform duration-300 group-hover:scale-110">
              R
            </div>
            <span className="font-heading font-semibold text-lg tracking-tight hidden sm:inline-block text-white transition-colors duration-300 group-hover:text-[#F5C84C]">
              Rigo
              <span className="text-primary font-bold">.</span>
              Marcos
            </span>
          </a>
        </Magnetic>

        {/* Links de Navegación de Escritorio */}
        <nav className="hidden md:flex items-center gap-1 bg-white/10 px-3 py-1.5 rounded-full border border-white/10">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <Magnetic key={item.name} range={40} strength={0.3}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-white" : "text-white/70 hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-primary rounded-full -z-10 shadow-sm"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  {item.name}
                </a>
              </Magnetic>
            );
          })}
        </nav>

        {/* Acciones del Navbar (Theme Toggle + Hamburguesa) */}
        <div className="flex items-center gap-3">
          {/* Conmutador de Idioma (ES / EN) */}
          {mounted && (
            <Magnetic range={30} strength={0.35}>
              <button
                onClick={() => setLocale(locale === "es" ? "en" : "es")}
                className="px-2.5 py-1.5 rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300 cursor-pointer text-[10px] font-mono font-bold tracking-wider text-white/70 hover:text-white flex items-center justify-center min-w-[34px]"
                aria-label="Cambiar idioma"
              >
                {locale === "es" ? "ES" : "EN"}
              </button>
            </Magnetic>
          )}

          {/* Toggler Modo Oscuro / Claro */}
          {mounted && (
            <Magnetic range={35} strength={0.35}>
              <button
                onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
                className="p-2.5 rounded-full border border-white/10 hover:bg-white/10 transition-colors duration-300 cursor-pointer"
                aria-label="Cambiar tema de color"
              >
                {resolvedTheme === "dark" ? (
                  <Sun className="w-4 h-4 text-[#F5C84C]" />
                ) : (
                  <Moon className="w-4 h-4 text-white/80" />
                )}
              </button>
            </Magnetic>
          )}

          {/* Menú de Hamburguesa para Móvil */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 rounded-full border border-white/10 hover:bg-white/10 text-white transition-colors duration-300 cursor-pointer"
            aria-label="Toggle menú móvil"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Menú Móvil Desplegable */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden absolute top-[calc(100%+8px)] left-0 w-full rounded-2xl bg-[#16355C]/95 dark:bg-[#0E2440]/95 backdrop-blur-xl shadow-xl overflow-hidden border border-white/10"
          >
            <div className="px-4 py-3 flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.replace("#", "");
                const Icon = item.icon;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 border border-white/10 shadow-sm ${
                      isActive
                        ? "bg-primary text-white"
                        : "bg-white/5 text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm font-medium tracking-wide">{item.name}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
