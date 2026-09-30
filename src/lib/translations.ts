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
    bioBefore: string;
    bioUniversityLink: string;
    bioAfter: string;
    ctaView: string;
    ctaDownload: string;
  };
  bento: {
    presentation: string;
    bioTitle: string;
    location: string;
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
    currentLabel: string;
    items: {
      [id: string]: {
        company?: string;
        companySubtitle?: string;
        period: string;
        stages: {
          [stageId: string]: {
            role: string;
            period: string;
            bullets: string[];
          };
        };
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
  };
  footer: {
    tagline: string;
    navTitle: string;
    contactTitle: string;
    techTitle: string;
    techDescription: string;
    rights: string;
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
      tag: "Ingeniería de Software",
      bioBefore: "Desarrollador de Software con formación en Ingeniería en Sistemas en la ",
      bioUniversityLink: "Universidad Tecnológica Nacional - Facultad Regional Tucumán",
      bioAfter: " y experiencia en el sector público y en proyectos freelance.",
      ctaView: "Ver mi trabajo",
      ctaDownload: "Descargar CV",
    },
    bento: {
      presentation: "Presentación",
      bioTitle: "Sobre mí",
      location: "Ubicación",
      timezone: "Huso Horario",
      languages: "Idiomas",
      spanish: "Español",
      spanishLevel: "Nativo",
      english: "Inglés",
      englishLevel: "Intermedio",
      englishDesc: "Estudios cursados en el Instituto Cultural Anglo.",
      specialization: "Especialización",
      specTitle: "Ingeniería de Software Aplicada",
      specDesc1: "De la carrera me quedó la costumbre de pensar cómo estructurar las cosas antes de escribir código: cómo modelo los datos, cómo separo responsabilidades, qué tan escalable necesita ser algo. En el día a día eso se traduce en APIs REST con Node.js/Express, bases de datos en MongoDB o SQL según el proyecto, y frontend en React/Next.js.",
      specDesc2: "Esto lo traslado a mi desarrollo Full Stack, estructurando APIs REST seguras con Node.js/Express, bases de datos optimizadas con MongoDB o SQL, y código modular de alto rendimiento en React/Next.js.",
      skillsMap: "Mapeo de Capacidades",
      githubTag: "Actividad en tiempo real",
      githubTitle: "Integración con GitHub",
      githubDesc: "Datos en vivo desde mi perfil de GitHub.",
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
      currentLabel: "Actual",
      items: {
        "exp-ministerio": {
          company: "Ministerio de Seguridad de Tucumán",
          companySubtitle: "Secretaría de Participación Ciudadana · Área de Sistemas e IT",
          period: "2016 – Presente",
          stages: {
            "stage-fullstack": {
              role: "Desarrollador Full Stack",
              period: "2018 – Presente",
              bullets: [
                "Desarrollo de aplicaciones web con bases de datos.",
                "Migración y modernización de sitios institucionales.",
                "Testing funcional y validación de sistemas antes de producción.",
                "Tareas de sistemas e IT del área según la necesidad.",
                "Dictado de charlas, capacitaciones y talleres en la Secretaría.",
              ],
            },
            "stage-web": {
              role: "Desarrollador Web",
              period: "2016 – 2018 (inicio como pasante)",
              bullets: [
                "Desarrollo y mantenimiento de sitios institucionales en WordPress.",
                "Testing funcional y validación de sistemas antes de producción.",
              ],
            },
          },
        },
        "exp-freelance": {
          period: "2020 – Presente",
          stages: {
            "stage-freelance": {
              role: "Desarrollador Freelance",
              period: "2020 – Presente",
              bullets: [
                "Desarrollo de sitios web y aplicaciones para clientes particulares, a cargo de todo el ciclo: relevamiento de requerimientos, desarrollo y despliegue.",
                "Trato directo con los clientes.",
              ],
            },
          },
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
        demoDesc: "Podés probar la aplicación utilizando la cuenta de prueba ya registrada:",
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
          description: "Sitio institucional y blog de opinión para un funcionario público con alto volumen de lectores. Prioricé la legibilidad de artículos largos con una jerarquía tipográfica pensada para lectura prolongada y un pipeline Gulp que sirve CSS/JS minificados. Resultado: tiempos de carga bajos y una experiencia de lectura consistente en cualquier dispositivo.",
        },
        "proj-2": {
          title: "Mesa Federal de Participación Ciudadana",
          client: "Consejo Federal de Seguridad de la Nación Argentina",
          description: "Plataforma para que representantes de seguridad de las 24 provincias coordinen políticas públicas sin depender de planillas y correos dispersos. Centralicé agendas, documentos y un repositorio legal compartido en una sola interfaz. Resultado: un punto único de referencia accesible para equipos distribuidos en todo el país.",
        },
        "proj-3": {
          title: "Rolling Cucina",
          client: "Rolling Code School (Proyecto de Graduación)",
          description: "App de pedidos online para un restaurante, con carrito, seguimiento de pedidos en tiempo real y una suite administrativa completa. Implementé autenticación por roles (admin/cliente) para separar el panel de gestión de stock y pedidos del frontend de compra pública. Proyecto de graduación de Rolling Code School, desplegado en producción.",
        },
      },
    },
    contact: {
      tag: "Contacto",
      title: "Hablemos",
      desc: "¿Tenés una propuesta de proyecto, una vacante en tu empresa, o simplemente querés charlar sobre sistemas? Escribime por acá o mandame un mensaje directo.",
      emailLabel: "Correo Electrónico",
      locationLabel: "Ubicación",
      nameLabel: "Nombre completo",
      namePlaceholder: "Ej. Juan Pérez",
      emailFormLabel: "Dirección de correo",
      emailPlaceholder: "Ej. juan@correo.com",
      messageLabel: "Mensaje",
      messagePlaceholder: "Contame sobre tu idea o proyecto...",
      submit: "Enviar mensaje",
      submitting: "Enviando mensaje...",
      successTitle: "¡Mensaje Enviado con éxito!",
      successDesc: "Muchas gracias por contactarme. He recibido tu mensaje e iniciaré la lectura para responderte a la brevedad.",
      confettiLabel: "Lanzando Confeti",
    },
    footer: {
      tagline: "Desarrollador Full Stack construyendo productos web rápidos y prolijos.",
      navTitle: "Navegación",
      contactTitle: "Contacto y Redes",
      techTitle: "Stack del Sitio",
      techDescription: "Construido con Next.js 16, React y Tailwind CSS v4. Desplegado en Vercel.",
      rights: "Todos los derechos reservados.",
    },
    console: {
      bootMessage1: "Marcos-OS v2026.5 [Tucumán, Argentina]",
      bootMessage2: "Estudiante de Ingeniería en Sistemas de Información - UTN",
      bootMessage3: "Consola de comandos interactiva de Marcos Rigo.",
      bootMessage4: "Escribí /help para ver la lista de utilidades de la consola.",
      promptPlaceholder: "Escribí un comando... (intentá /help o /exit)",
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
        `Ubicación : ${personalInfo.location}`,
        "LinkedIn  : https://www.linkedin.com/in/marcos-rigo/",
        "GitHub    : https://github.com/marcos-rigo",
        " ",
      ],
      themeSuccess: "SUCCESS: Tema cambiado con éxito.",
      cvSuccess: "SUCCESS: Abriendo Currículum en PDF en una nueva pestaña.",
      errorCommand: "Error: Comando no reconocido. Escribí /help para ver la lista.",
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
      tag: "Software Engineering",
      bioBefore: "Software Developer with a background in Systems Engineering at the ",
      bioUniversityLink: "Universidad Tecnológica Nacional - Facultad Regional Tucumán",
      bioAfter: " and experience in the public sector and freelance projects.",
      ctaView: "View my work",
      ctaDownload: "Download CV",
    },
    bento: {
      presentation: "Presentation",
      bioTitle: "Software design with a holistic focus and high scalability",
      location: "Location",
      timezone: "Time Zone",
      languages: "Languages",
      spanish: "Spanish",
      spanishLevel: "Native",
      english: "English",
      englishLevel: "Intermediate",
      englishDesc: "English studies completed at the Anglo Cultural Institute.",
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
      currentLabel: "Current",
      items: {
        "exp-ministerio": {
          company: "Ministry of Security of Tucumán",
          companySubtitle: "Citizen Participation Secretariat · Systems & IT Area",
          period: "2016 – Present",
          stages: {
            "stage-fullstack": {
              role: "Full Stack Developer",
              period: "2018 – Present",
              bullets: [
                "Development of web applications with databases.",
                "Migration and modernization of institutional websites.",
                "Functional testing and system validation before production.",
                "Systems and IT tasks for the area as needed.",
                "Delivering talks, training sessions, and workshops at the Secretariat.",
              ],
            },
            "stage-web": {
              role: "Web Developer",
              period: "2016 – 2018 (started as an intern)",
              bullets: [
                "Development and maintenance of institutional WordPress websites.",
                "Functional testing and system validation before production.",
              ],
            },
          },
        },
        "exp-freelance": {
          period: "2020 – Present",
          stages: {
            "stage-freelance": {
              role: "Freelance Developer",
              period: "2020 – Present",
              bullets: [
                "Development of websites and applications for individual clients, owning the full cycle: requirements gathering, development, and deployment.",
                "Direct client communication.",
              ],
            },
          },
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
          description: "Institutional site and opinion blog for a public official with a high volume of readers. I focused on readability for long-form articles with a typographic hierarchy built for extended reading, plus a Gulp pipeline serving minified CSS/JS. Result: low load times and a consistent reading experience on any device.",
        },
        "proj-2": {
          title: "Federal Board of Citizen Participation",
          client: "Federal Security Council of Argentina",
          description: "A platform for security representatives from Argentina's 24 provinces to coordinate public policy without relying on scattered spreadsheets and emails. I centralized agendas, documents, and a shared legal repository into a single interface. Result: one source of truth accessible to teams distributed across the country.",
        },
        "proj-3": {
          title: "Rolling Cucina",
          client: "Rolling Code School (Graduation Project)",
          description: "Online ordering app for a restaurant, with a shopping cart, real-time order tracking, and a complete admin suite. I implemented role-based auth (admin/customer) to separate the stock and order management panel from the public storefront. Rolling Code School graduation project, deployed to production.",
        },
      },
    },
    contact: {
      tag: "Contact",
      title: "Let's Talk",
      desc: "Have an exciting project idea, a vacancy in your engineering team, or want to discuss systems? Fill in the form or send me a direct message.",
      emailLabel: "Email Address",
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
    },
    footer: {
      tagline: "Full Stack Developer building fast, polished web products.",
      navTitle: "Navigation",
      contactTitle: "Contact & Social",
      techTitle: "Site Stack",
      techDescription: "Built with Next.js 16, React and Tailwind CSS v4. Deployed on Vercel.",
      rights: "All rights reserved.",
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
