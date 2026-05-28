"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Sparkles, Navigation, Link, FileDown, Copy, Check, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";
import { personalInfo } from "@/lib/data";
import { useLanguage } from "@/components/language-provider";

interface CommandOption {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export default function CommandMenu() {
  const { locale, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  // Terminal state variables
  const [isTerminalMode, setIsTerminalMode] = useState(false);
  const [terminalHistory, setTerminalHistory] = useState<string[]>([]);
  const [terminalInput, setTerminalInput] = useState("");
  const hasBooted = useRef(false);
  
  const menuRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalInputRef = useRef<HTMLInputElement>(null);
  const terminalHistoryRef = useRef<HTMLDivElement>(null);

  // Initialize and localize terminal boot screen
  useEffect(() => {
    if (!hasBooted.current || terminalHistory.length === 0) {
      setTerminalHistory([
        t.console.bootMessage1,
        t.console.bootMessage2,
        t.console.bootMessage3,
        t.console.bootMessage4,
        " "
      ]);
      hasBooted.current = true;
    }
  }, [t, terminalHistory.length]);

  // Escuchar atajo Ctrl+K / ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Enfocar input al abrir
  useEffect(() => {
    if (isOpen) {
      if (isTerminalMode) {
        setTimeout(() => terminalInputRef.current?.focus(), 100);
      } else {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
      document.body.style.overflow = "hidden";
    } else {
      setSearch("");
      setSelectedIndex(0);
      document.body.style.overflow = "";
    }
  }, [isOpen, isTerminalMode]);

  // Cerrar al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  // Escuchar Escape de forma diferenciada en consola
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        if (isTerminalMode) {
          e.preventDefault();
          setIsTerminalMode(false);
        } else {
          setIsOpen(false);
        }
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, isTerminalMode]);

  // Auto-scroll en la consola
  useEffect(() => {
    if (terminalHistoryRef.current) {
      terminalHistoryRef.current.scrollTop = terminalHistoryRef.current.scrollHeight;
    }
  }, [terminalHistory]);

