import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const REPO_ROOT = process.env.REPO_ROOT || path.resolve(__dirname, '../../..');
export const BRANDS_DIR = process.env.BRANDS_DIR || path.join(REPO_ROOT, 'brands');
export const TEMPLATES_DIR = process.env.TEMPLATES_DIR || path.join(REPO_ROOT, 'collection-templates');
