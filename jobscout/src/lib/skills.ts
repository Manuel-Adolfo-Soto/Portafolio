const KNOWN_SKILLS = [
  // Languages
  "C#", "CSharp", "C Sharp", "Python", "Java", "JavaScript", "JS", "TypeScript", "TS",
  "Go", "Rust", "Ruby", "PHP", "Swift", "Kotlin", "Scala", "Dart", "C++", "Cpp",
  "HTML", "CSS", "Sass", "Less", "SQL",
  // .NET ecosystem
  ".NET", "Dotnet", "Dot Net", "ASP.NET", "ASP.NET Core", ".NET Core", "Entity Framework",
  "EF Core", "LINQ", "Blazor", "Maui", "Xamarin", ".NET MAUI",
  // Databases
  "SQL Server", "PostgreSQL", "Postgres", "MySQL", "SQLite", "MongoDB", "Mongo",
  "Redis", "Elasticsearch", "DynamoDB", "Oracle", "MariaDB", "Firebase", "Supabase",
  "Neo4j", "Cassandra",
  // Frontend
  "React", "ReactJS", "React.js", "Angular", "AngularJS", "Vue", "Vue.js", "VueJS",
  "Svelte", "Next.js", "NextJS", "Nuxt", "Nuxt.js", "Tailwind", "Tailwind CSS",
  "Bootstrap", "Material UI", "MUI", "Chakra UI", "Shadcn", "Radix UI",
  "Redux", "Zustand", "Recoil", "Jotai",
  // Backend
  "Node.js", "NodeJS", "Express", "Express.js", "NestJS", "Nest.js", "Fastify",
  "Django", "Flask", "FastAPI", "Spring Boot", "Spring", "Laravel", "Ruby on Rails",
  "Rails", "Fiber", "Gin",
  // Cloud & DevOps
  "Docker", "Kubernetes", "K8s", "AWS", "Azure", "Google Cloud", "GCP",
  "Terraform", "Ansible", "Jenkins", "GitHub Actions", "GitLab CI", "CircleCI",
  "Nginx", "Apache", "Cloudflare", "Vercel", "Netlify",
  // Tools
  "Git", "GitHub", "GitLab", "Bitbucket", "Jira", "Confluence", "Notion",
  "Figma", "Sketch", "Photoshop", "Jest", "Cypress", "Playwright", "Vitest",
  "Webpack", "Vite", "Babel", "ESLint", "Prettier", "Rollup",
  // Testing
  "xUnit", "NUnit", "MSTest", "Selenium", "Puppeteer", "Storybook",
  // Data & ML
  "Pandas", "NumPy", "TensorFlow", "PyTorch", "Scikit-learn", "Power BI",
  "Tableau", "Apache Spark", "Hadoop", "Airflow",
  // Architecture
  "REST", "REST API", "GraphQL", "gRPC", "Microservices", "Event-Driven",
  "DDD", "CQRS", "Event Sourcing", "SOLID", "Clean Architecture", "Clean Code",
  "Design Patterns", "Factory", "Repository",
  // Other
  "Linux", "Unix", "Bash", "PowerShell", "Agile", "Scrum", "Kanban",
  "CI/CD", "OOP", "DDD",
];

const SKILL_PATTERNS = KNOWN_SKILLS.map((skill) => ({
  skill,
  regex: new RegExp(
    `\\b${skill.replace(/[.+*?^${}()|[\]\\]/g, "\\$&").replace(/#/g, "\\#")}\\b`,
    "i"
  ),
}));

export function extractSkills(description: string, title: string): string[] {
  const text = `${title} ${description}`.toLowerCase();
  const found: string[] = [];

  for (const { skill, regex } of SKILL_PATTERNS) {
    if (regex.test(text) && !found.includes(skill)) {
      found.push(skill);
    }
  }

  return found;
}
