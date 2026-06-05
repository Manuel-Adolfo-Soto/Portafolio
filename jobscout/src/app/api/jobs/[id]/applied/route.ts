import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const { id: jobId } = await params;

  await prisma.recommendation.upsert({
    where: { userId_jobId: { userId, jobId } },
    update: { applied: true },
    create: { userId, jobId, score: 0, applied: true },
  });

  return NextResponse.json({ applied: true });
}
