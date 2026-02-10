import { Router } from 'express';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';
import { REPO_ROOT } from '../lib/process-runner.js';

const router = Router();

// POST /api/images/:slug/generate — Generate logos via infsh
router.post('/:slug/generate', async (req, res) => {
  try {
    const { slug } = req.params;
    const { type = 'logo-light', prompt: customPrompt } = req.body;

    const tokensPath = path.join(REPO_ROOT, 'brands', slug, 'tokens.json');
    if (!fs.existsSync(tokensPath)) {
      res.status(404).json({ error: 'Brand not found' });
      return;
    }

    const tokens = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
    const logosDir = path.join(REPO_ROOT, 'brands', slug, 'logos');
    fs.mkdirSync(logosDir, { recursive: true });

    const outputFile = path.join(logosDir, `${type}.png`);
    const brandPrompt = customPrompt || buildPrompt(tokens.brand.name, tokens.colors.PRIMARY, type);

    // Check if infsh is available
    const infshPath = path.join(process.env.HOME || '~', '.local/bin/infsh');
    if (!fs.existsSync(infshPath)) {
      res.status(503).json({ error: 'infsh CLI not available. Install inference.sh first.' });
      return;
    }

    const cmd = `${infshPath} app run falai/flux-dev-lora --prompt "${brandPrompt.replace(/"/g, '\\"')}" --output "${outputFile}"`;

    exec(cmd, { timeout: 120000 }, (error, stdout, stderr) => {
      if (error) {
        res.json({ success: false, error: stderr || error.message });
        return;
      }
      res.json({
        success: true,
        path: `/brands/${slug}/logos/${type}.png`,
        file: outputFile,
      });
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// GET /api/images/:slug — List brand images
router.get('/:slug', (req, res) => {
  try {
    const logosDir = path.join(REPO_ROOT, 'brands', req.params.slug, 'logos');
    if (!fs.existsSync(logosDir)) {
      res.json({ images: [] });
      return;
    }
    const images = fs.readdirSync(logosDir)
      .filter(f => /\.(png|svg|jpg|jpeg|webp)$/i.test(f))
      .map(f => ({ name: f, path: `/brands/${req.params.slug}/logos/${f}` }));
    res.json({ images });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

function buildPrompt(brandName: string, primaryColor: string, type: string): string {
  const prompts: Record<string, string> = {
    'logo-light': `Minimalist modern logo for "${brandName}" tech company, ${primaryColor} accent color on white background, clean vector style, professional, geometric`,
    'logo-dark': `Minimalist modern logo for "${brandName}" tech company, ${primaryColor} accent color on dark navy background, clean vector style, professional, geometric`,
    'icon': `App icon for "${brandName}", ${primaryColor} gradient, minimalist geometric symbol, rounded corners, modern tech aesthetic`,
  };
  return prompts[type] || prompts['logo-light'];
}

export default router;
