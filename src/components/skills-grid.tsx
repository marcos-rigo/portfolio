"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Coffee, Languages, Kanban, Wind, Layers, Sparkles, Terminal } from "lucide-react";
import { skills, SkillItem } from "@/lib/data";
import { useLanguage } from "@/components/language-provider";
import TechPlayground from "@/components/tech-playground";
import SectionHeading from "@/components/section-heading";

// Mapa de íconos vectoriales para habilidades sin archivo de imagen PNG local
const iconFallbackMap: Record<string, React.ComponentType<{ className?: string }>> = {
  next: () => (
    <div className="w-14 h-14 rounded-full bg-zinc-950 text-white flex items-center justify-center font-heading font-extrabold text-xl border border-white/10 shadow-inner">
      N
    </div>
  ),
  tailwind: () => <Wind className="w-10 h-10 text-cyan-400" />,
  trello: () => <Kanban className="w-10 h-10 text-blue-500" />,
  java: () => <Coffee className="w-10 h-10 text-red-500" />,
  english: () => <Languages className="w-10 h-10 text-emerald-500" />,
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
    <section id="skills" className="py-24 container-wide section-surface section-surface-b">
      {/* Cabecera */}
      <SectionHeading tag={t.skills.tag} title={t.skills.title} description={t.skills.desc} />

      {/* Selector de Pestañas (Tabs responsivas) */}
      <div className="flex justify-center mb-12">
        <div className="flex flex-wrap items-center justify-center gap-1.5 p-1 rounded-2xl bg-card border border-border max-w-2xl w-full sm:w-auto">
          {categories.map((cat) => {
            const isActive = activeTab === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative px-4 py-2 rounded-xl text-sm font-semibold tracking-wider transition-colors duration-300 w-full sm:w-auto text-center cursor-pointer ${
                  isActive
                    ? "text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeTabBackground"
                    className="absolute inset-0 bg-primary rounded-xl z-0 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{categoryLabels[cat]}</span>
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
          {filteredSkills.map((skill, idx) => {
            const FallbackIcon = iconFallbackMap[skill.icon];
            const logoSrc = logoMap[skill.icon];
            const isNavy = idx % 2 === 0;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                key={skill.name}
                className={`rounded-2xl p-6 border flex flex-col items-center justify-center text-center relative overflow-hidden group select-none hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 ${
                  isNavy
                    ? "bg-[var(--navy-mid)] dark:bg-[var(--navy-deep)] border-transparent shadow-md"
                    : "bg-card border-primary/40 hover:border-primary shadow-sm"
                }`}
              >
                {/* Renderizar Imagen PNG si existe o Fallback vectorial de Lucide */}
                <div className="w-20 h-20 flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                  {logoSrc ? (
                    <Image
                      src={logoSrc}
                      alt={`Logotipo oficial de ${skill.name}`}
                      width={56}
                      height={56}
                      className="w-14 h-14 object-contain"
                    />
                  ) : FallbackIcon ? (
                    <FallbackIcon />
                  ) : (
                    <Terminal className={`w-12 h-12 ${isNavy ? "text-[var(--accent)]" : "text-primary"}`} />
                  )}
                </div>

                {/* Nombre de Habilidad */}
                <span className={`text-base font-semibold tracking-wide mt-1 block ${isNavy ? "text-white" : "text-foreground"}`}>
                  {getSkillName(skill.name)}
                </span>

                {/* Categoría técnica en miniatura */}
                <span className={`text-sm font-bold uppercase tracking-widest mt-1 block ${isNavy ? "text-white/60" : "text-muted-foreground"}`}>
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
