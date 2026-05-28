"use client";

import React, { useRef } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Hook de React reutilizable para aplicar transformaciones matriciales 3D Tilt
 * al pasar el mouse por encima de un componente (tarjeta, contenedor, etc.)
 * 
 * @param maxTilt Ángulo máximo de inclinación en grados
 * @returns Ref, manejadores de eventos y objeto de estilo para Framer Motion
 */
export function use3DTilt(maxTilt = 10) {
  const ref = useRef<HTMLDivElement>(null);

  // Coordenadas normalizadas [0, 1] respecto al centro de la tarjeta
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);

  // Configuración física de resortes para amortiguar el movimiento
  const springConfig = { stiffness: 130, damping: 20, mass: 0.8 };
  const xSpring = useSpring(x, springConfig);
  const ySpring = useSpring(y, springConfig);

  // Mapear coordenadas [0, 1] a ángulos [-maxTilt, maxTilt] en grados
  const rotateX = useTransform(ySpring, [0, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(xSpring, [0, 1], [-maxTilt, maxTilt]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Calcular posición del cursor en proporción normalizada [0, 1]
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;

    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    // Retornar suavemente al centro original
    x.set(0.5);
    y.set(0.5);
  };

  return {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    style: {
      rotateX,
      rotateY,
      transformStyle: "preserve-3d" as const,
    },
  };
}
