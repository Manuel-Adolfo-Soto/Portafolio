import { IJobProvider, RawJob, JobSearchQuery } from "./types";

export class RemoteOKProvider implements IJobProvider {
  name = "remoteok";
  baseUrl = "https://remoteok.com";

  async searchJobs(query: JobSearchQuery): Promise<RawJob[]> {
    try {
      const params = new URLSearchParams({ limit: String(query.limit || 50) });
      const res = await fetch(`https://remoteok.com/api?${params}`, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" },
      });
      if (!res.ok) return [];
      const data = await res.json();
      if (!Array.isArray(data)) return [];

      return data.slice(1).map((job: any) => ({
        externalId: job.id || String(job.url),
        title: job.position || job.title || "",
        company: job.company || "",
        description: job.description || "",
        location: job.location || "Remote",
        modality: "remote",
        salaryMin: job.salary_min ? parseFloat(job.salary_min) : undefined,
        salaryMax: job.salary_max ? parseFloat(job.salary_max) : undefined,
        currency: "USD",
        country: "Worldwide",
        url: job.url || job.apply_url || "",
        logoUrl: job.logo || undefined,
        postedAt: job.date ? new Date(job.date).toISOString() : undefined,
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
