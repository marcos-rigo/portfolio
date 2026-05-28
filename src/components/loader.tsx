"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/language-provider";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const { locale } = useLanguage();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"drawing" | "morphing" | "ready" | "complete">("drawing");
  const [msgIndex, setMsgIndex] = useState(0);

  const messages = {
    es: [
      "CONECTANDO AL NÚCLEO CUÁNTICO...",
      "INICIALIZANDO GEOMETRÍAS VECTORIALES...",
      "CALIBRANDO MOTOR ACELERADO POR GPU...",
      "SINCRONIZANDO CON LA API DE GITHUB...",
      "OPTIMIZANDO MÉTRICAS DE LIGHTHOUSE...",
      "SISTEMAS ONLINE. ACCEDIENDO AL PORTAFOLIO..."
    ],
    en: [
      "CONNECTING TO QUANTUM CORE...",
      "INITIALIZING VECTOR GEOMETRIES...",
      "CALIBRATING GPU-ACCELERATED ENGINE...",
      "SYNCHRONIZING WITH GITHUB API...",
      "OPTIMIZING LIGHTHOUSE METRICS...",
      "SYSTEMS ONLINE. ENTERING PORTFOLIO..."
    ]
  };

  // Simulación de carga súper fluida con velocidad no lineal
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const updateProgress = () => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        
        // Crecimiento no lineal para simular cargas reales
        const remaining = 100 - prev;
        const step = Math.max(1, Math.min(8, Math.floor(Math.random() * (remaining / 5) + 1)));
        return prev + step;
      });
    };

    timer = setInterval(updateProgress, 120);
    return () => clearInterval(timer);
  }, []);

  // Coordinar fases de la animación e indexación de mensajes
  useEffect(() => {
    // Sincronizar mensajes de carga con el progreso
    const segment = Math.floor(progress / 18);
    const index = Math.min(segment, messages[locale === "es" ? "es" : "en"].length - 1);
    setMsgIndex(index);

    if (progress >= 100) {
      setPhase("morphing");
      // Fase de morphing dura 1.2 segundos
      const t1 = setTimeout(() => {
        setPhase("ready");
        // Fase ready dura 800ms antes de desmontarse
        const t2 = setTimeout(() => {
          setPhase("complete");
          onComplete();
        }, 800);
        return () => clearTimeout(t2);
      }, 1400);
      return () => clearTimeout(t1);
    }
  }, [progress, locale]);

  // Bloquear el scroll de la página principal mientras el cargador esté montado
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const currentMessages = messages[locale === "es" ? "es" : "en"];

  // Variantes para la animación de las letras vectoriales
  const strokeVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: {
        duration: 1.8,
        ease: "easeInOut" as any,
      },
    },
  };

  return (
    <div className="fixed inset-0 bg-[#030303] z-[9999] flex flex-col items-center justify-center overflow-hidden">
      {/* Fondo tecnológico de rejilla cibernética ultra-sutil */}
      <div 
        className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]"
        style={{
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, #000 70%, transparent 100%)"
        }}
      />

      {/* Orbes difuminados de resplandor cuántico */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-[100px] animate-pulse duration-[6000ms]" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] animate-pulse duration-[8000ms]" />

      <div className="relative z-10 flex flex-col items-center justify-center max-w-md w-full px-8">
        {/* Contenedor SVG principal para el morphing */}
        <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
          <svg
            viewBox="0 0 240 240"
            className="w-full h-full filter drop-shadow-[0_0_15px_rgba(var(--primary-rgb),0.35)]"
          >
            <defs>
              <linearGradient id="neonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="#6366f1" />
              </linearGradient>
            </defs>

            {/* Letra M - Línea izquierda y central */}
            <motion.path
              d="M 40,160 V 80 L 80,130 L 120,80 V 160"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={strokeVariants}
              initial="hidden"
              animate={phase === "drawing" ? "visible" : {
                opacity: 0,
                x: -30,
                transition: { duration: 0.6, ease: "easeIn" }
              }}
            />

            {/* Letra R - Cuerpo y curva */}
            <motion.path
              d="M 140,160 V 80 H 180 C 200,80 200,115 180,115 H 140 M 170,115 L 195,160"
              fill="none"
              stroke="url(#neonGradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              variants={strokeVariants}
              initial="hidden"
              animate={
                phase === "drawing" 
                  ? "visible" 
                  : phase === "morphing" 
                  ? {
                      // El R se desplaza hacia el centro del canvas (x=120) y escala
                      x: -20,
                      scale: 0.85,
                      originX: "140px",
                      originY: "120px",
                      transition: { duration: 0.8, ease: "easeInOut" }
                    }
                  : {
                      scale: 0.85,
                      x: -20,
                      opacity: 1
                    }
              }
            />

            {/* Círculo Isotipo - Aparece y se cierra en la fase de morphing */}
            <motion.path
              d="M 120,120 m -45,0 a 45,45 0 1,0 90,0 a 45,45 0 1,0 -90,0"
              fill="none"
              stroke="var(--primary)"
              strokeWidth="6"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={
                phase === "morphing" || phase === "ready"
                  ? {
                      pathLength: 1,
                      opacity: 1,
                      stroke: "#ffffff",
                      transition: { duration: 1.0, ease: "easeOut" }
                    }
                  : { pathLength: 0, opacity: 0 }
              }
            />
          </svg>

          {/* Relleno blanco líquido final para el isotipo de la marca */}
          <AnimatePresence>
            {phase === "ready" && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.2, opacity: 0 }}
                className="absolute w-8 h-8 rounded-full bg-primary flex items-center justify-center font-heading font-bold text-white shadow-md z-10"
                style={{
                  boxShadow: "0 0 20px var(--primary)"
                }}
              >
                R
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Barra de progreso cuantitativa y cybernetic text */}
        <div className="w-full flex flex-col items-center">
          {/* Porcentaje numérico digital */}
          <div className="font-mono text-3xl font-extrabold tracking-widest text-foreground mb-3 flex items-center gap-1.5">
            <span className="text-primary">{progress}</span>
            <span className="text-zinc-600 text-xl font-medium">%</span>
          </div>

          {/* Barra física con resplandor neón */}
          <div className="w-full h-[3px] bg-zinc-900 rounded-full overflow-hidden mb-6 relative">
            <motion.div
              className="h-full bg-gradient-to-r from-primary to-indigo-500 rounded-full"
              style={{ width: `${progress}%` }}
              layout
            />
            {/* Resplandor luminoso en el borde de carga */}
            <div 
              className="absolute top-0 h-full w-12 bg-white/40 blur-[4px] -translate-x-1/2 transition-all duration-75"
              style={{ left: `${progress}%` }}
            />
          </div>

          {/* Logs de sistema dinámicos bilingües */}
          <div className="h-6 overflow-hidden flex flex-col items-center justify-center w-full">
            <AnimatePresence mode="wait">
              <motion.p
                key={msgIndex + locale}
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 0.6 }}
                exit={{ y: -12, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="text-[10px] font-mono font-bold tracking-wider text-center text-muted-foreground uppercase"
              >
                {currentMessages[msgIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
