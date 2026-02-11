#!/usr/bin/env node
/**
 * Export collection HTML pages as PNG screenshots using Puppeteer.
 * Usage: node scripts/export-png.js <brand-slug> [category]
 *
 * Requires: npm install -g puppeteer (or npx puppeteer)
 * Exports to: brands/<slug>/collection-png/
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

const BRANDS_DIR = process.env.BRANDS_DIR || path.join(process.cwd(), 'brands');

async function exportPages(slug, category) {
  const collectionDir = path.join(BRANDS_DIR, slug, 'collection');
  const outputDir = path.join(BRANDS_DIR, slug, 'collection-png');

  if (!fs.existsSync(collectionDir)) {
    console.error(`Collection not found: ${collectionDir}`);
    process.exit(1);
  }

  // Find HTML files
  const files = [];
  function findHtml(dir, rel = '') {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(rel, entry.name);
      if (entry.isDirectory()) {
        if (!category || entry.name === category || rel.startsWith(category)) {
          findHtml(fullPath, relPath);
        }
      } else if (entry.name.endsWith('.html')) {
        files.push({ fullPath, relPath });
      }
    }
  }
  findHtml(collectionDir);

  if (files.length === 0) {
    console.log('No HTML files found.');
    process.exit(0);
  }

  console.log(`Exporting ${files.length} pages for "${slug}"...`);

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  let exported = 0;
  let errors = 0;

  for (const file of files) {
    try {
      const page = await browser.newPage();
      await page.setViewport({ width: 1200, height: 800 });
      await page.goto(`file://${file.fullPath}`, { waitUntil: 'networkidle0', timeout: 15000 });

      // Wait a moment for animations
      await new Promise(r => setTimeout(r, 500));

      const pngPath = path.join(outputDir, file.relPath.replace('.html', '.png'));
      fs.mkdirSync(path.dirname(pngPath), { recursive: true });
      await page.screenshot({ path: pngPath, fullPage: false });
      await page.close();
      exported++;
      process.stdout.write(`\r  ${exported}/${files.length} exported`);
    } catch (err) {
      errors++;
      console.error(`\n  Error: ${file.relPath}: ${err.message}`);
    }
  }

  await browser.close();
  console.log(`\nDone! ${exported} exported, ${errors} errors.`);
  console.log(`Output: ${outputDir}`);
}

const [slug, category] = process.argv.slice(2);
if (!slug) {
  console.log('Usage: node scripts/export-png.js <brand-slug> [category]');
  process.exit(1);
}
exportPages(slug, category);
