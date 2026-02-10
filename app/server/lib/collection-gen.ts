import fs from 'fs';
import path from 'path';
import { REPO_ROOT } from './process-runner.js';

interface TokensJson {
  brand: {
    name: string;
    slug: string;
    domain: string;
    tagline: string;
    description: string;
    triggers: string[];
  };
  colors: Record<string, string>;
  theme: {
    style: string;
    glassmorphism: boolean;
    motif: string;
  };
}

export async function generateCollection(slug: string): Promise<{ count: number; errors: string[] }> {
  const tokensPath = path.join(REPO_ROOT, 'brands', slug, 'tokens.json');
  const templatesDir = path.join(REPO_ROOT, 'collection-templates');
  const outputDir = path.join(REPO_ROOT, 'brands', slug, 'collection');

  if (!fs.existsSync(tokensPath)) {
    throw new Error(`Brand not found: ${slug}`);
  }
  if (!fs.existsSync(templatesDir)) {
    throw new Error('Collection templates not found. Run templatize-collection.sh first.');
  }

  const tokens: TokensJson = JSON.parse(fs.readFileSync(tokensPath, 'utf-8'));
  const replacements: Record<string, string> = {
    '{{BRAND_NAME}}': tokens.brand.name,
    '{{BRAND_NAME_LOWER}}': tokens.brand.name.toLowerCase(),
    '{{BRAND_SLUG}}': tokens.brand.slug,
    '{{BRAND_DOMAIN}}': tokens.brand.domain,
    '{{BRAND_TAGLINE}}': tokens.brand.tagline,
  };

  // Add all color tokens
  for (const [key, value] of Object.entries(tokens.colors)) {
    replacements[`{{${key}}}`] = value;
  }

  let count = 0;
  const errors: string[] = [];

  function processDir(dir: string, relPath: string = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const srcPath = path.join(dir, entry.name);
      const destRelPath = path.join(relPath, entry.name);

      if (entry.isDirectory()) {
        const destDir = path.join(outputDir, destRelPath);
        fs.mkdirSync(destDir, { recursive: true });
        processDir(srcPath, destRelPath);
      } else if (entry.name.endsWith('.html') || entry.name.endsWith('.html.template')) {
        try {
          let content = fs.readFileSync(srcPath, 'utf-8');
          for (const [placeholder, value] of Object.entries(replacements)) {
            content = content.replaceAll(placeholder, value);
          }
          const outputName = entry.name.replace('.template', '');
          const destPath = path.join(outputDir, relPath, outputName);
          fs.mkdirSync(path.dirname(destPath), { recursive: true });
          fs.writeFileSync(destPath, content, 'utf-8');
          count++;
        } catch (err) {
          errors.push(`${destRelPath}: ${(err as Error).message}`);
        }
      }
    }
  }

  fs.mkdirSync(outputDir, { recursive: true });
  processDir(templatesDir);

  return { count, errors };
}

export function listCollection(slug: string): { categories: Record<string, string[]> } {
  const collectionDir = path.join(REPO_ROOT, 'brands', slug, 'collection');
  const categories: Record<string, string[]> = {};

  if (!fs.existsSync(collectionDir)) {
    return { categories };
  }

  const entries = fs.readdirSync(collectionDir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      const catDir = path.join(collectionDir, entry.name);
      const files = getAllHtmlFiles(catDir, entry.name);
      if (files.length > 0) {
        categories[entry.name] = files;
      }
    } else if (entry.name.endsWith('.html')) {
      if (!categories['root']) categories['root'] = [];
      categories['root'].push(entry.name);
    }
  }

  return { categories };
}

function getAllHtmlFiles(dir: string, prefix: string): string[] {
  const files: string[] = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      files.push(...getAllHtmlFiles(path.join(dir, entry.name), `${prefix}/${entry.name}`));
    } else if (entry.name.endsWith('.html')) {
      files.push(`${prefix}/${entry.name}`);
    }
  }
  return files;
}
