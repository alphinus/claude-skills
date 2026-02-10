import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { useToast } from '../components/ui/Toast';
import type { Brand } from '../lib/types';

interface DashboardPageProps {
  brands: Brand[];
  loading: boolean;
  onDuplicate: (slug: string, name?: string) => Promise<{ slug: string }>;
}

export function DashboardPage({ brands, loading, onDuplicate }: DashboardPageProps) {
  const navigate = useNavigate();
  const { toast } = useToast();

  if (loading) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 16 }}>
        {[1, 2, 3].map(i => (
          <div key={i} className="skeleton" style={{ height: 200, borderRadius: 'var(--radius-lg)' }} />
        ))}
      </div>
    );
  }

  const handleDuplicate = async (slug: string, name: string) => {
    try {
      const newBrand = await onDuplicate(slug);
      toast('success', `Duplicated "${name}"`);
      navigate(`/brands/${newBrand.slug}/edit`);
    } catch (err) {
      toast('error', (err as Error).message);
    }
  };

  return (
    <div className="page-enter">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800 }}>
            <span className="gradient-text">Dashboard</span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>
            {brands.length} brand{brands.length !== 1 ? 's' : ''} configured
          </p>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {brands.length >= 2 && (
            <Button variant="ghost" onClick={() => navigate('/compare')}>Compare</Button>
          )}
          <Button onClick={() => navigate('/brands/new')}>+ New Brand</Button>
        </div>
      </div>

      {brands.length === 0 ? (
        <GlassCard style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>🎨</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No brands yet</h3>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
            Create your first brand to generate a Claude Code skill with custom design tokens.
          </p>
          <Button onClick={() => navigate('/brands/new')}>Create First Brand</Button>
        </GlassCard>
      ) : (
        <div className="stagger" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 16,
        }}>
          {brands.map(brand => (
            <BrandCard key={brand.slug} brand={brand} onDuplicate={handleDuplicate} />
          ))}
        </div>
      )}
    </div>
  );
}

function BrandCard({ brand, onDuplicate }: { brand: Brand; onDuplicate: (slug: string, name: string) => void }) {
  const navigate = useNavigate();
  const primary = brand.colors?.PRIMARY || '#4fd1c5';
  const bg = brand.colors?.BG || '#0f172a';

  return (
    <GlassCard hover onClick={() => navigate(`/brands/${brand.slug}/edit`)}>
      <div style={{
        height: 4,
        borderRadius: 2,
        background: `linear-gradient(135deg, ${primary}, ${brand.colors?.PRIMARY_DARK || primary})`,
        marginBottom: 16,
      }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          background: `linear-gradient(135deg, ${primary}, ${brand.colors?.PRIMARY_DARK || primary})`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 18,
          fontWeight: 800,
          color: bg,
          flexShrink: 0,
        }}>
          {(brand.brand?.name || brand.slug).charAt(0).toUpperCase()}
        </div>
        <div style={{ minWidth: 0 }}>
          <h3 style={{ fontSize: 16, fontWeight: 700 }}>{brand.brand?.name || brand.slug}</h3>
          {brand.brand?.domain && (
            <p style={{ fontSize: 12, color: 'var(--muted)' }}>{brand.brand.domain}</p>
          )}
        </div>
      </div>

      {brand.brand?.tagline && (
        <p style={{ fontSize: 11, color: primary, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 8 }}>
          {brand.brand.tagline}
        </p>
      )}

      <div style={{ display: 'flex', gap: 4, marginBottom: 12 }}>
        {[primary, bg, brand.colors?.SURFACE, brand.colors?.TEXT, brand.colors?.MUTED]
          .filter(Boolean)
          .map((c, i) => (
            <div key={i} style={{
              flex: 1,
              height: 20,
              borderRadius: 4,
              background: c,
              border: '1px solid rgba(255,255,255,0.06)',
            }} />
          ))}
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate(`/brands/${brand.slug}/edit`); }}>
          Edit
        </Button>
        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); navigate(`/brands/${brand.slug}/collection`); }}>
          Collection
        </Button>
        <Button size="sm" variant="ghost" onClick={(e) => { e.stopPropagation(); onDuplicate(brand.slug, brand.brand?.name || brand.slug); }}>
          Duplicate
        </Button>
      </div>
    </GlassCard>
  );
}
