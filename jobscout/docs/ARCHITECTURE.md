# JobScout AI — Architecture

## Overview

JobScout AI is a full-stack web application that searches job listings from multiple sources, analyzes them against a user's professional profile, and recommends the most compatible positions.

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15 (App Router) + TypeScript |
| Styling | Tailwind CSS + shadcn/ui |
| Backend | Next.js API Routes (Node.js 24) |
| Database | Prisma ORM + SQLite (dev) / PostgreSQL (prod) |
| Auth | NextAuth.js v5 (JWT + Google OAuth) |
| Scraping | Node.js connectors (serverless cron) |
| Cache | In-memory (dev) / Redis (future) |
| Deployment | Vercel (frontend+api) + Railway (PostgreSQL) |

## Why not ASP.NET Core + .NET 9?

.NET SDK is not available in this environment. Next.js API Routes provide an equivalent architecture:
- Clean API endpoints with TypeScript
- Dependency injection via function composition
- Repository pattern via Prisma
- JWT auth via NextAuth.js
- Same scalability for MVP scope

## Project Structure

```
jobscout/
├── prisma/                    # Database schema + migrations
│   ├── schema.prisma
│   └── seed.ts
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (auth)/            # Auth pages (login, register)
│   │   ├── (dashboard)/       # Protected pages
│   │   │   ├── page.tsx       # Dashboard home
│   │   │   ├── profile/       # User profile
│   │   │   ├── jobs/          # Job listings
│   │   │   ├── favorites/     # Saved jobs
│   │   │   └── history/       # Recommendation history
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # NextAuth.js handlers
│   │   │   ├── profile/       # User profile CRUD
│   │   │   ├── jobs/          # Job CRUD + compatibility
│   │   │   ├── providers/     # Job source connectors
│   │   │   └── admin/         # Admin endpoints
│   │   └── layout.tsx         # Root layout
│   ├── components/            # Shared React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── jobs/              # Job card, filters
│   │   ├── profile/           # Profile form, CV upload
│   │   └── dashboard/         # Charts, stats
│   ├── lib/                   # Business logic
│   │   ├── prisma.ts          # Prisma client singleton
│   │   ├── auth.ts            # NextAuth.js config
│   │   ├── compatibility.ts   # Scoring algorithm
│   │   └── utils.ts           # Shared utilities
│   ├── connectors/            # Job source connectors
│   │   ├── types.ts           # IJobProvider interface
│   │   ├── remoteok.ts
│   │   ├── wellfound.ts
│   │   ├── greenhouse.ts
│   │   ├── lever.ts
│   │   └── index.ts           # Connector registry
│   └── styles/
│       └── globals.css
├── public/
├── docker-compose.yml         # PostgreSQL for production
├── Dockerfile
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
└── .env.example
```

## Database Schema (Prisma)

### Core Entities

- **User** — id, name, email, password (hashed), image, role, createdAt
- **Profile** — id, userId, title, career, yearsExperience, modality, country, city, summary
- **Skill** — id, name, category (frontend/backend/db/tool)
- **ProfileSkill** — profileId, skillId, level
- **Language** — id, profileId, name, level
- **Certificate** — id, profileId, name, issuer, date, url
- **Resume** — id, profileId, fileUrl, parsedData (JSON)
- **Job** — id, externalId, title, company, description, location, modality, salaryMin, salaryMax, currency, country, skills (JSON), source, url, postedAt, expiresAt, createdAt
- **JobProvider** — id, name, baseUrl, active, lastRunAt
- **Recommendation** — id, userId, jobId, score, scoreBreakdown (JSON), seen, applied, createdAt
- **Favorite** — id, userId, jobId, createdAt
- **Notification** — id, userId, type, channel, minScore, active
- **AuditLog** — id, userId, action, metadata, createdAt

## API Endpoints

### Auth
- `POST /api/auth/register` — Register with email
- `POST /api/auth/login` — Login with email
- `GET /api/auth/session` — Get current session
- `POST /api/auth/callback/google` — Google OAuth

### Profile
- `GET /api/profile` — Get my profile
- `PUT /api/profile` — Update profile
- `POST /api/profile/cv` — Upload CV (parse PDF/DOCX)
- `GET /api/profile/skills` — Get my skills
- `POST /api/profile/skills` — Add skill

### Jobs
- `GET /api/jobs` — List jobs (paginated, filtered)
- `GET /api/jobs/:id` — Get job details
- `POST /api/jobs/sync` — Trigger provider sync
- `GET /api/jobs/recommendations` — Get personalized recommendations
- `POST /api/jobs/:id/favorite` — Toggle favorite
- `POST /api/jobs/:id/applied` — Mark as applied

### Providers (Admin)
- `GET /api/admin/providers` — List providers
- `POST /api/admin/providers/sync` — Sync all providers
- `GET /api/admin/stats` — Platform stats

## Compatibility Scoring Algorithm

```
Score = (skillMatch * 0.40) +
        (experienceFit * 0.20) +
        (modalityMatch * 0.15) +
        (locationMatch * 0.10) +
        (languageMatch * 0.10) +
        (salaryFit * 0.05)
```

### Skill Match (40%)
- Compare user skills (from profile) against job skills (from listing)
- Each matching skill = weighted score
- Frontend match = 1.0, backend = 1.0, database = 0.8, tool = 0.5

### Experience Fit (20%)
- Normalize user years against job required years
- If user >= required: 1.0
- If user within 1 year: 0.7
- Otherwise: 0.3

### Modality Match (15%)
- Exact match: 1.0
- Partial (remote + hybrid): 0.5
- No match: 0.0

### Location Match (10%)
- Same city: 1.0
- Same country: 0.7
- Remote allowed: 0.5
- Different country: 0.2

### Language Match (10%)
- Job language matches user language: 1.0
- Partial: 0.5
- No match: 0.0

### Salary Fit (5%)
- Job salary >= user minimum: 1.0
- Within 80%: 0.5
- Below: 0.0

## Connector Pattern (IJobProvider)

Every job source implements:

```typescript
interface IJobProvider {
  name: string;
  baseUrl: string;
  searchJobs: (query: JobSearchQuery) => Promise<RawJob[]>;
  getJobDetails: (externalId: string) => Promise<RawJob | null>;
}
```

New sources are added by creating a new file in `src/connectors/` and registering it in `index.ts`. No other code changes needed.

## Development

```bash
# Install
npm install

# Initialize database
npx prisma migrate dev --name init
npx prisma db seed

# Run
npm run dev

# Build for production
npm run build
npm run start
```

## Production Deployment

1. Push to GitHub
2. Import to Vercel (frontend + API routes)
3. Set up PostgreSQL on Railway
4. Set environment variables in Vercel
5. Schedule provider sync via Vercel Cron Jobs
