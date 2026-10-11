import { test } from 'node:test';
import assert from 'node:assert/strict';
import { request } from 'node:http';
import { createStaticServer } from '../scripts/serve.mjs';
function get(port, path, method = 'GET') {
  return new Promise((resolve, reject) => {
    const req = request({ hostname: '127.0.0.1', port, path, method }, res => {
      let body = ''; res.on('data', c => body += c); res.on('end', () => resolve({ status: res.statusCode, type: res.headers['content-type'], body }));
    }); req.on('error', reject); req.end();
  });
}
test('built static site works at a subdirectory and blocks source/traversal requests', async () => {
  const server = createStaticServer('dist', '/iDesign/');
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  try {
    const port = server.address().port;
    assert.equal((await get(port, '/iDesign/')).status, 200);
    assert.match((await get(port, '/iDesign/app.js')).type, /javascript/);
    assert.equal((await get(port, '/iDesign/assets/sneaker.jpg')).status, 200);
    assert.equal((await get(port, '/iDesign/style.css', 'HEAD')).body, '');
    assert.equal((await get(port, '/iDesign/missing.jpg')).status, 404);
    assert.equal((await get(port, '/iDesign/%2e%2e/README.md')).status, 403);
    assert.equal((await get(port, '/iDesign/.env')).status, 403);
    assert.equal((await get(port, '/README.md')).status, 404);
    assert.equal((await get(port, '/iDesign/', 'POST')).status, 405);
  } finally { await new Promise(resolve => server.close(resolve)); }
});
