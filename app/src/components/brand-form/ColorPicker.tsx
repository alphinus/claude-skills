import { useColorSync } from '../../hooks/useColorSync';
import { ColorWheel } from './ColorWheel';
import { HexInput } from './HexInput';
import { RgbSliders } from './RgbSliders';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (hex: string) => void;
}

export function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  const color = useColorSync(value);

  const handleHslChange = (h: number, s: number, l: number) => {
    color.setHsl(h, s, l);
    onChange(color.hex);
  };

  const handleHexChange = (hex: string) => {
    color.setHex(hex);
    if (/^#[0-9a-fA-F]{6}$/.test(hex)) {
      onChange(hex);
    }
  };

  const handleRgbChange = (r: number, g: number, b: number) => {
    color.setRgb(r, g, b);
    onChange(color.hex);
  };

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
        {label}
      </label>
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <ColorWheel
          hue={color.h}
          saturation={color.s}
          lightness={color.l}
          onChange={handleHslChange}
        />
        <div style={{ flex: 1, minWidth: 160, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <HexInput value={color.hex} onChange={handleHexChange} />
          <RgbSliders r={color.r} g={color.g} b={color.b} onChange={handleRgbChange} />
          <div style={{
            width: '100%',
            height: 32,
            borderRadius: 'var(--radius-sm)',
            background: color.hex,
            border: '1px solid var(--glass-border)',
          }} />
        </div>
      </div>
    </div>
  );
}
