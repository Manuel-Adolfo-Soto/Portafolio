import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  const history = await prisma.recommendation.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 50,
    include: { job: true },
  });

  return NextResponse.json(
    history.map((r) => ({
      ...r.job,
      score: r.score,
      scoreBreakdown: r.scoreBreakdown ? JSON.parse(r.scoreBreakdown) : null,
      seen: r.seen,
      applied: r.applied,
      recommendedAt: r.createdAt,
    }))
  );
}
