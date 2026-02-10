import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GlassCard } from '../components/ui/GlassCard';
import { Button } from '../components/ui/Button';
import { Modal } from '../components/ui/Modal';
import { useToast } from '../components/ui/Toast';

export function CollectionPage() {
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const [categories, setCategories] = useState<Record<string, string[]>>({});
  const [generating, setGenerating] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fetchCollection = async () => {
    const res = await fetch(`/api/collection/${slug}`);
    const data = await res.json();
    setCategories(data.categories || {});
  };

  useEffect(() => { fetchCollection(); }, [slug]);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const res = await fetch(`/api/collection/${slug}/generate`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        toast('success', `Generated ${data.count} pages`);
        await fetchCollection();
      } else {
        toast('error', data.error || 'Generation failed');
      }
    } catch (err) {
      toast('error', (err as Error).message);
    } finally {
      setGenerating(false);
    }
  };

  const allFiles = Object.entries(categories).flatMap(([, files]) =>
    files.map(f => f)
  );
  const filteredFiles = activeFilter
    ? categories[activeFilter] || []
    : allFiles;
  const totalCount = allFiles.length;

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 800 }}>
            <span className="gradient-text">Collection</span>
          </h2>
          <p style={{ fontSize: 14, color: 'var(--muted)', marginTop: 4 }}>
            {totalCount} pages across {Object.keys(categories).length} categories
          </p>
        </div>
        <Button onClick={handleGenerate} loading={generating}>
          {generating ? 'Generating...' : totalCount > 0 ? 'Regenerate' : 'Generate Collection'}
        </Button>
      </div>

      {totalCount === 0 ? (
        <GlassCard style={{ textAlign: 'center', padding: 48 }}>
          <div style={{ fontSize: 40, marginBottom: 16 }}>📄</div>
          <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>No collection generated</h3>
          <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
            Generate a 110-page brand collection from templates.
          </p>
          <Button onClick={handleGenerate} loading={generating}>Generate Collection</Button>
        </GlassCard>
      ) : (
        <>
          {/* Category filter */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
            <button
              onClick={() => setActiveFilter(null)}
              style={{
                padding: '4px 12px',
                borderRadius: 12,
                border: '1px solid var(--glass-border)',
                background: !activeFilter ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                color: !activeFilter ? 'var(--primary)' : 'var(--muted)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              All ({totalCount})
            </button>
            {Object.entries(categories).map(([cat, files]) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 12,
                  border: '1px solid var(--glass-border)',
                  background: activeFilter === cat ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent',
                  color: activeFilter === cat ? 'var(--primary)' : 'var(--muted)',
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {cat} ({files.length})
              </button>
            ))}
          </div>

          {/* Gallery grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: 12,
          }}>
            {filteredFiles.map(file => (
              <GlassCard
                key={file}
                hover
                onClick={() => setPreviewUrl(`/brands/${slug}/collection/${file}`)}
                style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
              >
                <div style={{
                  width: '100%',
                  height: 150,
                  overflow: 'hidden',
                  position: 'relative',
                }}>
                  <iframe
                    src={`/brands/${slug}/collection/${file}`}
                    title={file}
                    style={{
                      width: 800,
                      height: 600,
                      border: 'none',
                      transform: 'scale(0.275)',
                      transformOrigin: 'top left',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
                <div style={{ padding: '8px 12px' }}>
                  <p style={{ fontSize: 11, color: 'var(--muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {file}
                  </p>
                </div>
              </GlassCard>
            ))}
          </div>
        </>
      )}

      {/* Preview Modal */}
      <Modal open={!!previewUrl} onClose={() => setPreviewUrl(null)} title="Preview" width={900}>
        {previewUrl && (
          <div>
            <iframe
              src={previewUrl}
              title="Preview"
              style={{
                width: '100%',
                height: 500,
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-sm)',
              }}
            />
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: 'var(--muted)' }}>{previewUrl}</span>
              <Button size="sm" variant="ghost" onClick={() => window.open(previewUrl, '_blank')}>
                Open in New Tab
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
