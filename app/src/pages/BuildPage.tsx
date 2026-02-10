import { useState } from 'react';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import type { Brand } from '../lib/types';

interface BuildPageProps {
  brands: Brand[];
}

export function BuildPage({ brands }: BuildPageProps) {
  const { toast } = useToast();
  const [logs, setLogs] = useState<Record<string, string>>({});
  const [building, setBuilding] = useState<Record<string, boolean>>({});

  const handleBuild = async (slug: string) => {
    setBuilding(prev => ({ ...prev, [slug]: true }));
    setLogs(prev => ({ ...prev, [slug]: 'Building...\n' }));
    try {
      const buildRes = await fetch(`/api/build/${slug}`, { method: 'POST' });
      const buildData = await buildRes.json();
      setLogs(prev => ({ ...prev, [slug]: buildData.log || '' }));

      if (buildData.success) {
        setLogs(prev => ({ ...prev, [slug]: prev[slug] + '\n--- Syncing ---\n' }));
        const syncRes = await fetch(`/api/build/${slug}/sync`, { method: 'POST' });
        const syncData = await syncRes.json();
        setLogs(prev => ({ ...prev, [slug]: prev[slug] + (syncData.log || '') }));
        toast('success', `${slug}: Build + Sync complete`);
      } else {
        toast('error', `${slug}: Build failed`);
      }
    } catch (err) {
      toast('error', (err as Error).message);
    } finally {
      setBuilding(prev => ({ ...prev, [slug]: false }));
    }
  };

  const handleBuildAll = async () => {
    for (const brand of brands) {
      await handleBuild(brand.slug);
    }
  };

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800 }}>
            <span className="gradient-text">Build Status</span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>
            Build and deploy brand skills to Claude Code
          </p>
        </div>
        <Button onClick={handleBuildAll} disabled={brands.length === 0}>
          Build All
        </Button>
      </div>

      {brands.length === 0 ? (
        <GlassCard style={{ textAlign: 'center', padding: 48 }}>
          <p style={{ color: 'var(--muted)' }}>No brands to build. Create a brand first.</p>
        </GlassCard>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {brands.map(brand => (
            <GlassCard key={brand.slug}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: logs[brand.slug] ? 12 : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    background: `linear-gradient(135deg, ${brand.colors?.PRIMARY || '#4fd1c5'}, ${brand.colors?.PRIMARY_DARK || '#38b2ac'})`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 14,
                    fontWeight: 800,
                    color: brand.colors?.BG || '#0f172a',
                  }}>
                    {(brand.brand?.name || brand.slug).charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h3 style={{ fontSize: 15, fontWeight: 700 }}>{brand.brand?.name || brand.slug}</h3>
                    <p style={{ fontSize: 12, color: 'var(--muted)' }}>{brand.brand?.slug}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => handleBuild(brand.slug)}
                  loading={building[brand.slug]}
                >
                  {building[brand.slug] ? 'Building...' : 'Build + Deploy'}
                </Button>
              </div>
              {logs[brand.slug] && (
                <pre style={{
                  padding: 12,
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: 11,
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--muted)',
                  overflowX: 'auto',
                  whiteSpace: 'pre-wrap',
                  maxHeight: 200,
                }}>
                  {logs[brand.slug]}
                </pre>
              )}
            </GlassCard>
          ))}
        </div>
      )}
    </div>
  );
}
