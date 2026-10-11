import { readdir, readFile, access } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';
for (const dir of ['web', 'scripts', 'tests']) {
  for (const entry of await readdir(dir, { recursive: true })) {
    if (!/\.(js|mjs)$/.test(entry)) continue;
    const result = spawnSync(process.execPath, ['--check', `${dir}/${entry}`], { encoding: 'utf8' });
    if (result.status !== 0) throw new Error(result.stderr);
  }
}
const html = await readFile('web/index.html', 'utf8');
for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) await access(resolve('web', match[1]));
const js = await readFile('web/app.js', 'utf8');
for (const match of js.matchAll(/A\('([^']+)'\)/g)) await access(`web/assets/${match[1]}.jpg`);
for (const match of js.matchAll(/url\(['"]?(assets\/[^)'"\s]+)['"]?\)/g)) await access(`web/${match[1]}`);
console.log('JavaScript syntax, HTML references and literal asset references passed. Dynamic assets are covered by browser checks.');
