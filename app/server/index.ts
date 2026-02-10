import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import brandsRouter from './routes/brands.js';
import buildRouter from './routes/build.js';
import collectionRouter from './routes/collection.js';
import imagesRouter from './routes/images.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, '../..');

const app = express();
app.use(express.json());

// API Routes
app.use('/api/brands', brandsRouter);
app.use('/api/build', buildRouter);
app.use('/api/collection', collectionRouter);
app.use('/api/images', imagesRouter);

// Serve brand collection HTML files
app.use('/brands/:slug/collection', (req, res, next) => {
  const collectionPath = path.join(REPO_ROOT, 'brands', req.params.slug, 'collection');
  express.static(collectionPath)(req, res, next);
});

// In dev mode, Vite handles frontend. In production, serve built files.
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist')));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Brand Machine API running on http://localhost:${PORT}`);
  console.log(`Repo root: ${REPO_ROOT}`);
});
