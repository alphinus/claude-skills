import { useState, useEffect } from 'react';
import { Input, Textarea, Select } from '../ui/Input';
import { Button } from '../ui/Button';
import { GlassCard } from '../ui/GlassCard';
import { ColorPicker } from './ColorPicker';
import { PresetPalettes, type Preset } from './PresetPalettes';
import { LivePreview } from '../preview/LivePreview';
import type { TokensJson, BrandColors } from '../../lib/types';
import { calculateDarkVariant, hexToRgbString } from '../../lib/color-utils';

const DARK_DEFAULTS: Partial<BrandColors> = {
  BG: '#0f172a', SURFACE: '#141e33', SIDEBAR_BG: '#0b1120',
  TEXT: '#f8fafc', MUTED: '#718096',
  SUCCESS: '#10b981', WARNING: '#f59e0b', ERROR: '#ef4444', INFO: '#3b82f6',
};

const LIGHT_DEFAULTS: Partial<BrandColors> = {
  BG: '#f1f5f9', SURFACE: '#ffffff', SIDEBAR_BG: '#e2e8f0',
  TEXT: '#1a202c', MUTED: '#718096',
  SUCCESS: '#10b981', WARNING: '#f59e0b', ERROR: '#ef4444', INFO: '#3b82f6',
};

interface BrandFormProps {
  initial?: TokensJson;
  onSubmit: (tokens: TokensJson) => Promise<void>;
  submitLabel?: string;
}

