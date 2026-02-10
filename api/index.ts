import express from 'express';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(express.json());

// In Vercel serverless, we use /tmp for writable storage
// and read from the repo's brands/ directory for initial data
const REPO_ROOT = process.cwd();
const BRANDS_DIR = path.join(REPO_ROOT, 'brands');

function hexToRgb(hex: string) {
  const h = hex.replace('#', '');
  return { r: parseInt(h.substring(0, 2), 16), g: parseInt(h.substring(2, 4), 16), b: parseInt(h.substring(4, 6), 16) };
}

function hexToRgbString(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  return `${r},${g},${b}`;
}

function hexToHsl(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  const l = (max + min) / 2;
  let h = 0, s = 0;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color);
  };
  const toHex = (v: number) => Math.max(0, Math.min(255, v)).toString(16).padStart(2, '0');
  return '#' + toHex(f(0)) + toHex(f(8)) + toHex(f(4));
}

function calculateDarkVariant(hex: string) {
  const hsl = hexToHsl(hex);
  return hslToHex(hsl.h, Math.min(100, hsl.s + 5), Math.max(0, hsl.l - 10));
}

// GET /api/brands
app.get('/brands', (_req, res) => {
  try {
    if (!fs.existsSync(BRANDS_DIR)) { res.json([]); return; }
    const dirs = fs.readdirSync(BRANDS_DIR, { withFileTypes: true }).filter(d => d.isDirectory());
    const brands = dirs.map(d => {
      const tp = path.join(BRANDS_DIR, d.name, 'tokens.json');
      if (!fs.existsSync(tp)) return null;
      try { return { slug: d.name, ...JSON.parse(fs.readFileSync(tp, 'utf-8')) }; }
      catch { return null; }
    }).filter(Boolean);
    res.json(brands);
  } catch (err) { res.status(500).json({ error: (err as Error).message }); }
});

// GET /api/brands/:slug
app.get('/brands/:slug', (req, res) => {
  try {
    const tp = path.join(BRANDS_DIR, req.params.slug, 'tokens.json');
    if (!fs.existsSync(tp)) { res.status(404).json({ error: 'Not found' }); return; }
    res.json({ slug: req.params.slug, ...JSON.parse(fs.readFileSync(tp, 'utf-8')) });
  } catch (err) { res.status(500).json({ error: (err as Error).message }); }
});

// GET /api/collection/:slug
app.get('/collection/:slug', (req, res) => {
  try {
    const collDir = path.join(BRANDS_DIR, req.params.slug, 'collection');
    const categories: Record<string, string[]> = {};
    if (!fs.existsSync(collDir)) { res.json({ categories }); return; }
    const entries = fs.readdirSync(collDir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        const files = getAllHtml(path.join(collDir, entry.name), entry.name);
        if (files.length > 0) categories[entry.name] = files;
      } else if (entry.name.endsWith('.html')) {
        if (!categories['root']) categories['root'] = [];
        categories['root'].push(entry.name);
      }
    }
    res.json({ categories });
  } catch (err) { res.status(500).json({ error: (err as Error).message }); }
});

function getAllHtml(dir: string, prefix: string): string[] {
  const files: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) files.push(...getAllHtml(path.join(dir, e.name), `${prefix}/${e.name}`));
    else if (e.name.endsWith('.html')) files.push(`${prefix}/${e.name}`);
  }
  return files;
}

// Note: Write operations (POST/PUT/DELETE) are read-only in Vercel serverless
// They work in local dev but Vercel's filesystem is ephemeral
app.all('*', (_req, res) => {
  res.status(405).json({ error: 'This endpoint requires the local dev server. Vercel deployment is read-only.' });
});

export default app;
