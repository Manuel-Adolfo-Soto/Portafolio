export const cvDataEn = {
  hidden: 'approved for the next stage',
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
    'Full Stack Developer with 2+ years of experience building production e-commerce systems for real users. Specialized in backend development with NestJS, TypeScript, and PostgreSQL.',
    'Full-stack mastery: scalable REST APIs, modular architecture, JWT authentication, ACID transactions, and responsive Angular frontends. Proven experience working in multidisciplinary teams coordinating with design, systems, commercial, and economics departments. Certified for outstanding performance.',
    'Available for remote roles immediately.',
  ],
  experience: [
    {
      title: 'Full Stack Developer',
      company: 'Afer Bolivia',
      location: 'Sucre, Bolivia (Remote)',
      period: 'January 2024 - June 2026',
      duration: '2+ years',
      description: 'Full development of a home appliance e-commerce platform in production, working with a multidisciplinary team.',
      highlights: [
        {
          category: 'Backend — Architecture & APIs',
          items: [
            'Designed and implemented REST API with NestJS and TypeScript from scratch',
            'Created modular architecture with 8+ independent modules (Identity, Products, Commerce, Orders, Reports, Authentication, Authorization)',
            'Implemented JWT authentication system with 3 dynamic roles (Admin, User, Client) using custom Guards and Decorators',
            'Developed complete CRUD for: Products, Inventory, Orders, Users, Categories, Dynamic Reports',
            'Optimized SQL queries reducing response time by 15-20% through indexing and query optimization',
            'Implemented ACID transactions for critical operations with automatic rollback',
            'Documented 100% of endpoints with Swagger/OpenAPI (50+ endpoints)',
            'Implemented robust data validation with class-validator',
            'Configured rate limiting and security headers (Helmet)',
            'Centralized error handling with custom exception filters',
          ],
        },
        {
          category: 'Frontend — User Interface',
          items: [
            'Built modern Angular interface with reusable components',
            'Implemented Angular services for API consumption',
            'State management and component communication with RxJS',
            'Role-based authentication and authorization on the frontend',
            'Responsive design with CSS3 and Bootstrap',
            'Functional shopping cart with persistence',
            'Admin panel with filters, search, pagination',
          ],
        },
        {
          category: 'Coordination & Management',
          items: [
            'Direct collaboration with Business, Design (Figma), Systems, and Economics departments',
            'Requirements gathering with stakeholders',
            'Dynamic commercial report generation for management',
            'Version control with Git/GitHub (branching flow, descriptive commits)',
          ],
        },
      ],
      technologies: ['NestJS 11', 'TypeScript 5.7', 'Node.js', 'PostgreSQL', 'Angular 21', 'Docker', 'Git', 'Swagger/OpenAPI', 'JWT', 'bcrypt', 'RxJS'],
    },
  ],
  skills: {
    backend: {
      title: 'Backend (Specialty — Advanced)',
      items: ['NestJS (Modules, Controllers, Services, Guards, Interceptors, Pipes)', 'TypeScript (advanced types, interfaces, generics, decorators)', 'Node.js (runtime, modules, async/await)', 'PostgreSQL (complex queries, relations, transactions, optimization)', 'TypeORM (Entity relationships, migrations, query builder)', 'REST APIs (design, versioning, documentation)', 'JWT Auth (Passport, Guards, Roles)', 'Security (bcrypt, hashing, sanitization, validation)', 'Swagger/OpenAPI', 'ACID Transactions', 'Centralized Error Handling', 'Data Validation (class-validator, DTOs)'],
    },
    frontend: {
      title: 'Frontend (Proven — Intermediate-Advanced)',
      items: ['Angular (Components, Services, Modules, Routing, Forms)', 'React (Hooks, Context, JSX, Vite)', 'TypeScript', 'HTML5, CSS3 (Flexbox, Grid, Animations, Responsive)', 'Tailwind CSS v4', 'Bootstrap', 'RxJS (Observables, Operators, Subjects)', 'Reusable Components', 'Responsive Design (Mobile-First)', 'REST API Consumption', 'State Management'],
    },
    devops: {
      title: 'DevOps & Tools (Intermediate)',
      items: ['Docker (containerization, compose)', 'Git (versioning, branching, merging)', 'GitHub (PRs, issues, collaboration)', 'Postman (testing, collections)', 'Figma (UI/UX collaboration)', 'Linux Basics', 'VS Code'],
    },
    databases: {
      title: 'Databases (Advanced)',
      items: ['PostgreSQL (advanced queries, indexes, triggers)', 'SQL (SELECT, JOIN, aggregations, optimization)', 'SQL Server (T-SQL)', 'MySQL', 'Relational Modeling (normalization)', 'Transactions (ACID, rollback)'],
    },
    languages: {
      title: 'Programming Languages',
      items: ['TypeScript (Advanced — 2+ years)', 'JavaScript (Advanced — 2+ years)', 'C# (Intermediate — academic projects)', 'SQL (Advanced — complex queries)', 'Python (Basic)'],
    },
    concepts: {
      title: 'Patterns & Concepts',
      items: ['3-Tier Architecture', 'SOLID Principles', 'MVC', 'REST Design', 'Modular Design', 'Database Design (normalization)', 'Role-Based Access Control (RBAC)', 'Performance Optimization', 'Security Best Practices'],
    },
    soft: {
      title: 'Soft Skills',
      items: ['Fast Technology Learning', 'Clear Technical Communication', 'Analysis & Problem Solving', 'Multidisciplinary Teamwork', 'Adaptability to Change', 'Responsibility & Commitment', 'Continuous Improvement Mindset'],
    },
  },
  projects: [
    {
      name: 'Afer Bolivia — E-Commerce Platform',
      role: 'Full Stack Developer',
      period: 'January 2024 - June 2026',
      type: 'Production commercial system',
      status: 'Nearing deployment (replaces legacy)',
      description: 'Complete e-commerce platform for home appliance management and sales. Integrated system connecting inventory, product catalog, order management, shopping cart, role-based authentication, admin panel with real-time reports.',
      problem: 'The legacy system did not scale, lacked role-based authentication and had simultaneous user limits.',
      stack: ['NestJS', 'TypeScript', 'Angular', 'PostgreSQL', 'Docker', 'JWT', 'Swagger'],
      features: [
        'JWT authentication with 3 dynamic roles',
        'Full CRUD: Products, Categories, Inventory',
        'Order Management and Shopping Cart',
        'Admin Panel with Dynamic Reports',
        'ACID Transactions for critical operations',
        '100% Swagger Documentation',
      ],
      results: '15-20% response time reduction. Supports multiple simultaneous users. Zero downtime on critical transactions.',
      links: {
        backend: 'github.com/Manuel-Adolfo-Soto/Afer-Bolivia-backend',
        frontend: 'github.com/Manuel-Adolfo-Soto/Afer-Bolivia-frontend',
      },
    },
  ],
  education: [
    {
      degree: 'Computer Engineering',
      institution: 'Universidad Mayor, Real y Pontificia de San Francisco Xavier de Chuquisaca (USFX)',
      location: 'Sucre, Bolivia',
      period: '2022 - 2026',
      status: 'Last semester — About to graduate',
      details: ['University internship formalized as Directed Work at Afer Bolivia', 'Solid foundation in development, databases, networking, and software architecture'],
    },
  ],
  certifications: [
    {
      name: 'Outstanding Performance Certificate',
      issuer: 'Afer Bolivia',
      description: 'Institutional recognition for exceptional performance during the internship.',
    },
  ],
  languages: [
    { name: 'Spanish', level: 'Native' },
    { name: 'English', level: 'A1 (Basic) — Studying intensively, goal: B1' },
  ],
  interests: ['Web Development', 'Backend', 'REST API', 'E-commerce', 'Commercial Systems', 'Architecture', 'Cloud', 'Databases'],
};
