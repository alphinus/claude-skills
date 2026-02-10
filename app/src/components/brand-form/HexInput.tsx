interface HexInputProps {
  value: string;
  onChange: (hex: string) => void;
}

export function HexInput({ value, onChange }: HexInputProps) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
      <span style={{
        fontSize: 14,
        color: 'var(--muted)',
        fontFamily: 'var(--font-mono)',
      }}>#</span>
      <input
        type="text"
        value={value.replace('#', '')}
        onChange={(e) => {
          let v = e.target.value.replace(/[^0-9a-fA-F]/g, '').substring(0, 6);
          onChange('#' + v);
        }}
        maxLength={6}
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
          transition: 'var(--transition-fast)',
          textTransform: 'lowercase',
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--primary)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--primary-rgb), 0.08)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
      />
    </div>
  );
}