export function BrandForm({ initial, onSubmit, submitLabel = 'Create Brand' }: BrandFormProps) {
  const [name, setName] = useState(initial?.brand.name || '');
  const [slug, setSlug] = useState(initial?.brand.slug || '');
  const [domain, setDomain] = useState(initial?.brand.domain || '');
  const [tagline, setTagline] = useState(initial?.brand.tagline || '');
  const [description, setDescription] = useState(initial?.brand.description || '');
  const [triggers, setTriggers] = useState(initial?.brand.triggers?.join(', ') || '');
  const [style, setStyle] = useState<'dark-first' | 'light-first'>(initial?.theme.style || 'dark-first');
  const [glassmorphism, setGlassmorphism] = useState(initial?.theme.glassmorphism ?? true);
  const [motif, setMotif] = useState(initial?.theme.motif || 'geometric');

  const defaults = style === 'dark-first' ? DARK_DEFAULTS : LIGHT_DEFAULTS;

  const [primary, setPrimary] = useState(initial?.colors.PRIMARY || '#4fd1c5');
  const [bg, setBg] = useState(initial?.colors.BG || defaults.BG!);
  const [surface, setSurface] = useState(initial?.colors.SURFACE || defaults.SURFACE!);
  const [sidebarBg, setSidebarBg] = useState(initial?.colors.SIDEBAR_BG || defaults.SIDEBAR_BG!);
  const [text, setText] = useState(initial?.colors.TEXT || defaults.TEXT!);
  const [muted, setMuted] = useState(initial?.colors.MUTED || defaults.MUTED!);

  const [submitting, setSubmitting] = useState(false);

  // Auto-generate slug from name
  useEffect(() => {
    if (!initial) {
      setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + (name ? '-brand-system' : ''));
    }
  }, [name, initial]);

  // Apply style defaults when theme changes (only if not editing)
  useEffect(() => {
    if (!initial) {
      const d = style === 'dark-first' ? DARK_DEFAULTS : LIGHT_DEFAULTS;
      setBg(d.BG!);
      setSurface(d.SURFACE!);
      setSidebarBg(d.SIDEBAR_BG!);
      setText(d.TEXT!);
      setMuted(d.MUTED!);
    }
  }, [style, initial]);

  const colors: BrandColors = {
    PRIMARY: primary,
    PRIMARY_DARK: calculateDarkVariant(primary),
    PRIMARY_RGB: hexToRgbString(primary),
    BG: bg,
    SURFACE: surface,
    SIDEBAR_BG: sidebarBg,
    TEXT: text,
    MUTED: muted,
    SUCCESS: defaults.SUCCESS!,
    SUCCESS_RGB: hexToRgbString(defaults.SUCCESS!),
    WARNING: defaults.WARNING!,
    WARNING_RGB: hexToRgbString(defaults.WARNING!),
    ERROR: defaults.ERROR!,
    ERROR_RGB: hexToRgbString(defaults.ERROR!),
    INFO: defaults.INFO!,
    INFO_RGB: hexToRgbString(defaults.INFO!),
  };

  const handleSubmit = async () => {
    if (!name.trim()) return;
    setSubmitting(true);
    try {
      await onSubmit({
        brand: {
          name: name.trim(),
          slug: slug.trim(),
          domain: domain.trim(),
          tagline: tagline.trim().toUpperCase(),
          description: description.trim(),
          triggers: triggers.split(',').map(t => t.trim()).filter(Boolean),
        },
        colors,
        theme: { style, glassmorphism, motif },
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start' }}>
      {/* Form */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <GlassCard style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Brand Identity</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <Input label="Brand Name" value={name} onChange={e => setName(e.target.value)} placeholder="My Brand" />
            <Input label="Slug" value={slug} onChange={e => setSlug(e.target.value)} placeholder="my-brand-system" />
            <Input label="Domain" value={domain} onChange={e => setDomain(e.target.value)} placeholder="mybrand.com" />
            <Input label="Tagline" value={tagline} onChange={e => setTagline(e.target.value)} placeholder="TAGLINE HERE" />
          </div>
          <div style={{ marginTop: 14 }}>
            <Textarea label="Description" value={description} onChange={e => setDescription(e.target.value)} placeholder="Skill description for Claude Code..." />
          </div>
          <div style={{ marginTop: 14 }}>
            <Input label="Triggers (comma-separated)" value={triggers} onChange={e => setTriggers(e.target.value)} placeholder="brand style, brand UI, brand design" />
          </div>
        </GlassCard>

        <GlassCard style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Theme Settings</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            <Select
              label="Style"
              value={style}
              onChange={e => setStyle(e.target.value as 'dark-first' | 'light-first')}
              options={[
                { value: 'dark-first', label: 'Dark First' },
                { value: 'light-first', label: 'Light First' },
              ]}
            />
            <Select
              label="Motif"
              value={motif}
              onChange={e => setMotif(e.target.value)}
              options={[
                { value: 'geometric', label: 'Geometric' },
                { value: 'hexagonal', label: 'Hexagonal' },
                { value: 'organic', label: 'Organic' },
                { value: 'minimal', label: 'Minimal' },
              ]}
            />
            <div>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
                Glassmorphism
              </label>
              <button
                onClick={() => setGlassmorphism(!glassmorphism)}
                style={{
                  width: 48,
                  height: 26,
                  borderRadius: 13,
                  border: 'none',
                  background: glassmorphism ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'var(--transition-normal)',
                }}
              >
                <span style={{
                  position: 'absolute',
                  top: 3,
                  left: glassmorphism ? 24 : 3,
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  background: '#fff',
                  transition: 'var(--transition-normal)',
                }} />
              </button>
            </div>
          </div>
        </GlassCard>

        <GlassCard style={{ marginBottom: 20 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Colors</h3>
          <PresetPalettes onSelect={(preset: Preset) => {
            setPrimary(preset.primary);
            setBg(preset.bg);
            setSurface(preset.surface);
            setSidebarBg(preset.sidebarBg);
            setText(preset.text);
            setMuted(preset.muted);
            setStyle(preset.style);
          }} />
          <ColorPicker label="Primary Color" value={primary} onChange={setPrimary} />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            <ColorHexField label="Background" value={bg} onChange={setBg} />
            <ColorHexField label="Surface" value={surface} onChange={setSurface} />
            <ColorHexField label="Sidebar BG" value={sidebarBg} onChange={setSidebarBg} />
            <ColorHexField label="Text" value={text} onChange={setText} />
            <ColorHexField label="Muted" value={muted} onChange={setMuted} />
          </div>
        </GlassCard>

        <Button onClick={handleSubmit} loading={submitting} size="lg" style={{ width: '100%' }}>
          {submitLabel}
        </Button>
      </div>

      {/* Live Preview */}
      <div style={{ width: 380, flexShrink: 0, position: 'sticky', top: 20 }}>
        <LivePreview colors={colors} brandName={name || 'Brand'} style={style} glassmorphism={glassmorphism} />
      </div>
    </div>
  );
}

function ColorHexField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 6 }}>
        {label}
      </label>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input
          type="color"
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{ width: 32, height: 32, border: 'none', borderRadius: 4, cursor: 'pointer', padding: 0, background: 'none' }}
        />
        <input
          type="text"
          value={value}
          onChange={e => {
            let v = e.target.value;
            if (!v.startsWith('#')) v = '#' + v;
            onChange(v.substring(0, 7));
          }}
          style={{
            flex: 1,
            padding: '6px 8px',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid var(--glass-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--text)',
            fontSize: 13,
            fontFamily: 'var(--font-mono)',
            outline: 'none',
          }}
        />
      </div>
    </div>
  );
}
