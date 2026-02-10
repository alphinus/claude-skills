import type { BrandColors } from '../../lib/types';

interface LivePreviewProps {
  colors: BrandColors;
  brandName: string;
  style: 'dark-first' | 'light-first';
  glassmorphism: boolean;
}

export function LivePreview({ colors, brandName, glassmorphism }: LivePreviewProps) {
  const cssVars: React.CSSProperties & Record<string, string> = {
    '--p-primary': colors.PRIMARY,
    '--p-primary-dark': colors.PRIMARY_DARK,
    '--p-primary-rgb': colors.PRIMARY_RGB,
    '--p-bg': colors.BG,
    '--p-surface': colors.SURFACE,
    '--p-sidebar-bg': colors.SIDEBAR_BG,
    '--p-text': colors.TEXT,
    '--p-muted': colors.MUTED,
    '--p-success': colors.SUCCESS,
    '--p-warning': colors.WARNING,
    '--p-error': colors.ERROR,
  } as React.CSSProperties & Record<string, string>;

  const glass = glassmorphism
    ? { background: 'rgba(255,255,255,0.02)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.06)' }
    : { background: 'var(--p-surface)', border: '1px solid rgba(255,255,255,0.08)' };

  return (
    <div style={{
      ...cssVars,
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      border: '1px solid var(--glass-border)',
    }}>
      <div style={{
        padding: '12px 16px',
        background: 'rgba(var(--primary-rgb), 0.05)',
        borderBottom: '1px solid var(--glass-border)',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
      }}>
        Live Preview
      </div>
      <div style={{
        background: colors.BG,
        color: colors.TEXT,
        padding: 0,
        minHeight: 400,
        display: 'flex',
        fontFamily: 'var(--font-sans)',
      }}>
        {/* Mini Sidebar */}
        <div style={{
          width: 56,
          background: colors.SIDEBAR_BG,
          borderRight: '1px solid rgba(255,255,255,0.06)',
          padding: '12px 0',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
        }}>
          <div style={{ width: 28, height: 28, borderRadius: 6, background: `linear-gradient(135deg, ${colors.PRIMARY}, ${colors.PRIMARY_DARK})`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 800, color: colors.BG }}>
            {brandName.charAt(0).toUpperCase()}
          </div>
          {[1,2,3].map(i => (
            <div key={i} style={{ width: 28, height: 28, borderRadius: 6, background: i === 1 ? `rgba(${colors.PRIMARY_RGB},0.15)` : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ width: 14, height: 14, borderRadius: 3, background: i === 1 ? colors.PRIMARY : 'rgba(255,255,255,0.1)' }} />
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: 16 }}>
          {/* Header */}
          <h3 style={{
            fontSize: 16,
            fontWeight: 800,
            background: `linear-gradient(135deg, ${colors.PRIMARY}, ${colors.PRIMARY_DARK})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 12,
          }}>
            {brandName}
          </h3>

          {/* Glass Card */}
          <div style={{
            ...glass,
            borderRadius: 10,
            padding: 14,
            marginBottom: 12,
          }}>
            <div style={{ fontSize: 11, color: colors.MUTED, marginBottom: 6 }}>Dashboard</div>
            <div style={{ display: 'flex', gap: 8 }}>
              {[
                { label: 'Active', value: '24', color: colors.SUCCESS },
                { label: 'Pending', value: '12', color: colors.WARNING },
                { label: 'Failed', value: '3', color: colors.ERROR },
              ].map(stat => (
                <div key={stat.label} style={{
                  flex: 1,
                  padding: '8px 10px',
                  borderRadius: 6,
                  background: `${stat.color}11`,
                  border: `1px solid ${stat.color}22`,
                }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: stat.color }}>{stat.value}</div>
                  <div style={{ fontSize: 10, color: colors.MUTED }}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
            <button style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: 'none',
              background: `linear-gradient(135deg, ${colors.PRIMARY}, ${colors.PRIMARY_DARK})`,
              color: colors.BG,
              fontSize: 12,
              fontWeight: 600,
              cursor: 'pointer',
            }}>
              Primary
            </button>
            <button style={{
              padding: '6px 14px',
              borderRadius: 6,
              border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent',
              color: colors.TEXT,
              fontSize: 12,
              cursor: 'pointer',
            }}>
              Ghost
            </button>
          </div>

          {/* Badges */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {[
              { label: 'Success', bg: `${colors.SUCCESS}22`, color: colors.SUCCESS },
              { label: 'Warning', bg: `${colors.WARNING}22`, color: colors.WARNING },
              { label: 'Error', bg: `${colors.ERROR}22`, color: colors.ERROR },
              { label: 'Info', bg: `${colors.INFO}22`, color: colors.INFO },
            ].map(badge => (
              <span key={badge.label} style={{
                padding: '2px 8px',
                borderRadius: 10,
                background: badge.bg,
                color: badge.color,
                fontSize: 10,
                fontWeight: 600,
              }}>
                {badge.label}
              </span>
            ))}
          </div>

          {/* Input preview */}
          <div style={{ marginTop: 12 }}>
            <div style={{
              padding: '8px 10px',
              borderRadius: 6,
              background: 'rgba(255,255,255,0.03)',
              border: `1px solid ${colors.PRIMARY}44`,
              boxShadow: `0 0 0 3px rgba(${colors.PRIMARY_RGB},0.08)`,
              fontSize: 12,
              color: colors.MUTED,
            }}>
              Search {brandName.toLowerCase()}...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
