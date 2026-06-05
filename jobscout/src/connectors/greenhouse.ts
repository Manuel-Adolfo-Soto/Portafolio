import { IJobProvider, RawJob, JobSearchQuery } from "./types";

export class GreenhouseProvider implements IJobProvider {
  name = "greenhouse";
  baseUrl = "https://boards-api.greenhouse.io";

  async searchJobs(query: JobSearchQuery): Promise<RawJob[]> {
    try {
      const limit = query.limit || 50;
      const res = await fetch(
        `https://boards-api.greenhouse.io/v1/boards/remote/jobs?content=true&description=true&per_page=${limit}`
      );
      if (!res.ok) return [];
      const data = await res.json();
      const jobs = data.jobs || [];

      return jobs.map((job: any) => ({
        externalId: String(job.id),
        title: job.title || "",
        company: job.company_name || job.organization || job.company || (job.offices && job.offices[0]?.name) || "",
        description: job.content?.slice(0, 2000) || job.description?.slice(0, 2000) || "",
        location: job.location?.name || "Remote",
        modality: "remote",
        salaryMin: undefined,
        salaryMax: undefined,
        currency: "USD",
        country: "Worldwide",
        url: job.absolute_url || `https://boards.greenhouse.io/remote/jobs/${job.id}`,
        postedAt: job.updated_at || job.created_at,
      }));
    } catch {
      return [];
    }
  }

  async getJobDetails(externalId: string): Promise<RawJob | null> {
    try {
      const res = await fetch(
        `https://boards-api.greenhouse.io/v1/boards/remote/jobs/${externalId}?content=true`
      );
      if (!res.ok) return null;
      const job = await res.json();
      return {
        externalId: String(job.id),
        title: job.title || "",
        company: job.company_name || job.organization || job.company || "",
        description: job.content?.slice(0, 2000) || "",
        location: job.location?.name || "Remote",
        modality: "remote",
        url: job.absolute_url || "",
        postedAt: job.updated_at,
      };
    } catch {
      return null;
    }
  }
}
