"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, Sparkles } from "lucide-react";
import { personalInfo } from "@/lib/data";
import Magnetic from "@/components/magnetic";
import { useLanguage } from "@/components/language-provider";
import SectionHeading from "@/components/section-heading";

interface ConfettiParticle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  angle: number;
  speed: number;
  borderRadius: number;
}

export default function ContactForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [confetti, setConfetti] = useState<ConfettiParticle[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const triggerConfetti = () => {
    const colors = ["#D81F2A", "#F5C84C", "#16355C", "#B8121D", "#0E2440", "#10b981"];
    const particles: ConfettiParticle[] = Array.from({ length: 70 }).map((_, i) => ({
      id: i,
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.7,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 4 + Math.random() * 8,
      angle: Math.random() * Math.PI * 2,
      speed: 3 + Math.random() * 8,
      borderRadius: Math.random() > 0.5 ? 50 : 2,
    }));
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 3000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    
    // Simular envío de correo con respuesta visual instantánea
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      triggerConfetti();
      setFormData({ name: "", email: "", message: "" });
      
      // Resetear mensaje de éxito tras 4 segundos
      setTimeout(() => setIsSuccess(false), 4500);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto relative overflow-hidden">
      {/* Lluvia de confeti de éxito */}
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {confetti.map((p) => (
          <motion.div
            key={p.id}
            initial={{ x: p.x, y: p.y, opacity: 1, scale: 1 }}
            animate={{
              x: p.x + Math.cos(p.angle) * p.speed * 45,
              y: p.y + Math.sin(p.angle) * p.speed * 45 + 180, // Se ve afectado por gravedad
              opacity: 0,
              scale: 0.2,
            }}
            transition={{ duration: 2.2, ease: "easeOut" }}
            style={{
              position: "absolute",
              backgroundColor: p.color,
              width: p.size,
              height: p.size,
              borderRadius: p.borderRadius,
            }}
          />
        ))}
      </div>

      {/* Cabecera de la Sección */}
      <SectionHeading tag={t.contact.tag} title={t.contact.title} description={t.contact.desc} />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 mt-12 items-start">
        {/* Columna Izquierda: Información de contacto (Ocupa 2 columnas) */}
        <div className="lg:col-span-2 flex flex-col gap-6 w-full">
          {/* Ficha de Correo */}
          <Magnetic range={50} strength={0.2}>
            <div className="rounded-3xl bg-card border border-border p-6 flex items-start gap-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300 w-full">
              <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/25 text-primary">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-0.5">
                  {t.contact.emailLabel}
                </span>
                <a
                  href={`mailto:${personalInfo.email}`}
                  className="text-sm font-semibold text-foreground hover:text-primary transition-colors font-sans break-all"
                >
                  {personalInfo.email}
                </a>
              </div>
            </div>
          </Magnetic>

          {/* Ficha de Ubicación */}
          <Magnetic range={50} strength={0.2}>
            <div className="rounded-3xl bg-card border border-border p-6 flex items-start gap-4 hover:border-primary/30 hover:shadow-lg transition-all duration-300 w-full">
              <div className="p-3.5 rounded-2xl bg-primary/10 border border-primary/25 text-primary">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground block mb-0.5">
                  {t.contact.locationLabel}
                </span>
                <span className="text-sm font-semibold text-foreground font-sans leading-snug">
                  {personalInfo.location}
                </span>
              </div>
            </div>
          </Magnetic>

          {/* Mapa responsivo de Google integrado hermosamente */}
          <div className="rounded-3xl bg-card border border-border overflow-hidden shadow-inner w-full h-[220px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113927.30717595005!2d-65.29263446298478!3d-26.832688471699427!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94223792d6c56903%3A0xf88d5b92b5c56527!2sSan%20Miguel%20de%20Tucum%C3%A1n%2C%20Tucum%C3%A1n!5e0!3m2!1ses!2sar!4v1648795163351!5m2!1ses!2sar"
              width="100%"
              height="100%"
              style={{ border: 0, filter: "opacity(0.85) grayscale(0.25)" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Columna Derecha: Formulario interactivo (Ocupa 3 columnas) */}
        <div className="lg:col-span-3 w-full">
          <div className="rounded-3xl bg-card border border-border p-8 relative overflow-hidden flex flex-col justify-between shadow-md h-full">
            <AnimatePresence mode="wait">
              {!isSuccess ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-5"
                >
                  {/* Fila Nombre */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 pl-1">
                      {t.contact.nameLabel}
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder={t.contact.namePlaceholder}
                      className="w-full px-5 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:border-primary text-foreground transition-all placeholder:text-muted-foreground/60"
                    />
                  </div>

                  {/* Fila Correo */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 pl-1">
                      {t.contact.emailFormLabel}
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder={t.contact.emailPlaceholder}
                      className="w-full px-5 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:border-primary text-foreground transition-all placeholder:text-muted-foreground/60"
                    />
                  </div>

                  {/* Fila Mensaje */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="message" className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground/80 pl-1">
                      {t.contact.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={t.contact.messagePlaceholder}
                      className="w-full px-5 py-3 rounded-2xl bg-background border border-border text-sm focus:outline-none focus:border-primary text-foreground transition-all placeholder:text-muted-foreground/60 resize-none"
                    />
                  </div>

                  {/* Botón de Envío */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary text-white font-bold text-sm shadow-md hover:bg-[#B8121D] hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 transition-all duration-300 cursor-pointer mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>{t.contact.submitting}</span>
                      </>
                    ) : (
                      <>
                        <span>{t.contact.submit}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.div
                  key="success-message"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center text-center py-16 gap-4"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center text-emerald-500 mb-2 shadow-inner">
                    <CheckCircle className="w-8 h-8 animate-pulse" />
                  </div>
                  <h3 className="font-heading font-extrabold text-2xl text-foreground">
                    {t.contact.successTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground max-w-sm leading-relaxed font-sans">
                    {t.contact.successDesc}
                  </p>
                  <div className="inline-flex items-center gap-1 text-[10px] font-bold text-primary tracking-widest uppercase mt-4">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.contact.confettiLabel}</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
