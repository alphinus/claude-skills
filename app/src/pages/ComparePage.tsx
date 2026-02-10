import { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { LivePreview } from '../components/preview/LivePreview';
import type { Brand, BrandColors } from '../lib/types';

interface ComparePageProps {
  brands: Brand[];
}

export function ComparePage({ brands }: ComparePageProps) {
  const [leftSlug, setLeftSlug] = useState(brands[0]?.slug || '');
  const [rightSlug, setRightSlug] = useState(brands[1]?.slug || brands[0]?.slug || '');

  const leftBrand = brands.find(b => b.slug === leftSlug);
  const rightBrand = brands.find(b => b.slug === rightSlug);

  if (brands.length < 2) {
    return (
      <div className="page-enter">
        <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>
          <span className="gradient-text">Compare Brands</span>
        </h2>
        <GlassCard style={{ textAlign: 'center', padding: 48 }}>
          <p style={{ color: 'var(--muted)' }}>You need at least 2 brands to compare. Create another brand first.</p>
        </GlassCard>
      </div>
    );
  }

  return (
    <div className="page-enter">
      <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 24 }}>
        <span className="gradient-text">Compare Brands</span>
      </h2>

      {/* Selectors */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        <BrandSelector brands={brands} value={leftSlug} onChange={setLeftSlug} label="Brand A" />
        <BrandSelector brands={brands} value={rightSlug} onChange={setRightSlug} label="Brand B" />
      </div>

      {/* Side-by-side previews */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 24 }}>
        {leftBrand && (
          <LivePreview
            colors={leftBrand.colors as BrandColors}
            brandName={leftBrand.brand?.name || leftBrand.slug}
            style={leftBrand.theme?.style || 'dark-first'}
            glassmorphism={leftBrand.theme?.glassmorphism ?? true}
          />
        )}
        {rightBrand && (
          <LivePreview
            colors={rightBrand.colors as BrandColors}
            brandName={rightBrand.brand?.name || rightBrand.slug}
            style={rightBrand.theme?.style || 'dark-first'}
            glassmorphism={rightBrand.theme?.glassmorphism ?? true}
          />
        )}
      </div>

      {/* Color comparison table */}
      {leftBrand && rightBrand && (
        <GlassCard>
          <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 16 }}>Color Tokens</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr 1fr', gap: '8px 16px', alignItems: 'center' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>Token</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>{leftBrand.brand?.name}</div>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase' }}>{rightBrand.brand?.name}</div>

            {['PRIMARY', 'PRIMARY_DARK', 'BG', 'SURFACE', 'SIDEBAR_BG', 'TEXT', 'MUTED', 'SUCCESS', 'WARNING', 'ERROR', 'INFO'].map(token => {
              const lc = (leftBrand.colors as unknown as Record<string, string>)?.[token] || '';
              const rc = (rightBrand.colors as unknown as Record<string, string>)?.[token] || '';
              const same = lc.toLowerCase() === rc.toLowerCase();

              return [
                <div key={`${token}-label`} style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: 'var(--muted)' }}>
                  {token}
                </div>,
                <div key={`${token}-left`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, background: lc, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: same ? 'var(--muted)' : 'var(--text)' }}>{lc}</span>
                </div>,
                <div key={`${token}-right`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 20, height: 20, borderRadius: 4, background: rc, border: '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontFamily: 'var(--font-mono)', color: same ? 'var(--muted)' : 'var(--text)' }}>{rc}</span>
                  {!same && <span style={{ fontSize: 10, color: 'var(--warning)', fontWeight: 600 }}>differs</span>}
                </div>,
              ];
            })}
          </div>
        </GlassCard>
      )}
    </div>
  );
}

function BrandSelector({ brands, value, onChange, label }: {
  brands: Brand[];
  value: string;
  onChange: (slug: string) => void;
  label: string;
}) {
  return (
    <div>
      <label style={{
        display: 'block',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: 6,
      }}>
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text)',
          fontSize: 14,
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          cursor: 'pointer',
        }}
      >
        {brands.map(b => (
          <option key={b.slug} value={b.slug}>{b.brand?.name || b.slug}</option>
        ))}
      </select>
    </div>
  );
}
