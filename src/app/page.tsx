"use client";

import React from "react";
import dynamic from "next/dynamic";
import { motion, MotionConfig } from "framer-motion";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import AboutBento from "@/components/about-bento";
import ExperienceTimeline from "@/components/experience-timeline";
import SkillsGrid from "@/components/skills-grid";
import PortfolioDeck from "@/components/portfolio-deck";
import ContactForm from "@/components/contact-form";
import Footer from "@/components/footer";
import CommandMenu from "@/components/command-menu";

// Puramente decorativos: se cargan en el cliente sin bloquear el first paint ni el SSR del contenido.
const CanvasBackground = dynamic(() => import("@/components/canvas-background"), { ssr: false });

export default function Home() {
  return (
    <main className="relative flex flex-col min-h-screen">
      <MotionConfig reducedMotion="user">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-full flex flex-col"
      >
        {/* 1. Fondo Interactivo en Tiempo Real con Orbes Líquidos */}
        <CanvasBackground />

        {/* 2. Barra de Navegación Flotante Glassmorphic */}
        <Navbar />

        {/* 3. Menú de Comandos Interactivos (⌘K / Ctrl+K) */}
        <CommandMenu />

        {/* 4. Estructura de Secciones Principales */}
        <div className="relative z-10 w-full flex flex-col">
          {/* Presentación Principal (Hero) */}
          <Hero />

          {/* Rejilla Modular Acerca de Mí (Bento Grid) */}
          <AboutBento />

          {/* Línea de Tiempo de Experiencia con Inclinación 3D */}
          <ExperienceTimeline />

          {/* Rejilla de Tecnologías y Habilidades con Filtro en Caliente */}
          <SkillsGrid />

          {/* Galería Premium de Proyectos y Casos de Éxito */}
          <PortfolioDeck />

          {/* Panel de Contacto y Formulario con Lluvia de Confeti */}
          <ContactForm />
        </div>

        {/* 5. Footer full-bleed con navegación, contacto y detalle técnico */}
        <Footer />
      </motion.div>
      </MotionConfig>
    </main>
  );
}

