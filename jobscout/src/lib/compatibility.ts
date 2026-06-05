export interface ProfileData {
  title?: string;
  career?: string;
  yearsExperience?: number;
  modality?: string;
  country?: string;
  city?: string;
  skills?: string[];
  languages?: { name: string; level: string }[];
  salaryMin?: number;
}

export interface JobData {
  id: string;
  title: string;
  company: string;
  description?: string;
  location?: string;
  modality?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  country?: string;
  skillsRaw?: string;
  source: string;
  url: string;
  postedAt?: string;
  logoUrl?: string;
}

export interface ScoreBreakdown {
  skillMatch: { score: number; weight: number; details: { matched: string[]; missing: string[] } };
  experienceFit: { score: number; weight: number; details: { userYears: number; requiredYears: number } };
  modalityMatch: { score: number; weight: number; details: { userModality: string; jobModality: string } };
  locationMatch: { score: number; weight: number; details: { userCountry: string; jobCountry: string } };
  languageMatch: { score: number; weight: number; details: { languages: string[] } };
  salaryFit: { score: number; weight: number; details: { userSalary: number; jobSalaryMin: number } };
  total: number;
}

export function calculateCompatibility(profile: ProfileData, job: JobData): ScoreBreakdown {
  const userSkills = (profile.skills || []).map((s) => s.toLowerCase());
  const jobSkills: string[] = job.skillsRaw ? JSON.parse(job.skillsRaw).map((s: string) => s.toLowerCase()) : [];

  const matched = userSkills.filter((s) => jobSkills.includes(s));
  const missing = jobSkills.filter((s) => !userSkills.includes(s));

  const skillMatchScore = jobSkills.length > 0 ? matched.length / jobSkills.length : 0.5;

  const userExp = profile.yearsExperience || 0;
  const jobExp = extractExperience(job.description || "");
  const expScore = userExp >= jobExp ? 1 : userExp >= jobExp - 1 ? 0.7 : 0.3;

  const userMod = (profile.modality || "").toLowerCase();
  const jobMod = (job.modality || "").toLowerCase();
  const modScore = userMod === jobMod ? 1 : jobMod === "unknown" ? 0.5 : 0.3;

  const userCountry = (profile.country || "").toLowerCase();
  const jobCountry = (job.country || "").toLowerCase();
  const locScore = userCountry === jobCountry ? 1 : jobMod === "remote" ? 0.7 : 0.3;

  const langScore = 0.5; // Neutral — depends on user languages vs job description

  const userSalary = profile.salaryMin || 0;
  const jobSalary = job.salaryMin || 0;
  const salScore = jobSalary === 0 ? 0.5 : userSalary <= jobSalary ? 1 : userSalary <= jobSalary * 1.2 ? 0.5 : 0;

  const total =
    skillMatchScore * 0.4 +
    expScore * 0.2 +
    modScore * 0.15 +
    locScore * 0.1 +
    langScore * 0.1 +
    salScore * 0.05;

  return {
    skillMatch: { score: skillMatchScore, weight: 0.4, details: { matched, missing } },
    experienceFit: { score: expScore, weight: 0.2, details: { userYears: userExp, requiredYears: jobExp } },
    modalityMatch: { score: modScore, weight: 0.15, details: { userModality: userMod, jobModality: jobMod } },
    locationMatch: { score: locScore, weight: 0.1, details: { userCountry, jobCountry } },
    languageMatch: { score: langScore, weight: 0.1, details: { languages: [] } },
    salaryFit: { score: salScore, weight: 0.05, details: { userSalary, jobSalaryMin: jobSalary } },
    total: Math.round(total * 100),
  };
}

function extractExperience(description: string): number {
  const match = description.match(/(\d+)\s*\+\s*years?/i);
  if (match) return parseInt(match[1]);
  const range = description.match(/(\d+)\s*[-–to]+\s*(\d+)\s*years?/i);
  if (range) return parseInt(range[1]);
  return 1;
}
