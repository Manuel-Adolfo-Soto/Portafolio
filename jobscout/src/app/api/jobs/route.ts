import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "20");
  const modality = searchParams.get("modality");
  const country = searchParams.get("country");
  const source = searchParams.get("source");
  const q = searchParams.get("q");
  const minScore = parseFloat(searchParams.get("minScore") || "0");

  const where: any = {};

  if (modality && modality !== "all") where.modality = modality;
  if (country && country !== "all") where.country = country;
  if (source && source !== "all") where.source = source;
  if (q) {
    where.OR = [
      { title: { contains: q } },
      { company: { contains: q } },
      { description: { contains: q } },
    ];
  }

  let orderBy: any = { createdAt: "desc" };

  const [jobs, total] = await Promise.all([
    prisma.job.findMany({
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        recommendations: {
          where: { userId: (session.user as any).id },
          take: 1,
        },
        favorites: {
          where: { userId: (session.user as any).id },
          take: 1,
        },
      },
    }),
    prisma.job.count({ where }),
  ]);

  const mapped = jobs.map((job) => ({
    ...job,
    score: job.recommendations[0]?.score || null,
    isFavorite: job.favorites.length > 0,
  }));

  return NextResponse.json({
    jobs: mapped,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}
