"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, RefreshCw, Cpu, Award, CheckCircle2, ChevronRight, Zap } from "lucide-react";
import { skills, projects, ProjectItem, SkillItem } from "@/lib/data";
import { useLanguage } from "@/components/language-provider";

export default function TechPlayground() {
  const { locale, t } = useLanguage();
  const [selectedTechs, setSelectedTechs] = useState<string[]>([]);
  const [scanning, setScanning] = useState(false);
  const [analysisLog, setAnalysisLog] = useState<string[]>([]);
  const [celebrateProject, setCelebrateProject] = useState<string | null>(null);
  
  const dropZoneRef = useRef<HTMLDivElement>(null);

  // Textos traducidos localmente
  const uiTexts = {
    es: {
      title: "Patio de Juegos de Stack Tecnológico",
      subtitle: "Arrastra habilidades a la cámara cuántica o haz clic para escanear y analizar la compatibilidad en tiempo real con mis proyectos.",
      scannerTitle: "CÁMARA DE ESCANEO HOLOGRÁFICA",
      scannerHint: "Suelta las tecnologías aquí para escanear",
      scannerHintMobile: "O presiona las tarjetas para alternarlas",
      reportTitle: "REPORTE DE COMPATIBILIDAD EN VIVO",
      systemOnline: "SISTEMA CUÁNTICO ONLINE. ESPERANDO INPUT...",
      matchingProjects: "Proyectos Compatibles:",
      noMatches: "Ningún proyecto coincide con esta combinación.",
      matchSuccess: "¡COMPATIBILIDAD ABSOLUTA DEL STACK!",
      resetBtn: "Reiniciar Cámara",
      scanActive: "Escaneando...",
      techStack: "Stack requerido",
      matchProgress: "Coincidencia",
    },
    en: {
      title: "Tech Stack Playground",
      subtitle: "Drag skills into the quantum chamber or click to scan and analyze real-time compatibility with my engineering projects.",
      scannerTitle: "HOLOGRAPHIC SCANNER CHAMBER",
      scannerHint: "Drop technologies here to scan",
      scannerHintMobile: "Or tap on the cards to toggle them",
      reportTitle: "LIVE COMPATIBILITY REPORT",
      systemOnline: "QUANTUM SYSTEM ONLINE. WAITING FOR INPUT...",
      matchingProjects: "Compatible Projects:",
      noMatches: "No projects match this technology combination.",
      matchSuccess: "ABSOLUTE STACK COMPATIBILITY!",
      resetBtn: "Reset Chamber",
      scanActive: "Scanning...",
      techStack: "Required Stack",
      matchProgress: "Match",
    }
  };

  const texts = uiTexts[locale === "es" ? "es" : "en"];

  // Manejar el toggle de selección de tecnologías (clic o drop)
  const toggleTech = (techName: string) => {
    setScanning(true);
    setTimeout(() => setScanning(false), 600);

    setSelectedTechs((prev) => {
      const exists = prev.includes(techName);
      let next: string[];
      if (exists) {
        next = prev.filter((t) => t !== techName);
        addLog(`System: Removed [${techName}] from analysis core.`);
      } else {
        next = [...prev, techName];
        addLog(`System: Scanned [${techName}]. Parsing abstract syntax trees...`);
      }
      return next;
    });
  };

  // Función para agregar logs en la mini consola del playground
  const addLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString(locale === "es" ? "es-AR" : "en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    setAnalysisLog((prev) => [`[${timestamp}] ${message}`, ...prev.slice(0, 8)]);
  };

  // Reiniciar todo
  const handleReset = () => {
    setSelectedTechs([]);
    setAnalysisLog([]);
    setCelebrateProject(null);
    addLog("System: Chamber cleared. Ready for next sequence.");
  };

  // Detección de colisión de coordenadas al soltar el drag
  const handleDragEnd = (event: any, info: any, techName: string) => {
    if (!dropZoneRef.current) return;
    const rect = dropZoneRef.current.getBoundingClientRect();
    const x = info.point.x;
    const y = info.point.y;

    // Verificar si el puntero se liberó dentro del área del escáner
    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      if (!selectedTechs.includes(techName)) {
        toggleTech(techName);
      } else {
        addLog(`Chamber: [${techName}] is already loaded in the scanner.`);
      }
    }
  };

  // Calcular compatibilidad con proyectos
  const projectMatches = projects.map((project) => {
    // Normalizar nombres para comparación tolerante
    const required = project.stack;
    const matched = required.filter((tech) => 
      selectedTechs.some((sel) => sel.toLowerCase().includes(tech.toLowerCase()) || tech.toLowerCase().includes(sel.toLowerCase()))
    );
    
    const percentage = required.length > 0 
      ? Math.round((matched.length / required.length) * 100) 
      : 0;

    return {
      project,
      matched,
      percentage,
      totalRequired: required.length
    };
  }).filter(item => item.percentage > 0)
    .sort((a, b) => b.percentage - a.percentage);

  // Detectar si algún proyecto alcanza el 100% de match para celebrar
  useEffect(() => {
    const perfectMatch = projectMatches.find(item => item.percentage === 100);
    if (perfectMatch) {
      if (celebrateProject !== perfectMatch.project.title) {
        setCelebrateProject(perfectMatch.project.title);
        addLog(`MATCH ALERT: Absolute compatibility achieved with [${perfectMatch.project.title}]!`);
      }
    } else {
      setCelebrateProject(null);
    }
  }, [selectedTechs]);

  // Logo fallback similar al de SkillsGrid para consistencia
  const getIconColor = (category: string) => {
    if (category === "Frontend") return "text-cyan-400";
    if (category === "Backend") return "text-emerald-400";
    if (category === "Herramientas") return "text-purple-400";
    return "text-red-400";
  };

  return (
    <div className="mt-20 pt-16 border-t border-black/5 dark:border-white/5 w-full">
      <div className="text-center mb-12">
        <h3 className="font-heading font-bold text-2xl sm:text-3xl text-foreground flex items-center justify-center gap-2">
          <Cpu className="w-6 h-6 text-primary animate-pulse" />
          {texts.title}
        </h3>
        <p className="text-xs sm:text-sm text-muted-foreground/80 max-w-2xl mx-auto mt-2 leading-relaxed">
          {texts.subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* PANEL IZQUIERDO: Estantería de tecnologías disponibles (4 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between rounded-3xl glass p-6 border border-black/5 dark:border-white/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-primary/2 -z-10" />
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-primary uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
              {locale === "es" ? "TECNOLOGÍAS SELECCIONABLES" : "DRAGGABLE TECH SHELF"}
            </div>

            <div className="flex flex-wrap gap-2.5">
              {skills.map((skill) => {
                const isSelected = selectedTechs.includes(skill.name);
                return (
                  <motion.div
                    key={skill.name}
                    drag
                    dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                    dragElastic={0.6}
                    dragTransition={{ bounceStiffness: 400, bounceDamping: 25 }}
                    onDragEnd={(e, info) => handleDragEnd(e, info, skill.name)}
                    whileDrag={{ scale: 1.15, zIndex: 100, cursor: "grabbing" }}
                    onClick={() => toggleTech(skill.name)}
                    className={`px-3 py-2 rounded-xl border text-xs font-semibold font-sans tracking-wide cursor-grab active:cursor-grabbing select-none flex items-center gap-2 transition-all duration-300 ${
                      isSelected
                        ? "bg-primary/20 text-primary border-primary shadow-[0_0_12px_rgba(var(--primary-rgb),0.2)]"
                        : "bg-zinc-200/40 dark:bg-zinc-800/30 border-black/5 dark:border-white/5 hover:border-zinc-400 dark:hover:border-zinc-700 hover:bg-zinc-200/70 dark:hover:bg-zinc-800/60"
                    }`}
                    style={{
                      boxShadow: isSelected ? `0 0 10px ${skill.glowColor}` : "none"
                    }}
                  >
                    <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-primary" : "bg-zinc-400 dark:bg-zinc-600"}`} />
                    {skill.name}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Mini Log Terminal de Análisis */}
          <div className="mt-8 pt-4 border-t border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2 text-[10px] font-mono font-bold tracking-widest text-muted-foreground uppercase mb-3">
              <Terminal className="w-3 h-3" />
              ANALYSIS CORE MONITOR
            </div>
            <div className="bg-[#050505] rounded-xl p-3 border border-white/5 font-mono text-[9px] text-zinc-400 h-28 overflow-y-auto flex flex-col gap-1 select-none">
              <AnimatePresence>
                {analysisLog.length === 0 ? (
                  <span className="text-zinc-600 opacity-60 text-center block mt-6">
                    {texts.systemOnline}
                  </span>
                ) : (
                  analysisLog.map((log, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      className={log.includes("ALERT") ? "text-primary font-bold" : ""}
                    >
                      {log}
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* PANEL CENTRAL: Cámara Cuántica de Escaneo (4 cols) */}
        <div className="lg:col-span-3 flex flex-col items-center justify-between rounded-3xl glass p-6 border border-black/5 dark:border-white/5 relative overflow-hidden text-center">
          <div 
            ref={dropZoneRef}
            className={`w-full h-full min-h-[300px] flex flex-col items-center justify-center border-2 border-dashed rounded-2xl p-4 transition-all duration-500 relative overflow-hidden select-none ${
              scanning 
                ? "border-primary bg-primary/5 shadow-[inset_0_0_20px_rgba(var(--primary-rgb),0.1)]"
                : selectedTechs.length > 0
                ? "border-primary/40 bg-zinc-200/10 dark:bg-zinc-900/10"
                : "border-zinc-300 dark:border-zinc-800 bg-zinc-200/5 dark:bg-zinc-900/5 hover:border-zinc-400 dark:hover:border-zinc-700"
            }`}
          >
            {/* Escáner Holográfico - Línea Láser Dinámica */}
            <AnimatePresence>
              {(scanning || selectedTechs.length > 0) && (
                <motion.div
                  initial={{ top: "0%" }}
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="absolute left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent z-10 filter drop-shadow-[0_0_6px_var(--primary)]"
                />
              )}
            </AnimatePresence>

            {/* Rejilla de Fondo del Escáner */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:1.2rem_1.2rem] pointer-events-none" />

            <div className="relative z-10 flex flex-col items-center">
              <Cpu className={`w-12 h-12 mb-4 text-primary transition-transform duration-500 ${scanning ? "rotate-180 scale-110" : ""}`} />
              <h4 className="font-heading text-xs font-bold uppercase tracking-widest text-foreground mb-1">
                {texts.scannerTitle}
              </h4>
              
              {selectedTechs.length === 0 ? (
                <div className="mt-4 flex flex-col items-center">
                  <p className="text-[10px] text-muted-foreground/70 font-medium px-4">
                    {texts.scannerHint}
                  </p>
                  <p className="text-[9px] text-primary/50 font-bold uppercase tracking-wide mt-2 font-mono">
                    {texts.scannerHintMobile}
                  </p>
                </div>
              ) : (
                <div className="mt-4 flex flex-wrap justify-center gap-1.5 max-h-[160px] overflow-y-auto px-2">
                  <AnimatePresence>
                    {selectedTechs.map((tech) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="px-2.5 py-1 rounded-lg bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary flex items-center gap-1"
                      >
                        {tech}
                        <button 
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleTech(tech);
                          }} 
                          className="hover:text-red-500 font-bold ml-1 text-[8px]"
                        >
                          ✕
                        </button>
                      </motion.span>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>

          {/* Botón de Reseteo */}
          {selectedTechs.length > 0 && (
            <button
              onClick={handleReset}
              className="mt-4 w-full py-2 bg-zinc-200/40 dark:bg-zinc-800/30 border border-black/5 dark:border-white/5 hover:bg-zinc-200/80 dark:hover:bg-zinc-800/70 rounded-xl text-xs font-bold text-foreground cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              {texts.resetBtn}
            </button>
          )}
        </div>

        {/* PANEL DERECHO: Visualización del Reporte en Vivo (4 cols) */}
        <div className="lg:col-span-4 rounded-3xl glass p-6 border border-black/5 dark:border-white/5 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute inset-0 bg-primary/2 -z-10" />
          
          <div className="w-full">
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-primary uppercase mb-6">
              <Award className="w-4 h-4" />
              {texts.reportTitle}
            </div>

            <div className="flex flex-col gap-4">
              <AnimatePresence mode="wait">
                {selectedTechs.length === 0 ? (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 text-xs font-mono text-muted-foreground"
                  >
                    [ AWAITING INPUT ]
                  </motion.div>
                ) : projectMatches.length === 0 ? (
                  <motion.div
                    key="no-matches"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-12 text-xs text-muted-foreground/80 font-sans"
                  >
                    {texts.noMatches}
                  </motion.div>
                ) : (
                  <div className="flex flex-col gap-3.5">
                    {projectMatches.map(({ project, matched, percentage, totalRequired }) => {
                      const isPerfect = percentage === 100;
                      return (
                        <motion.div
                          key={project.id}
                          layout
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`rounded-2xl p-4 border transition-all duration-500 relative overflow-hidden ${
                            isPerfect
                              ? "bg-primary/10 border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.15)]"
                              : "bg-zinc-200/30 dark:bg-zinc-900/40 border-black/5 dark:border-white/5"
                          }`}
                        >
                          {/* Partículas de Celebración en Perfect Match */}
                          {isPerfect && (
                            <div className="absolute inset-0 pointer-events-none">
                              <span className="absolute top-1 left-2 w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                              <span className="absolute bottom-2 right-4 w-2 h-2 rounded-full bg-indigo-400 animate-ping" />
                            </div>
                          )}

                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h5 className="font-heading font-extrabold text-xs text-foreground tracking-wide flex items-center gap-1.5">
                                {project.title}
                                {isPerfect && (
                                  <span className="px-1.5 py-0.5 rounded-md bg-primary text-[8px] font-bold text-white uppercase tracking-wider animate-bounce">
                                    100% Match
                                  </span>
                                )}
                              </h5>
                              <p className="text-[9px] text-muted-foreground/80 font-sans mt-0.5">
                                {project.client.length > 50 ? `${project.client.substring(0, 50)}...` : project.client}
                              </p>
                            </div>
                            <span className="font-mono text-xs font-bold text-primary">
                              {percentage}%
                            </span>
                          </div>

                          {/* Barra de Progreso de Coincidencias */}
                          <div className="w-full h-1.5 bg-zinc-950/20 dark:bg-zinc-950/50 rounded-full overflow-hidden mb-3">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className={`h-full rounded-full ${isPerfect ? "bg-primary" : "bg-gradient-to-r from-primary to-indigo-500"}`}
                            />
                          </div>

                          {/* Tecnologías emparejadas */}
                          <div className="flex flex-wrap gap-1 items-center">
                            <span className="text-[8px] font-bold uppercase tracking-wider text-muted-foreground/75 mr-1 font-mono">
                              {texts.techStack}:
                            </span>
                            {project.stack.map((tech) => {
                              const isMatched = matched.some((m) => m.toLowerCase() === tech.toLowerCase());
                              return (
                                <span
                                  key={tech}
                                  className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                                    isMatched
                                      ? "bg-primary/20 text-primary border border-primary/20"
                                      : "bg-zinc-950/10 dark:bg-zinc-950/30 text-muted-foreground/50"
                                  }`}
                                >
                                  {tech}
                                </span>
                              );
                            })}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Celebración Especial (Confeti de Coincidencia 100%) */}
          <AnimatePresence>
            {celebrateProject && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="mt-4 p-3.5 bg-primary rounded-2xl border border-primary shadow-lg flex items-center gap-3 relative overflow-hidden select-none"
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_0%,transparent_70%)] animate-pulse" />
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-inner shrink-0 animate-bounce">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h6 className="font-heading text-[10px] font-extrabold tracking-wider text-white uppercase leading-none mb-1">
                    {texts.matchSuccess}
                  </h6>
                  <p className="text-[9px] font-sans font-medium text-white/90 leading-tight">
                    {locale === "es" ? "Coincide perfectamente con tu perfil técnico." : "Perfectly matches your technical profile."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}
