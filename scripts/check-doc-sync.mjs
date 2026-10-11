import { execFileSync } from 'node:child_process';
export function requiredDocChanges(files) {
  const changed = new Set(files);
  const product = files.some(f => f.startsWith('web/'));
  const tooling = files.some(f => /^(scripts\/|tests\/|\.github\/|package(-lock)?\.json$|playwright\.config\.mjs$)/.test(f));
  const required = new Set();
  if (product) ['docs/PRD.md', 'docs/FEATURES.md', 'docs/ITERATIONS.md', 'CHANGELOG.md'].forEach(f => required.add(f));
  if (tooling) ['README.md', 'docs/TESTING.md', 'docs/ITERATIONS.md', 'CHANGELOG.md'].forEach(f => required.add(f));
  return [...required].filter(f => !changed.has(f));
}
if (process.argv[1]?.endsWith('check-doc-sync.mjs')) {
  const base = process.argv[2];
  if (!base || !/^[a-zA-Z0-9_./-]+$/.test(base) || base.startsWith('-')) throw new Error('Usage: npm run docs:sync -- <base-ref-or-sha>');
  const files = execFileSync('git', ['diff', '--name-only', `${base}...HEAD`], { encoding: 'utf8' }).trim().split('\n').filter(Boolean);
  const missing = requiredDocChanges(files);
  if (missing.length) throw new Error(`Code changed without corresponding document updates: ${missing.join(', ')}`);
  console.log(`Document synchronization gate passed for ${files.length} changed files. Content accuracy requires review.`);
}
