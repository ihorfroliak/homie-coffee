import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const root = new URL('../', import.meta.url);
const source = new URL('design/sources/2026-10-30/', root);
const manifest = JSON.parse(readFileSync(new URL('manifest.json', source), 'utf8'));
const text = (url) => readFileSync(url, 'utf8');

test('every reviewed source is byte-identical to its recorded checksum', () => {
  for (const file of manifest.files) {
    const bytes = readFileSync(new URL(file.name, source));
    assert.equal(bytes.length, file.bytes, file.name);
    assert.equal(createHash('sha256').update(bytes).digest('hex'), file.sha256, file.name);
  }
});

execFileSync(process.execPath, [fileURLToPath(new URL('prototypes/admin-dashboard/scripts/prepare-designs.mjs', root))]);
for (const [input, output] of [
  ['Homie Coffee - Sklep.dc.html', 'shop.html'],
  ['Homie Coffee - Panel admina.dc.html', 'admin-lab.html'],
]) {
  test(`${output} retains demo state logic while replacing remote bootstrap dependencies`, () => {
    const original = text(new URL(input, source));
    const generated = text(new URL(`prototypes/admin-dashboard/${output}`, root));
    const logic = /<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/;
    assert.equal(generated.match(logic)?.[1], original.match(logic)?.[1]);
    assert.ok(generated.match(logic)?.[1].includes('class Component extends DCLogic'));
    assert.doesNotMatch(generated, /<script[^>]+src="(?:https?:|\.\/)/);
    assert.doesNotMatch(generated, /<link[^>]+https:\/\/fonts\./);
    assert.doesNotMatch(generated, /from="\.\/browser-window.jsx"/);
    assert.match(generated, /src="\/src\/design-preview.jsx"/);
    assert.match(generated, /noindex,nofollow/);
    assert.match(generated, /form-action 'none'/);
    assert.match(generated, /DEMO · fikcyjne dane i ceny · brak płatności/);
  });
}
