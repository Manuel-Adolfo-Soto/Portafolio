import { IJobProvider, RawJob, JobSearchQuery } from "./types";

export class RemotiveProvider implements IJobProvider {
  name = "remotive";
  baseUrl = "https://remotive.com";

  async searchJobs(query: JobSearchQuery): Promise<RawJob[]> {
    try {
      const limit = query.limit || 50;
      const res = await fetch(
        `https://remotive.com/api/remote-jobs?limit=${limit}`,
        { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } }
      );
      if (!res.ok) return [];
      const data = await res.json();
      const jobs = data.jobs || [];
      if (!Array.isArray(jobs)) return [];

      return jobs.map((job: any) => ({
        externalId: String(job.id),
        title: job.title || "",
        company: job.company_name || "",
        description: job.description || "",
        location: job.candidate_required_location || "Remote",
        modality: job.job_type === "full_time" ? "remote" : "remote",
        salaryMin: job.salary ? parseFloat(job.salary.replace(/[^0-9.]/g, "")) : undefined,
        salaryMax: undefined,
        currency: "USD",
        country: job.candidate_required_location === "Worldwide" ? "Worldwide" : undefined,
        url: job.url || "",
        logoUrl: job.company_logo || undefined,
        postedAt: job.publication_date || undefined,
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
