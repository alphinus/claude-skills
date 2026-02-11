---
name: eluma:homepage
description: Manage the eluma.ch homepage ecosystem — dashboard OS (admin.eluma.ch) and main site (eluma.ch). Use when working on demo pages, homepage sections, content editing, feature flags, the draft/publish workflow, or deploying changes to eluma.ch. Triggers on tasks involving the main site submodule (_main-site-reference), demo management, section visibility, revalidation, or Vercel deployment of eluma-consulting-2026.
---

# eluma:homepage

Manages the two-app eluma.ch ecosystem: Dashboard OS (admin) writes to a shared Neon PostgreSQL DB, Main Site (eluma.ch) reads from it. For full architecture details, see [references/architecture.md](references/architecture.md).

## Quick Reference

| Component | Path | Stack |
|-----------|------|-------|
| Dashboard OS | `/Users/developer/eluma ökosystem dashboard OS` | Next.js 16, Clerk, Prisma 7, pnpm |
| Main Site (submodule) | `_main-site-reference/` | Next.js 16, next-intl, Prisma 7, npm |
| Main Site (standalone) | `/Users/developer/eluma` | Same repo, separate clone |

## Core Workflows

### 1. Adding a New Demo

1. Create Demo record in DB (via Dashboard or Prisma seed)
2. Create demo page: `_main-site-reference/src/app/[locale]/demos/{slug}/page.tsx`
3. Create demo layout with gate check:
   ```tsx
   import { notFound } from 'next/navigation';
   import { isDemoEnabled } from '@/lib/feature-flags';
   export default async function DemoLayout({ children }) {
     if (!(await isDemoEnabled('slug'))) notFound();
     return <>{children}</>;
   }
   ```
4. Add visual config in `demos/page.tsx` DEMO_CONFIG: `{ brandColor, previewImage }`
5. Add translations: `demos.cards.{slug}.*` in message files
6. Deploy (see Deployment below)

### 2. Modifying Section Visibility

Sections are controlled via the `Section` table in the shared DB. The homepage (`src/app/[locale]/page.tsx`) calls `getSectionVisibilitySlugs()` to determine which sections render. Available slugs: `hero`, `services`, `about`, `video-showcase`, `portfolio`, `contact`.

### 3. Content Editing (i18n)

The `Content` model stores editable text blocks with `key`, `value`, `locale`, and `sectionSlug`. Dashboard writes with `status: draft`, user publishes to `status: published`.

### 4. Draft/Publish Flow

1. Dashboard writes changes with `status: draft`
2. User reviews in preview mode
3. User clicks "Publish" → status becomes `published`
4. Dashboard calls Main Site `POST /api/revalidate` with `x-revalidate-secret` header to bust cache

## Key Files

### Main Site Feature Flags
- `src/lib/feature-flags.ts` — `getEnabledDemoSlugs()`, `isDemoEnabled()`, `isSectionEnabled()`, `getEnabledSections()`
- Reads from `Demo` table (not `FeatureFlag` table)

### Caching
- `unstable_cache` with 60s revalidation
- Cache tags: `"demos"`, `"sections"`, `"content"`, `"feature-flags"`
- Revalidation: `POST /api/revalidate` — requires `x-revalidate-secret` header, accepts `{ paths: [], tags: [] }`
- Next.js 16: `revalidateTag(tag, "default")` requires two arguments

## Deployment

### Critical Rules
- Git commits to the main site **must** use: `--author="alphinus <alphinus@gmail.com>"` — Vercel rejects other authors
- The main site is a **submodule** at `_main-site-reference/` — commit inside the submodule first, push from there
- Vercel auto-deploys on push to `alphinus/eluma-consulting-2026` main branch
- `package.json` must have `"postinstall": "prisma generate"` and both `prisma` + `@prisma/client` as dependencies

### Deploy Steps
```bash
# 1. Inside _main-site-reference/
cd "_main-site-reference"
git add -A
git commit --author="alphinus <alphinus@gmail.com>" -m "description"
git push origin main

# 2. Back in Dashboard OS, update submodule ref
cd ..
git add _main-site-reference
git commit -m "chore: update main site submodule reference"
```

### Manual Deploy (if needed)
```bash
cd "_main-site-reference"
vercel --prod --yes
```

## Common Pitfalls

- **`isDemoEnabled()` reads from `Demo` table**, not `FeatureFlag`. The function delegates to `getEnabledDemoSlugs()` which queries demos with `enabled: true` and `status: 'published'`.
- **Prisma CLI ignores `.env.local`** — pass DATABASE_URL explicitly: `DATABASE_URL="..." npx prisma db push`
- **Dashboard `.env.local`** can get overwritten by `vercel env pull` — keep a backup of Clerk keys, DATABASE_URL, and BLOB_READ_WRITE_TOKEN
- **MFA is production-only** — `proxy.ts` checks `process.env.NODE_ENV === 'production'` before enforcing MFA redirect
- **Immobilien demo layout** uses a separate `ImmobilienShell.tsx` client component because it needs client-side role switching — the layout itself must remain a server component for `isDemoEnabled()` check

## Resources

### references/
- [architecture.md](references/architecture.md) — Full ecosystem architecture: repos, database models, paths, Vercel config, env vars
