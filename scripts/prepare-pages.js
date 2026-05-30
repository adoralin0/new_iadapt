/**
 * Copy iadapt-redesign/dist → docs/ for GitHub Pages.
 * Run: npm run build:pages
 */
const fs = require('fs');
const path = require('path');

const SRC = path.join(__dirname, '..', 'iadapt-redesign', 'dist');
const DEST = path.join(__dirname, '..', 'docs');

function removeDir(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const target = path.join(dir, entry.name);
    if (entry.isDirectory()) removeDir(target);
    else fs.unlinkSync(target);
  }
  fs.rmdirSync(dir);
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const from = path.join(src, entry.name);
    const to = path.join(dest, entry.name);
    if (entry.isDirectory()) copyDir(from, to);
    else fs.copyFileSync(from, to);
  }
}

if (!fs.existsSync(SRC)) {
  console.error('Missing build folder:', SRC);
  process.exit(1);
}

removeDir(DEST);
copyDir(SRC, DEST);
console.log('Site ready for GitHub Pages → docs/');
