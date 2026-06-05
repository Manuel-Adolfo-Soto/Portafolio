import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { parseSkills } from "@/lib/utils";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const profile = await prisma.profile.findUnique({
    where: { userId: (session.user as any).id },
    include: { skills: { include: { skill: true } }, languages: true, certificates: true },
  });
  return NextResponse.json(profile);
}

export async function PUT(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const userId = (session.user as any).id;

    const profile = await prisma.profile.upsert({
      where: { userId },
      update: {
        title: data.title,
        career: data.career,
        yearsExperience: data.yearsExperience,
        modality: data.modality,
        country: data.country,
        city: data.city,
        summary: data.summary,
      },
      create: {
        userId,
        title: data.title,
        career: data.career,
        yearsExperience: data.yearsExperience,
        modality: data.modality,
        country: data.country,
        city: data.city,
        summary: data.summary,
      },
      include: { skills: { include: { skill: true } } },
    });

    return NextResponse.json(profile);
  } catch {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
