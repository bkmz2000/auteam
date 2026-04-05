# Agents Documentation

## Project Overview

**Project:** Auteam - Astro-based website with Decap CMS
**Location:** `/home/rennorb/Documents/auteam/auteam-fresh/`
**Framework:** Astro v5.18.1 with Cloudflare adapter
**CMS:** Decap CMS v3.11.0 (formerly Netlify CMS)

## Key Files

| Purpose | Path |
|---------|------|
| CMS Config | `public/admin/config.yml` |
| Admin Entry | `public/admin/index.html` |
| Astro Config | `astro.config.mjs` |
| Content (Astro) | `src/content/` |
| Pages | `src/pages/` |
| API Auth | `src/pages/api/auth.ts` |
| API Callback | `src/pages/api/callback.ts` |

## CMS Collections

| Collection | Folder | Purpose |
|------------|--------|---------|
| posts | `content/posts` | Blog posts |
| news | `content/news` | News items |
| categories | `content/categories` | Course categories |
| courses | `content/courses` | Course listings |
| feedback | `content/feedback` | Reviews/testimonials |
| pages | `content/pages` | Static pages |
| settings | `content/settings` | Site settings |

## Common Tasks

### Adding a WYSIWYG Editor
Decap CMS uses markdown widgets with a "Visual" mode that provides WYSIWYG editing. To enhance the editor:
1. The markdown widget in Decap CMS v3 has built-in visual/rich text editing
2. Users click "Visual" tab in the editor to switch from raw markdown to WYSIWYG
3. No additional packages needed - it's built into decap-cms-app

### Running the Project
```bash
cd /home/rennorb/Documents/auteam/auteam-fresh
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

### Deploy to Cloudflare
```bash
npm run deploy   # Deploys to Cloudflare Workers via Wrangler
```

## Tech Stack

- **Astro 5.18.1** - Static site generator
- **@astrojs/cloudflare** - Cloudflare Workers adapter
- **decap-cms-app 3.11.0** - Content management system
- **Wrangler 4.78.0** - Cloudflare Workers CLI
