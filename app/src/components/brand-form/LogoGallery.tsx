import { useState, useEffect, useCallback } from 'react';
import { GlassCard } from '../ui/GlassCard';
import { Button } from '../ui/Button';
import { useToast } from '../ui/Toast';

interface LogoImage {
  name: string;
  path: string;
}

interface LogoGalleryProps {
  slug: string;
}

const LOGO_TYPES = [
  { id: 'logo-light', label: 'Logo Light', desc: 'Light background version' },
  { id: 'logo-dark', label: 'Logo Dark', desc: 'Dark background version' },
  { id: 'icon', label: 'App Icon', desc: 'Square icon / favicon' },
];

export function LogoGallery({ slug }: LogoGalleryProps) {
  const { toast } = useToast();
  const [images, setImages] = useState<LogoImage[]>([]);
  const [generating, setGenerating] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchImages = useCallback(async () => {
    try {
      const res = await fetch(`/api/images/${slug}`);
      if (res.ok) {
        const data = await res.json();
        setImages(data.images || []);
      }
    } catch {
      // Silent fail on load
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => { fetchImages(); }, [fetchImages]);

  const handleGenerate = async (type: string) => {
    setGenerating(type);
    try {
      const res = await fetch(`/api/images/${slug}/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type }),
      });
      const data = await res.json();
      if (data.success) {
        toast('success', `Generated ${type}`);
        await fetchImages();
      } else {
        toast('error', data.error || 'Generation failed');
      }
    } catch (err) {
      toast('error', (err as Error).message);
    } finally {
      setGenerating(null);
    }
  };

  const handleGenerateAll = async () => {
    for (const type of LOGO_TYPES) {
      await handleGenerate(type.id);
    }
  };

  const getImageForType = (typeId: string) => {
    return images.find(img => img.name.startsWith(typeId));
  };

  return (
    <GlassCard>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ fontSize: 16, fontWeight: 700 }}>
          <span className="gradient-text">AI Logo Generation</span>
        </h3>
        <Button size="sm" variant="ghost" onClick={handleGenerateAll} loading={generating !== null}>
          Generate All
        </Button>
      </div>
      <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 16 }}>
        Generate logos using AI (requires infsh CLI). Each generation takes 10-30 seconds.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
        {LOGO_TYPES.map(type => {
          const existing = getImageForType(type.id);
          const isGenerating = generating === type.id;

          return (
            <div
              key={type.id}
              style={{
                border: '1px solid var(--glass-border)',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
                background: 'rgba(0,0,0,0.2)',
              }}
            >
              <div style={{
                height: 140,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: type.id === 'logo-dark' ? '#0f172a' : type.id === 'logo-light' ? '#f8fafc' : 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
                position: 'relative',
              }}>
                {isGenerating ? (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{
                      width: 32, height: 32, border: '3px solid var(--primary)',
                      borderTopColor: 'transparent', borderRadius: '50%',
                      animation: 'spin 0.8s linear infinite', margin: '0 auto 8px',
                    }} />
                    <span style={{ fontSize: 11, color: 'var(--muted)' }}>Generating...</span>
                  </div>
                ) : existing ? (
                  <img
                    src={existing.path}
                    alt={type.label}
                    style={{ maxWidth: '90%', maxHeight: '90%', objectFit: 'contain' }}
                  />
                ) : (
                  <span style={{ fontSize: 36, opacity: 0.3 }}>🎨</span>
                )}
              </div>
              <div style={{ padding: '10px 12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 600 }}>{type.label}</p>
                  <p style={{ fontSize: 11, color: 'var(--muted)' }}>{type.desc}</p>
                </div>
                <Button
                  size="sm"
                  variant={existing ? 'ghost' : 'primary'}
                  onClick={() => handleGenerate(type.id)}
                  loading={isGenerating}
                  style={{ fontSize: 11, padding: '4px 10px' }}
                >
                  {existing ? 'Redo' : 'Generate'}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {images.length > 0 && (
        <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 12 }}>
          {images.length} image{images.length !== 1 ? 's' : ''} in brands/{slug}/logos/
        </p>
      )}
    </GlassCard>
  );
}
