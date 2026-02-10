interface Preset {
  name: string;
  primary: string;
  bg: string;
  surface: string;
  sidebarBg: string;
  text: string;
  muted: string;
  style: 'dark-first' | 'light-first';
}

const presets: Preset[] = [
  {
    name: 'Cyan Dark',
    primary: '#4fd1c5', bg: '#0f172a', surface: '#141e33', sidebarBg: '#0b1120',
    text: '#f8fafc', muted: '#718096', style: 'dark-first',
  },
  {
    name: 'Purple Night',
    primary: '#a78bfa', bg: '#0f0a1f', surface: '#1a1230', sidebarBg: '#0a0716',
    text: '#f5f3ff', muted: '#7c7394', style: 'dark-first',
  },
  {
    name: 'Emerald Dark',
    primary: '#34d399', bg: '#0a1f1a', surface: '#0f2e25', sidebarBg: '#071712',
    text: '#ecfdf5', muted: '#6b8f82', style: 'dark-first',
  },
  {
    name: 'Amber Fire',
    primary: '#fbbf24', bg: '#1a1207', surface: '#261c0f', sidebarBg: '#120d05',
    text: '#fffbeb', muted: '#92854e', style: 'dark-first',
  },
  {
    name: 'Rose Dark',
    primary: '#fb7185', bg: '#1a0a10', surface: '#2a1220', sidebarBg: '#12080c',
    text: '#fff1f2', muted: '#8f6b72', style: 'dark-first',
  },
  {
    name: 'Blue Corporate',
    primary: '#3b82f6', bg: '#0b1526', surface: '#111d38', sidebarBg: '#080f1c',
    text: '#eff6ff', muted: '#6884a8', style: 'dark-first',
  },
  {
    name: 'Ocean Light',
    primary: '#0891b2', bg: '#f0f9ff', surface: '#ffffff', sidebarBg: '#e0f2fe',
    text: '#0c4a6e', muted: '#64748b', style: 'light-first',
  },
  {
    name: 'Sage Light',
    primary: '#16a34a', bg: '#f0fdf4', surface: '#ffffff', sidebarBg: '#dcfce7',
    text: '#14532d', muted: '#64748b', style: 'light-first',
  },
  {
    name: 'Warm Light',
    primary: '#ea580c', bg: '#fff7ed', surface: '#ffffff', sidebarBg: '#ffedd5',
    text: '#431407', muted: '#78716c', style: 'light-first',
  },
  {
    name: 'Minimal Light',
    primary: '#171717', bg: '#fafafa', surface: '#ffffff', sidebarBg: '#f5f5f5',
    text: '#171717', muted: '#737373', style: 'light-first',
  },
];

interface PresetPalettesProps {
  onSelect: (preset: Preset) => void;
}

export function PresetPalettes({ onSelect }: PresetPalettesProps) {
  return (
    <div style={{ marginBottom: 20 }}>
      <label style={{
        display: 'block',
        fontSize: 12,
        fontWeight: 600,
        color: 'var(--muted)',
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        marginBottom: 10,
      }}>
        Preset Palettes
      </label>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {presets.map(preset => (
          <button
            key={preset.name}
            onClick={() => onSelect(preset)}
            title={preset.name}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '8px 10px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid var(--glass-border)',
              borderRadius: 'var(--radius-sm)',
              cursor: 'pointer',
              transition: 'all 0.15s ease',
              minWidth: 72,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb), 0.3)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--glass-border)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <div style={{ display: 'flex', gap: 2 }}>
              {[preset.primary, preset.bg, preset.surface, preset.text].map((c, i) => (
                <div key={i} style={{
                  width: 12,
                  height: 12,
                  borderRadius: 3,
                  background: c,
                  border: '1px solid rgba(255,255,255,0.1)',
                }} />
              ))}
            </div>
            <span style={{ fontSize: 9, color: 'var(--muted)', whiteSpace: 'nowrap' }}>
              {preset.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export type { Preset };
