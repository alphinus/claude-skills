import { Router } from 'express';
import { generateCollection, listCollection } from '../lib/collection-gen.js';

const router = Router();

// POST /api/collection/:slug/generate — Generate collection for a brand
router.post('/:slug/generate', async (req, res) => {
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

// GET /api/collection/:slug — List collection files
router.get('/:slug', (req, res) => {
  try {
    const result = listCollection(req.params.slug);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
