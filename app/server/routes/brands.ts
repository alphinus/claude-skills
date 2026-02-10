import { Router } from 'express';
import fs from 'fs';
import path from 'path';
import { REPO_ROOT } from '../lib/process-runner.js';
import { hexToRgbString, calculateDarkVariant } from '../lib/color-utils.js';

const router = Router();
const BRANDS_DIR = path.join(REPO_ROOT, 'brands');

// GET /api/brands — List all brands
router.get('/', (_req, res) => {
  try {
    if (!fs.existsSync(BRANDS_DIR)) {
      res.json([]);
      return;
    }
    const dirs = fs.readdirSync(BRANDS_DIR, { withFileTypes: true })
      .filter(d => d.isDirectory());

    const brands = dirs.map(d => {
      const tokensPath = path.join(BRANDS_DIR, d.name, 'tokens.json');
      if (!fs.existsSync(tokensPath)) return null;
      try {
        const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
        return { slug: d.name, ...tokens };
      } catch { return null; }
    }).filter(Boolean);

    res.json(brands);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// GET /api/brands/:slug — Get single brand
router.get('/:slug', (req, res) => {
  try {
    const tokensPath = path.join(BRANDS_DIR, req.params.slug, 'tokens.json');
    if (!fs.existsSync(tokensPath)) {
      res.status(404).json({ error: 'Brand not found' });
      return;
    }
    const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
    res.json({ slug: req.params.slug, ...tokens });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// POST /api/brands — Create new brand
router.post('/', (req, res) => {
  try {
    const { brand, colors, theme } = req.body;
    if (!brand?.name || !brand?.slug) {
      res.status(400).json({ error: 'brand.name and brand.slug are required' });
      return;
    }

    const slug = brand.slug.toLowerCase().replace(/[^a-z0-9-]/g, '-');
    const brandDir = path.join(BRANDS_DIR, slug);

    if (fs.existsSync(brandDir)) {
      res.status(409).json({ error: 'Brand already exists' });
      return;
    }

    // Auto-calculate derived colors
    const processedColors = { ...colors };
    if (processedColors.PRIMARY && !processedColors.PRIMARY_DARK) {
      processedColors.PRIMARY_DARK = calculateDarkVariant(processedColors.PRIMARY);
    }
    if (processedColors.PRIMARY && !processedColors.PRIMARY_RGB) {
      processedColors.PRIMARY_RGB = hexToRgbString(processedColors.PRIMARY);
    }
    if (processedColors.SUCCESS && !processedColors.SUCCESS_RGB) {
      processedColors.SUCCESS_RGB = hexToRgbString(processedColors.SUCCESS);
    }
    if (processedColors.WARNING && !processedColors.WARNING_RGB) {
      processedColors.WARNING_RGB = hexToRgbString(processedColors.WARNING);
    }
    if (processedColors.ERROR && !processedColors.ERROR_RGB) {
      processedColors.ERROR_RGB = hexToRgbString(processedColors.ERROR);
    }
    if (processedColors.INFO && !processedColors.INFO_RGB) {
      processedColors.INFO_RGB = hexToRgbString(processedColors.INFO);
    }

    const tokens = { brand, colors: processedColors, theme };

    fs.mkdirSync(brandDir, { recursive: true });
    fs.mkdirSync(path.join(brandDir, 'logos'), { recursive: true });
    fs.writeFileSync(path.join(brandDir, 'tokens.json'), JSON.stringify(tokens, null, 2));

    // Generate brand.md
    const brandMd = `# ${brand.name}\n\n> ${brand.tagline || ''}\n\n${brand.description || ''}\n\n**Domain:** ${brand.domain || ''}\n**Style:** ${theme?.style || 'dark-first'}\n**Primary Color:** ${processedColors.PRIMARY || ''}\n`;
    fs.writeFileSync(path.join(brandDir, 'brand.md'), brandMd);

    res.status(201).json({ slug, ...tokens });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// PUT /api/brands/:slug — Update brand
router.put('/:slug', (req, res) => {
  try {
    const brandDir = path.join(BRANDS_DIR, req.params.slug);
    const tokensPath = path.join(brandDir, 'tokens.json');

    if (!fs.existsSync(tokensPath)) {
      res.status(404).json({ error: 'Brand not found' });
      return;
    }

    const { brand, colors, theme } = req.body;

    // Auto-calculate derived colors
    const processedColors = { ...colors };
    if (processedColors.PRIMARY) {
      if (!processedColors.PRIMARY_DARK) processedColors.PRIMARY_DARK = calculateDarkVariant(processedColors.PRIMARY);
      if (!processedColors.PRIMARY_RGB) processedColors.PRIMARY_RGB = hexToRgbString(processedColors.PRIMARY);
    }
    if (processedColors.SUCCESS && !processedColors.SUCCESS_RGB) processedColors.SUCCESS_RGB = hexToRgbString(processedColors.SUCCESS);
    if (processedColors.WARNING && !processedColors.WARNING_RGB) processedColors.WARNING_RGB = hexToRgbString(processedColors.WARNING);
    if (processedColors.ERROR && !processedColors.ERROR_RGB) processedColors.ERROR_RGB = hexToRgbString(processedColors.ERROR);
    if (processedColors.INFO && !processedColors.INFO_RGB) processedColors.INFO_RGB = hexToRgbString(processedColors.INFO);

    const tokens = { brand, colors: processedColors, theme };
    fs.writeFileSync(tokensPath, JSON.stringify(tokens, null, 2));

    // Regenerate brand.md
    const brandMd = `# ${brand.name}\n\n> ${brand.tagline || ''}\n\n${brand.description || ''}\n\n**Domain:** ${brand.domain || ''}\n**Style:** ${theme?.style || 'dark-first'}\n**Primary Color:** ${processedColors.PRIMARY || ''}\n`;
    fs.writeFileSync(path.join(brandDir, 'brand.md'), brandMd);

    res.json({ slug: req.params.slug, ...tokens });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// POST /api/brands/:slug/duplicate — Duplicate brand
router.post('/:slug/duplicate', (req, res) => {
  try {
    const sourceDir = path.join(BRANDS_DIR, req.params.slug);
    const tokensPath = path.join(sourceDir, 'tokens.json');

    if (!fs.existsSync(tokensPath)) {
      res.status(404).json({ error: 'Brand not found' });
      return;
    }

    const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
    const newName = (req.body.name || tokens.brand.name + ' Copy').trim();
    const newSlug = newName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + '-brand-system';
    const newDir = path.join(BRANDS_DIR, newSlug.replace(/-brand-system$/, ''));
    const newDirName = newSlug.replace(/-brand-system$/, '');

    if (fs.existsSync(path.join(BRANDS_DIR, newDirName))) {
      res.status(409).json({ error: 'Brand with this name already exists' });
      return;
    }

    // Copy directory structure
    fs.mkdirSync(path.join(BRANDS_DIR, newDirName), { recursive: true });
    fs.mkdirSync(path.join(BRANDS_DIR, newDirName, 'logos'), { recursive: true });

    // Write new tokens with updated name/slug
    const newTokens = {
      ...tokens,
      brand: { ...tokens.brand, name: newName, slug: newSlug },
    };
    fs.writeFileSync(path.join(BRANDS_DIR, newDirName, 'tokens.json'), JSON.stringify(newTokens, null, 2));

    const brandMd = `# ${newName}\n\n> ${newTokens.brand.tagline || ''}\n\n${newTokens.brand.description || ''}\n\n**Domain:** ${newTokens.brand.domain || ''}\n**Style:** ${newTokens.theme?.style || 'dark-first'}\n**Primary Color:** ${newTokens.colors?.PRIMARY || ''}\n`;
    fs.writeFileSync(path.join(BRANDS_DIR, newDirName, 'brand.md'), brandMd);

    // Copy logos if they exist
    const srcLogos = path.join(sourceDir, 'logos');
    if (fs.existsSync(srcLogos)) {
      const logos = fs.readdirSync(srcLogos);
      for (const logo of logos) {
        fs.copyFileSync(path.join(srcLogos, logo), path.join(BRANDS_DIR, newDirName, 'logos', logo));
      }
    }

    res.status(201).json({ slug: newDirName, ...newTokens });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// DELETE /api/brands/:slug — Delete brand
router.delete('/:slug', (req, res) => {
  try {
    const brandDir = path.join(BRANDS_DIR, req.params.slug);
    if (!fs.existsSync(brandDir)) {
      res.status(404).json({ error: 'Brand not found' });
      return;
    }
    fs.rmSync(brandDir, { recursive: true, force: true });
    res.json({ deleted: true, slug: req.params.slug });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
