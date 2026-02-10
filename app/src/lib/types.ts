export interface BrandInfo {
  name: string;
  slug: string;
  domain: string;
  tagline: string;
  description: string;
  triggers: string[];
}

export interface BrandColors {
  PRIMARY: string;
  PRIMARY_DARK: string;
  PRIMARY_RGB: string;
  BG: string;
  SURFACE: string;
  SIDEBAR_BG: string;
  TEXT: string;
  MUTED: string;
  SUCCESS: string;
  SUCCESS_RGB: string;
  WARNING: string;
  WARNING_RGB: string;
  ERROR: string;
  ERROR_RGB: string;
  INFO: string;
  INFO_RGB: string;
}

export interface BrandTheme {
  style: 'dark-first' | 'light-first';
  glassmorphism: boolean;
  motif: string;
}

export interface TokensJson {
  brand: BrandInfo;
  colors: BrandColors;
  theme: BrandTheme;
}

export interface Brand extends TokensJson {
  slug: string;
}

export const DEFAULT_DARK_COLORS: Partial<BrandColors> = {
  BG: '#0f172a',
  SURFACE: '#141e33',
  SIDEBAR_BG: '#0b1120',
  TEXT: '#f8fafc',
  MUTED: '#718096',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
};

export const DEFAULT_LIGHT_COLORS: Partial<BrandColors> = {
  BG: '#f1f5f9',
  SURFACE: '#ffffff',
  SIDEBAR_BG: '#e2e8f0',
  TEXT: '#1a202c',
  MUTED: '#718096',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  ERROR: '#ef4444',
  INFO: '#3b82f6',
};
