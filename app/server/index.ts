import express from 'express';
import path from 'path';
import { REPO_ROOT, BRANDS_DIR } from './lib/config.js';
import { validateSlug } from './lib/validate.js';
import brandsRouter from './routes/brands.js';
import buildRouter from './routes/build.js';
import collectionRouter from './routes/collection.js';
import imagesRouter from './routes/images.js';

const app = express();
app.use(express.json());

// API Routes
app.use('/api/brands', brandsRouter);
app.use('/api/build', buildRouter);
app.use('/api/collection', collectionRouter);
app.use('/api/images', imagesRouter);

// Serve brand collection HTML files
app.use('/brands/:slug/collection', validateSlug, (req, res, next) => {
  const collectionPath = path.join(BRANDS_DIR, req.params.slug, 'collection');
  express.static(collectionPath)(req, res, next);
});

// In dev mode, Vite handles frontend. In production, serve built files.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(REPO_ROOT, 'app/dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(REPO_ROOT, 'app/dist/index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Brand Machine API running on http://localhost:${PORT}`);
  console.log(`Repo root: ${REPO_ROOT}`);
});
