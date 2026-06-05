import { IJobProvider, RawJob, JobSearchQuery } from "./types";

export class ArbeitnowProvider implements IJobProvider {
  name = "arbeitnow";
  baseUrl = "https://arbeitnow.com";

  async searchJobs(query: JobSearchQuery): Promise<RawJob[]> {
    try {
      const limit = query.limit || 50;
      const res = await fetch(
        `https://arbeitnow.com/api/job-board-api?limit=${limit}`,
        {
          redirect: "follow",
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
        }
      );
      if (!res.ok) return [];
      const data = await res.json();
      const jobs = data.data || [];
      if (!Array.isArray(jobs)) return [];

      return jobs.map((job: any) => ({
        externalId: job.slug || String(job.id),
        title: job.title || "",
        company: job.company_name || "",
        description: job.description || "",
        location: job.location || "Remote",
        modality: job.job_types?.includes("remote") ? "remote" : job.tags?.includes("Remote") ? "remote" : "unknown",
        salaryMin: job.salary_min || undefined,
        salaryMax: job.salary_max || undefined,
        currency: "EUR",
        country: undefined,
        url: job.url || "",
        logoUrl: job.company_logo || undefined,
        postedAt: job.created_at ? new Date(job.created_at * 1000).toISOString() : undefined,
        skillsRaw: job.tags ? JSON.stringify(job.tags) : undefined,
      }));
    } catch {
      return [];
    }
  }

  async getJobDetails(externalId: string): Promise<RawJob | null> {
    const jobs = await this.searchJobs({});
    return jobs.find((j) => j.externalId === externalId) || null;
  }
}
