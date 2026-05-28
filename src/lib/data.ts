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
  credentials?: string;
}

export const personalInfo: PersonalInfo = {
  name: "Marcos",
  lastName: "Rigo",
  fullName: "Rigo Marcos",
  title: "Desarrollador Web Full Stack",
  subtitle: "Estudiante Avanzado de Ingeniería en Sistemas de Información",
  bio: "Soy desarrollador web Full Stack con formación en Ingeniería en Sistemas de Información en la Universidad Tecnológica Nacional – Facultad Regional de Tucumán. Me especializo en el desarrollo web, combinando conocimientos técnicos con una constante actualización en nuevas tecnologías. Disfruto trabajar en equipo, resolver problemas y seguir aprendiendo para crecer tanto a nivel profesional como personal.",
  email: "marcos.rigo.10@gmail.com",
  phone: "+54 381 4163 584",
  location: "San Miguel de Tucumán, Tucumán, Argentina",
  cvUrl: "https://drive.google.com/file/d/1zKbxronim7KzmlQsATcI4lG-Sa8ybHsZ/view?usp=sharing",
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
    description: "Desarrollo integral de sitios institucionales y plataformas gubernamentales del Ministerio. Abarca desde el diseño de base de datos hasta la creación de APIs y maquetación de Frontend responsivo, con especial enfoque en testing funcional antes de producción para garantizar estabilidad y seguridad.",
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
    description: "Sitio web gubernamental oficial y blog de divulgación para el Secretario de Participación Ciudadana. Diseñado y optimizado para una alta legibilidad de artículos de opinión y noticias, adaptándose a cualquier dispositivo con alta fidelidad visual.",
    image: "/img/portfolio/jf.png",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Gulp"],
    liveUrl: "https://josefarhat.com/",
  },
  {
    id: "proj-2",
    title: "Mesa Federal de Participación Ciudadana",
    client: "Consejo Federal de Seguridad de la Nación Argentina",
    date: "Noviembre 2021",
    description: "Plataforma digital interactiva federal para la articulación de políticas públicas entre representantes de seguridad de todas las provincias argentinas. Facilita la carga de contenidos colaborativos, agendas de trabajo comunes y repositorio legal.",
    image: "/img/portfolio/mpc.png",
    stack: ["HTML5", "CSS3", "JavaScript", "Bootstrap", "Gulp"],
    liveUrl: "https://www.mesafederalpc.online/",
  },
  {
    id: "proj-3",
    title: "Rolling Cucina",
    client: "Rolling Code School (Proyecto de Graduación)",
    date: "Febrero 2023",
    description: "Aplicación web completa (MERN Stack) para la gestión y pedidos en línea de un restaurante. Incluye autenticación segura, menú interactivo y dinámico, carrito de compras, seguimiento de pedidos en tiempo real y una suite administrativa completa para la gestión de stocks, pedidos y roles de usuarios.",
    image: "/img/portfolio/rc.webp",
    stack: ["React", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    liveUrl: "https://rolling-cucina.netlify.app/",
    credentials: "Usuario: rollingcucina@rollingcucina.com | Contraseña: 123456Rc",
  },
];
