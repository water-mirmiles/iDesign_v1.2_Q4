import { test } from 'node:test';
import assert from 'node:assert/strict';
import { requiredDocChanges } from '../scripts/check-doc-sync.mjs';
test('product changes require product acceptance and iteration documentation', () => {
  assert.deepEqual(requiredDocChanges(['web/app.js']), ['docs/PRD.md', 'docs/FEATURES.md', 'docs/ITERATIONS.md', 'CHANGELOG.md']);
  assert.deepEqual(requiredDocChanges(['web/style.css', 'docs/PRD.md', 'docs/FEATURES.md', 'docs/ITERATIONS.md', 'CHANGELOG.md']), []);
});
test('tooling changes require setup and validation documentation', () => {
  assert.deepEqual(requiredDocChanges(['.github/workflows/check.yml']), ['README.md', 'docs/TESTING.md', 'docs/ITERATIONS.md', 'CHANGELOG.md']);
  assert.deepEqual(requiredDocChanges(['docs/PRD.md']), []);
});
