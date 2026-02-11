import { Router } from 'express';
import { generateCollection, listCollection } from '../lib/collection-gen.js';
import { validateSlug } from '../lib/validate.js';
import { BRANDS_DIR, REPO_ROOT } from '../lib/config.js';
import { runScript } from '../lib/process-runner.js';

const router = Router();

// POST /api/collection/:slug/generate — Generate collection for a brand
router.post('/:slug/generate', validateSlug, async (req, res) => {
  try {
    const result = await generateCollection(req.params.slug);
    res.json({
      success: true,
      count: result.count,
      errors: result.errors,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// POST /api/collection/:slug/export — Export collection pages as PNG
router.post('/:slug/export', validateSlug, async (req, res) => {
  try {
    const { category } = req.body || {};
    const args = [req.params.slug];
    if (category) args.push(category);

    const result = await runScript('scripts/export-png.js', args);
    res.json({
      success: result.code === 0,
      log: result.stdout + (result.stderr ? '\n' + result.stderr : ''),
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// GET /api/collection/:slug — List collection files
router.get('/:slug', validateSlug, (req, res) => {
  try {
    const result = listCollection(req.params.slug);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
