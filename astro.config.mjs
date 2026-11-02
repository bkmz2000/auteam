import { defineConfig } from 'astro/config';

// Auteam is a static Astro site. The VPS serves dist/ through its web server.
export default defineConfig({
  output: 'static',
});
