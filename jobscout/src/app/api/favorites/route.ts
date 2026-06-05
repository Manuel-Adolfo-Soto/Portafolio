import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: { job: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(
    favorites.map((f) => ({ ...f.job, favoritedAt: f.createdAt }))
  );
}
