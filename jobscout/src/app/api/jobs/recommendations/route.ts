import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { calculateCompatibility, ProfileData, JobData } from "@/lib/compatibility";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get("limit") || "20");

  const profile = await prisma.profile.findUnique({
    where: { userId },
    include: { skills: { include: { skill: true } }, languages: true },
  });

  if (!profile) {
    return NextResponse.json({ error: "Complete your profile first" }, { status: 400 });
  }

  const profileData: ProfileData = {
    title: profile.title || undefined,
    career: profile.career || undefined,
    yearsExperience: profile.yearsExperience || undefined,
    modality: profile.modality || undefined,
    country: profile.country || undefined,
    city: profile.city || undefined,
    skills: profile.skills.map((s) => s.skill.name),
    languages: profile.languages.map((l) => ({ name: l.name, level: l.level })),
    salaryMin: undefined,
  };

  const jobs = await prisma.job.findMany({
    where: {
      NOT: {
        recommendations: { some: { userId } },
      },
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const scored = jobs
    .map((job) => {
      const jobData: JobData = {
        id: job.id,
        title: job.title,
        company: job.company,
        description: job.description || undefined,
        location: job.location || undefined,
        modality: job.modality || undefined,
        salaryMin: job.salaryMin || undefined,
        salaryMax: job.salaryMax || undefined,
        currency: job.currency || undefined,
        country: job.country || undefined,
        skillsRaw: job.skillsRaw || undefined,
        source: job.source,
        url: job.url,
        postedAt: job.postedAt?.toISOString(),
      };
      const score = calculateCompatibility(profileData, jobData);
      return { job, score };
    })
    .sort((a, b) => b.score.total - a.score.total)
    .slice(0, limit);

  for (const { job, score } of scored) {
    await prisma.recommendation.upsert({
      where: { userId_jobId: { userId, jobId: job.id } },
      update: { score: score.total, scoreBreakdown: JSON.stringify(score) },
      create: {
        userId,
        jobId: job.id,
        score: score.total,
        scoreBreakdown: JSON.stringify(score),
      },
    });
  }

  const saved = await prisma.recommendation.findMany({
    where: { userId },
    orderBy: { score: "desc" },
    take: limit,
    include: { job: true },
  });

  return NextResponse.json({
    recommendations: saved.map((r) => ({
      ...r.job,
      score: r.score,
      scoreBreakdown: r.scoreBreakdown ? JSON.parse(r.scoreBreakdown) : null,
      isFavorite: false,
    })),
  });
}
