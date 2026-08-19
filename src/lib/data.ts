export interface PersonalInfo {
  name: string;
  lastName: string;
  fullName: string;
  title: string;
  subtitle: string;
  bio: string;
  email: string;
  phone: string;
  location: string;
  cvUrl: string;
  github: string;
  linkedin: string;
  profileImage: string;
  logoImage: string;
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface SkillItem {
  name: string;
  category: "Frontend" | "Backend" | "Herramientas" | "Otros";
  icon: string;
  glowColor: string; // color en formato rgba para el glow hover
}

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  date: string;
  description: string;
  image: string;
  stack: string[];
  liveUrl: string;
  repoUrl?: string;
  credentials?: string;
}

export const personalInfo: PersonalInfo = {
  name: "Marcos",
  lastName: "Rigo",
  fullName: "Rigo Marcos",
  title: "Desarrollador Web Full Stack",
  subtitle: "Estudiante Avanzado de Ingeniería en Sistemas de Información",
  bio: "Soy desarrollador web Full Stack, con formación en Ingeniería en Sistemas de Información en la UTN – Facultad Regional Tucumán. Me especializo en desarrollo web y trato de estar siempre actualizado con las tecnologías que uso. Me gusta trabajar en equipo, resolver problemas y seguir aprendiendo, tanto a nivel profesional como personal.",
  email: "marcos.rigo.10@gmail.com",
  phone: "+54 381 4163 584",
  location: "San Miguel de Tucumán, Tucumán, Argentina",
  cvUrl: "https://drive.google.com/file/d/1ipjl-qcKldatX2tvJI0FSzehcnYmVzqT/view?usp=sharing",
  github: "https://github.com/marcos-rigo",
  linkedin: "https://www.linkedin.com/in/marcos-rigo/",
  profileImage: "/img/profile.png",
  logoImage: "/img/logo-white.png",
};

export const experiences: ExperienceItem[] = [
  {
    id: "exp-1",
    company: "Ministerio de Seguridad de Tucumán",
    role: "Desarrollador Full Stack",
    period: "2020 - Presente",
    description: "+50.000 usuarios mensuales atendidos y Lighthouse 90+ en producción. Desarrollo integral de sitios institucionales y plataformas gubernamentales del Ministerio: diseño de base de datos, APIs y frontend responsivo, con foco en testing funcional antes de cada despliegue para garantizar estabilidad y seguridad.",
  },
  {
    id: "exp-2",
    company: "Gobierno de Tucumán",
    role: "Desarrollador Web",
    period: "2018 - Presente",
    description: "Creación y mantenimiento continuo de sitios institucionales responsivos de cara al ciudadano. Coordinación técnica de requerimientos y despliegue rápido de interfaces web accesibles y óptimas, aplicando testing funcional exhaustivo de pre-producción.",
  },
];

export const skills: SkillItem[] = [
  // Frontend
  { name: "React", category: "Frontend", icon: "react", glowColor: "rgba(59,130,246,0.5)" },
  { name: "JavaScript", category: "Frontend", icon: "javascript", glowColor: "rgba(245,158,11,0.5)" },
  { name: "HTML5", category: "Frontend", icon: "html", glowColor: "rgba(239,68,68,0.5)" },
  { name: "CSS3", category: "Frontend", icon: "css", glowColor: "rgba(59,130,246,0.5)" },
  { name: "Bootstrap", category: "Frontend", icon: "bootstrap", glowColor: "rgba(139,92,246,0.5)" },
  { name: "Next.js", category: "Frontend", icon: "next", glowColor: "rgba(255,255,255,0.2)" },
  { name: "Tailwind CSS", category: "Frontend", icon: "tailwind", glowColor: "rgba(6,182,212,0.5)" },

  // Backend
  { name: "Node.js", category: "Backend", icon: "node", glowColor: "rgba(34,197,94,0.5)" },
  { name: "Express.js", category: "Backend", icon: "express", glowColor: "rgba(161,161,170,0.5)" },
  { name: "MongoDB", category: "Backend", icon: "mongodb", glowColor: "rgba(16,185,129,0.5)" },
  
  // Herramientas
  { name: "Git", category: "Herramientas", icon: "git", glowColor: "rgba(240,80,50,0.5)" },
  { name: "GitHub", category: "Herramientas", icon: "github", glowColor: "rgba(255,255,255,0.2)" },
  { name: "Trello", category: "Herramientas", icon: "trello", glowColor: "rgba(59,130,246,0.5)" },

  // Otros
  { name: "Java (POO)", category: "Otros", icon: "java", glowColor: "rgba(239,68,68,0.5)" },
  { name: "Inglés (B2)", category: "Otros", icon: "english", glowColor: "rgba(16,185,129,0.5)" },
];

export const projects: ProjectItem[] = [
  {
    id: "proj-1",
    title: "Página Oficial José Farhat",
    client: "Secretario de Estado de Participación Ciudadana del Ministerio de Seguridad de Tucumán",
    date: "Abril 2022",
    description: "Sitio institucional y blog de opinión para un funcionario público con alto volumen de lectores. Prioricé la legibilidad de artículos largos con una jerarquía tipográfica pensada para lectura prolongada y un pipeline Gulp que sirve CSS/JS minificados. Resultado: tiempos de carga bajos y una experiencia de lectura consistente en cualquier dispositivo.",
    image: "/img/portfolio/jf.png",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Gulp"],
    liveUrl: "https://josefarhat.com/",
  },
  {
    id: "proj-2",
    title: "Mesa Federal de Participación Ciudadana",
    client: "Consejo Federal de Seguridad de la Nación Argentina",
    date: "Noviembre 2021",
    description: "Plataforma para que representantes de seguridad de las 24 provincias coordinen políticas públicas sin depender de planillas y correos dispersos. Centralicé agendas, documentos y un repositorio legal compartido en una sola interfaz. Resultado: un punto único de referencia accesible para equipos distribuidos en todo el país.",
    image: "/img/portfolio/mpc.png",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Gulp"],
    liveUrl: "https://www.mesafederalpc.online/",
  },
  {
    id: "proj-3",
    title: "Rolling Cucina",
    client: "Rolling Code School (Proyecto de Graduación)",
    date: "Febrero 2023",
    description: "App de pedidos online para un restaurante, con carrito, seguimiento de pedidos en tiempo real y una suite administrativa completa. Implementé autenticación por roles (admin/cliente) para separar el panel de gestión de stock y pedidos del frontend de compra pública. Proyecto de graduación de Rolling Code School, desplegado en producción.",
    image: "/img/portfolio/rc.webp",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://rolling-cucina.netlify.app/",
    credentials: "Usuario: rollingcucina@rollingcucina.com | Contraseña: 123456Rc",
  },
];
