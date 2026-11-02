import { mkdir, readFile, writeFile } from 'node:fs/promises';

const templatePath = new URL('./config.template.yml', import.meta.url);
const outputPath = new URL('../dist/admin/config.yml', import.meta.url);
const siteId = process.env.DECAPBRIDGE_SITE_ID?.trim() || 'SETUP_REQUIRED';
const template = await readFile(templatePath, 'utf8');

if (siteId === 'SETUP_REQUIRED') {
  console.warn('DECAPBRIDGE_SITE_ID is unset; /admin will need its DecapBridge site id before production use.');
}

await mkdir(new URL('../dist/admin/', import.meta.url), { recursive: true });
await writeFile(outputPath, template.replaceAll('__DECAPBRIDGE_SITE_ID__', encodeURIComponent(siteId)), 'utf8');
