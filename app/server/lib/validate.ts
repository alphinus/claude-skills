import type { Request, Response, NextFunction } from 'express';

const SLUG_PATTERN = /^[a-z0-9][a-z0-9-]*$/;

export function validateSlug(req: Request, res: Response, next: NextFunction) {
  const slug = req.params.slug;
  if (!slug || !SLUG_PATTERN.test(slug) || slug.includes('..')) {
    res.status(400).json({ error: 'Invalid slug. Use lowercase alphanumeric and hyphens only.' });
    return;
  }
  next();
}

export function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
