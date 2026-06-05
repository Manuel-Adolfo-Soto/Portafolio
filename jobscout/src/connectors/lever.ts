import { IJobProvider, RawJob, JobSearchQuery } from "./types";

export class LeverProvider implements IJobProvider {
  name = "lever";
  baseUrl = "https://api.lever.co";

  async searchJobs(query: JobSearchQuery): Promise<RawJob[]> {
    try {
      const keywords = query.keywords?.join(" ") || "developer";
      const res = await fetch(
        `https://api.lever.co/v1/postings/search?q=${encodeURIComponent(keywords)}&limit=${query.limit || 25}`
      );
      if (!res.ok) return [];
      const data = await res.json();
      const jobs = data.data || data.postings || [];

      return jobs.map((job: any) => ({
        externalId: job.id || job.postingId,
        title: job.title || job.text || "",
        company: job.company || job.organization || "Lever Partner",
        description: job.descriptionPlain?.slice(0, 2000) || job.description?.slice(0, 2000) || "",
        location: job.categories?.location || job.location || "Remote",
        modality: job.categories?.commitment?.toLowerCase().includes("remote") ? "remote" : "unknown",
        salaryMin: job.salaryRange?.min,
        salaryMax: job.salaryRange?.max,
        currency: job.salaryRange?.currency || "USD",
        country: "Worldwide",
        url: job.hostedUrl || `https://jobs.lever.co/${job.id}`,
        postedAt: job.createdAt || job.updatedAt,
      }));
    } catch {
      return [];
    }
  }

  async getJobDetails(externalId: string): Promise<RawJob | null> {
    try {
      const res = await fetch(
        `https://api.lever.co/v1/postings/${externalId}`
      );
      if (!res.ok) return null;
      const job = await res.json();
      return {
        externalId: job.id,
        title: job.title || "",
        company: job.company || "",
        description: job.descriptionPlain?.slice(0, 2000) || "",
        location: job.categories?.location || "Remote",
        modality: "unknown",
        url: job.hostedUrl || "",
        postedAt: job.createdAt,
      };
    } catch {
      return null;
    }
  }
}
