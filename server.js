'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');
const { Server } = require('socket.io');
const config = require('./src/config');
const GameServer = require('./src/GameServer');

const INDEX = path.join(__dirname, 'index.html');
const STATIC_DIRS = new Set(['assets', 'css', 'js']);
const MIME = {
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webp': 'image/webp',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.mp4': 'audio/mp4',
  '.m4a': 'audio/mp4',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
};

function serveStatic(url, req, res) {
  let rel;
  try {
    rel = decodeURIComponent(url).replace(/^\/+/, '');
  } catch (_) {
    return false;
  }
  const parts = rel.split('/');
  if (!STATIC_DIRS.has(parts[0]) || parts.some((p) => !p || p === '.' || p === '..' || p.includes('\\'))) return false;

  const file = path.join(__dirname, rel);
  if (!file.startsWith(__dirname + path.sep)) return false;
  const ext = path.extname(file).toLowerCase();

  fs.stat(file, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      res.end('Not found');
      return;
    }
    const headers = {
      'content-type': MIME[ext] || 'application/octet-stream',
      'cache-control': parts[0] === 'assets' ? 'public, max-age=86400' : 'no-cache',
      'x-content-type-options': 'nosniff',
      'accept-ranges': 'bytes',
    };

    // Аудио просит Range — без этого перемотка треков не работает.
    const range = typeof req.headers.range === 'string' && /^bytes=/.test(req.headers.range)
      ? /bytes=(\d*)-(\d*)/.exec(req.headers.range)
      : null;
    if (range) {
      const start = range[1] ? parseInt(range[1], 10) : 0;
      const end = range[2] ? parseInt(range[2], 10) : stat.size - 1;
      if (start >= 0 && end >= start && start < stat.size) {
        const last = Math.min(end, stat.size - 1);
        headers['content-range'] = `bytes ${start}-${last}/${stat.size}`;
        headers['content-length'] = last - start + 1;
        res.writeHead(206, headers);
        if (req.method === 'HEAD') return res.end();
        return fs.createReadStream(file, { start, end: last }).pipe(res);
      }
    }

    headers['content-length'] = stat.size;
    res.writeHead(200, headers);
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(file).on('error', () => res.destroy()).pipe(res);
  });
  return true;
}

const server = http.createServer((req, res) => {
  const url = (req.url || '/').split('?')[0];

  if (url === '/health') {
    res.writeHead(200, { 'content-type': 'application/json; charset=utf-8' });
    res.end(JSON.stringify({ ok: true, uptime: process.uptime() }));
    return;
  }

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { allow: 'GET, HEAD' });
    res.end();
    return;
  }

  if (serveStatic(url, req, res)) return;

  if (url !== '/' && url !== '/index.html') {
    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
    res.end('Not found');
    return;
  }

  res.writeHead(200, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'no-cache',
    'x-content-type-options': 'nosniff',
    'referrer-policy': 'no-referrer',
  });
  if (req.method === 'HEAD') return res.end();
  fs.createReadStream(INDEX).on('error', (err) => {
    console.error('[http] не удалось отдать index.html:', err.message);
    if (!res.headersSent) res.writeHead(500);
    res.end('Server error');
  }).pipe(res);
});

const io = new Server(server, {
  path: '/socket.io/',
  serveClient: true, // именно этот путь отдаёт /socket.io/socket.io.js клиенту
  pingTimeout: 20000,
  pingInterval: 25000,
  maxHttpBufferSize: 64 * 1024,
  transports: ['polling', 'websocket'],
  cors: process.env.CLIENT_ORIGIN ? { origin: process.env.CLIENT_ORIGIN.split(',') } : undefined,
});

const game = new GameServer(io);
io.on('connection', (socket) => game.attach(socket));

server.listen(config.port, config.host, () => {
  console.log(`[server] Петух и чекушки: http://${config.host}:${config.port}`);
});

function shutdown() {
  console.log('[server] остановка…');
  game.close();
  io.close();
  server.close(() => process.exit(0));
  setTimeout(() => process.exit(0), 3000).unref();
}
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
