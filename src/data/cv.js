export const cvData = {
  name: 'Manuel Adolfo Soto',
  title: 'Full Stack Developer',
  subtitle: 'NestJS • TypeScript • PostgreSQL • Angular',
  contact: {
    email: 'sotomanueladolfo@gmail.com',
    phone: '+591 75431507',
    linkedin: 'linkedin.com/in/khiomaru',
    github: 'github.com/Manuel-Adolfo-Soto',
    website: 'khiomaru.vercel.app',
    location: 'Sucre, Bolivia',
  },
  summary: [
    'Full Stack Developer con 2+ años de experiencia desarrollando sistemas e-commerce en producción para usuarios reales. Especializado en backend con NestJS, TypeScript y PostgreSQL.',
    'Dominio completo del stack: APIs REST escalables, arquitectura modular, autenticación JWT, transacciones ACID, y frontend Angular responsivo. Experiencia demostrada en equipo multidisciplinario coordinando con áreas de diseño, sistemas, comercial y economía. Certificado por desempeño destacado.',
    'Disponible para roles remotos inmediatamente.',
  ],
  experience: [
    {
      title: 'Full Stack Developer',
      company: 'Afer Bolivia',
      location: 'Sucre, Bolivia (Remoto)',
      period: 'Enero 2024 - Presente',
      duration: '2+ años',
      description: 'Desarrollo completo de plataforma e-commerce de electrodomésticos en producción, trabajando en equipo multidisciplinario.',
      highlights: [
        {
          category: 'Backend — Arquitectura y APIs',
          items: [
            'Diseñé e implementé API REST con NestJS y TypeScript desde cero',
            'Creé arquitectura modular con 8+ módulos independientes (Identity, Products, Commerce, Orders, Reports, Authentication, Authorization)',
            'Implementé sistema de autenticación JWT con 3 roles dinámicos (Admin, Usuario, Cliente) usando Guards y Decoradores personalizados',
            'Desarrollé CRUD completo para: Productos, Inventarios, Órdenes, Usuarios, Categorías, Reportes dinámicos',
            'Optimicé consultas SQL reduciendo tiempo de respuesta 15-20% mediante indexación y query optimization',
            'Implementé transacciones ACID para operaciones críticas con rollback automático',
            'Documenté 100% de endpoints con Swagger/OpenAPI (50+ endpoints)',
            'Implementé validación de datos robusta con class-validator',
            'Configuré rate limiting y security headers (Helmet)',
            'Manejo de errores centralizado con custom exception filters',
          ],
        },
        {
          category: 'Frontend — Interfaz de Usuario',
          items: [
            'Construí interfaz Angular moderna con componentes reutilizables',
            'Implementé servicios angulares para consumo de APIs',
            'Gestión de estado y comunicación entre componentes con RxJS',
            'Autenticación y autorización basada en roles en frontend',
            'Diseño responsive con CSS3 y Bootstrap',
            'Carrito de compras funcional con persistencia',
            'Panel administrativo con filtros, búsqueda, paginación',
          ],
        },
        {
          category: 'Coordinación y Gestión',
          items: [
            'Trabajo directo con áreas de Negocio, Diseño (Figma), Sistemas, Economía',
            'Levantamiento de requisitos con stakeholders',
            'Generación de reportes comerciales dinámicos para gerencia',
            'Control de versiones con Git/GitHub (flujo de ramas, commits descriptivos)',
          ],
        },
      ],
      technologies: ['NestJS 11', 'TypeScript 5.7', 'Node.js', 'PostgreSQL', 'Angular 21', 'Docker', 'Git', 'Swagger/OpenAPI', 'JWT', 'bcrypt', 'RxJS'],
    },
  ],
  skills: {
    backend: {
      title: 'Backend (Especialidad — Avanzado)',
      items: ['NestJS (Modules, Controllers, Services, Guards, Interceptors, Pipes)', 'TypeScript (tipos avanzados, interfaces, genéricos, decoradores)', 'Node.js (runtime, módulos, async/await)', 'PostgreSQL (queries complejas, relaciones, transacciones, optimización)', 'TypeORM (Entity relationships, migrations, query builder)', 'REST APIs (diseño, versionamiento, documentación)', 'Autenticación JWT (Passport, Guards, Roles)', 'Seguridad (bcrypt, hashing, sanitización, validación)', 'Swagger/OpenAPI', 'Transacciones ACID', 'Error Handling centralizado', 'Validación de Datos (class-validator, DTOs)'],
    },
    frontend: {
      title: 'Frontend (Competencia Probada — Intermedio-Avanzado)',
      items: ['Angular (Components, Services, Modules, Routing, Forms)', 'React (Hooks, Context, JSX, Vite)', 'TypeScript', 'HTML5, CSS3 (Flexbox, Grid, Animaciones, Responsive)', 'Tailwind CSS v4', 'Bootstrap', 'RxJS (Observables, Operators, Subjects)', 'Componentes Reutilizables', 'Responsive Design (Mobile-First)', 'Consumo de APIs REST', 'Gestión de Estado'],
    },
    devops: {
      title: 'DevOps y Herramientas (Intermedio)',
      items: ['Docker (containerización, compose)', 'Git (versionamiento, branching, merging)', 'GitHub (PRs, issues, colaboración)', 'Postman (testing, colecciones)', 'Figma (colaboración UI/UX)', 'Linux Basics', 'VS Code'],
    },
    databases: {
      title: 'Bases de Datos (Avanzado)',
      items: ['PostgreSQL (queries avanzadas, índices, triggers)', 'SQL (SELECT, JOIN, aggregations, optimization)', 'SQL Server (T-SQL)', 'MySQL', 'Modelado Relacional (normalización)', 'Transacciones (ACID, rollback)'],
    },
    languages: {
      title: 'Lenguajes de Programación',
      items: ['TypeScript (Avanzado — 2+ años)', 'JavaScript (Avanzado — 2+ años)', 'C# (Intermedio — proyectos académicos)', 'SQL (Avanzado — queries complejas)', 'Python (Básico)'],
    },
    concepts: {
      title: 'Patrones y Conceptos',
      items: ['Arquitectura de 3 Capas', 'Principios SOLID', 'MVC', 'REST Design', 'Modular Design', 'Database Design (normalización)', 'Role-Based Access Control (RBAC)', 'Performance Optimization', 'Security Best Practices'],
    },
    soft: {
      title: 'Soft Skills',
      items: ['Aprendizaje Rápido de Tecnologías', 'Comunicación Técnica Clara', 'Análisis y Resolución de Problemas', 'Trabajo en Equipo Multidisciplinario', 'Adaptabilidad a Cambios', 'Responsabilidad y Compromiso', 'Mentalidad de Mejora Continua'],
    },
  },
  projects: [
    {
      name: 'Afer Bolivia — E-Commerce Platform',
      role: 'Full Stack Developer',
      period: 'Enero 2024 - Presente',
      type: 'Sistema comercial en producción',
      status: 'Próximo a despliegue (reemplaza legacy)',
      description: 'Plataforma e-commerce completa para gestión y venta de electrodomésticos. Sistema integral que conecta inventarios, catálogo de productos, gestión de órdenes, carrito de compras, autenticación por roles, panel administrativo con reportes en tiempo real.',
      problem: 'El sistema legacy no escalaba, carecía de autenticación por roles y tenía límite de usuarios simultáneos.',
      stack: ['NestJS', 'TypeScript', 'Angular', 'PostgreSQL', 'Docker', 'JWT', 'Swagger'],
      features: [
        'Autenticación JWT con 3 roles dinámicos',
        'CRUD completo: Productos, Categorías, Inventarios',
        'Gestión de Órdenes y Carrito de Compras',
        'Panel Administrativo con Reportes Dinámicos',
        'Transacciones ACID en operaciones críticas',
        'Documentación Swagger 100%',
      ],
      results: 'Reducción de tiempo de respuesta 15-20%. Soporta múltiples usuarios simultáneos. 0 downtime en transacciones críticas.',
      links: {
        backend: 'github.com/Manuel-Adolfo-Soto/Afer-Bolivia-backend',
        frontend: 'github.com/Manuel-Adolfo-Soto/Afer-Bolivia-frontend',
      },
    },
  ],
  education: [
    {
      degree: 'Ingeniería Informática',
      institution: 'Universidad Mayor, Real y Pontificia de San Francisco Xavier de Chuquisaca (USFX)',
      location: 'Sucre, Bolivia',
      period: '2022 - 2026',
      status: 'Último semestre — Próximo a egresar',
      details: ['Pasantía universitaria formalizada como Trabajo Dirigido en Afer Bolivia', 'Formación sólida en desarrollo, bases de datos, redes y arquitectura de software'],
    },
  ],
  certifications: [
    {
      name: 'Certificado por Desempeño Destacado',
      issuer: 'Afer Bolivia',
      description: 'Reconocimiento institucional por rendimiento sobresaliente durante la pasantía.',
    },
  ],
  languages: [
    { name: 'Español', level: 'Nativo' },
    { name: 'Inglés', level: 'A1 (Básico) — Estudiando intensivamente, objetivo B1' },
  ],
  interests: ['Desarrollo Web', 'Backend', 'API REST', 'E-commerce', 'Sistemas Comerciales', 'Arquitectura', 'Cloud', 'Bases de Datos'],
};
