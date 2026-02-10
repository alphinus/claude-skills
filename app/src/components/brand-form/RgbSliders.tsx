interface RgbSlidersProps {
  r: number;
  g: number;
  b: number;
  onChange: (r: number, g: number, b: number) => void;
}

const channels = [
  { key: 'r' as const, label: 'R', color: '#ef4444' },
  { key: 'g' as const, label: 'G', color: '#10b981' },
  { key: 'b' as const, label: 'B', color: '#3b82f6' },
];

export function RgbSliders({ r, g, b, onChange }: RgbSlidersProps) {
  const values = { r, g, b };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      {channels.map(ch => (
        <div key={ch.key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 10, fontWeight: 700, color: ch.color, width: 10 }}>{ch.label}</span>
          <input
            type="range"
            min={0}
            max={255}
            value={values[ch.key]}
            onChange={(e) => {
              const v = Number(e.target.value);
              onChange(
                ch.key === 'r' ? v : r,
                ch.key === 'g' ? v : g,
                ch.key === 'b' ? v : b,
              );
            }}
            style={{ flex: 1, accentColor: ch.color }}
          />
          <span style={{ fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--muted)', width: 26, textAlign: 'right' }}>
            {values[ch.key]}
          </span>
        </div>
      ))}
    </div>
  );
}
