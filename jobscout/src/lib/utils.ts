import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("es-BO", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const d = new Date(date);
  const diff = now.getTime() - d.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  if (days === 0) return "Hoy";
  if (days === 1) return "Ayer";
  if (days < 7) return `Hace ${days} días`;
  if (days < 30) return `Hace ${Math.floor(days / 7)} semanas`;
  return formatDate(date);
}

export function normalizeSalary(salary: number, currency?: string): string {
  if (!salary) return "No especificado";
  const formatter = new Intl.NumberFormat("es-BO");
  const symbol = currency === "USD" ? "$" : currency === "EUR" ? "€" : "Bs.";
  return `${symbol}${formatter.format(salary)}`;
}

export function parseSkills(text: string): string[] {
  const knownSkills = [
    "angular", "react", "vue", "nextjs", "nest", "node", "express",
    "typescript", "javascript", "python", "java", "c#", "go", "rust",
    "postgresql", "mysql", "mongodb", "sqlite", "redis", "sql",
    "docker", "kubernetes", "aws", "azure", "gcp", "git", "linux",
    "html", "css", "sass", "tailwind", "bootstrap",
    "rest", "graphql", "grpc", "api",
  ];
  const lower = text.toLowerCase();
  return knownSkills.filter((s) => lower.includes(s));
}
