"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, FileDown, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { useLanguage } from "@/components/language-provider";
import QuantumSphere from "@/components/quantum-sphere";
import Magnetic from "@/components/magnetic";

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

  const handleScrollToProjects = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const el = document.getElementById("portfolio");
    if (el) {
      const navbarHeight = 80;
      const targetPosition = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center pt-28 pb-12 overflow-hidden px-6"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center justify-center text-center lg:text-left z-10"
      >
        {/* Columna Izquierda: Información de Marcos (Ocupa 7 columnas en lg) */}
        <div className="lg:col-span-7 flex flex-col items-center lg:items-start justify-center lg:justify-start">
          {/* Etiqueta flotante premium */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/25 text-primary text-xs font-semibold tracking-wide mb-6 shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 animate-pulse" />
            <span>{t.hero.tag}</span>
          </motion.div>

          {/* Nombre Gigante con tipografía Bricolage Grotesque */}
          <motion.h1
            variants={itemVariants}
            className="font-heading font-extrabold text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-foreground mb-4 select-none"
          >
            Rigo{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Marcos
            </span>
          </motion.h1>

          {/* Subtítulo dinámico con gradiente sutil */}
          <motion.h2
            variants={itemVariants}
            className="text-xl sm:text-2xl lg:text-3xl font-medium text-muted-foreground max-w-2xl mb-8 tracking-wide font-sans leading-relaxed"
          >
            {t.bento.specTitle}
          </motion.h2>

          {/* Biografía de introducción rápida */}
          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base text-muted-foreground/80 max-w-xl mb-10 leading-relaxed font-sans"
          >
            {t.hero.bio}
          </motion.p>

          {/* Call To Actions */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start w-full sm:w-auto mb-12"
          >
            <Magnetic range={70} strength={0.25}>
              <button
                onClick={handleScrollToProjects}
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary text-white font-semibold text-sm shadow-lg hover:shadow-primary/25 hover:bg-primary/95 transition-all duration-300 w-full sm:w-auto cursor-pointer"
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
                className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-full glass border border-black/5 dark:border-white/5 font-semibold text-sm hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all duration-300 w-full sm:w-auto cursor-pointer"
              >
                <span>{t.hero.ctaDownload}</span>
                <FileDown className="w-4 h-4 text-primary" />
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
                className="p-3 rounded-full border border-black/5 dark:border-white/5 glass hover:bg-zinc-100 dark:hover:bg-zinc-900 text-muted-foreground hover:text-primary transition-all duration-300 cursor-pointer"
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
                className="p-3 rounded-full border border-black/5 dark:border-white/5 glass hover:bg-zinc-100 dark:hover:bg-zinc-900 text-muted-foreground hover:text-primary transition-all duration-300 cursor-pointer"
                aria-label="Ir a LinkedIn de Marcos"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </Magnetic>
          </motion.div>
        </div>

        {/* Columna Derecha: Esfera Cuántica 3D (Ocupa 5 columnas en lg) */}
        <motion.div
          variants={itemVariants}
          className="lg:col-span-5 w-full h-[320px] sm:h-[400px] lg:h-[450px] flex items-center justify-center relative select-none"
        >
          {/* Orbe de resplandor ambiental localizado detrás de la esfera */}
          <div className="absolute inset-0 bg-primary/10 dark:bg-primary/20 rounded-full blur-[90px] pointer-events-none -z-10" />
          <QuantumSphere />
        </motion.div>
      </motion.div>
    </section>
  );
}
