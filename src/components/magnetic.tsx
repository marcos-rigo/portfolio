"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

interface MagneticProps {
  children: React.ReactElement<any>;
  range?: number; // Radio de atracción en píxeles
  strength?: number; // Fuerza de la atracción (ej. 0.35 para 35%)
}

export default function Magnetic({ children, range = 60, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Configuración de físicas de resorte para un movimiento orgánico de alta fidelidad
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const x = useSpring(useMotionValue(0), springConfig);
  const y = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    
    // Punto medio del componente
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    // Distancia del puntero al centro
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;
    
    // Calcular distancia Euclidiana
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    if (distance < range) {
      // Atraer el componente hacia el puntero aplicando la fuerza configurada
      x.set(deltaX * strength);
      y.set(deltaY * strength);
    } else {
      // Si sale del rango de atracción, volver a la posición original
      x.set(0);
      y.set(0);
    }
  };

  const handleMouseLeave = () => {
    // Resetear posición al salir el cursor por completo
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
