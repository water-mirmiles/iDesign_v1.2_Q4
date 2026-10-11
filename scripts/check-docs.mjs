import { readFile, readdir, access } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
const required = ['README.md', 'AGENTS.md', 'CHANGELOG.md', 'docs/PRD.md', 'docs/PROJECT_PRINCIPLES.md', 'docs/DEVELOPMENT_WORKFLOW.md', 'docs/FEATURES.md', 'docs/ITERATIONS.md', 'docs/TESTING.md', 'docs/VERSIONING.md', 'docs/ASSET_SOURCES.md'];
for (const file of required) await access(file);
const md = [...required, ...(await readdir('.github', { recursive: true })).filter(f => f.endsWith('.md')).map(f => `.github/${f}`)];
for (const file of md) {
  const text = await readFile(file, 'utf8');
  for (const match of text.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const target = match[1].split('#')[0];
    if (!target || /^(https?:|mailto:)/.test(target)) continue;
    await access(resolve(dirname(file), target));
  }
}
const pkg = JSON.parse(await readFile('package.json'));
if (!(await readFile('README.md', 'utf8')).includes(`工程版本：${pkg.version}`)) throw new Error('README version differs from package.json');
if (!(await readFile('docs/PRD.md', 'utf8')).includes('最后更新：')) throw new Error('PRD must have update date');
console.log('Required documents, relative file links and version consistency passed.');
