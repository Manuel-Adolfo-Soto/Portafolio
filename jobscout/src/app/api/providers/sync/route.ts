import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getActiveProviders, RawJob } from "@/connectors";
import { auth } from "@/lib/auth";
import { extractSkills } from "@/lib/skills";

export async function POST() {
  const session = await auth();
  if (session?.user && (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const providers = getActiveProviders();
  const results: { provider: string; jobs: number }[] = [];

  for (const provider of providers) {
    try {
      const rawJobs: RawJob[] = await provider.searchJobs({
        limit: 50,
      });

      let imported = 0;
      for (const raw of rawJobs) {
        try {
          const extracted = extractSkills(raw.description || "", raw.title);
          const allSkills = raw.skillsRaw
            ? [...new Set([...JSON.parse(raw.skillsRaw), ...extracted])]
            : extracted;

          await prisma.job.upsert({
            where: {
              source_externalId: {
                source: provider.name,
                externalId: raw.externalId,
              },
            },
            update: {
              title: raw.title,
              company: raw.company,
              description: raw.description?.slice(0, 4000) || null,
              location: raw.location || null,
              modality: raw.modality || "unknown",
              salaryMin: raw.salaryMin || null,
              salaryMax: raw.salaryMax || null,
              currency: raw.currency || null,
              country: raw.country || null,
              url: raw.url,
              logoUrl: raw.logoUrl || null,
              postedAt: raw.postedAt ? new Date(raw.postedAt) : null,
              skillsRaw: JSON.stringify(allSkills),
            },
            create: {
              externalId: raw.externalId,
              source: provider.name,
              title: raw.title,
              company: raw.company,
              description: raw.description?.slice(0, 4000) || null,
              location: raw.location || null,
              modality: raw.modality || "unknown",
              salaryMin: raw.salaryMin || null,
              salaryMax: raw.salaryMax || null,
              currency: raw.currency || null,
              country: raw.country || null,
              url: raw.url,
              logoUrl: raw.logoUrl || null,
              postedAt: raw.postedAt ? new Date(raw.postedAt) : null,
              skillsRaw: JSON.stringify(allSkills),
            },
          });
          imported++;
        } catch {
          // Skip duplicates silently
        }
      }

      await prisma.jobProvider.upsert({
        where: { name: provider.name },
        update: { lastRunAt: new Date() },
        create: { name: provider.name, baseUrl: provider.baseUrl, lastRunAt: new Date() },
      });

      results.push({ provider: provider.name, jobs: imported });
    } catch {
      results.push({ provider: provider.name, jobs: 0 });
    }
  }

  return NextResponse.json({ synced: results, total: results.reduce((a, r) => a + r.jobs, 0) });
}

export async function GET() {
  const providers = await prisma.jobProvider.findMany();
  const totalJobs = await prisma.job.count();
  const totalUsers = await prisma.user.count();

  return NextResponse.json({
    providers: providers.length > 0 ? providers : getActiveProviders().map((p) => ({ name: p.name, active: true })),
    totalJobs,
    totalUsers,
  });
}
