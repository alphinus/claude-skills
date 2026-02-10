import { Router } from 'express';
import { runScript } from '../lib/process-runner.js';

const router = Router();

// POST /api/build/:slug — Run build.sh for a brand
router.post('/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    const result = await runScript('./build.sh', [slug]);
    res.json({
      success: result.code === 0,
      log: result.stdout + (result.stderr ? '\n' + result.stderr : ''),
      code: result.code,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

// POST /api/build/:slug/sync — Run sync.sh for a brand
router.post('/:slug/sync', async (req, res) => {
  try {
    const { slug } = req.params;
    // First get the skill slug from tokens.json
    const result = await runScript('./sync.sh', [slug]);
    res.json({
      success: result.code === 0,
      log: result.stdout + (result.stderr ? '\n' + result.stderr : ''),
      code: result.code,
    });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
