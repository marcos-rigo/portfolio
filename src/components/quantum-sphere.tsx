"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface Point3D {
  x: number; // Unit sphere coordinate
  y: number;
  z: number;
  ox: number; // Original unit sphere coordinate
  oy: number;
  oz: number;
  px?: number; // Projected 2D canvas coordinate
  py?: number;
  pz?: number; // Depth coordinate
}

interface MeshLine {
  p1: number;
  p2: number;
  dist: number;
}

export default function QuantumSphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false, tx: 0, ty: 0 });
  const scrollRef = useRef({ y: 0, currentY: 0 });
  const { resolvedTheme } = useTheme();
  
  // Auto-degradación para móviles
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detectar si es móvil
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    // Escuchar scroll
    const handleScroll = () => {
      scrollRef.current.y = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let width = 0;
    let height = 0;

    // Configuración física
    const N = isMobile ? 50 : 110; // Cantidad de partículas (Fase 2: Reducido en móvil para 120 FPS)
    const points: Point3D[] = [];
    const lines: MeshLine[] = [];
    
    // Inicializar Fibonacci Sphere (Distribución uniforme de puntos tridimensionales)
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden Angle en radianes
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2; // Y de 1 a -1
      const radius = Math.sqrt(1 - y * y); // Radio en la altura Y
      const theta = phi * i; // Incremento angular
      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;
      
      points.push({
        x, y, z,
        ox: x, oy: y, oz: z,
        px: 0, py: 0, pz: 0
      });
    }

    // Pre-calcular enlaces del vecindario más cercano para evitar O(N^2) en caliente
    // Esto optimiza a 120fps incluso con cientos de conexiones
    const maxConnectionsPerPoint = isMobile ? 0 : 3; // No trazar líneas en móvil
    if (maxConnectionsPerPoint > 0) {
      for (let i = 0; i < N; i++) {
        const distances: { index: number; dist: number }[] = [];
        
        for (let j = 0; j < N; j++) {
          if (i === j) continue;
          const dx = points[i].ox - points[j].ox;
          const dy = points[i].oy - points[j].oy;
          const dz = points[i].oz - points[j].oz;
          const dist = dx*dx + dy*dy + dz*dz; // Distancia euclídea al cuadrado (más rápido)
          distances.push({ index: j, dist });
        }
        
        // Ordenar y tomar los K vecinos más cercanos
        distances.sort((a, b) => a.dist - b.dist);
        for (let k = 0; k < maxConnectionsPerPoint; k++) {
          const neighbor = distances[k];
          // Evitar duplicar enlaces bidireccionales en el array
          if (i < neighbor.index) {
            lines.push({
              p1: i,
              p2: neighbor.index,
              dist: Math.sqrt(neighbor.dist)
            });
          }
        }
      }
    }

    // Adaptar tamaño
    const resize = () => {
      const rect = container.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      
      // Adaptar resolución de pantalla retina / alta densidad
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    // Seguimiento del puntero local
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      
      mouseRef.current.tx = clientX - width / 2;
      mouseRef.current.ty = clientY - height / 2;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    // Ángulos orbitales de rotación
    let rotX = 0;
    let rotY = 0;
    
    // Inercia rotacional física
    let targetRotXSpeed = 0.004;
    let targetRotYSpeed = 0.005;
    let currentRotXSpeed = targetRotXSpeed;
    let currentRotYSpeed = targetRotYSpeed;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Filtrar colores en función del tema activo (Cyber Crimson Rubí y Violeta Eléctrico WCAG AAA)
      const isDark = resolvedTheme === "dark";
      const particleColor = isDark ? "rgba(255, 0, 63, " : "rgba(196, 0, 45, ";
      const glowColor = isDark ? "rgba(255, 0, 63, 0.4)" : "rgba(196, 0, 45, 0.35)";
      const meshColor = isDark ? "rgba(255, 0, 63, " : "rgba(196, 0, 45, ";
      const highlightColor = isDark ? "rgba(139, 92, 246, " : "rgba(109, 40, 217, "; // Violeta de acento

      // 2. Física líquida de inercia y amortiguación del scroll
      const scroll = scrollRef.current;
      scroll.currentY += (scroll.y - scroll.currentY) * 0.08;
      
      // La rotación base se acelera e inclina en función del scroll
      const scrollSpeedFactor = Math.abs(scroll.y - scroll.currentY) * 0.015;
      
      // 3. Interacción del mouse con amortiguamiento suave
      const mouse = mouseRef.current;
      if (mouse.active) {
        // Rotación orbital ligeramente sesgada por la posición del mouse
        currentRotXSpeed += (mouse.ty * 0.00005 - currentRotXSpeed) * 0.06;
        currentRotYSpeed += (mouse.tx * 0.00005 - currentRotYSpeed) * 0.06;
      } else {
        // Volver a velocidad orbital tranquila por defecto + influencia de scroll
        const scrollBonus = Math.min(scrollSpeedFactor, 0.04);
        currentRotXSpeed += (targetRotXSpeed + scrollBonus - currentRotXSpeed) * 0.03;
        currentRotYSpeed += (targetRotYSpeed + scrollBonus * 1.5 - currentRotYSpeed) * 0.03;
      }

      rotX += currentRotXSpeed;
      rotY += currentRotYSpeed;

      // Matriz de rotación en 3D
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);

      // Dimensiones de escala del dibujo
      const sphereRadius = Math.min(width, height) * (isMobile ? 0.38 : 0.36);
      const focalLength = 320; // Longitud focal de perspectiva 3D

      // 4. Transformar, rotar e interactuar con cada punto
      points.forEach((p) => {
        // Rotar sobre eje Y
        let x1 = p.ox * cosY - p.oz * sinY;
        let z1 = p.oz * cosY + p.ox * sinY;

        // Rotar sobre eje X
        let y2 = p.oy * cosX - z1 * sinX;
        let z2 = z1 * cosX + p.oy * sinX;

        // Coordenadas 3D escaladas
        let x3 = x1 * sphereRadius;
        let y3 = y2 * sphereRadius;
        let z3 = z2 * sphereRadius;

        // Distorsión cuántica de puntero:
        // Si el mouse está activo, deformamos la esfera atrayendo/repeliendo
        // las partículas más cercanas en función de su proyección
        if (mouse.active) {
          // Proyección 2D temporal para medir distancia al cursor
          const scale = focalLength / (focalLength + z3);
          const tempPx = x3 * scale;
          const tempPy = y3 * scale;
          
          const dx = mouse.tx - tempPx;
          const dy = mouse.ty - tempPy;
          const distSq = dx*dx + dy*dy;
          const interactionRange = 100 * 100; // Radio de 100px
          
          if (distSq < interactionRange) {
            const dist = Math.sqrt(distSq) || 1;
            const force = (100 - dist) / 100; // Intensidad lineal inversa
            
            // Empujamos en 3D levemente (deformación de gravedad molecular)
            // Atracción si está al frente, repulsión sutil
            const pushDir = z3 > 0 ? 1 : -0.3; // Tirar al frente, empujar atrás
            x3 += (dx / dist) * force * pushDir * 32;
            y3 += (dy / dist) * force * pushDir * 32;
            z3 -= force * pushDir * 15; // Deformación en profundidad
          }
        }

        // Proyección de Perspectiva 3D cónica definitiva
        const scale = focalLength / (focalLength + z3);
        p.px = width / 2 + x3 * scale;
        p.py = height / 2 + y3 * scale;
        p.pz = z3; // Usado para Z-buffering/opacidad de profundidad
      });

      // 5. Dibujar los enlaces de la malla (Trazado de líneas 3D)
      if (!isMobile && lines.length > 0) {
        ctx.lineWidth = 0.55;
        lines.forEach((line) => {
          const p1 = points[line.p1];
          const p2 = points[line.p2];
          
          // Solo dibujar si ambos puntos están razonablemente definidos
          if (p1.px !== undefined && p1.py !== undefined && p2.px !== undefined && p2.py !== undefined) {
            // Calcular opacidad en base a profundidad promedio (Z-buffer)
            const avgZ = ((p1.pz || 0) + (p2.pz || 0)) / 2;
            
            // Fading out de líneas que están en la parte posterior de la esfera
            // sphereRadius va de -R a +R. z > 0 está atrás, z < 0 está al frente.
            const maxZ = sphereRadius;
            const alpha = Math.max(0, (maxZ - avgZ) / (maxZ * 2.2)) * 0.16;
            
            if (alpha > 0.01) {
              // Gradiente de color según la profundidad
              ctx.strokeStyle = `${meshColor}${alpha})`;
              ctx.beginPath();
              ctx.moveTo(p1.px, p1.py);
              ctx.lineTo(p2.px, p2.py);
              ctx.stroke();
            }
          }
        });
      }

      // 6. Dibujar partículas individuales con sombreado de profundidad
      // Ordenar puntos por Z de atrás hacia adelante para pintar correctamente (Pintor/Z-Sort)
      const sortedPoints = [...points].sort((a, b) => (b.pz || 0) - (a.pz || 0));

      sortedPoints.forEach((p) => {
        if (p.px === undefined || p.py === undefined || p.pz === undefined) return;
        
        // Mapeo de tamaño por perspectiva
        // Rango de pz de -sphereRadius (cerca) a +sphereRadius (lejos)
        const sizeFactor = (sphereRadius - p.pz) / (sphereRadius * 2); // 1 = ultra cerca, 0 = lejos
        const radius = isMobile 
          ? (1.0 + sizeFactor * 2.5) 
          : (1.5 + sizeFactor * 3.5);
        
        // Opacidad basada en profundidad
        const alpha = Math.max(0.12, (sphereRadius - p.pz) / (sphereRadius * 1.8)) * 0.85;

        // Comprobación de proximidad del cursor para resaltar puntos hiperactivos
        let isHighlighted = false;
        if (mouse.active) {
          const dx = mouse.tx - (p.px - width / 2);
          const dy = mouse.ty - (p.py - height / 2);
          if (dx*dx + dy*dy < 400) { // 20px de proximidad
            isHighlighted = true;
          }
        }

        // Color final de partícula
        ctx.fillStyle = isHighlighted 
          ? `${highlightColor}${alpha * 1.2})` 
          : `${particleColor}${alpha})`;

        // Glow destellante para las partículas frontales
        if (p.pz < -sphereRadius * 0.4 && !isMobile) {
          ctx.shadowBlur = isHighlighted ? 12 : 8;
          ctx.shadowColor = glowColor;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(p.px, p.py, radius, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Limpiar sombra para siguientes renders
      ctx.shadowBlur = 0;

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [resolvedTheme, isMobile]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-full min-h-[300px] flex items-center justify-center relative select-none"
    >
      <canvas 
        ref={canvasRef} 
        className="block cursor-grab active:cursor-grabbing max-w-full max-h-full"
      />
    </div>
  );
}
