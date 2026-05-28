"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CanvasBackground from "@/components/canvas-background";
import Navbar from "@/components/navbar";
import Hero from "@/components/hero";
import AboutBento from "@/components/about-bento";
import ExperienceTimeline from "@/components/experience-timeline";
import SkillsGrid from "@/components/skills-grid";
import PortfolioDeck from "@/components/portfolio-deck";
import ContactForm from "@/components/contact-form";
import CommandMenu from "@/components/command-menu";
import Loader from "@/components/loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="relative flex flex-col min-h-screen">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <Loader key="loader" onComplete={() => setIsLoading(false)} />
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
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
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

