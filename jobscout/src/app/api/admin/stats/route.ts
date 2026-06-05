import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getAllProviders } from "@/connectors";

export async function GET() {
  const session = await auth();
  if (session?.user && (session.user as any).role !== "admin") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const totalJobs = await prisma.job.count();
  const totalUsers = await prisma.user.count();
  const totalRecs = await prisma.recommendation.count();
  const jobsBySource = await prisma.job.groupBy({
    by: ["source"],
    _count: true,
  });
  const recentJobs = await prisma.job.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
  });
  const providers = getAllProviders().map((p) => ({ name: p.name, active: true }));

  return NextResponse.json({
    stats: {
      totalJobs,
      totalUsers,
      totalRecs,
      jobsBySource: jobsBySource.map((j) => ({ source: j.source, count: j._count })),
    },
    recentJobs,
    providers,
  });
}
