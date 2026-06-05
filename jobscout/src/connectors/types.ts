export interface JobSearchQuery {
  keywords?: string[];
  location?: string;
  modality?: string;
  limit?: number;
}

export interface RawJob {
  externalId: string;
  title: string;
  company: string;
  description: string;
  location?: string;
  modality?: string;
  salaryMin?: number;
  salaryMax?: number;
  currency?: string;
  country?: string;
  url: string;
  logoUrl?: string;
  postedAt?: string;
  skillsRaw?: string;
}

export interface IJobProvider {
  name: string;
  baseUrl: string;
  searchJobs(query: JobSearchQuery): Promise<RawJob[]>;
  getJobDetails(externalId: string): Promise<RawJob | null>;
}
