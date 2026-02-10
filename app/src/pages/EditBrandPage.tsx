import { useParams, useNavigate } from 'react-router-dom';
import { BrandForm } from '../components/brand-form/BrandForm';
import { Button } from '../components/ui/Button';
import { GlassCard } from '../components/ui/GlassCard';
import { useToast } from '../components/ui/Toast';
import { useBrand } from '../hooks/useBrands';
import { useBuildStatus } from '../hooks/useBuildStatus';
import type { TokensJson } from '../lib/types';

interface EditBrandPageProps {
  onUpdate: (slug: string, tokens: TokensJson) => Promise<void>;
  onDelete: (slug: string) => Promise<void>;
  onDuplicate: (slug: string, name?: string) => Promise<{ slug: string }>;
}

export function EditBrandPage({ onUpdate, onDelete, onDuplicate }: EditBrandPageProps) {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { brand, loading } = useBrand(slug);
  const { building, syncing, log, buildAndSync } = useBuildStatus();

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div className="skeleton" style={{ height: 36, width: 240 }} />
        <div className="skeleton" style={{ height: 300 }} />
        <div className="skeleton" style={{ height: 200 }} />
      </div>
    );
  }
  if (!brand) return <div style={{ color: 'var(--error)' }}>Brand not found</div>;

  const handleSubmit = async (tokens: TokensJson) => {
    try {
      await onUpdate(slug!, tokens);
      toast('success', 'Brand updated');
    } catch (err) {
      toast('error', (err as Error).message);
    }
  };

  const handleBuild = async () => {
    const result = await buildAndSync(slug!);
    if (result.success) {
      toast('success', 'Build + Sync complete');
    } else {
      toast('error', 'Build failed — check log');
    }
  };

  const handleDelete = async () => {
    if (!confirm(`Delete brand "${brand.brand.name}"? This cannot be undone.`)) return;
    try {
      await onDelete(slug!);
      toast('success', 'Brand deleted');
      navigate('/');
    } catch (err) {
      toast('error', (err as Error).message);
    }
  };

  const handleDuplicate = async () => {
    try {
      const newBrand = await onDuplicate(slug!);
      toast('success', `Duplicated "${brand.brand.name}"`);
      navigate(`/brands/${newBrand.slug}/edit`);
    } catch (err) {
      toast('error', (err as Error).message);
    }
  };

  return (
    <div className="page-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h2 style={{ fontSize: 24, fontWeight: 800 }}>
          <span className="gradient-text">Edit {brand.brand.name}</span>
        </h2>
        <div style={{ display: 'flex', gap: 8 }}>
          <Button variant="ghost" onClick={() => navigate(`/brands/${slug}/collection`)}>
            Collection
          </Button>
          <Button variant="ghost" onClick={handleDuplicate}>
            Duplicate
          </Button>
          <Button onClick={handleBuild} loading={building || syncing}>
            {building ? 'Building...' : syncing ? 'Syncing...' : 'Build + Deploy'}
          </Button>
          <Button variant="danger" onClick={handleDelete}>Delete</Button>
        </div>
      </div>

      <BrandForm initial={brand} onSubmit={handleSubmit} submitLabel="Save Changes" />

      {log && (
        <GlassCard style={{ marginTop: 20 }}>
          <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>Build Log</h3>
          <pre style={{
            padding: 12,
            background: 'rgba(0,0,0,0.3)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 12,
            fontFamily: 'var(--font-mono)',
            color: 'var(--muted)',
            overflowX: 'auto',
            whiteSpace: 'pre-wrap',
            maxHeight: 300,
          }}>
            {log}
          </pre>
        </GlassCard>
      )}
    </div>
  );
}
