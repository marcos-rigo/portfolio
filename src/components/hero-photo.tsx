"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Code2, Terminal } from "lucide-react";
import { use3DTilt } from "@/hooks/use-3d-tilt";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

export default function HeroPhoto() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const { ref, onMouseMove, onMouseLeave, style } = use3DTilt(8);

  return (
    <motion.div
      ref={ref}
      onMouseMove={prefersReducedMotion ? undefined : onMouseMove}
      onMouseLeave={prefersReducedMotion ? undefined : onMouseLeave}
      style={prefersReducedMotion ? undefined : style}
      className="relative w-[220px] h-[220px] sm:w-[280px] sm:h-[280px] lg:w-[320px] lg:h-[320px] select-none [perspective:1000px]"
    >
      {/* Resplandor ambiental que respira detrás del marco */}
      {!prefersReducedMotion && (
        <div className="absolute inset-[-22%] rounded-full bg-primary/20 dark:bg-primary/25 blur-[48px] animate-hero-breathe pointer-events-none" />
      )}

      {/* Anillo exterior de borde degradado (navy -> rojo -> dorado), rotación lenta */}
      <div
        className={`hero-photo-ring ${!prefersReducedMotion ? "animate-hero-ring-spin" : ""}`}
      />

      {/* Anillo fino dorado de detalle */}
      <div className="absolute inset-[-4px] rounded-full border border-accent/50 pointer-events-none" />

      {/* Marco de la foto con relieve (sombra exterior + sombra interna) */}
      <div className="absolute inset-0 rounded-full overflow-hidden ring-4 ring-background shadow-[0_20px_50px_-12px_rgba(22,53,92,0.35),0_0_0_1px_rgba(22,53,92,0.06)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)]">
        <div className="absolute inset-0 rounded-full shadow-[inset_0_3px_10px_rgba(0,0,0,0.18)] z-10 pointer-events-none" />
        <Image
          src="/img/foto-perfil.jpeg"
          alt="Foto de perfil de Marcos Rigo"
          fill
          priority
          quality={95}
          // Pide una imagen más grande que el box en CSS: el frame se
          // escala hasta ~1.28x con el zoom por scroll, y sin este margen
          // el navegador ampliaba una versión ya reducida y se veía borrosa.
          sizes="(min-width: 1024px) 420px, (min-width: 640px) 360px, 300px"
          className="object-cover"
          style={{ objectPosition: "50% 30%" }}
        />
      </div>

      {/* Elementos flotantes decorativos */}
      {!prefersReducedMotion && (
        <>
          <div
            className="absolute -top-2 -right-3 w-10 h-10 rounded-2xl bg-card border border-border shadow-md flex items-center justify-center text-primary animate-hero-float"
            style={{ animationDelay: "0s" }}
          >
            <Code2 className="w-4 h-4" aria-hidden="true" />
          </div>
          <div
            className="absolute bottom-3 -left-5 w-9 h-9 rounded-full bg-card border border-border shadow-md flex items-center justify-center text-accent-foreground animate-hero-float"
            style={{ animationDelay: "1.1s" }}
          >
            <Terminal className="w-4 h-4" aria-hidden="true" />
          </div>
          <div
            className="absolute top-1/2 -right-6 w-2.5 h-2.5 rounded-full bg-accent animate-hero-float"
            style={{ animationDelay: "0.6s" }}
          />
        </>
      )}
    </motion.div>
  );
}
