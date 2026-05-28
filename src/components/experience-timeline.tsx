"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, ChevronRight } from "lucide-react";
import { experiences, ExperienceItem } from "@/lib/data";
import { use3DTilt } from "@/hooks/use-3d-tilt";
import { useLanguage } from "@/components/language-provider";

interface TiltCardProps {
  experience: ExperienceItem;
  index: number;
}

function TiltCard({ experience, index }: TiltCardProps) {
  const tilt = use3DTilt(8);
  const { t } = useLanguage();
  const isEven = index % 2 === 0;

  const trans = t.experience.items[experience.id] || {
    role: experience.role,
    company: experience.company,
    description: experience.description
  };

  return (
    <motion.div
      initial={{ x: isEven ? -50 : 50, opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut", delay: index * 0.1 }}
      className={`flex flex-col md:flex-row items-center w-full mb-12 last:mb-0 relative ${
        isEven ? "md:flex-row-reverse" : ""
      }`}
    >
      {/* Marcador Central del Eje */}
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/25 dark:bg-primary/20 border border-primary flex items-center justify-center z-10 shadow-md">
        <div className="w-3.5 h-3.5 rounded-full bg-primary" />
      </div>

      {/* Caja de la Experiencia con Efecto 3D Tilt */}
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? "md:pr-10" : "md:pl-10"}`}>
        <motion.div
          ref={tilt.ref}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          style={{
            ...tilt.style,
          }}
          className="rounded-3xl glass p-6 sm:p-8 border border-black/5 dark:border-white/5 gradient-border-card relative group cursor-default shadow-md hover:shadow-xl hover:border-primary/25 transition-all duration-300 select-none overflow-hidden"
        >
          {/* Destello luminoso de fondo */}
          <div className="absolute -top-32 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl pointer-events-none group-hover:bg-primary/10 transition-all duration-500" />
          
          <div className="flex flex-col gap-3">
            {/* Cabecera de la Tarjeta */}
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-primary">
              <Calendar className="w-3.5 h-3.5" />
              <span>{experience.period}</span>
            </div>

            {/* Rol profesional */}
            <h4 className="font-heading font-bold text-xl text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
              {trans.role}
            </h4>

            {/* Empresa/Institución */}
            <span className="text-xs font-medium text-muted-foreground/80 leading-snug">
              {trans.company}
            </span>

            {/* Descripción responsiva */}
            <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed font-sans mt-2">
              {trans.description}
            </p>

            {/* Detalle visual sutil */}
            <div className="flex items-center gap-1.5 text-xs text-primary font-bold mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>{t.experience.detailsLabel}</span>
              <ChevronRight className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Espacio invisible del otro lado en escritorio para mantener el balance */}
      <div className="hidden md:block md:w-[45%]" />
    </motion.div>
  );
}

export default function ExperienceTimeline() {
  const { t } = useLanguage();

  return (
    <section id="experience" className="py-24 px-6 max-w-5xl mx-auto relative">
      {/* Título de la Sección */}
      <div className="text-center mb-16 relative">
        <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          {t.experience.tag}
        </span>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground mt-4 mb-3 tracking-tight">
          {t.experience.title}
        </h2>
        <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
      </div>

      {/* Contenedor de la línea de tiempo */}
      <div className="relative mt-12 pl-4 md:pl-0">
        {/* Eje de la línea vertical */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-gradient-to-b from-primary via-primary/30 to-transparent" />

        {/* Mapeo de experiencias */}
        <div className="flex flex-col">
          {experiences.map((exp, idx) => (
            <TiltCard key={exp.id} experience={exp} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
