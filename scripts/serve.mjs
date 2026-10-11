import { createServer } from 'node:http';
import { readFile, realpath, stat } from 'node:fs/promises';
import { resolve, relative, extname, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.jpg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.json': 'application/json' };
export function createStaticServer(root, prefix = '/') {
  const base = resolve(root);
  return createServer(async (req, res) => {
    try {
      if (!['GET', 'HEAD'].includes(req.method)) { res.writeHead(405); res.end(); return; }
      const raw = (req.url || '/').split('?')[0];
      const pathname = decodeURIComponent(raw);
      if (!pathname.startsWith(prefix) || pathname.includes('\0') || pathname.includes('\\')) { res.writeHead(404); res.end(); return; }
      const name = pathname.slice(prefix.length);
      if (name.split('/').some(p => p === '..' || p.startsWith('.'))) { res.writeHead(403); res.end(); return; }
      let file = resolve(base, name || 'index.html');
      if ((await stat(file)).isDirectory()) file = resolve(file, 'index.html');
      file = await realpath(file);
      const rel = relative(base, file);
      if (rel.startsWith(`..${sep}`) || rel === '..' || rel.startsWith(sep)) { res.writeHead(403); res.end(); return; }
      const body = await readFile(file);
      res.writeHead(200, { 'content-type': mime[extname(file)] || 'application/octet-stream', 'cache-control': 'no-store', 'x-content-type-options': 'nosniff' });
      res.end(req.method === 'HEAD' ? undefined : body);
    } catch (error) { res.writeHead(error.code === 'ENOENT' ? 404 : 400); res.end(); }
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  const root = resolve(process.argv[2] || 'web');
  const port = Number(process.env.PORT || 8876);
  const prefix = process.env.BASE_PATH || '/';
  if (!prefix.startsWith('/') || !prefix.endsWith('/')) throw new Error('BASE_PATH must start and end with /');
  createStaticServer(root, prefix).listen(port, '127.0.0.1', () => console.log(`iDesign: http://127.0.0.1:${port}${prefix}`));
}
