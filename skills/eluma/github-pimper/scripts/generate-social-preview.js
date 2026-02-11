#!/usr/bin/env node
/**
 * Generate social preview PNG (1280x640) from HTML template.
 * Usage: node generate-social-preview.js <repo-path>
 *
 * Reads .github/assets/social-preview.html and generates social-preview.png
 * Requires: puppeteer
 */

const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generatePreview(repoPath) {
  const htmlPath = path.join(repoPath, '.github', 'assets', 'social-preview.html');
  const outputPath = path.join(repoPath, '.github', 'assets', 'social-preview.png');

  if (!fs.existsSync(htmlPath)) {
    console.error('social-preview.html not found at:', htmlPath);
    process.exit(1);
  }

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox'],
  });

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 640 });
  await page.goto(`file://${path.resolve(htmlPath)}`, { waitUntil: 'networkidle0' });
  await page.screenshot({ path: outputPath, type: 'png' });
  await browser.close();

  console.log('Generated:', outputPath);
}

const repoPath = process.argv[2] || process.cwd();
generatePreview(repoPath);
