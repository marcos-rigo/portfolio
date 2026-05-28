"use client";

import React, { useEffect, useRef } from "react";
import { useTheme } from "next-themes";

interface FluidBlob {
  x: number;
  y: number;
  radius: number;
  color: string;
  angle: number;
  speed: number;
  orbitRadius: number;
  originalX: number;
  originalY: number;
}

interface CyberParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let blobs: FluidBlob[] = [];
    let particles: CyberParticle[] = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initScene();
    };

    const initScene = () => {
      const w = canvas.width;
      const h = canvas.height;

      // 1. Inicializar Fluid Blobs (Orbes ambientales gigantes desenfocados)
      blobs = [];
      const blobCount = 4;
      const blobColors =
        resolvedTheme === "dark"
          ? [
              "rgba(255, 0, 63, 0.18)",   // Crimson Rubí Neón más rojo
              "rgba(139, 92, 246, 0.15)",  // Violeta Eléctrico exacto
              "rgba(255, 0, 63, 0.10)",   // Crimson secundario más rojo
              "rgba(139, 92, 246, 0.10)",  // Violeta secundario
            ]
          : [
              "rgba(196, 0, 45, 0.12)",    // Crimson Rubí ajustado para WCAG AAA
              "rgba(109, 40, 217, 0.08)",   // Violeta Eléctrico ajustado para WCAG AAA
              "rgba(196, 0, 45, 0.06)",    // Crimson secundario claro
              "rgba(109, 40, 217, 0.05)",   // Violeta secundario claro
            ];

      for (let i = 0; i < blobCount; i++) {
        const radius = Math.min(w, h) * (0.3 + Math.random() * 0.15);
        const x = Math.random() * w;
        const y = Math.random() * h;
        blobs.push({
          x,
          y,
          radius,
          color: blobColors[i % blobColors.length],
          angle: Math.random() * Math.PI * 2,
          speed: 0.0006 + Math.random() * 0.001,
          orbitRadius: 80 + Math.random() * 120,
          originalX: x,
          originalY: y,
        });
      }

      // 2. Inicializar Cyber Particles (Constelación nítida con líneas de neón)
      particles = [];
      // Ajustar cantidad de partículas según tamaño de pantalla
      const particleCount = Math.min(Math.floor((w * h) / 18000), 75);
      const particleColor = resolvedTheme === "dark" ? "255, 31, 90" : "200, 0, 54";

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          size: 1.2 + Math.random() * 2.2,
          color: particleColor,
          alpha: 0.15 + Math.random() * 0.6,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    
    resizeCanvas();

    // Loop de renderizado principal
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width;
      const h = canvas.height;
      const mouse = mouseRef.current;

      // === CAPA 1: Orbes de Fluidos (Optimizados por hardware a 120 FPS) ===
      // Ya no aplicamos ctx.filter = "blur(90px)" aquí. En su lugar, el gradiente radial nativo
      // y el CSS backdrop-blur-[50px] del overlay realizan el difuminado súper rápido vía GPU.
      blobs.forEach((blob) => {
        // Órbita lenta
        blob.angle += blob.speed;
        const targetX = blob.originalX + Math.cos(blob.angle) * blob.orbitRadius;
        const targetY = blob.originalY + Math.sin(blob.angle) * blob.orbitRadius;

        // Atracción sutil al mouse
        if (mouse.active) {
          const dx = mouse.x - blob.x;
          const dy = mouse.y - blob.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 250000) { // 500^2
            const dist = Math.sqrt(distSq) || 1;
            const force = (500 - dist) / 500;
            blob.x += (targetX + (dx / dist) * force * 100 - blob.x) * 0.02;
            blob.y += (targetY + (dy / dist) * force * 100 - blob.y) * 0.02;
          } else {
            blob.x += (targetX - blob.x) * 0.02;
            blob.y += (targetY - blob.y) * 0.02;
          }
        } else {
          blob.x += (targetX - blob.x) * 0.02;
          blob.y += (targetY - blob.y) * 0.02;
        }

        // Límites del canvas
        if (blob.x < -blob.radius) blob.x = w + blob.radius;
        if (blob.x > w + blob.radius) blob.x = -blob.radius;
        if (blob.y < -blob.radius) blob.y = h + blob.radius;
        if (blob.y > h + blob.radius) blob.y = -blob.radius;

        // Gradiente radial
        const radGrad = ctx.createRadialGradient(
          blob.x, blob.y, 0,
          blob.x, blob.y, blob.radius
        );
        radGrad.addColorStop(0, blob.color);
        radGrad.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = radGrad;
        ctx.beginPath();
        ctx.arc(blob.x, blob.y, blob.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      // === CAPA 2: Constelación de partículas nítidas y líneas de neón ===
      
      // Dibujar líneas entre partículas cercanas (Optimización de física cuántica)
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          // Evitamos Math.sqrt a menos que la distancia al cuadrado sea inferior a 110px^2 (12100)
          if (distSq < 12100) {
            const dist = Math.sqrt(distSq) || 1;
            const alpha = (110 - dist) / 110 * 0.15;
            ctx.strokeStyle = `rgba(${p1.color}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      // Actualizar e individualizar cada partícula
      particles.forEach((p) => {
        // Movimiento base
        p.x += p.vx;
        p.y += p.vy;

        // Interacción física con el puntero (Optimización de distancia al cuadrado)
        if (mouse.active) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < 32400) { // 180^2
            const dist = Math.sqrt(distSq) || 1;
            const force = (180 - dist) / 180;
            // Atracción magnética sutil hacia el cursor con aceleración líquida
            p.x += (dx / dist) * force * 1.8;
            p.y += (dy / dist) * force * 1.8;
          }
        }

        // Rebote o reubicación en límites del lienzo
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // Dibujar partícula con un destello neon
        ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [resolvedTheme]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none -z-20 transition-opacity duration-1000 bg-background"
      />
      {/* Desenfoque de fondo ultra suave sobre la capa de orbes pero debajo del contenido principal */}
      <div className="fixed inset-0 pointer-events-none -z-10 backdrop-blur-[50px] opacity-95 dark:opacity-90" />
    </>
  );
}
