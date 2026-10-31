import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

const source = new URL('../../../design/sources/2026-10-30/', import.meta.url);
const target = new URL('../', import.meta.url);
const manifest = JSON.parse(await readFile(new URL('manifest.json', source), 'utf8'));
for (const file of manifest.files) {
  const bytes = await readFile(new URL(file.name, source));
  if (createHash('sha256').update(bytes).digest('hex') !== file.sha256) {
    throw new Error(`Design source changed without a manifest update: ${file.name}`);
  }
}

export function adaptExport(html, kind) {
  if (!html.includes('<x-dc>') || !html.includes('data-dc-script')) throw new Error('Unsupported design export');
  return html
    .replace('<html>', '<html lang="pl">')
    .replace('<script src="./support.js"></script>', `<meta name="robots" content="noindex,nofollow">
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data: blob:; connect-src 'self' ws://127.0.0.1:*; object-src 'none'; base-uri 'self'; form-action 'none'">
<style>x-dc { display: none; }</style>
<script type="module" src="/src/design-preview.jsx"></script>`)
    .replaceAll(/<link[^>]+https:\/\/fonts\.[^>]+>\s*/g, '')
    .replace('<script src="./image-slot.js"></script>', '')
    .replace(' from="./browser-window.jsx"', '')
    .replace('<div style="max-width: 1216px; margin: 0 auto; padding: 0 40px; height: 64px;', '<div class="design-shop-header" style="max-width: 1216px; margin: 0 auto; padding: 0 40px; height: 64px;')
    .replace('<body>', `<body data-design="${kind}">
<nav class="prototype-notice" aria-label="Pracownia prototypu"><a href="/">← Homie Coffee · pracownia</a><span>DEMO · fikcyjne dane i ceny · brak płatności · zmiany znikają po odświeżeniu</span></nav>`);
}

for (const [name, kind, out] of [
  ['Homie Coffee - Sklep.dc.html', 'shop', 'shop.html'],
  ['Homie Coffee - Panel admina.dc.html', 'admin', 'admin-lab.html'],
]) {
  const output = new URL(out, target);
  const html = adaptExport(await readFile(new URL(name, source), 'utf8'), kind);
  const existing = await readFile(output, 'utf8').catch((error) => {
    if (error.code === 'ENOENT') return null;
    throw error;
  });
  if (existing !== html) await writeFile(output, html);
  console.log(`Prepared local design: ${out}`);
}
