"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Languages, Kanban, Wind, Layers, Sparkles, Terminal } from "lucide-react";
import { skills, SkillItem } from "@/lib/data";
import { useLanguage } from "@/components/language-provider";
import TechPlayground from "@/components/tech-playground";

// Mapa de íconos vectoriales para habilidades sin archivo de imagen PNG local
const iconFallbackMap: Record<string, React.ComponentType<{ className?: string }>> = {
  next: () => (
    <div className="w-12 h-12 rounded-full bg-zinc-950 text-white flex items-center justify-center font-heading font-extrabold text-lg border border-white/10 shadow-inner">
      N
    </div>
  ),
  tailwind: () => <Wind className="w-8 h-8 text-cyan-400" />,
  trello: () => <Kanban className="w-8 h-8 text-blue-500" />,
  java: () => <Coffee className="w-8 h-8 text-red-500" />,
  english: () => <Languages className="w-8 h-8 text-emerald-500" />,
};

// Mapa de nombres de imagen locales para habilidades que sí tienen archivo PNG
const logoMap: Record<string, string> = {
  react: "/img/skills/react.png",
  javascript: "/img/skills/js.png",
  html: "/img/skills/html.png",
  css: "/img/skills/css.png",
  bootstrap: "/img/skills/btsp.png",
  node: "/img/skills/node.png",
  express: "/img/skills/express.png",
  mongodb: "/img/skills/mongo.png",
  git: "/img/skills/git.png",
  github: "/img/skills/github.png",
};

export default function SkillsGrid() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"Todos" | "Frontend" | "Backend" | "Herramientas" | "Otros">("Todos");

  const categories = ["Todos", "Frontend", "Backend", "Herramientas", "Otros"] as const;

  const categoryLabels: Record<typeof categories[number], string> = {
    Todos: t.portfolio.filters.Todos,
    Frontend: t.skills.categories.Frontend,
    Backend: t.skills.categories.Backend,
    Herramientas: t.skills.categories.Herramientas,
    Otros: t.skills.categories.Otros,
  };

  const filteredSkills = activeTab === "Todos" 
    ? skills 
    : skills.filter((skill) => skill.category === activeTab);

  const getSkillName = (name: string) => {
    if (name === "Inglés (B2)") {
      return `${t.bento.english} (B2)`;
    }
    return name;
  };

  return (
    <section id="skills" className="py-24 px-6 max-w-5xl mx-auto">
      {/* Cabecera */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          {t.skills.tag}
        </span>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground mt-4 mb-3 tracking-tight">
          {t.skills.title}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg mx-auto leading-relaxed font-sans mb-4">
          {t.skills.desc}
        </p>
        <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
      </div>

      {/* Selector de Pestañas (Tabs responsivas) */}
      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl glass border border-black/5 dark:border-white/5 max-w-2xl w-full sm:w-auto">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative px-4 py-2 rounded-xl text-xs font-semibold tracking-wider transition-colors duration-300 w-full sm:w-auto text-center cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {categoryLabels[cat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rejilla de Habilidades con AnimatePresence */}
      <motion.div 
        layout
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5"
      >
        <AnimatePresence mode="popLayout">
          {filteredSkills.map((skill) => {
            const FallbackIcon = iconFallbackMap[skill.icon];
            const logoSrc = logoMap[skill.icon];

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                key={skill.name}
                className="rounded-2xl glass p-5 border border-black/5 dark:border-white/5 flex flex-col items-center justify-center text-center relative overflow-hidden group select-none hover:-translate-y-1.5 hover:bg-zinc-100/50 dark:hover:bg-zinc-900/30 transition-all duration-300"
                style={{
                  "--skill-glow": skill.glowColor,
                } as React.CSSProperties}
              >
                {/* Fondo glow suave con color dinámico */}
                <div
                  className="absolute -inset-10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                  style={{ background: skill.glowColor }}
                />
                {/* Borde glow hover */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 pointer-events-none"
                  style={{
                    border: "1px solid",
                    borderColor: skill.glowColor,
                    boxShadow: `0 0 15px ${skill.glowColor}`,
                  }}
                />

                {/* Renderizar Imagen PNG si existe o Fallback vectorial de Lucide */}
                <div className="w-16 h-16 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  {logoSrc ? (
                    <img
                      src={logoSrc}
                      alt={`Logotipo oficial de ${skill.name}`}
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                    />
                  ) : FallbackIcon ? (
                    <FallbackIcon />
                  ) : (
                    <Terminal className="w-10 h-10 text-primary" />
                  )}
                </div>

                {/* Nombre de Habilidad */}
                <span className="text-xs font-semibold text-foreground tracking-wide mt-1 block">
                  {getSkillName(skill.name)}
                </span>
                
                {/* Categoría técnica en miniatura */}
                <span className="text-[9px] font-bold text-muted-foreground/60 uppercase tracking-widest mt-1 block">
                  {t.skills.categories[skill.category as keyof typeof t.skills.categories]}
                </span>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* 5. Patio de Juegos de Stack Tecnológico (Drag-and-Drop) */}
      <TechPlayground />
    </section>
  );
}
