# eluma.ch Ecosystem Architecture

## Two-App System

```
Dashboard OS (admin.eluma.ch)          Main Site (eluma.ch)
┌─────────────────────────┐           ┌──────────────────────────┐
│ Next.js 16 + Clerk Auth │           │ Next.js 16 + next-intl   │
│ Prisma 7 + Neon Postgres│ ────DB──► │ Prisma 7 + Neon Postgres │
│ pnpm                    │           │ npm                      │
└─────────────────────────┘           └──────────────────────────┘
         │                                       │
         │ writes Demo/Section/Content            │ reads Demo/Section/Content
         │ to shared Neon Postgres DB             │ from shared Neon Postgres DB
         ▼                                       ▼
    ┌──────────┐                          ┌──────────────┐
    │ Neon DB   │ (Frankfurt, eu-central) │ Vercel Deploy │
    │ neondb    │                          │ eluma.ch      │
    └──────────┘                          └──────────────┘
```

## Repos & Paths

| Component | Repo | Local Path |
|-----------|------|------------|
| Dashboard OS | alphinus/eluma-dashboard (private) | `/Users/developer/eluma ökosystem dashboard OS` |
| Main Site | alphinus/eluma-consulting-2026 | `/Users/developer/eluma ökosystem dashboard OS/_main-site-reference` (submodule) |
| Main Site (standalone) | same | `/Users/developer/eluma` (separate clone) |

## Database (shared)

- **Provider**: Neon PostgreSQL (Frankfurt)
- **Pooler**: `ep-autumn-leaf-agnyhilp-pooler.c-2.eu-central-1.aws.neon.tech`
- **Direct**: `ep-autumn-leaf-agnyhilp.c-2.eu-central-1.aws.neon.tech`
- **Database**: `neondb`

### Models (Prisma schema)

| Model | Purpose | Key fields |
|-------|---------|------------|
| Demo | Demo page visibility & metadata | slug, enabled, order, status |
| Section | Homepage section visibility | slug, enabled, order, status |
| Content | Editable text blocks (i18n) | key, value, locale, sectionSlug, status |
| FeatureFlag | Generic feature toggles | key, enabled |
| Version | Change history (polymorphic) | recordType, recordId, snapshot, diff |
| Publish | Publish events | summary, publishedBy |

### Draft/Publish Workflow

1. Dashboard writes changes with `status: draft`
2. User reviews in preview mode
3. User clicks "Publish" → status changes to `published`
4. Dashboard calls Main Site `/api/revalidate` to invalidate cache

## Main Site Key Files

### Demo System
- `src/app/[locale]/demos/page.tsx` — Server Component, reads `getEnabledDemoSlugs()` from DB
- `src/app/[locale]/demos/*/layout.tsx` — Each demo layout checks `isDemoEnabled(slug)`, returns 404 if disabled
- `src/lib/feature-flags.ts` — `getEnabledDemoSlugs()`, `isDemoEnabled()`, `isSectionEnabled()`, `getEnabledSections()`
- `DEMO_CONFIG` in demos/page.tsx — Visual config (brandColor, previewImage) per demo slug

### Section System
- `src/app/[locale]/page.tsx` — Homepage, reads `getSectionVisibilitySlugs()` from DB
- Sections: hero, services, about, video-showcase, portfolio, contact

### Caching
- `unstable_cache` with 60-second revalidation
- Cache tags: `"demos"`, `"sections"`, `"content"`, `"feature-flags"`
- Revalidation API: `POST /api/revalidate` with `x-revalidate-secret` header

### Deployment
- **Vercel project**: `eluma-consulting-2026` (org: `alphinus-gmailcoms-projects`)
- **Custom domain**: `eluma.ch` + `www.eluma.ch`
- **Git author**: Must use `alphinus@gmail.com` for Vercel to accept deployments
- **Required env vars on Vercel**: DATABASE_URL, RESEND_API_KEY, NOTION_API_KEY, etc.

## Dashboard Key Files

### Demo Management
- `src/app/(dashboard)/demos/` — Demo list and editing UI
- `src/app/api/demos/` — API routes for CRUD operations

### Publish Flow
- `src/app/(dashboard)/publish/` — Review and publish UI
- `src/app/api/publish/` — Publish API (writes to DB + triggers revalidation)

### Auth
- `src/proxy.ts` — Clerk middleware, MFA enforcement (production only)
- MFA bypassed in development (`process.env.NODE_ENV !== 'production'`)

## Adding a New Demo

1. **Database**: Create Demo record via Dashboard or Prisma seed
2. **Main Site demo page**: Create `src/app/[locale]/demos/{slug}/page.tsx` (client component)
3. **Main Site layout**: Create `src/app/[locale]/demos/{slug}/layout.tsx` with `isDemoEnabled(slug)` check
4. **DEMO_CONFIG**: Add entry in `demos/page.tsx` with brandColor and previewImage
5. **Translations**: Add `demos.cards.{slug}.*` keys in message files
6. **Deploy**: Commit with `--author="alphinus <alphinus@gmail.com>"`, push, Vercel auto-deploys
