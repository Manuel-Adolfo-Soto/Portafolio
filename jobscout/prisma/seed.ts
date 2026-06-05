import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const SKILLS = [
  { name: 'C#', category: 'language' },
  { name: '.NET', category: 'backend' },
  { name: 'ASP.NET Core', category: 'backend' },
  { name: 'SQL Server', category: 'database' },
  { name: 'React', category: 'frontend' },
  { name: 'TypeScript', category: 'language' },
  { name: 'JavaScript', category: 'language' },
  { name: 'HTML', category: 'frontend' },
  { name: 'CSS', category: 'frontend' },
  { name: 'Git', category: 'tool' },
  { name: 'SQL', category: 'database' },
  { name: 'Entity Framework', category: 'backend' },
  { name: 'REST APIs', category: 'backend' },
  { name: 'Node.js', category: 'backend' },
  { name: 'Angular', category: 'frontend' },
  { name: 'Docker', category: 'tool' },
  { name: 'Linux', category: 'tool' },
  { name: 'PostgreSQL', category: 'database' },
  { name: 'MongoDB', category: 'database' },
  { name: 'Next.js', category: 'frontend' },
];

async function main() {
  console.log('Cleaning database...');
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.favorite.deleteMany();
  await prisma.recommendation.deleteMany();
  await prisma.jobProvider.deleteMany();
  await prisma.job.deleteMany();
  await prisma.resume.deleteMany();
  await prisma.certificate.deleteMany();
  await prisma.language.deleteMany();
  await prisma.profileSkill.deleteMany();
  await prisma.profile.deleteMany();
  await prisma.user.deleteMany();
  await prisma.skill.deleteMany();
  console.log('  ✓ Database cleaned');

  // Create skills
  for (const skill of SKILLS) {
    await prisma.skill.create({ data: skill });
  }
  console.log(`  ✓ ${SKILLS.length} skills created`);

  // Create admin user
  const passwordHash = await bcrypt.hash('test1234', 10);
  const user = await prisma.user.create({
    data: {
      name: 'Khiomaru',
      email: 'khiomaru@test.com',
      password: passwordHash,
      role: 'admin',
    },
  });
  console.log(`  ✓ User created: ${user.email} (password: test1234)`);

  // Create profile
  const profile = await prisma.profile.create({
    data: {
      userId: user.id,
      title: 'Junior Full Stack Developer',
      career: 'Ingeniería Informática',
      yearsExperience: 0.5,
      modality: 'remote',
      country: 'Bolivia',
      city: 'Sucre',
      summary: 'Estudiante de Ingeniería Informática apasionado por el desarrollo de software. Experiencia en C#, .NET, SQL Server y React. Buscando oportunidades para crecer como desarrollador Full Stack.',
    },
  });
  console.log('  ✓ Profile created');

  // Link skills
  const allSkills = await prisma.skill.findMany();
  for (const skill of allSkills) {
    await prisma.profileSkill.create({
      data: { profileId: profile.id, skillId: skill.id, level: 'intermediate' },
    });
  }
  console.log(`  ✓ ${allSkills.length} skills linked to profile`);

  // Languages
  await prisma.language.createMany({
    data: [
      { profileId: profile.id, name: 'Spanish', level: 'native' },
      { profileId: profile.id, name: 'English', level: 'basic' },
    ],
  });
  console.log('  ✓ Languages added');

  console.log('\nSeed completed successfully!');
  console.log('\nLogin credentials:');
  console.log('  Email:    khiomaru@test.com');
  console.log('  Password: test1234');
}

main()
  .catch((e) => {
    console.error('Seed error:', e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
