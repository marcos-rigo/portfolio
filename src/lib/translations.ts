import { personalInfo } from "./data";

export interface TranslationSchema {
  nav: {
    about: string;
    experience: string;
    skills: string;
    portfolio: string;
    contact: string;
  };
  hero: {
    tag: string;
    bio: string;
    ctaView: string;
    ctaDownload: string;
  };
  bento: {
    presentation: string;
    bioTitle: string;
    location: string;
    locationDesc: string;
    timezone: string;
    languages: string;
    spanish: string;
    spanishLevel: string;
    english: string;
    englishLevel: string;
    englishDesc: string;
    specialization: string;
    specTitle: string;
    specDesc1: string;
    specDesc2: string;
    skillsMap: string;
    githubTag: string;
    githubTitle: string;
    githubDesc: string;
    githubFollowers: string;
    githubRepos: string;
    githubActivity: string;
    githubLoading: string;
    githubFallback: string;
    githubCommits: string;
  };
  experience: {
    tag: string;
    title: string;
    detailsLabel: string;
    items: {
      [id: string]: {
        role: string;
        company: string;
        description: string;
      };
    };
  };
  skills: {
    tag: string;
    title: string;
    desc: string;
    categories: {
      Frontend: string;
      Backend: string;
      Herramientas: string;
      Otros: string;
    };
  };
  portfolio: {
    tag: string;
    title: string;
    desc: string;
    filters: {
      Todos: string;
      Fullstack: string;
      Gulp: string;
    };
    modal: {
      client: string;
      date: string;
      about: string;
      stack: string;
      demo: string;
      demoDesc: string;
      copy: string;
      copied: string;
      visit: string;
      close: string;
      qualityTitle: string;
      archTitle: string;
      dbTitle: string;
      edgeTitle: string;
      edgeDesc: string;
    };
    items: {
      [id: string]: {
        title: string;
        client: string;
        description: string;
      };
    };
  };
  contact: {
    tag: string;
    title: string;
    desc: string;
    emailLabel: string;
    phoneLabel: string;
    locationLabel: string;
    nameLabel: string;
    namePlaceholder: string;
    emailFormLabel: string;
    emailPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDesc: string;
    confettiLabel: string;
    footer: string;
  };
  console: {
    bootMessage1: string;
    bootMessage2: string;
    bootMessage3: string;
    bootMessage4: string;
    promptPlaceholder: string;
    footerMode: string;
    helpLines: string[];
    aboutLines: string[];
    skillsLines: string[];
    contactLines: string[];
    themeSuccess: string;
    cvSuccess: string;
    errorCommand: string;
  };
}

