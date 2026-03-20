const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT = 8081;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
};

http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';

  const filePath = path.join(ROOT, urlPath);

  if (!filePath.startsWith(ROOT)) {
    res.writeHead(403); res.end('Forbidden'); return;
  }

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not found: ' + urlPath);
      return;
    }
    const ext  = path.extname(filePath).toLowerCase();
    const mime = MIME[ext] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': mime });
    res.end(data);
  });
}).listen(PORT, '0.0.0.0', () => {
  console.log(`Helion Core server running at http://localhost:${PORT}`);
  console.log(`  Home:   http://localhost:${PORT}/`);
  console.log(`  Login:  http://localhost:${PORT}/login.html`);
  console.log(`  Admin:  http://localhost:${PORT}/admin.html`);
  console.log(`  Portal: http://localhost:${PORT}/portal.html`);
  console.log(`  Automatizaciones: http://localhost:${PORT}/automations.html`);
  console.log(`  Agentes de Voz:   http://localhost:${PORT}/phone-agents.html`);
});
