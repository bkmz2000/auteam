# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Self-hosted TinaCMS content management platform for an Armenian neurodiversity education organization (Ауттим). Built on Next.js 14 (App Router), deployed to **Vercel** (the project name "tina-cloudflare" is a legacy misnomer — there is no Cloudflare Workers setup).

Content is stored as Markdown in GitHub and indexed into Upstash Redis (Vercel KV) for fast queries.

## Commands

```bash
pnpm dev          # Local mode — no auth, writes to local filesystem
pnpm dev:prod     # Production mode — uses GitHub + Redis backend, requires auth
pnpm build        # tinacms build && next build
pnpm start        # Run production server
pnpm lint         # ESLint
```

## Architecture

### Two operating modes

Controlled by `TINA_PUBLIC_IS_LOCAL` env var:

- **Local (`true`):** TinaCMS uses `LocalBackendAuthProvider()` and writes content directly to `content/` on disk. No credentials needed.
- **Production (`false`):** Uses `TinaCloudBackendAuthProvider()`, GitHub as the Git provider, and Upstash Redis as the database adapter.

### Request flow (production)

1. Admin logs into `/admin` via password (`TINA_ADMIN_PASSWORD`)
2. TinaCMS UI queries `/api/tina/gql` (GraphQL) for content
3. `pages/api/tina/[...routes].ts` handles all TinaCMS backend routes via `TinaNodeBackend`
4. `tina/database.ts` wires together:
   - **GitHub Provider** — reads/commits Markdown to `content/` via GitHub PAT
   - **Redis Adapter** (`upstash-redis-level`) — caches content index in Vercel KV
5. Frontend pages fetch data through the generated `databaseClient` (TinaCMS GraphQL client)

### Key files

| File | Role |
|------|------|
| `tina/config.tsx` | Schema definitions (6 collections), media config, auth wiring |
| `tina/database.ts` | Datalayer init — GitHub provider + Redis adapter |
| `pages/api/tina/[...routes].ts` | Single entry point for all TinaCMS backend API routes |
| `middleware.ts.disabled` | Password-auth middleware for `/admin` (currently disabled) |
| `next.config.js` | SVG-as-component webpack rule; `/admin` → `/admin/index.html` rewrite |

### Collections (`tina/collections/`)

`TinaUserCollection`, `PageCollection`, `TeacherCollection`, `CategoryCollection`, `CourseCollection`, `NewsCollection`, `FeedbackCollection` — all stored as Markdown under `content/`.

## Environment Variables

| Variable | Purpose |
|----------|---------|
| `TINA_PUBLIC_IS_LOCAL` | `true` for local dev, `false` for production |
| `GITHUB_PERSONAL_ACCESS_TOKEN` | GitHub PAT with repo read/write access |
| `GITHUB_OWNER` | GitHub repo owner |
| `GITHUB_REPO` | GitHub repo name |
| `GITHUB_BRANCH` | Target branch (falls back to `VERCEL_GIT_COMMIT_REF` → `main`) |
| `NEXTAUTH_SECRET` | Secret used for NextAuth.js and cookie signing |
| `KV_REST_API_URL` | Vercel KV (Upstash Redis) endpoint |
| `KV_REST_API_TOKEN` | Vercel KV auth token |
| `TINA_ADMIN_PASSWORD` | Password for `/admin` login (required when middleware is enabled) |

The database adapter also accepts `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` or `KV_URL` as alternatives to the `KV_REST_API_*` vars (see `tina/database.ts`).

## Deployment

Deployed to **Vercel**. CI runs on GitHub Actions (`.github/workflows/pr-open.yml`) on Node 20 & 22, spinning up a local Redis + Serverless Redis HTTP (SRH) container to emulate Vercel KV.

Default admin credentials after fresh deploy are in `content/users/index.json`.

## Known Issues / Active Work

- `middleware.ts` is currently deleted (renamed to `middleware.ts.disabled`) — admin route protection is inactive.
- `pages/api/tina/[...routes].ts` has uncommitted modifications — likely part of ongoing deployment debugging.
