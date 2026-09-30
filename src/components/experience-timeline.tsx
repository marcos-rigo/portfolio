"use client";

import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { experiences, ExperienceItem, ExperienceStage } from "@/lib/data";
import { TranslationSchema } from "@/lib/translations";
import { use3DTilt } from "@/hooks/use-3d-tilt";
import { useLanguage } from "@/components/language-provider";
import SectionHeading from "@/components/section-heading";

interface TiltCardProps {
  experience: ExperienceItem;
  index: number;
}

interface StageBlockProps {
  stage: ExperienceStage;
  trans: TranslationSchema["experience"]["items"][string]["stages"][string];
  currentLabel: string;
  showConnector: boolean;
  showPeriod: boolean;
  isLast: boolean;
}

function StageBlock({ stage, trans, currentLabel, showConnector, showPeriod, isLast }: StageBlockProps) {
  return (
    <div className={`relative ${showConnector ? "pl-6" : ""} ${isLast ? "" : "pb-6"}`}>
      {showConnector && (
        <>
          {/* Punto de la sub-etapa */}
          <span className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-accent border-2 border-card shrink-0" />
          {/* Línea conectora de la sub-etapa */}
          {!isLast && <span className="absolute left-[4.5px] top-4 bottom-0 w-px bg-border" />}
        </>
      )}

      {showPeriod && (
        <div className="flex flex-wrap items-center gap-2 mb-1.5">
          <span className="text-sm font-semibold text-primary">{trans.period}</span>
          {stage.current && (
            <span className="text-[11px] font-bold uppercase tracking-widest text-white px-2 py-0.5 rounded-full bg-primary">
              {currentLabel}
            </span>
          )}
        </div>
      )}

      <h5 className={`font-heading font-bold text-foreground leading-snug ${showPeriod ? "text-base sm:text-lg" : "heading-card"}`}>
        {trans.role}
      </h5>

      <ul className="flex flex-col gap-1.5 mt-2">
        {trans.bullets.map((bullet, i) => (
          <li key={i} className="flex items-start gap-2 text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-primary/50 shrink-0" />
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

      <div className="flex flex-wrap gap-1.5 mt-3">
        {stage.technologies.map((tech) => (
          <span
            key={tech}
            className="px-2.5 py-1 rounded-full bg-muted text-sm font-semibold text-foreground border border-border"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

function TiltCard({ experience, index }: TiltCardProps) {
  const { ref, onMouseMove, onMouseLeave, style } = use3DTilt(8);
  const { t } = useLanguage();
  const isEven = index % 2 === 0;

  const trans = t.experience.items[experience.id];
  const hasMultipleStages = experience.stages.length > 1;

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
      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-primary border-4 border-background flex items-center justify-center z-10 shadow-md">
        <div className="w-2.5 h-2.5 rounded-full bg-white" />
      </div>

      {/* Caja de la Experiencia con Efecto 3D Tilt */}
      <div className={`w-full md:w-[45%] pl-12 md:pl-0 ${isEven ? "md:pr-10" : "md:pl-10"}`}>
        <motion.div
          ref={ref}
          onMouseMove={onMouseMove}
          onMouseLeave={onMouseLeave}
          style={style}
          className="rounded-3xl card-surface group cursor-default select-none overflow-hidden p-6 sm:p-8"
        >
          {/* Cabecera del puesto */}
          <div className="flex flex-col gap-3 mb-5 pb-5 border-b border-black/5 dark:border-white/5">
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-primary">
              <Calendar className="w-4 h-4" />
              <span>{trans.period}</span>
              {experience.current && (
                <span className="text-[11px] font-bold uppercase tracking-widest text-white px-2 py-0.5 rounded-full bg-primary">
                  {t.experience.currentLabel}
                </span>
              )}
            </div>

            {trans.company && (
              <h4 className="heading-card font-heading font-bold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                {trans.company}
              </h4>
            )}

            {trans.companySubtitle && (
              <span className="text-sm font-medium text-muted-foreground leading-snug">
                {trans.companySubtitle}
              </span>
            )}
          </div>

          {/* Etapas / sub-timeline */}
          <div className="flex flex-col">
            {experience.stages.map((stage, i) => (
              <StageBlock
                key={stage.id}
                stage={stage}
                trans={trans.stages[stage.id]}
                currentLabel={t.experience.currentLabel}
                showConnector={hasMultipleStages}
                showPeriod={hasMultipleStages}
                isLast={i === experience.stages.length - 1}
              />
            ))}
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
    <section id="experience" className="py-24 container-wide section-surface section-surface-a relative">
      {/* Título de la Sección */}
      <SectionHeading tag={t.experience.tag} title={t.experience.title} />

      {/* Contenedor de la línea de tiempo */}
      <div className="relative mt-12 pl-4 md:pl-0">
        {/* Eje de la línea vertical */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-primary/30" />

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
