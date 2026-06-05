import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userId = (session.user as any).id;
  const skills = await prisma.profileSkill.findMany({
    where: { profile: { userId } },
    include: { skill: true },
  });

  return NextResponse.json(skills);
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { skillName, level } = await req.json();
    const userId = (session.user as any).id;

    const profile = await prisma.profile.findUnique({ where: { userId } });
    if (!profile) {
      return NextResponse.json({ error: "Profile not found" }, { status: 404 });
    }

    let skill = await prisma.skill.findUnique({ where: { name: skillName } });
    if (!skill) {
      const categories: Record<string, string> = {
        angular: "frontend", react: "frontend", vue: "frontend", nextjs: "frontend",
        nestjs: "backend", node: "backend", express: "backend", python: "backend",
        typescript: "language", javascript: "language",
        postgresql: "database", mysql: "database", mongodb: "database", sql: "database",
        docker: "tool", git: "tool", aws: "tool",
      };
      skill = await prisma.skill.create({
        data: { name: skillName, category: categories[skillName.toLowerCase()] || "tool" },
      });
    }

    const profileSkill = await prisma.profileSkill.upsert({
      where: { profileId_skillId: { profileId: profile.id, skillId: skill.id } },
      update: { level: level || "intermediate" },
      create: { profileId: profile.id, skillId: skill.id, level: level || "intermediate" },
    });

    return NextResponse.json(profileSkill);
  } catch {
    return NextResponse.json({ error: "Failed to add skill" }, { status: 500 });
  }
}
