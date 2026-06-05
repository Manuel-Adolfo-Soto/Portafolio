import { IJobProvider, RawJob, JobSearchQuery } from "./types";

export class WellfoundProvider implements IJobProvider {
  name = "wellfound";
  baseUrl = "https://wellfound.com";

  async searchJobs(query: JobSearchQuery): Promise<RawJob[]> {
    try {
      const keywords = query.keywords?.join("+") || "developer";
      const page = 1;
      const res = await fetch(
        `https://wellfound.com/api/v1/jobs/search?query=${keywords}&page=${page}&per_page=${query.limit || 25}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        }
      );
      if (!res.ok) return [];
      const data = await res.json();
      const jobs = data.jobs || data.records || [];

      return jobs.map((job: any) => ({
        externalId: String(job.id),
        title: job.name || job.title || "",
        company: job.company_name || job.organization?.name || "",
        description:
          job.description_plain?.slice(0, 2000) ||
          job.description?.slice(0, 2000) ||
          "",
        location: job.location || "Remote",
        modality: job.remote ? "remote" : job.location ? "hybrid" : "unknown",
        salaryMin: job.salary_min || job.compensation?.min,
        salaryMax: job.salary_max || job.compensation?.max,
        currency: job.salary_currency || "USD",
        country: "Worldwide",
        url: `https://wellfound.com/jobs/${job.id}`,
        logoUrl: job.company_logo || job.organization?.logo_url,
        postedAt: job.created_at || job.published_at,
      }));
    } catch {
      return [];
    }
  }

  async getJobDetails(externalId: string): Promise<RawJob | null> {
    try {
      const res = await fetch(
        `https://wellfound.com/api/v1/jobs/${externalId}`,
        {
          headers: {
            Accept: "application/json",
            "User-Agent":
              "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
          },
        }
      );
      if (!res.ok) return null;
      const job = await res.json();
      return {
        externalId: String(job.id),
        title: job.name || job.title || "",
        company: job.company_name || job.organization?.name || "",
        description: job.description_plain?.slice(0, 2000) || "",
        location: job.location || "Remote",
        modality: job.remote ? "remote" : "unknown",
        salaryMin: job.salary_min,
        salaryMax: job.salary_max,
        currency: "USD",
        country: "Worldwide",
        url: `https://wellfound.com/jobs/${job.id}`,
        postedAt: job.created_at,
      };
    } catch {
      return null;
    }
  }
}
