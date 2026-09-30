"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, FileDown } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useLanguage } from "@/components/language-provider";
import Magnetic from "@/components/magnetic";
import HeroPhoto from "@/components/hero-photo";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

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

export default function Hero() {
  const { t } = useLanguage();
  const prefersReducedMotion = usePrefersReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Efecto "zoom" ligado al scroll: la foto arranca grande y se asienta
  // en su tamaño normal al terminar de recorrer el Hero. Solo transform,
  // así que no genera layout shift ni afecta el flujo del documento.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const rawScale = useTransform(scrollYProgress, [0, 1], [1.28, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], [24, 0]);
  const springConfig = { stiffness: 120, damping: 26, mass: 0.6 };
  const photoScale = useSpring(rawScale, springConfig);
  const photoY = useSpring(rawY, springConfig);
  const photoScrollStyle =
    isDesktop && !prefersReducedMotion ? { scale: photoScale, y: photoY } : undefined;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  } as const;

  const getNavbarHeight = () => {
    const header = document.querySelector("header");
    return header ? header.getBoundingClientRect().height + 12 : 80;
  };

  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById("portfolio");
    if (el) {
      const navbarHeight = getNavbarHeight();
      const targetPosition = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-12 overflow-hidden px-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center justify-center text-center lg:text-left z-10"
      >
        {/* Columna de texto: Información de Marcos (Ocupa 7 columnas en lg) */}
        <div className="order-2 lg:order-1 lg:col-span-7 flex flex-col items-center lg:items-start justify-center lg:justify-start">
          {/* Etiqueta flotante premium */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-bold uppercase tracking-widest mb-6 shadow-sm"
          >
            <span>{t.hero.tag}</span>
          </motion.div>

          {/* Nombre Gigante con tipografía Poppins */}
          <motion.h1
            variants={itemVariants}
            className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-foreground mb-4 select-none"
          >
            Rigo <span className="text-primary">Marcos</span>
          </motion.h1>

          {/* Biografía de introducción rápida */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-muted-foreground/80 max-w-xl mb-10 leading-relaxed font-sans"
          >
            {t.hero.bioBefore}
            <a
              href="https://frt.utn.edu.ar/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-dotted underline-offset-2 hover:text-primary transition-colors duration-300"
            >
              {t.hero.bioUniversityLink}
            </a>
            {t.hero.bioAfter}
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full sm:w-auto mb-12"
          >
            <Magnetic range={70} strength={0.25}>
              <button
                onClick={handleScrollToProjects}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-semibold text-sm shadow-lg hover:bg-[#B8121D] transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <span>{t.hero.ctaView}</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </Magnetic>

            <Magnetic range={70} strength={0.25}>
              <a
                href={personalInfo.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-foreground text-foreground font-semibold text-sm hover:bg-foreground hover:text-background transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <span>{t.hero.ctaDownload}</span>
                <FileDown className="w-4 h-4" />
              </a>
            </Magnetic>
          </motion.div>

          {/* Iconos de Redes Sociales */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-5"
          >
            <Magnetic range={50} strength={0.35}>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3 rounded-full border border-border bg-card text-foreground shadow-[0_8px_22px_-6px_rgba(22,53,92,0.3)] dark:shadow-[0_8px_22px_-6px_rgba(0,0,0,0.55)] hover:text-primary hover:border-primary/40 hover:shadow-[0_10px_28px_-6px_rgba(216,31,42,0.4)] transition-all duration-300 cursor-pointer"
                aria-label="Ir a GitHub de Marcos"
              >
                <Github className="w-5 h-5" />
              </a>
            </Magnetic>
            <Magnetic range={50} strength={0.35}>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center p-3 rounded-full border border-border bg-card text-foreground shadow-[0_8px_22px_-6px_rgba(22,53,92,0.3)] dark:shadow-[0_8px_22px_-6px_rgba(0,0,0,0.55)] hover:text-primary hover:border-primary/40 hover:shadow-[0_10px_28px_-6px_rgba(216,31,42,0.4)] transition-all duration-300 cursor-pointer"
                aria-label="Ir a LinkedIn de Marcos"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Columna de foto: retrato circular con marco animado (Ocupa 5 columnas en lg) */}
        <motion.div
          variants={itemVariants}
          className="order-1 lg:order-2 lg:col-span-5 w-full h-[260px] sm:h-[340px] lg:h-[400px] flex items-center justify-center relative select-none"
        >
          <motion.div style={photoScrollStyle} className="flex items-center justify-center">
            <HeroPhoto />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
