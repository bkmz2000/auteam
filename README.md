# Auteam website

Auteam is a static Astro site with Decap CMS/DecapBridge for browser-based content editing. It uses its own Auteam pages and visual design; Bronner is only the technology reference.

## Local development

Requirements: Node.js `>=22.12.0` and npm.

```sh
npm ci
npm run dev
```

The CMS admin is at `/admin/`. The generated Decap bundle assets are copied from `node_modules` before development and builds. CMS login requires Auteam's DecapBridge site configuration.

## Build

```sh
npm run build
npm run preview
```

Astro builds static files into `dist/`; no Cloudflare Worker or Wrangler output is used. `postbuild` generates `dist/admin/config.yml`. Set `DECAPBRIDGE_SITE_ID` in the production build environment to the site's own DecapBridge ID. Without it, the build emits a warning and writes `SETUP_REQUIRED`; CMS login is not ready for production.

## Content and CMS

- Content schemas and readers: `src/content.config.ts`
- Published content: `src/content/`
- DecapBridge config template: `scripts/config.template.yml`
- CMS config generator: `scripts/build-cms-config.mjs`
- Admin shell: `public/admin/index.html`
- CMS writes to `src/content/` and uploads to `public/images/`.
- CMS is configured to commit to Git branch `main`; the VPS build/webhook must use that same branch.
- `legacy-content/` is an archived copy of the old duplicated content tree and is not loaded or published.

Do not put GitHub tokens, OAuth secrets, or other credentials in the CMS config or source tree. DecapBridge authorization and webhook credentials must be created separately for Auteam; do not reuse Bronner's credentials or deploy target.

The latest full `npm audit` still reports 27 moderate advisories in Decap CMS transitive rich-text/backend packages; there are no high or critical advisories after upgrading Astro and removing the optional local server. The suggested forced CMS downgrade is not applied because it may change editor behavior; recheck for an upstream compatible fix. (The static-site-only `npm audit --omit=dev` is clean, but the Decap assets are also published under `/admin/`.)

## VPS deployment status

The deploy destination is intentionally not hard-coded. Before deployment, confirm the new VPS SSH host/alias and target directory, then configure the VPS to build this checkout from branch `main` and serve `dist/` through its web server or shared ingress. The old Wrangler config was removed because it pointed to a Worker entry that the static Astro build does not create.

Before public launch, verify the email and Telegram links in `src/content/settings/site.md`, confirm current course prices/availability, and obtain permission for any testimonials marked public. The previous fake contact form was removed because it did not submit messages.
