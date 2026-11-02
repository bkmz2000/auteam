# Auteam project notes

## Architecture

- Astro static site; production output is `dist/` and is served by a VPS web server.
- Decap CMS/DecapBridge editor is at `/admin/`.
- Astro content collections are defined in `src/content.config.ts` and read from `src/content/`.
- Decap writes to the same `src/content/` tree; image uploads go to `public/images/`.
- CMS commits to GitHub branch `auteam-test`; deployment must build that same branch.
- `legacy-content/` is an unserved archive. Do not add new content there.

## Commands

```sh
npm ci
npm run dev
npm run build
npm run preview
```

`npm run build` creates a static site. It does not create a Cloudflare Worker. `postbuild` generates the production CMS config in `dist/admin/config.yml`; production CMS login requires `DECAPBRIDGE_SITE_ID` from Auteam's own DecapBridge site.

## Editing guidance

- Keep CMS field names compatible with `src/content.config.ts` and the Astro templates that render them.
- Keep editor-written content and images on the `src/content/` and `public/images/` paths.
- Do not add credentials to tracked CMS config. Do not reuse Bronner credentials, webhook, SSH host, or deployment path.
- Auteam has its own site structure and design; Bronner is a technology reference only.