export const translations: Record<"es" | "en", TranslationSchema> = {
  es: {
    nav: {
      about: "Acerca de mí",
      experience: "Experiencia",
      skills: "Habilidades",
      portfolio: "Portfolio",
      contact: "Contacto",
    },
    hero: {
      tag: "Ingeniería en Sistemas & Desarrollo Web",
      bio: "Combino rigurosidad técnica de sistemas con la pasión por el diseño de interfaces moderno, creando productos rápidos, 100% responsivos y pulidos al milímetro.",
      ctaView: "Ver mi trabajo",
      ctaDownload: "Descargar CV",
    },
    bento: {
      presentation: "Presentación",
      bioTitle: "Diseño de software con enfoque integral y alta escalabilidad",
      location: "Ubicación",
      locationDesc: "San Miguel de Tucumán. Disponible para trabajar de forma remota y relocalización presencial.",
      timezone: "Huso Horario",
      languages: "Idiomas",
      spanish: "Español",
      spanishLevel: "Nativo",
      english: "Inglés",
      englishLevel: "B2 (Avanzado)",
      englishDesc: "Estudios avanzados cursados en el Instituto Cultural Anglo.",
      specialization: "Especialización",
      specTitle: "Ingeniería de Software Aplicada",
      specDesc1: "Mi formación en Sistemas de Información me capacita para estructurar arquitecturas escalables, diseñar modelos de datos estructurados y optimizar algoritmos.",
      specDesc2: "Esto lo traslado a mi desarrollo Full Stack, estructurando APIs REST seguras con Node.js/Express, bases de datos optimizadas con MongoDB o SQL, y código modular de alto rendimiento en React/Next.js.",
      skillsMap: "Mapeo de Capacidades",
      githubTag: "Actividad en tiempo real",
      githubTitle: "Integración con GitHub",
      githubDesc: "Estadísticas vivas consumidas directamente desde mi perfil oficial en GitHub, con almacenamiento en caché local optimizado.",
      githubFollowers: "Seguidores",
      githubRepos: "Repositorios públicos",
      githubActivity: "Historial de Contribuciones (Último Año)",
      githubLoading: "Consultando API de GitHub...",
      githubFallback: "Modo fuera de línea (Datos en Caché)",
      githubCommits: "contribuciones el",
    },
    experience: {
      tag: "Trayectoria",
      title: "Experiencia Laboral",
      detailsLabel: "Proyectos gubernamentales",
      items: {
        "exp-1": {
          role: "Desarrollador Full Stack",
          company: "Ministerio de Seguridad de Tucumán",
          description: "Desarrollo integral de sitios institucionales y plataformas gubernamentales del Ministerio. Abarca desde el diseño de base de datos hasta la creación de APIs y maquetación de Frontend responsivo, con especial enfoque en testing funcional antes de producción para garantizar estabilidad y seguridad.",
        },
        "exp-2": {
          role: "Desarrollador Web",
          company: "Gobierno de Tucumán",
          description: "Creación y mantenimiento continuo de sitios institucionales responsivos de cara al ciudadano. Coordinación técnica de requerimientos y despliegue rápido de interfaces web accesibles y óptimas, aplicando testing funcional exhaustivo de pre-producción.",
        },
      },
    },
    skills: {
      tag: "Tecnologías",
      title: "Habilidades Técnicas",
      desc: "Herramientas, lenguajes de programación y metodologías ágiles en las que me especializo.",
      categories: {
        Frontend: "Frontend",
        Backend: "Backend",
        Herramientas: "Herramientas",
        Otros: "Otros",
      },
    },
    portfolio: {
      tag: "Galería",
      title: "Portafolio de Proyectos",
      desc: "Una selección de mis trabajos más representativos, incluyendo desarrollos gubernamentales oficiales y aplicaciones MERN full stack.",
      filters: {
        Todos: "Todos",
        Fullstack: "Fullstack",
        Gulp: "Gulp",
      },
      modal: {
        client: "Cliente:",
        date: "Fecha:",
        about: "Sobre el Proyecto",
        stack: "Stack Tecnológico",
        demo: "Acceso de Demostración",
        demoDesc: "Puedes probar la aplicación utilizando la cuenta de prueba ya registrada:",
        copy: "Copiar",
        copied: "Copiado",
        visit: "Visitar Sitio Oficial",
        close: "Cerrar detalles",
        qualityTitle: "Métricas de Calidad (Lighthouse Audit)",
        archTitle: "Arquitectura Técnica del Sistema",
        dbTitle: "Esquema NoSQL (Colecciones de Base de Datos)",
        edgeTitle: "⚡ CDN Distribución Instantánea",
        edgeDesc: "Los activos finales se compilan, optimizan e integran en un bundle estático ultra optimizado. Este bundle es desplegado y distribuido en servidores perimetrales a nivel global (Edge Network), eliminando por completo retardos de procesamiento del servidor para una carga inferior a 0.5s.",
      },
      items: {
        "proj-1": {
          title: "Página Oficial José Farhat",
          client: "Secretario de Estado de Participación Ciudadana del Ministerio de Seguridad de Tucumán",
          description: "Sitio web gubernamental oficial y blog de divulgación para el Secretario de Participación Ciudadana. Diseñado y optimizado para una alta legibilidad de artículos de opinión y noticias, adaptándose a cualquier dispositivo con alta fidelidad visual.",
        },
        "proj-2": {
          title: "Mesa Federal de Participación Ciudadana",
          client: "Consejo Federal de Seguridad de la Nación Argentina",
          description: "Plataforma digital interactiva federal para la articulación de políticas públicas entre representantes de seguridad de todas las provincias argentinas. Facilita la carga de contenidos colaborativos, agendas de trabajo comunes y repositorio legal.",
        },
        "proj-3": {
          title: "Rolling Cucina",
          client: "Rolling Code School (Proyecto de Graduación)",
          description: "Aplicación web completa (MERN Stack) para la gestión y pedidos en línea de un restaurante. Incluye autenticación segura, menú interactivo y dinámico, carrito de compras, seguimiento de pedidos en tiempo real y una suite administrativa completa para la gestión de stocks, pedidos y roles de usuarios.",
        },
      },
    },
    contact: {
      tag: "Contacto",
      title: "Hablemos",
      desc: "¿Tienes una propuesta de proyecto, vacante en tu empresa o quieres conversar sobre sistemas? Rellena el formulario o envíame un mensaje directo.",
      emailLabel: "Correo Electrónico",
      phoneLabel: "Teléfono Directo",
      locationLabel: "Ubicación",
      nameLabel: "Nombre completo",
      namePlaceholder: "Ej. Juan Pérez",
      emailFormLabel: "Dirección de correo",
      emailPlaceholder: "Ej. juan@correo.com",
      messageLabel: "Mensaje",
      messagePlaceholder: "Cuéntame sobre tu idea o proyecto...",
      submit: "Enviar mensaje",
      submitting: "Enviando mensaje...",
      successTitle: "¡Mensaje Enviado con éxito!",
      successDesc: "Muchas gracias por contactarme. He recibido tu mensaje e iniciaré la lectura para responderte a la brevedad.",
      confettiLabel: "Lanzando Confeti",
      footer: "Marcos Rigo. Desarrollado con Next.js & Tailwind.",
    },
    console: {
      bootMessage1: "Marcos-OS v2026.5 [Tucumán, Argentina]",
      bootMessage2: "Estudiante de Ingeniería en Sistemas de Información - UTN",
      bootMessage3: "Consola de comandos interactiva de Marcos Rigo.",
      bootMessage4: "Escribe /help para ver la lista de utilidades de la consola.",
      promptPlaceholder: "Escribe un comando... (intenta /help o /exit)",
      footerMode: "Consola Hacker",
      helpLines: [
        " ",
        "Comandos disponibles:",
        "  /about      - Biografía académica y técnica de Marcos",
        "  /skills     - Resumen detallado de capacidades de ingeniería",
        "  /contact    - Información y enlaces de contacto directo",
        "  /theme      - Alternar tema visual (Claro / Oscuro)",
        "  /cv         - Descargar Currículum Vitae oficial en PDF",
        "  /clear      - Limpiar el historial de la pantalla",
        "  /exit       - Salir de la Consola de comandos",
        " ",
      ],
      aboutLines: [
        " ",
        "--- PERFIL ACADÉMICO Y BIOGRAFÍA ---",
        "Marcos Rigo | Desarrollador Web Full Stack",
        "Estudiante de Ingeniería en Sistemas de Información (UTN FRT).",
        " ",
        "Construyo plataformas gubernamentales oficiales seguras y de alto tráfico",
        "para el Ministerio de Seguridad y Gobierno de Tucumán.",
        "Combino rigurosidad científica de sistemas con pasión UX por los detalles.",
        " ",
      ],
      skillsLines: [
        " ",
        "--- CAPACIDADES TECNOLÓGICAS ---",
        "Frontend  :  [██████████] React, Next.js 16, Tailwind CSS, Bootstrap",
        "Backend   :  [████████░░] Node.js, Express, MongoDB, REST APIs",
        "Ingeniería:  [█████████░] Java (POO), SQL, Git/GitHub, Metodologías ágiles",
        "Otros     :  [████████░░] Inglés B2 (Certificación del Instituto Anglo)",
        " ",
      ],
      contactLines: [
        " ",
        "--- VÍAS DE CONTACTO DIRECTO ---",
        `Email     : ${personalInfo.email}`,
        `Teléfono  : ${personalInfo.phone}`,
        `Ubicación : ${personalInfo.location}`,
        "LinkedIn  : https://www.linkedin.com/in/marcos-rigo/",
        "GitHub    : https://github.com/marcos-rigo",
        " ",
      ],
      themeSuccess: "SUCCESS: Tema cambiado con éxito.",
      cvSuccess: "SUCCESS: Abriendo Currículum en PDF en una nueva pestaña.",
      errorCommand: "Error: Comando no reconocido. Escribe /help para ver la lista.",
    },
  },
  en: {
    nav: {
      about: "About me",
      experience: "Experience",
      skills: "Skills",
      portfolio: "Portfolio",
      contact: "Contact",
    },
    hero: {
      tag: "Systems Engineering & Web Development",
      bio: "I combine technical systems precision with a passion for modern interface design, creating fast, 100% responsive, and pixel-polished digital products.",
      ctaView: "View my work",
      ctaDownload: "Download CV",
    },
    bento: {
      presentation: "Presentation",
      bioTitle: "Software design with a holistic focus and high scalability",
      location: "Location",
      locationDesc: "San Miguel de Tucumán. Available for remote work and on-site relocation.",
      timezone: "Time Zone",
      languages: "Languages",
      spanish: "Spanish",
      spanishLevel: "Native",
      english: "English",
      englishLevel: "B2 (Advanced)",
      englishDesc: "Advanced English studies completed at the Anglo Cultural Institute.",
      specialization: "Specialization",
      specTitle: "Applied Software Engineering",
      specDesc1: "My academic background in Information Systems enables me to architect scalable systems, model complex data, and optimize algorithms.",
      specDesc2: "I translate this directly into Full Stack development, building secure REST APIs with Node.js/Express, optimized databases in MongoDB or SQL, and modular high-performance React/Next.js UIs.",
      skillsMap: "Skills Mapping",
      githubTag: "Real-time activity",
      githubTitle: "GitHub API Integration",
      githubDesc: "Live stats consumed directly from my official GitHub developer profile, utilizing optimized local cache storage.",
      githubFollowers: "Followers",
      githubRepos: "Public repos",
      githubActivity: "Contribution Activity History (Past Year)",
      githubLoading: "Querying GitHub API...",
      githubFallback: "Offline mode (Cached Data)",
      githubCommits: "contributions on",
    },
    experience: {
      tag: "Career",
      title: "Work Experience",
      detailsLabel: "Government Projects",
      items: {
        "exp-1": {
          role: "Full Stack Developer",
          company: "Ministry of Security of Tucumán",
          description: "End-to-end development of institutional websites and government web platforms for the Ministry. Spans database schema design, REST APIs, and responsive frontend maquetation, focusing on strict pre-production testing to guarantee stability and security.",
        },
        "exp-2": {
          role: "Web Developer",
          company: "Government of Tucumán",
          description: "Continuous creation and maintenance of responsive citizen-facing websites. Technical requirements coordination and rapid deployment of accessible, optimal web layouts utilizing intensive pre-production functionality testing.",
        },
      },
    },
    skills: {
      tag: "Technologies",
      title: "Technical Skills",
      desc: "Programming languages, developer tools, and agile methodologies I specialize in.",
      categories: {
        Frontend: "Frontend",
        Backend: "Backend",
        Herramientas: "Tools",
        Otros: "Other",
      },
    },
    portfolio: {
      tag: "Gallery",
      title: "Project Portfolio",
      desc: "A carefully curated selection of my work, including official government portals and complete MERN stack web applications.",
      filters: {
        Todos: "All",
        Fullstack: "Fullstack",
        Gulp: "Gulp",
      },
      modal: {
        client: "Client:",
        date: "Date:",
        about: "About the Project",
        stack: "Tech Stack",
        demo: "Demo Credentials",
        demoDesc: "You can test the application using the pre-registered demo account:",
        copy: "Copy",
        copied: "Copied",
        visit: "Visit Live Site",
        close: "Close details",
        qualityTitle: "Quality Metrics (Lighthouse Audit)",
        archTitle: "Technical System Architecture",
        dbTitle: "NoSQL Schema (Database Collections)",
        edgeTitle: "⚡ Fast Edge CDN Delivery",
        edgeDesc: "Static assets are built, optimized, and compiled into a lightweight production bundle. This bundle is distributed globally onto edge networks, completely bypassing server processing for instant loads (< 0.5s).",
      },
      items: {
        "proj-1": {
          title: "José Farhat Official Site",
          client: "Secretary of State for Citizen Participation of the Ministry of Security",
          description: "Official governmental website and blog for the Secretary of Citizen Participation. Tailored and optimized for high-readability of articles, newsletters, and news, adapting beautifully to any desktop or mobile device.",
        },
        "proj-2": {
          title: "Federal Board of Citizen Participation",
          client: "Federal Security Council of Argentina",
          description: "Federal digital platform built for co-working and public policies coordinate between security representatives of all Argentine provinces. Supports collaborative document editing, common agendas, and legal archives.",
        },
        "proj-3": {
          title: "Rolling Cucina",
          client: "Rolling Code School (Graduation Project)",
          description: "End-to-end MERN stack web application built for restaurant administration and online ordering. Includes secure token auth, interactive dynamic food menu, shopping cart, real-time order tracking, and a comprehensive admin suite for stock, orders, and roles management.",
        },
      },
    },
    contact: {
      tag: "Contact",
      title: "Let's Talk",
      desc: "Have an exciting project idea, a vacancy in your engineering team, or want to discuss systems? Fill in the form or send me a direct message.",
      emailLabel: "Email Address",
      phoneLabel: "Direct Phone",
      locationLabel: "Location",
      nameLabel: "Full name",
      namePlaceholder: "e.g. John Doe",
      emailFormLabel: "Email address",
      emailPlaceholder: "e.g. john@email.com",
      messageLabel: "Message",
      messagePlaceholder: "Tell me about your idea or project...",
      submit: "Send message",
      submitting: "Sending message...",
      successTitle: "Message Sent Successfully!",
      successDesc: "Thank you for getting in touch. I have received your message and will read and reply to you as soon as possible.",
      confettiLabel: "Launching Confetti",
      footer: "Marcos Rigo. Developed with Next.js & Tailwind.",
    },
    console: {
      bootMessage1: "Marcos-OS v2026.5 [Tucuman, Argentina]",
      bootMessage2: "Systems Engineering Student - UTN University",
      bootMessage3: "Marcos Rigo interactive developer shell console.",
      bootMessage4: "Type /help to see all available terminal utilities.",
      promptPlaceholder: "Type a command... (try /help or /exit)",
      footerMode: "Hacker Console",
      helpLines: [
        " ",
        "Available commands:",
        "  /about      - Academic biography and technical profile of Marcos",
        "  /skills     - Detailed engineering skill set and technologies",
        "  /contact    - Contact info and official social links",
        "  /theme      - Toggle interface color theme (Light / Dark)",
        "  /cv         - Download official PDF Resume",
        "  /clear      - Clear terminal screen log history",
        "  /exit       - Exit hacker developer console mode",
        " ",
      ],
      aboutLines: [
        " ",
        "--- ACADEMIC PROFILE & BIO ---",
        "Marcos Rigo | Full Stack Web Developer",
        "Advanced Information Systems Engineering Student (UTN FRT).",
        " ",
        "I build highly secure, heavy-traffic citizen-facing governmental portals",
        "for the Ministry of Security and Government of Tucumán.",
        "I combine scientific systems precision with a UX passion for pixel detail.",
        " ",
      ],
      skillsLines: [
        " ",
        "--- TECHNICAL CAPABILITIES ---",
        "Frontend  :  [██████████] React, Next.js 16, Tailwind CSS, Bootstrap",
        "Backend   :  [████████░░] Node.js, Express, MongoDB, REST APIs",
        "Systems   :  [█████████░] Java (OOP), SQL, Git/GitHub, Agile frameworks",
        "Other     :  [████████░░] English B2 (Certified by Anglo Institute)",
        " ",
      ],
      contactLines: [
        " ",
        "--- DIRECT CONTACT CHANNELS ---",
        `Email     : ${personalInfo.email}`,
        `Phone     : ${personalInfo.phone}`,
        `Location  : ${personalInfo.location}`,
        "LinkedIn  : https://www.linkedin.com/in/marcos-rigo/",
        "GitHub    : https://github.com/marcos-rigo",
        " ",
      ],
      themeSuccess: "SUCCESS: Color theme changed successfully.",
      cvSuccess: "SUCCESS: Opening PDF Resume in a new tab.",
      errorCommand: "Error: Unrecognized command. Type /help to see valid utilities.",
    },
  },
};
