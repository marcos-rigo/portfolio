"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Calendar, User, Code, Eye, X, Copy, Check, Sparkles } from "lucide-react";
import { projects, ProjectItem } from "@/lib/data";
import { useLanguage } from "@/components/language-provider";

// =========================================================
// 1. WIDGET: VELOCÍMETROS METRICAS LIGHTHOUSE (ESTILO GOOGLE)
// =========================================================
interface LighthouseScoresProps {
  performance?: number;
  t: any;
  locale: string;
}

function LighthouseScores({ performance = 98, t, locale }: LighthouseScoresProps) {
  const categories = [
    { label: locale === "es" ? "Rendimiento" : "Performance", score: performance, color: "stroke-emerald-500 text-emerald-500 dark:stroke-emerald-400 dark:text-emerald-400" },
    { label: locale === "es" ? "Accesibilidad" : "Accessibility", score: 100, color: "stroke-emerald-500 text-emerald-500 dark:stroke-emerald-400 dark:text-emerald-400" },
    { label: locale === "es" ? "Buenas Prácticas" : "Best Practices", score: 100, color: "stroke-emerald-500 text-emerald-500 dark:stroke-emerald-400 dark:text-emerald-400" },
    { label: "SEO", score: 100, color: "stroke-emerald-500 text-emerald-500 dark:stroke-emerald-400 dark:text-emerald-400" },
  ];

  return (
    <div className="flex flex-col gap-3 my-6">
      <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 inline-block w-fit">
        {t.portfolio.modal.qualityTitle}
      </span>
      <div className="grid grid-cols-4 gap-2 sm:gap-4 p-4 bg-zinc-500/5 rounded-2xl border border-black/5 dark:border-white/5 text-center select-none">
        {categories.map((cat, i) => {
          const radius = 14;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (cat.score / 100) * circumference;
          return (
            <div key={i} className="flex flex-col items-center">
              <div className="relative w-11 h-11 sm:w-14 sm:h-14">
                <svg viewBox="0 0 36 36" className="w-full h-full -rotate-90">
                  <circle cx="18" cy="18" r={radius} fill="none" stroke="currentColor" className="text-black/5 dark:text-white/5" strokeWidth="2.5" />
                  <motion.circle
                    cx="18" cy="18" r={radius} fill="none"
                    stroke="currentColor" className={cat.color} strokeWidth="2.5"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: i * 0.15 }}
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-mono text-[9px] sm:text-xs font-extrabold text-foreground">
                  {cat.score}
                </span>
              </div>
              <span className="text-[9px] font-bold text-muted-foreground mt-2 leading-none">{cat.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// =========================================================
// 2. WIDGET: DIAGRAMAS DE ARQUITECTURA TÉCNICA DINÁMICOS
// =========================================================
function TechnicalArchitecture({ projectId, t, locale }: { projectId: string; t: any; locale: string }) {
  if (projectId === "proj-3") {
    // Caso especial MERN Stack (Rolling Cucina)
    return (
      <div className="flex flex-col gap-4 my-6">
        <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 inline-block w-fit">
          {t.portfolio.modal.archTitle}
        </span>
        
        {/* SVG interactivo con flechas de datos animadas */}
        <div className="w-full p-4 bg-black/5 dark:bg-black/45 rounded-2xl border border-black/5 dark:border-white/5 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 200 80" className="w-full max-w-sm text-foreground overflow-visible">
            {/* React Frontend Node */}
            <rect x="5" y="25" width="45" height="30" rx="6" className="fill-zinc-200/50 dark:fill-zinc-900/50 stroke-primary/30" strokeWidth="1" />
            <text x="27.5" y="40" textAnchor="middle" className="font-mono text-[6.5px] font-bold fill-foreground">Client UI</text>
            <text x="27.5" y="48" textAnchor="middle" className="font-mono text-[4.5px] fill-muted-foreground">React / Tailwind</text>
            
            {/* Express Backend Node */}
            <rect x="77.5" y="25" width="45" height="30" rx="6" className="fill-zinc-200/50 dark:fill-zinc-900/50 stroke-accent/30" strokeWidth="1" />
            <text x="100" y="40" textAnchor="middle" className="font-mono text-[6.5px] font-bold fill-foreground">REST API</text>
            <text x="100" y="48" textAnchor="middle" className="font-mono text-[4.5px] fill-muted-foreground">Node.js / Express</text>

            {/* MongoDB Database Node */}
            <rect x="150" y="25" width="45" height="30" rx="6" className="fill-zinc-200/50 dark:fill-zinc-900/50 stroke-emerald-500/30" strokeWidth="1" />
            <text x="172.5" y="40" textAnchor="middle" className="font-mono text-[6.5px] font-bold fill-foreground">Database</text>
            <text x="172.5" y="48" textAnchor="middle" className="font-mono text-[4.5px] fill-muted-foreground">MongoDB Atlas</text>

            {/* Flechas eléctricas de flujo animadas */}
            <path d="M 50 40 L 77.5 40" fill="none" stroke="var(--primary)" strokeWidth="1" className="animate-marquee" />
            <polygon points="77.5,40 73.5,38 73.5,42" fill="var(--primary)" />

            <path d="M 122.5 40 L 150 40" fill="none" stroke="var(--accent)" strokeWidth="1" className="animate-marquee" />
            <polygon points="150,40 146,38 146,42" fill="var(--accent)" />
          </svg>
        </div>

        {/* Modelo de base de datos NoSQL simulado */}
        <div className="flex flex-col gap-2.5">
          <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">{t.portfolio.modal.dbTitle}</span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] font-mono p-3 bg-black/5 dark:bg-black/35 rounded-xl border border-black/5 dark:border-white/5">
            <div className="flex flex-col gap-1 p-2 rounded-lg bg-zinc-500/5 border border-black/5 dark:border-white/5">
              <strong className="text-foreground border-b border-black/10 dark:border-white/10 pb-1 flex items-center gap-1">👥 Users Collection</strong>
              <span className="text-muted-foreground text-[9px]">- id: ObjectId</span>
              <span className="text-muted-foreground text-[9px]">- name: String</span>
              <span className="text-muted-foreground text-[9px]">- email: String (Unique)</span>
              <span className="text-muted-foreground text-[9px]">- role: Enum ["admin", "client"]</span>
            </div>
            <div className="flex flex-col gap-1 p-2 rounded-lg bg-zinc-500/5 border border-black/5 dark:border-white/5">
              <strong className="text-foreground border-b border-black/10 dark:border-white/10 pb-1 flex items-center gap-1">🍕 Products Collection</strong>
              <span className="text-muted-foreground text-[9px]">- id: ObjectId</span>
              <span className="text-muted-foreground text-[9px]">- title: String</span>
              <span className="text-muted-foreground text-[9px]">- price: Number</span>
              <span className="text-muted-foreground text-[9px]">- active: Boolean</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Diagrama estándar para proyectos HTML5/SCSS estáticos (Farhat, Mesa Federal)
  return (
    <div className="flex flex-col gap-4 my-6">
      <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 inline-block w-fit">
        {locale === "es" ? "Arquitectura del Sitio (Jamstack Estático)" : "Site Architecture (Static Jamstack)"}
      </span>
      
      {/* SVG de compilador de activos y entrega en Edge */}
      <div className="w-full p-4 bg-black/5 dark:bg-black/45 rounded-2xl border border-black/5 dark:border-white/5 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 200 80" className="w-full max-w-sm text-foreground overflow-visible">
          {/* Activos Origen */}
          <rect x="5" y="25" width="45" height="30" rx="6" className="fill-zinc-200/50 dark:fill-zinc-900/50 stroke-primary/30" strokeWidth="1" />
          <text x="27.5" y="40" textAnchor="middle" className="font-mono text-[6.5px] font-bold fill-foreground">Source Assets</text>
          <text x="27.5" y="48" textAnchor="middle" className="font-mono text-[4.5px] fill-muted-foreground">SCSS / JS / HTML</text>
          
          {/* Gulp Compiler Node */}
          <rect x="77.5" y="25" width="45" height="30" rx="6" className="fill-zinc-200/50 dark:fill-zinc-900/50 stroke-accent/30" strokeWidth="1" />
          <text x="100" y="40" textAnchor="middle" className="font-mono text-[6.5px] font-bold fill-foreground">Build Pipeline</text>
          <text x="100" y="48" textAnchor="middle" className="font-mono text-[4.5px] fill-muted-foreground">Gulp Compiler</text>

          {/* Static Deploy Node */}
          <rect x="150" y="25" width="45" height="30" rx="6" className="fill-zinc-200/50 dark:fill-zinc-900/50 stroke-emerald-500/30" strokeWidth="1" />
          <text x="172.5" y="40" textAnchor="middle" className="font-mono text-[6.5px] font-bold fill-foreground">Production</text>
          <text x="172.5" y="48" textAnchor="middle" className="font-mono text-[4.5px] fill-muted-foreground">CDN Edge Hosting</text>

          {/* Flechas eléctricas de flujo animadas */}
          <path d="M 50 40 L 77.5 40" fill="none" stroke="var(--primary)" strokeWidth="1" className="animate-marquee" />
          <polygon points="77.5,40 73.5,38 73.5,42" fill="var(--primary)" />

          <path d="M 122.5 40 L 150 40" fill="none" stroke="var(--accent)" strokeWidth="1" className="animate-marquee" />
          <polygon points="150,40 146,38 146,42" fill="var(--accent)" />
        </svg>
      </div>

      {/* Caching y distribución en Edge */}
      <div className="flex flex-col gap-2.5">
        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
          {locale === "es" ? "Optimización de Despliegue en Edge" : "Edge Deployment Optimization"}
        </span>
        <div className="text-[10px] font-sans p-3.5 bg-black/5 dark:bg-black/35 rounded-xl border border-black/5 dark:border-white/5 leading-relaxed text-muted-foreground/90">
          <div className="flex items-center gap-1.5 text-foreground mb-1.5 font-bold">
            {t.portfolio.modal.edgeTitle}
          </div>
          <p className="text-[10px] leading-relaxed">
            {t.portfolio.modal.edgeDesc}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PortfolioDeck() {
  const { locale, t } = useLanguage();
  const [filter, setFilter] = useState<"Todos" | "Fullstack" | "Gulp">("Todos");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [copied, setCopied] = useState(false);

  const filterCategories = ["Todos", "Fullstack", "Gulp"] as const;

  const filterLabels: Record<typeof filterCategories[number], string> = {
    Todos: t.portfolio.filters.Todos,
    Fullstack: t.portfolio.filters.Fullstack,
    Gulp: t.portfolio.filters.Gulp,
  };

  const filteredProjects = projects.filter((proj) => {
    if (filter === "Todos") return true;
    if (filter === "Fullstack") return proj.stack.includes("React") || proj.stack.includes("MongoDB");
    if (filter === "Gulp") return proj.stack.includes("Gulp");
    return true;
  });

  const handleCopyCredentials = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <section id="portfolio" className="py-24 px-6 max-w-5xl mx-auto">
      {/* Cabecera de Sección */}
      <div className="text-center mb-16">
        <span className="text-xs font-bold uppercase tracking-widest text-primary px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
          {t.portfolio.tag}
        </span>
        <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-foreground mt-4 mb-3 tracking-tight">
          {t.portfolio.title}
        </h2>
        <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-lg mx-auto leading-relaxed font-sans mb-4">
          {t.portfolio.desc}
        </p>
        <div className="w-12 h-1 bg-primary rounded-full mx-auto" />
      </div>

      {/* Categorías de Filtro */}
      <div className="flex justify-center mb-12">
        <div className="flex items-center gap-1 p-1 rounded-2xl glass border border-black/5 dark:border-white/5">
          {filterCategories.map((cat) => {
            const isActive = filter === cat;
            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`relative px-5 py-2 rounded-xl text-xs font-bold tracking-wide transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "text-white dark:text-zinc-950"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activePortfolioBackground"
                    className="absolute inset-0 bg-primary rounded-xl -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {filterLabels[cat]}
              </button>
            );
          })}
        </div>
      </div>

      {/* Rejilla de Proyectos con Animaciones */}
      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((proj) => {
            const translatedTitle = t.portfolio.items[proj.id]?.title || proj.title;
            const translatedDesc = t.portfolio.items[proj.id]?.description || proj.description;

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                key={proj.id}
                className="rounded-3xl glass border border-black/5 dark:border-white/5 gradient-border-card overflow-hidden flex flex-col group hover:-translate-y-2 hover:shadow-xl hover:border-primary/20 transition-all duration-300"
              >
                {/* Imagen del Proyecto */}
                <div className="relative h-48 w-full overflow-hidden border-b border-black/5 dark:border-white/5">
                  <img
                    src={proj.image}
                    alt={`Captura de pantalla de ${translatedTitle}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  
                  {/* Overlay de acciones rápidas */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
                    <button
                      onClick={() => setSelectedProject(proj)}
                      className="p-3.5 rounded-full bg-white text-zinc-950 shadow-md hover:bg-primary hover:text-white transform scale-90 group-hover:scale-100 transition-all duration-300 cursor-pointer"
                      title={locale === "es" ? "Ver Detalles Completos" : "View Full Details"}
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <a
                      href={proj.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3.5 rounded-full bg-white text-zinc-950 shadow-md hover:bg-primary hover:text-white transform scale-90 group-hover:scale-100 transition-all duration-300 cursor-pointer"
                      title={locale === "es" ? "Visitar Sitio Web" : "Visit Live Website"}
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Contenido de la Tarjeta */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Badges de stack */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {proj.stack.slice(0, 3).map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-zinc-200/50 dark:bg-zinc-800/40 text-[9px] font-bold text-muted-foreground/80 tracking-wide uppercase border border-black/[0.03] dark:border-white/[0.03]">
                          {s}
                        </span>
                      ))}
                      {proj.stack.length > 3 && (
                        <span className="px-2 py-0.5 rounded-md bg-zinc-200/50 dark:bg-zinc-800/40 text-[9px] font-bold text-muted-foreground/80 tracking-wide">
                          +{proj.stack.length - 3}
                        </span>
                      )}
                    </div>

                    {/* Título de Proyecto */}
                    <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                      {translatedTitle}
                    </h3>

                    {/* Breve descripción */}
                    <p className="text-xs text-muted-foreground/80 line-clamp-3 leading-relaxed mb-4 font-sans">
                      {translatedDesc}
                    </p>
                  </div>

                  {/* Enlace a Detalle modal */}
                  <button
                    onClick={() => setSelectedProject(proj)}
                    className="flex items-center gap-1.5 text-xs font-bold text-primary mt-2 group-hover:translate-x-1.5 transition-transform duration-300 w-fit text-left cursor-pointer"
                  >
                    <span>{locale === "es" ? "Explorar detalles" : "Explore details"}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Modal de Detalle Enriquecido con AnimatePresence */}
      <AnimatePresence>
        {selectedProject && (() => {
          const translatedModalTitle = t.portfolio.items[selectedProject.id]?.title || selectedProject.title;
          const translatedModalClient = t.portfolio.items[selectedProject.id]?.client || selectedProject.client;
          const translatedModalDesc = t.portfolio.items[selectedProject.id]?.description || selectedProject.description;

          return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
              {/* Fondo desenfocado del modal */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedProject(null)}
                className="absolute inset-0 bg-black/55 dark:bg-black/75 backdrop-blur-[6px]"
              />

              {/* Caja del Modal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="w-full max-w-2xl max-h-[90vh] rounded-3xl glass border border-black/5 dark:border-white/5 shadow-2xl overflow-y-auto z-10 custom-scrollbar flex flex-col relative"
              >
                {/* Botón de cerrar */}
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 rounded-full glass hover:bg-zinc-200/50 dark:hover:bg-zinc-800/50 text-foreground transition-colors duration-300 z-20 cursor-pointer"
                  aria-label="Cerrar modal"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Encabezado con imagen */}
                <div className="relative h-64 w-full shrink-0 overflow-hidden border-b border-black/5 dark:border-white/5">
                  <img
                    src={selectedProject.image}
                    alt={translatedModalTitle}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <div>
                      <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                        {translatedModalTitle}
                      </h3>
                    </div>
                  </div>
                </div>

                {/* Cuerpo de Especificaciones */}
                <div className="p-6 sm:p-8 flex-1">
                  {/* Datos rápidos en grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6 pt-2 pb-6 border-b border-black/5 dark:border-white/5 text-xs text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary shrink-0" />
                      <span>
                        <strong className="text-foreground">{t.portfolio.modal.client}</strong> {translatedModalClient}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary shrink-0" />
                      <span>
                        <strong className="text-foreground">{t.portfolio.modal.date}</strong> {selectedProject.date}
                      </span>
                    </div>
                  </div>

                  {/* Descripción larga */}
                  <div className="mb-6 font-sans">
                    <h4 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider mb-2">
                      {t.portfolio.modal.about}
                    </h4>
                    <p className="text-sm text-muted-foreground/90 leading-relaxed">
                      {translatedModalDesc}
                    </p>
                  </div>

                  {/* Métricas de Calidad Lighthouse */}
                  <LighthouseScores performance={selectedProject.id === "proj-3" ? 98 : 99} t={t} locale={locale} />

                  {/* Arquitectura de Ingeniería */}
                  <TechnicalArchitecture projectId={selectedProject.id} t={t} locale={locale} />

                  {/* Tecnologías utilizadas */}
                  <div className="mb-6">
                    <h4 className="font-heading font-bold text-foreground text-sm uppercase tracking-wider mb-3 flex items-center gap-1.5">
                      <Code className="w-4 h-4 text-primary" />
                      {t.portfolio.modal.stack}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.stack.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 rounded-xl bg-zinc-200/50 dark:bg-zinc-800/40 text-xs font-semibold text-foreground border border-black/[0.05] dark:border-white/[0.05]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Credenciales de Prueba (si existen, ej. Rolling Cucina) */}
                  {selectedProject.credentials && (
                    <div className="mb-8 p-4 rounded-2xl bg-primary/10 border border-primary/20">
                      <h4 className="font-heading font-bold text-primary text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        {t.portfolio.modal.demo}
                      </h4>
                      <p className="text-xs text-muted-foreground/80 leading-relaxed mb-3">
                        {t.portfolio.modal.demoDesc}
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 justify-between items-start sm:items-center p-3 rounded-xl bg-zinc-200/25 dark:bg-zinc-900/35 border border-black/5 dark:border-white/5">
                        <code className="text-xs font-mono text-foreground break-all select-all">
                          {selectedProject.credentials}
                        </code>
                        <button
                          onClick={() => handleCopyCredentials(selectedProject.credentials || "")}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-bold text-[10px] uppercase tracking-wide shrink-0 transition-colors duration-300 w-full sm:w-auto mt-2 sm:mt-0 justify-center cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>{t.portfolio.modal.copied}</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>{t.portfolio.modal.copy}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Acciones principales */}
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-primary text-white font-bold text-sm shadow-md hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                    >
                      <span>{t.portfolio.modal.visit}</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                    <button
                      onClick={() => setSelectedProject(null)}
                      className="px-6 py-3 rounded-full border border-black/5 dark:border-white/5 glass hover:bg-zinc-100 dark:hover:bg-zinc-900 font-bold text-sm hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                    >
                      {t.portfolio.modal.close}
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          );
        })()}
      </AnimatePresence>
    </section>
  );
}
