const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8080;
const DIST = path.join(__dirname, 'iadapt-redesign', 'dist');

const mime = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.json': 'application/json',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject'
};

function send404(res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Not found');
}

function resolveFile(reqPath) {
  const normalized = path.normalize(reqPath).replace(/^(\.\.(\/|\\|$))+/, '');
  let filePath = path.join(DIST, normalized);

  if (!filePath.startsWith(DIST)) return null;

  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  return fs.existsSync(filePath) && fs.statSync(filePath).isFile() ? filePath : null;
}

function requestHandler(req, res) {
  try {
    let reqPath = decodeURIComponent(req.url.split('?')[0]);

    if (reqPath === '/' || reqPath === '') {
      reqPath = '/index.html';
    }

    const rel = reqPath.replace(/^\//, '').split('/').join(path.sep);
    const filePath = resolveFile(rel);

    if (!filePath) {
      send404(res);
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const type = mime[ext] || 'application/octet-stream';
    res.statusCode = 200;
    res.setHeader('Content-Type', type);
    fs.createReadStream(filePath).pipe(res);
  } catch (e) {
    send404(res);
  }
}

function startServer(port) {
  const srv = http.createServer(requestHandler);
  srv.listen(port, () => {
    console.log(`Serving ${DIST} on http://localhost:${port}`);
    console.log(`Homepage: http://localhost:${port}/`);
  });
  srv.on('error', (err) => {
    if (err && err.code === 'EADDRINUSE') {
      console.warn(`Port ${port} in use, trying ${port + 1}...`);
      startServer(port + 1);
    } else {
      console.error('Server error:', err);
      process.exit(1);
    }
  });
}

startServer(Number(process.env.PORT) || PORT);