  const handleScrollTo = (id: string) => {
    setIsOpen(false);
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 80;
      const targetPosition = el.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top: targetPosition, behavior: "smooth" });
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsOpen(false);
    }, 1200);
  };

  const navCategory = locale === "es" ? "Navegación" : "Navigation";
  const actCategory = locale === "es" ? "Acciones" : "Actions";
  const lnkCategory = locale === "es" ? "Enlaces" : "Links";

  const options: CommandOption[] = [
    // Navegación
    {
      id: "nav-about",
      title: locale === "es" ? "Ir a Acerca de mí" : "Go to About me",
      subtitle: locale === "es" ? "Conoce mi biografía y trayectoria académica" : "Get to know my biography and academic path",
      category: navCategory,
      icon: Navigation,
      action: () => handleScrollTo("about"),
    },
    {
      id: "nav-experience",
      title: locale === "es" ? "Ir a Experiencia" : "Go to Experience",
      subtitle: locale === "es" ? "Historial de mis proyectos profesionales y roles" : "History of my professional projects and roles",
      category: navCategory,
      icon: Navigation,
      action: () => handleScrollTo("experience"),
    },
    {
      id: "nav-skills",
      title: locale === "es" ? "Ir a Habilidades" : "Go to Skills",
      subtitle: locale === "es" ? "Tecnologías y lenguajes en los que me especializo" : "Technologies and languages I specialize in",
      category: navCategory,
      icon: Navigation,
      action: () => handleScrollTo("skills"),
    },
    {
      id: "nav-portfolio",
      title: locale === "es" ? "Ir a Portfolio" : "Go to Portfolio",
      subtitle: locale === "es" ? "Echa un vistazo a mis proyectos destacados" : "Take a look at my featured projects",
      category: navCategory,
      icon: Navigation,
      action: () => handleScrollTo("portfolio"),
    },
    {
      id: "nav-contact",
      title: locale === "es" ? "Ir a Contacto" : "Go to Contact",
      subtitle: locale === "es" ? "Formas de comunicarte conmigo o ver mi ubicación" : "Ways to contact me or view my location",
      category: navCategory,
      icon: Navigation,
      action: () => handleScrollTo("contact"),
    },
    // Acciones
    {
      id: "act-terminal",
      title: locale === "es" ? "💻 Consola de Desarrollador (Terminal)" : "💻 Developer Console (Terminal)",
      subtitle: locale === "es" ? "Escribe comandos interactivos en una consola shell retro" : "Type interactive commands in a retro shell console",
      category: actCategory,
      icon: Sparkles,
      action: () => {
        setIsTerminalMode(true);
      },
    },
    {
      id: "act-cv",
      title: t.hero.ctaDownload,
      subtitle: locale === "es" ? "Obtén mi CV oficial en formato PDF" : "Get my official PDF Resume",
      category: actCategory,
      icon: FileDown,
      action: () => {
        window.open(personalInfo.cvUrl, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "act-email",
      title: copied ? (locale === "es" ? "¡Correo copiado!" : "Email copied!") : (locale === "es" ? "Copiar dirección de correo" : "Copy email address"),
      subtitle: personalInfo.email,
      category: actCategory,
      icon: copied ? Check : Copy,
      action: handleCopyEmail,
    },
    {
      id: "act-theme",
      title: locale === "es" ? "Cambiar tema de color" : "Change color theme",
      subtitle: locale === "es" ? "Alternar entre modo oscuro y claro" : "Toggle between dark and light mode",
      category: actCategory,
      icon: resolvedTheme === "dark" ? Sun : Moon,
      action: () => {
        setTheme(resolvedTheme === "dark" ? "light" : "dark");
        setIsOpen(false);
      },
    },
    // Enlaces
    {
      id: "lnk-linkedin",
      title: locale === "es" ? "Seguir en LinkedIn" : "Follow on LinkedIn",
      subtitle: locale === "es" ? "Conectemos profesionalmente" : "Let's connect professionally",
      category: lnkCategory,
      icon: Link,
      action: () => {
        window.open(personalInfo.linkedin, "_blank");
        setIsOpen(false);
      },
    },
    {
      id: "lnk-github",
      title: locale === "es" ? "Ver GitHub" : "View GitHub",
      subtitle: locale === "es" ? "Explora mis repositorios y código de origen" : "Explore my repositories and source code",
      category: lnkCategory,
      icon: Link,
      action: () => {
        window.open(personalInfo.github, "_blank");
        setIsOpen(false);
      },
    },
  ];

  // Interceptar comandos en caliente desde la barra de búsqueda general
  const dynamicOptions = [...options];
  if (search.startsWith("/")) {
    dynamicOptions.unshift({
      id: "act-run-terminal",
      title: locale === "es" ? `Ejecutar comando '${search}'` : `Run command '${search}'`,
      subtitle: locale === "es" ? "Presiona Enter para ejecutar este comando directamente en la terminal" : "Press Enter to execute this command directly in the terminal",
      category: actCategory,
      icon: Sparkles,
      action: () => {
        setIsTerminalMode(true);
        executeCommand(search);
      }
    });
  }

  // Filtrar opciones por búsqueda
  const filtered = dynamicOptions.filter(
    (opt) =>
      opt.title.toLowerCase().includes(search.toLowerCase()) ||
      opt.subtitle.toLowerCase().includes(search.toLowerCase()) ||
      opt.category.toLowerCase().includes(search.toLowerCase())
  );

  // Manejar teclado (Flechas y Enter)
  useEffect(() => {
    if (!isOpen || isTerminalMode || filtered.length === 0) return;

    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
      } else if (e.key === "Enter") {
        e.preventDefault();
        filtered[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [isOpen, filtered, selectedIndex, isTerminalMode]);

  // Mantener el index dentro del rango si el filtro cambia
  useEffect(() => {
    setSelectedIndex(0);
  }, [search]);

  // Lógica unificada de ejecución de comandos
  const executeCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase();
    if (!cleanCmd) return;

    const newHistory = [...terminalHistory, `> ${cmd}`];

    switch (cleanCmd) {
      case "/help":
        newHistory.push(...t.console.helpLines);
        break;
      case "/about":
        newHistory.push(...t.console.aboutLines);
        break;
      case "/skills":
        newHistory.push(...t.console.skillsLines);
        break;
      case "/contact":
        newHistory.push(...t.console.contactLines);
        break;
      case "/theme":
        const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        newHistory.push(t.console.themeSuccess);
        break;
      case "/cv":
        window.open(personalInfo.cvUrl, "_blank");
        newHistory.push(t.console.cvSuccess);
        break;
      case "/clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      case "/exit":
        setIsTerminalMode(false);
        setTerminalInput("");
        return;
      default:
        newHistory.push(t.console.errorCommand);
    }

    setTerminalHistory(newHistory);
    setTerminalInput("");
  };

  const handleTerminalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;
    executeCommand(terminalInput);
  };

  return (
    <>
      {/* Botón flotante indicador visible sutilmente en el footer/lateral */}
      <div className="fixed bottom-6 right-6 z-40 hidden md:block">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-black/5 dark:border-white/5 shadow-md hover:shadow-lg text-xs text-muted-foreground hover:text-foreground hover:scale-105 transition-all duration-300 cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
          <span>{locale === "es" ? "Presiona" : "Press"}</span>
          <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-[10px] font-mono border border-black/10 dark:border-white/10">
            Ctrl + K
          </kbd>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-hidden">
            {/* Overlay desenfocado */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/45 dark:bg-black/65 backdrop-blur-[4px]"
            />

            {/* Caja de Comandos */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              ref={menuRef}
              className="w-full max-w-xl max-h-[480px] rounded-3xl glass border border-black/5 dark:border-white/5 shadow-2xl overflow-hidden flex flex-col z-10"
            >
              {isTerminalMode ? (
                /* === MODO TERMINAL DE DESARROLLADOR === */
                <div className="flex-1 flex flex-col bg-[#050508] text-emerald-400 font-mono text-xs p-6 overflow-hidden select-text">
                  <div 
                    ref={terminalHistoryRef}
                    className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1.5 mb-3 h-[280px] pr-2"
                  >
                    {terminalHistory.map((line, i) => (
                      <div key={i} className="whitespace-pre-wrap leading-relaxed">
                        {line.startsWith("> ") ? (
                          <span className="text-primary font-bold">{line}</span>
                        ) : line.startsWith("Error:") || line.startsWith("error") ? (
                          <span className="text-rose-500">{line}</span>
                        ) : line.startsWith("SUCCESS:") ? (
                          <span className="text-primary font-bold">{line}</span>
                        ) : line.startsWith("---") ? (
                          <span className="text-cyan-400 font-bold">{line}</span>
                        ) : (
                          <span className="text-emerald-400/90">{line}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <form onSubmit={handleTerminalSubmit} className="flex items-center gap-2 border-t border-zinc-900 pt-3">
                    <span className="text-primary font-bold">marcos@rigo-os:~$</span>
                    <input
                      ref={terminalInputRef}
                      type="text"
                      value={terminalInput}
                      onChange={(e) => setTerminalInput(e.target.value)}
                      className="flex-1 bg-transparent text-emerald-400 focus:outline-none border-none caret-emerald-400 font-mono text-xs"
                      placeholder={t.console.promptPlaceholder}
                      autoFocus
                    />
                  </form>
                </div>
              ) : (
                /* === MODO MENU DE COMANDOS ESTÁNDAR === */
                <>
                  {/* Buscador */}
                  <div className="flex items-center gap-3 px-6 py-4 border-b border-black/5 dark:border-white/5">
                    <Search className="w-5 h-5 text-muted-foreground shrink-0" />
                    <input
                      ref={inputRef}
                      type="text"
                      placeholder={locale === "es" ? "¿A dónde quieres ir? Escribe algo (o empieza con /)..." : "Where do you want to go? Type something (or start with /)..."}
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      className="w-full bg-transparent text-sm focus:outline-none border-none text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Resultados */}
                  <div className="overflow-y-auto flex-1 py-3 px-2 custom-scrollbar max-h-[350px]">
                    {filtered.length === 0 ? (
                      <div className="py-12 px-6 text-center text-muted-foreground flex flex-col items-center justify-center gap-2">
                        <Sparkles className="w-8 h-8 text-primary/45" />
                        <span className="text-sm font-medium">{locale === "es" ? "No se encontraron resultados" : "No results found"}</span>
                      </div>
                    ) : (
                      <div>
                        {/* Renderizado de opciones agrupadas por categoría */}
                        {([navCategory, actCategory, lnkCategory]).map((category) => {
                          const catItems = filtered.filter((item) => item.category === category);
                          if (catItems.length === 0) return null;

                          return (
                            <div key={category} className="mb-4 last:mb-1">
                              <span className="px-4 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground/60 block">
                                {category}
                              </span>
                              <div className="flex flex-col gap-0.5 mt-1.5">
                                {catItems.map((item) => {
                                  // Obtener índice real en la lista filtrada global
                                  const globalIndex = filtered.findIndex((f) => f.id === item.id);
                                  const isSelected = selectedIndex === globalIndex;
                                  const Icon = item.icon;

                                  return (
                                    <button
                                      key={item.id}
                                      onClick={item.action}
                                      onMouseEnter={() => setSelectedIndex(globalIndex)}
                                      className={`flex items-center justify-between px-4 py-3 rounded-2xl w-full text-left transition-all duration-200 cursor-pointer ${
                                        isSelected
                                          ? "bg-primary text-white"
                                          : "hover:bg-zinc-100 dark:hover:bg-zinc-900"
                                      }`}
                                    >
                                      <div className="flex items-center gap-3">
                                        <div
                                          className={`p-2 rounded-xl shrink-0 ${
                                            isSelected
                                              ? "bg-white/20 text-white"
                                              : "bg-zinc-100 dark:bg-zinc-900 text-foreground border border-black/5 dark:border-white/5"
                                          }`}
                                        >
                                          <Icon className="w-4 h-4" />
                                        </div>
                                        <div>
                                          <span className="text-xs font-semibold block leading-tight">
                                            {item.title}
                                          </span>
                                          <span
                                            className={`text-[10px] block leading-tight mt-0.5 ${
                                              isSelected ? "text-white/80" : "text-muted-foreground"
                                            }`}
                                          >
                                            {item.subtitle}
                                          </span>
                                        </div>
                                      </div>

                                      {isSelected && (
                                        <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded text-white hidden sm:inline">
                                          Enter
                                        </span>
                                      )}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Pie de menú de comandos */}
              <div className="px-6 py-3 border-t border-black/5 dark:border-white/5 bg-zinc-500/5 text-[10px] text-muted-foreground flex items-center justify-between">
                <div className="flex gap-4">
                  {isTerminalMode ? (
                    <span>
                      {locale === "es" ? "Modo:" : "Mode:"} <strong className="text-emerald-500 font-bold">{t.console.footerMode}</strong>
                    </span>
                  ) : (
                    <>
                      <span>
                        <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono">↓↑</kbd> {locale === "es" ? "Navegar" : "Navigate"}
                      </span>
                      <span>
                        <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono">Enter</kbd> {locale === "es" ? "Ejecutar" : "Execute"}
                      </span>
                    </>
                  )}
                </div>
                <span>
                  <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono">Esc</kbd> {isTerminalMode ? (locale === "es" ? "Volver" : "Back") : (locale === "es" ? "Cerrar" : "Close")}
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
