import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

const BRANDS_DIR = path.join(process.cwd(), 'brands');

export default function handler(req: VercelRequest, res: VercelResponse) {
  const url = req.url || '';

  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  if (req.method === 'OPTIONS') { res.status(200).end(); return; }

  try {
    // GET /api/brands
    if (url === '/api/brands' || url === '/api/brands/') {
      if (!fs.existsSync(BRANDS_DIR)) { res.json([]); return; }
      const dirs = fs.readdirSync(BRANDS_DIR, { withFileTypes: true }).filter(d => d.isDirectory());
      const brands = dirs.map(d => {
        const tp = path.join(BRANDS_DIR, d.name, 'tokens.json');
        if (!fs.existsSync(tp)) return null;
        try { return { slug: d.name, ...JSON.parse(fs.readFileSync(tp, 'utf-8')) }; }
        catch { return null; }
      }).filter(Boolean);
      res.json(brands);
      return;
    }

    // GET /api/brands/:slug
    const brandMatch = url.match(/^\/api\/brands\/([a-z0-9-]+)\/?$/);
    if (brandMatch) {
      const slug = brandMatch[1];
      const tp = path.join(BRANDS_DIR, slug, 'tokens.json');
      if (!fs.existsSync(tp)) { res.status(404).json({ error: 'Not found' }); return; }
      res.json({ slug, ...JSON.parse(fs.readFileSync(tp, 'utf-8')) });
      return;
    }

    // GET /api/collection/:slug
    const collMatch = url.match(/^\/api\/collection\/([a-z0-9-]+)\/?$/);
    if (collMatch) {
      const slug = collMatch[1];
      const collDir = path.join(BRANDS_DIR, slug, 'collection');
      const categories: Record<string, string[]> = {};
      if (fs.existsSync(collDir)) {
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
      }
      res.json({ categories });
      return;
    }

    // Fallback
    res.status(404).json({ error: 'Not found', note: 'Write operations require the local dev server.' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
}

function getAllHtml(dir: string, prefix: string): string[] {
  const files: string[] = [];
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) files.push(...getAllHtml(path.join(dir, e.name), `${prefix}/${e.name}`));
    else if (e.name.endsWith('.html')) files.push(`${prefix}/${e.name}`);
  }
  return files;
}
