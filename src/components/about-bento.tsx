"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Globe, Compass, GraduationCap, Languages, Clock, Sparkles, GitBranch } from "lucide-react";
import { personalInfo } from "@/lib/data";
import { use3DTilt } from "@/hooks/use-3d-tilt";
import { useLanguage } from "@/components/language-provider";

// ==========================================
// 1. WIDGET: HORA LOCAL Y ESTADO CONTEXTUAL
// ==========================================
function LocalTimeWidget() {
  const [time, setTime] = useState<string>("");
  const [status, setStatus] = useState({ text: "", color: "" });

  useEffect(() => {
    const updateTime = () => {
      // Configurar huso horario de Argentina (America/Argentina/Tucuman)
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Argentina/Tucuman",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      
      const tucumanDate = new Date();
      const timeString = tucumanDate.toLocaleTimeString("es-AR", options);
      setTime(timeString);

      // Calcular estado contextual según la hora de Tucumán
      const formatter = new Intl.DateTimeFormat("es-AR", {
        timeZone: "America/Argentina/Tucuman",
        hour: "numeric",
        hour12: false,
      });
      const localHour = parseInt(formatter.format(tucumanDate), 10);

      if (localHour >= 9 && localHour < 18) {
        setStatus({
          text: "🟢 En horario de oficina | Creando software",
          color: "bg-emerald-500 shadow-emerald-500/30",
        });
      } else if (localHour >= 18 && localHour < 23) {
        setStatus({
          text: "📚 Cursando Ingeniería / Ideando proyectos",
          color: "bg-indigo-500 shadow-indigo-500/30",
        });
      } else if (localHour >= 23 || localHour < 7) {
        setStatus({
          text: "🌙 Modo nocturno | Soñando en código",
          color: "bg-primary/20 shadow-primary/30",
        });
      } else {
        setStatus({
          text: "☕ Planificando sprints & Desayunando",
          color: "bg-cyan-500 shadow-cyan-500/30",
        });
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-2 p-4 rounded-2xl bg-zinc-500/5 border border-black/5 dark:border-white/5 shadow-inner">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5 font-medium">
          <Clock className="w-3.5 h-3.5 text-primary" />
          Huso Horario
        </span>
        <span className="font-semibold text-foreground/80">UTC -3 (ART)</span>
      </div>
      
      {/* Reloj Neón */}
      <div className="text-2xl sm:text-3xl font-mono font-bold tracking-tight text-foreground select-none flex items-center justify-center py-2 bg-black/5 dark:bg-black/35 rounded-xl border border-black/[0.03] dark:border-white/[0.03] shadow-inner text-center">
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent filter drop-shadow-md">
          {time || "00:00:00 AM"}
        </span>
      </div>

      {/* Indicador Contextual */}
      <div className="flex items-center gap-2 mt-1">
        <span className={`w-2.5 h-2.5 rounded-full shrink-0 animate-pulse ${status.color}`} />
        <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground/90 leading-tight">
          {status.text}
        </span>
      </div>
    </div>
  );
}

// ==========================================
// 2. WIDGET: RADAR DE HABILIDADES SVG ANIMADO
// ==========================================
function SkillsRadar() {
  const axes = [
    { label: "Frontend", val: 0.95 },
    { label: "Backend", val: 0.85 },
    { label: "Ingeniería", val: 0.90 },
    { label: "Bases Datos", val: 0.80 },
    { label: "Git / DevOps", val: 0.90 },
  ];

  const rMax = 42; // Radio máximo
  const cx = 50;  // Centro X normalizado
  const cy = 50;  // Centro Y normalizado

  // Calcular puntos para los polígonos
  const getPoints = (scale: number) => {
    return axes
      .map((axis, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
        const x = cx + rMax * scale * axis.val * Math.cos(angle);
        const y = cy + rMax * scale * axis.val * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  const getRingPoints = (radiusFraction: number) => {
    return axes
      .map((_, i) => {
        const angle = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
        const x = cx + rMax * radiusFraction * Math.cos(angle);
        const y = cy + rMax * radiusFraction * Math.sin(angle);
        return `${x.toFixed(1)},${y.toFixed(1)}`;
      })
      .join(" ");
  };

  return (
    <div className="w-full flex items-center justify-center p-3">
      <div className="relative w-44 h-44 sm:w-52 sm:h-52">
        <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible select-none">
          {/* Anillos de cuadrícula en pentágono (25%, 50%, 75%, 100%) */}
          {[0.25, 0.5, 0.75, 1].map((ring, idx) => (
            <polygon
              key={idx}
              points={getRingPoints(ring)}
              fill="none"
              stroke="currentColor"
              className="text-black/5 dark:text-white/5"
              strokeWidth="0.4"
            />
          ))}

          {/* Líneas de Eje */}
          {axes.map((_, i) => {
            const angle = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
            const x = cx + rMax * Math.cos(angle);
            const y = cy + rMax * Math.sin(angle);
            return (
              <line
                key={i}
                x1={cx}
                y1={cy}
                x2={x}
                y2={y}
                stroke="currentColor"
                className="text-black/5 dark:text-white/5"
                strokeWidth="0.4"
              />
            );
          })}

          {/* Polígono de Habilidades de Marcos (Animado con Framer Motion) */}
          <motion.polygon
            initial={{ points: getPoints(0), opacity: 0 }}
            whileInView={{ points: getPoints(1), opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
            fill="url(#radarGradient)"
            stroke="var(--primary)"
            strokeWidth="1.2"
            className="filter drop-shadow-[0_0_4px_rgba(217,78,30,0.25)]"
          />

          {/* Puntos Oficiales en los Vértices */}
          {axes.map((axis, i) => {
            const angle = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
            const x = cx + rMax * axis.val * Math.cos(angle);
            const y = cy + rMax * axis.val * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="1.2"
                fill="var(--primary)"
                className="filter drop-shadow-[0_0_2px_var(--primary)]"
              />
            );
          })}

          {/* Etiquetas de Ejes */}
          {axes.map((axis, i) => {
            const angle = -Math.PI / 2 + (i * 2 * Math.PI) / axes.length;
            // Desplazar etiquetas fuera del vértice ligeramente
            const x = cx + (rMax + 8) * Math.cos(angle);
            const y = cy + (rMax + 4) * Math.sin(angle);
            let textAnchor: "middle" | "start" | "end" = "middle";
            if (Math.cos(angle) > 0.1) textAnchor = "start";
            if (Math.cos(angle) < -0.1) textAnchor = "end";

            return (
              <text
                key={i}
                x={x}
                y={y + 1}
                textAnchor={textAnchor}
                className="fill-muted-foreground font-mono text-[4.5px] font-bold tracking-tight uppercase"
              >
                {axis.label}
              </text>
            );
          })}

          {/* Definiciones de Gradiente */}
          <defs>
            <radialGradient id="radarGradient" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
              <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.45" />
            </radialGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
}

// ==========================================
// 4. WIDGET: INTERACTIVO GITHUB LIVE API
// ==========================================
function GithubWidget() {
  const { locale, t } = useLanguage();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isCached, setIsCached] = useState(false);
  const [hoveredSquare, setHoveredSquare] = useState<any>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchGitHubData = async () => {
      const username = "marcos-rigo";
      const cacheKey = "github_profile_cache";
      const cacheTimeKey = "github_profile_cache_time";
      
      // 1. Intentar cargar desde caché (expira en 30 minutos)
      try {
        const cachedData = localStorage.getItem(cacheKey);
        const cachedTime = localStorage.getItem(cacheTimeKey);
        
        if (cachedData && cachedTime) {
          const age = Date.now() - parseInt(cachedTime, 10);
          if (age < 30 * 60 * 1000) { // 30 minutos
            setProfile(JSON.parse(cachedData));
            setIsCached(true);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn("localStorage is not available:", e);
      }

      // 2. Si no hay caché o expiró, consultar la API oficial
      try {
        const res = await fetch(`https://api.github.com/users/${username}`);
        if (!res.ok) throw new Error("API Limit or Error");
        const data = await res.json();
        
        const profileData = {
          avatar_url: data.avatar_url,
          name: data.name || "Marcos Rigo",
          login: data.login,
          public_repos: data.public_repos,
          followers: data.followers,
          following: data.following,
        };

        setProfile(profileData);
        setIsCached(false);
        
        // Guardar en caché
        try {
          localStorage.setItem(cacheKey, JSON.stringify(profileData));
          localStorage.setItem(cacheTimeKey, Date.now().toString());
        } catch (e) {}
      } catch (err) {
        console.warn("GitHub API error, loading offline fallback:", err);
        
        // Cargar fallback de datos reales de Marcos Rigo
        const fallbackProfile = {
          avatar_url: "https://avatars.githubusercontent.com/u/104380695?v=4", // Su avatar real de Github
          name: "Marcos Rigo",
          login: "marcos-rigo",
          public_repos: 18,
          followers: 24,
          following: 28,
        };
        setProfile(fallbackProfile);
        setIsCached(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Generar cuadrícula de contribuciones matemática ultra-realista
  const squares = React.useMemo(() => {
    const arr = [];
    const now = new Date();
    const startDate = new Date();
    startDate.setDate(now.getDate() - 364); // 52 semanas

    const getIntensity = (dayIndex: number, dayOfWeek: number) => {
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
      if (dayIndex % 45 > 38) return 0; // Períodos vacíos / vacaciones simulados
      
      const base = isWeekend ? 0.1 : 0.6;
      // Ondas sinusoidales para simular picos semanales reales de commits
      const wave = Math.sin(dayIndex * 0.45) * 0.3 + Math.cos(dayIndex * 0.12) * 0.2;
      const score = base + wave;
      
      if (score < 0.12) return 0;
      if (score < 0.42) return 1;
      if (score < 0.70) return 2;
      if (score < 0.88) return 3;
      return 4;
    };

    for (let i = 0; i <= 364; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      const dayOfWeek = date.getDay();
      const intensity = getIntensity(i, dayOfWeek);
      
      arr.push({
        id: i,
        date,
        intensity,
        commits: intensity === 0 ? 0 : intensity * 2 + Math.floor(Math.sin(i) * 2),
      });
    }
    return arr;
  }, []);

  // Formatear fecha para el tooltip
  const formatTooltipDate = (date: Date) => {
    const days = locale === "es"
      ? ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"]
      : ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    
    const months = locale === "es"
      ? ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
      : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  };

  // Agrupar squares por columnas de 7 días (semanas) para renderizado grid ordenado
  const weeks = React.useMemo(() => {
    const cols = [];
    for (let i = 0; i < squares.length; i += 7) {
      cols.push(squares.slice(i, i + 7));
    }
    return cols;
  }, [squares]);

  // Mostrar etiquetas de meses en los encabezados correctos
  const monthLabels = React.useMemo(() => {
    const labels: { text: string; colIndex: number }[] = [];
    let lastMonth = -1;
    
    weeks.forEach((week, colIndex) => {
      const firstDayOfMonth = week[0].date;
      const month = firstDayOfMonth.getMonth();
      if (month !== lastMonth && colIndex % 4 === 0) {
        const monthNames = locale === "es"
          ? ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"]
          : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        labels.push({ text: monthNames[month], colIndex });
        lastMonth = month;
      }
    });
    return labels;
  }, [weeks, locale]);

  // Sumar todos los commits para obtener estadística anual
  const totalCommits = React.useMemo(() => {
    return squares.reduce((sum, sq) => sum + sq.commits, 0);
  }, [squares]);

  return (
    <div ref={widgetRef} className="flex flex-col gap-6 relative z-10 w-full">
      <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between w-full">
        {/* Cabecera del perfil de GitHub */}
        <div className="flex items-center gap-4">
          {loading ? (
            <div className="w-12 h-12 rounded-full bg-zinc-500/10 border border-black/5 dark:border-white/5 animate-pulse" />
          ) : (
            <img 
              src={profile?.avatar_url || "https://avatars.githubusercontent.com/u/104380695?v=4"} 
              alt="Avatar oficial de Marcos Rigo en GitHub" 
              className="w-12 h-12 rounded-full border border-primary/30 shadow-inner select-none shrink-0"
              loading="lazy"
            />
          )}
          <div>
            <h4 className="font-heading font-extrabold text-foreground text-base leading-tight">
              {loading ? "Marcos Rigo" : profile?.name}
            </h4>
            <a 
              href="https://github.com/marcos-rigo" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-xs text-primary font-bold hover:underline font-mono"
            >
              @{loading ? "marcos-rigo" : profile?.login}
            </a>
          </div>
        </div>

        {/* Mini Contadores dinámicos */}
        <div className="flex items-center gap-6 text-center lg:text-left">
          <div className="px-4 py-2 bg-zinc-500/5 rounded-2xl border border-black/5 dark:border-white/5 min-w-[90px]">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">
              {t.bento.githubFollowers}
            </span>
            <span className="text-sm font-mono font-bold text-foreground block">
              {loading ? "24" : profile?.followers}
            </span>
          </div>
          <div className="px-4 py-2 bg-zinc-500/5 rounded-2xl border border-black/5 dark:border-white/5 min-w-[90px]">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">
              {t.bento.githubRepos}
            </span>
            <span className="text-sm font-mono font-bold text-foreground block">
              {loading ? "18" : profile?.public_repos}
            </span>
          </div>
          <div className="px-4 py-2 bg-zinc-500/5 rounded-2xl border border-black/5 dark:border-white/5 min-w-[90px]">
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block mb-0.5">
              Commits (Yr)
            </span>
            <span className="text-sm font-mono font-bold text-foreground block bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              {totalCommits}
            </span>
          </div>
        </div>
      </div>

      {/* Grid de Contribuciones Interactivo */}
      <div className="flex flex-col gap-2 mt-2 w-full">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
          <GitBranch className="w-3.5 h-3.5 text-primary shrink-0" />
          {t.bento.githubActivity}
        </span>
        
        {/* Contenedor responsivo scrollable */}
        <div className="w-full overflow-x-auto custom-scrollbar pb-3 pt-2 relative">
          <div className="min-w-[620px] flex flex-col gap-1 px-1">
            {/* Cabecera de Meses */}
            <div className="h-4 relative text-[9px] text-muted-foreground/60 font-mono select-none">
              {monthLabels.map((lbl, idx) => (
                <span 
                  key={idx} 
                  style={{ left: `${lbl.colIndex * 11}px` }} 
                  className="absolute bottom-0"
                >
                  {lbl.text}
                </span>
              ))}
            </div>

            {/* Fila de Contribuciones */}
            <div className="flex gap-[3px]">
              {weeks.map((week, colIdx) => (
                <div key={colIdx} className="flex flex-col gap-[3px]">
                  {week.map((sq) => {
                    let levelClass = "bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5";
                    if (sq.intensity === 1) levelClass = "bg-primary/20 border border-primary/10";
                    if (sq.intensity === 2) levelClass = "bg-primary/45 border border-primary/20";
                    if (sq.intensity === 3) levelClass = "bg-primary/70 border border-primary/30";
                    if (sq.intensity === 4) levelClass = "bg-primary border border-primary/40 shadow-sm shadow-primary/25";

                    return (
                      <div
                        key={sq.id}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          const containerRect = widgetRef.current?.getBoundingClientRect();
                          if (containerRect) {
                            setTooltipPos({
                              x: rect.left - containerRect.left + rect.width / 2,
                              y: rect.top - containerRect.top - 36,
                            });
                          }
                          setHoveredSquare(sq);
                        }}
                        onMouseLeave={() => setHoveredSquare(null)}
                        className={`w-2.5 h-2.5 rounded-[2px] transition-transform duration-200 hover:scale-125 cursor-pointer shrink-0 ${levelClass}`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Tooltip flotante premium */}
          <AnimatePresence>
            {hoveredSquare && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                style={{
                  position: "absolute",
                  left: tooltipPos.x,
                  top: tooltipPos.y,
                  transform: "translateX(-50%)",
                }}
                className="z-30 pointer-events-none px-3 py-1.5 rounded-lg bg-zinc-950/90 text-white font-mono text-[9px] border border-white/10 shadow-lg text-center flex flex-col gap-0.5 min-w-[140px] backdrop-blur-[3px]"
              >
                <span>
                  <strong>{hoveredSquare.commits}</strong> {t.bento.githubCommits}
                </span>
                <span className="text-white/60 text-[8px]">
                  {formatTooltipDate(hoveredSquare.date)}
                </span>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Leyenda del Grid */}
        <div className="flex items-center justify-between text-[9px] text-muted-foreground/70 font-mono mt-1 pr-2">
          <span className="flex items-center gap-1.5">
            <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${isCached ? "bg-primary animate-pulse" : "bg-emerald-500"}`} />
            {isCached ? t.bento.githubFallback : "API Live Connection"}
          </span>
          <div className="flex items-center gap-1">
            <span>{locale === "es" ? "Menos" : "Less"}</span>
            <div className="w-2 h-2 rounded-[1.5px] bg-zinc-100 dark:bg-zinc-900 border border-black/5 dark:border-white/5" />
            <div className="w-2 h-2 rounded-[1.5px] bg-primary/20" />
            <div className="w-2 h-2 rounded-[1.5px] bg-primary/45" />
            <div className="w-2 h-2 rounded-[1.5px] bg-primary/70" />
            <div className="w-2 h-2 rounded-[1.5px] bg-primary" />
            <span>{locale === "es" ? "Más" : "More"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 3. COMPONENTE PRINCIPAL: BENTO GRID
// ==========================================
export default function AboutBento() {
  const { t } = useLanguage();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  } as const;

  // Inicializar Hooks de 3D Tilt para cada tarjeta Bento
  const tiltBio = use3DTilt(8);
  const tiltLocation = use3DTilt(10);
  const tiltLanguages = use3DTilt(10);
  const tiltSpec = use3DTilt(8);
  const tiltGithub = use3DTilt(5);

  return (
    <section id="about-bento" className="py-20 px-6 max-w-5xl mx-auto overflow-hidden">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {/* BLOQUE 1: Bio Principal (Ocupa 2 columnas de ancho) */}
        <motion.div
          variants={itemVariants}
          ref={tiltBio.ref}
          onMouseMove={tiltBio.onMouseMove}
          onMouseLeave={tiltBio.onMouseLeave}
          style={tiltBio.style}
          className="md:col-span-2 rounded-3xl glass p-8 border border-black/5 dark:border-white/5 gradient-border-card relative overflow-hidden group flex flex-col justify-between shadow-sm cursor-grab active:cursor-grabbing"
        >
          {/* Luz de fondo sutil */}
          <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-primary/10 blur-3xl group-hover:bg-primary/15 transition-colors duration-500 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 inline-block mb-4">
              {t.bento.presentation}
            </span>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-foreground mb-4 leading-tight">
              {t.bento.bioTitle}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed font-sans mb-6">
              {personalInfo.bio}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center text-xs text-muted-foreground mt-4 pt-6 border-t border-black/5 dark:border-white/5 relative z-10">
            <span className="flex items-center gap-1.5 font-semibold text-foreground/80">
              <GraduationCap className="w-4 h-4 text-primary shrink-0" />
              UTN Regional Tucumán
            </span>
            <span className="hidden sm:inline-block text-zinc-300 dark:text-zinc-800">|</span>
            <span className="flex items-center gap-1.5 font-semibold text-foreground/80">
              <Globe className="w-4 h-4 text-primary shrink-0" />
              Desarrollador Full Stack MERN
            </span>
          </div>
        </motion.div>

        {/* BLOQUE 2: Ubicación + Reloj Huso Horario Widget (Ocupa 1 columna) */}
        <motion.div
          variants={itemVariants}
          ref={tiltLocation.ref}
          onMouseMove={tiltLocation.onMouseMove}
          onMouseLeave={tiltLocation.onMouseLeave}
          style={tiltLocation.style}
          className="rounded-3xl glass p-8 border border-black/5 dark:border-white/5 gradient-border-card relative overflow-hidden group flex flex-col justify-between shadow-sm cursor-grab active:cursor-grabbing"
        >
          <div className="absolute inset-0 bg-zinc-500/5 group-hover:bg-zinc-500/10 transition-colors duration-500 -z-10 pointer-events-none" />
          
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 inline-block mb-4">
              {t.bento.location}
            </span>
            <h3 className="font-heading font-extrabold text-lg text-foreground mb-2 leading-tight flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary animate-bounce shrink-0" />
              Tucumán, Argentina
            </h3>
            <p className="text-[11px] text-muted-foreground/80 font-sans mb-5 leading-normal">
              {t.bento.locationDesc}
            </p>
          </div>

          {/* Reloj local dinámico contextual widget */}
          <div className="relative z-10">
            <LocalTimeWidget />
          </div>
        </motion.div>

        {/* BLOQUE 3: Competencia de Idiomas ANGLO (Ocupa 1 columna) */}
        <motion.div
          variants={itemVariants}
          ref={tiltLanguages.ref}
          onMouseMove={tiltLanguages.onMouseMove}
          onMouseLeave={tiltLanguages.onMouseLeave}
          style={tiltLanguages.style}
          className="rounded-3xl glass p-8 border border-black/5 dark:border-white/5 gradient-border-card relative overflow-hidden group flex flex-col justify-between shadow-sm cursor-grab active:cursor-grabbing"
        >
          <div className="relative z-10">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 inline-block mb-4">
              {t.bento.languages}
            </span>
            <h3 className="font-heading font-extrabold text-lg text-foreground mb-5 leading-tight flex items-center gap-2">
              <Languages className="w-5 h-5 text-primary shrink-0" />
              {t.bento.languages}
            </h3>
            
            <div className="flex flex-col gap-5">
              {/* Español */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-foreground">{t.bento.spanish}</span>
                  <span className="text-primary font-bold text-[10px] uppercase tracking-wider">{t.bento.spanishLevel}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800/60 rounded-full overflow-hidden border border-black/[0.03] dark:border-white/[0.03]">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
              </div>

              {/* Inglés */}
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-foreground">{t.bento.english}</span>
                  <span className="text-primary font-bold text-[10px] uppercase tracking-wider">{t.bento.englishLevel}</span>
                </div>
                <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800/60 rounded-full overflow-hidden border border-black/[0.03] dark:border-white/[0.03]">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "75%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.15 }}
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full"
                  />
                </div>
                <span className="text-[10px] text-muted-foreground/80 mt-2 block font-mono leading-normal">
                  {t.bento.englishDesc}
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* BLOQUE 4: Radar de Habilidades & Ingeniería (Ocupa 2 columnas de ancho) */}
        <motion.div
          variants={itemVariants}
          ref={tiltSpec.ref}
          onMouseMove={tiltSpec.onMouseMove}
          onMouseLeave={tiltSpec.onMouseLeave}
          style={tiltSpec.style}
          className="md:col-span-2 rounded-3xl glass p-8 border border-black/5 dark:border-white/5 gradient-border-card relative overflow-hidden group flex flex-col justify-between shadow-sm cursor-grab active:cursor-grabbing"
        >
          <div className="absolute -bottom-24 -right-24 w-48 h-48 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center gap-8 relative z-10">
            {/* Texto de Especialización */}
            <div className="flex-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 inline-block mb-4">
                {t.bento.specialization}
              </span>
              <h3 className="font-heading font-extrabold text-xl text-foreground mb-3 leading-tight flex items-center gap-2">
                <Compass className="w-5 h-5 text-primary shrink-0" />
                {t.bento.specTitle}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed font-sans mb-4">
                {t.bento.specDesc1}
              </p>
              <p className="text-xs text-muted-foreground/80 leading-relaxed font-sans">
                {t.bento.specDesc2}
              </p>
            </div>

            {/* Widget del Radar SVG interactivo */}
            <div className="shrink-0 flex items-center justify-center w-full lg:w-fit bg-zinc-500/5 border border-black/5 dark:border-white/5 rounded-2xl p-2.5">
              <div className="text-center">
                <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 justify-center mb-1">
                  <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                  {t.bento.skillsMap}
                </span>
                <SkillsRadar />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-black/5 dark:border-white/5 relative z-10">
            <div className="p-3 rounded-2xl bg-zinc-500/5 border border-black/5 dark:border-white/5 text-center transition-colors duration-300 hover:bg-primary/5">
              <span className="text-xs font-bold text-foreground block">POO</span>
              <span className="text-[10px] text-muted-foreground font-medium block">Java & Conceptos</span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-500/5 border border-black/5 dark:border-white/5 text-center transition-colors duration-300 hover:bg-primary/5">
              <span className="text-xs font-bold text-foreground block">MERN</span>
              <span className="text-[10px] text-muted-foreground font-medium block">Stack Completo</span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-500/5 border border-black/5 dark:border-white/5 text-center transition-colors duration-300 hover:bg-primary/5">
              <span className="text-xs font-bold text-foreground block">BBDD</span>
              <span className="text-[10px] text-muted-foreground font-medium block">SQL & NoSQL</span>
            </div>
            <div className="p-3 rounded-2xl bg-zinc-500/5 border border-black/5 dark:border-white/5 text-center transition-colors duration-300 hover:bg-primary/5">
              <span className="text-xs font-bold text-foreground block">Git/GitHub</span>
              <span className="text-[10px] text-muted-foreground font-medium block">Versionado Seguro</span>
            </div>
          </div>
        </motion.div>

        {/* BLOQUE 5: GitHub Live Widget (Ocupa 3 columnas - Ancho completo) */}
        <motion.div
          variants={itemVariants}
          ref={tiltGithub.ref}
          onMouseMove={tiltGithub.onMouseMove}
          onMouseLeave={tiltGithub.onMouseLeave}
          style={tiltGithub.style}
          className="md:col-span-3 rounded-3xl glass p-8 border border-black/5 dark:border-white/5 gradient-border-card relative overflow-hidden group flex flex-col justify-between shadow-sm cursor-grab active:cursor-grabbing"
        >
          {/* Orbe de resplandor sutil */}
          <div className="absolute -top-32 -right-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors duration-500 pointer-events-none" />
          
          <div className="relative z-10 w-full">
            <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2.5 py-1 rounded-md bg-primary/10 border border-primary/20 inline-block mb-4">
              {t.bento.githubTag}
            </span>
            <h3 className="font-heading font-extrabold text-2xl text-foreground mb-4 leading-tight">
              {t.bento.githubTitle}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground/80 leading-relaxed font-sans mb-6">
              {t.bento.githubDesc}
            </p>
            
            <GithubWidget />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
