import { useRef, useEffect, useCallback } from 'react';

interface ColorWheelProps {
  hue: number;
  saturation: number;
  lightness: number;
  onChange: (h: number, s: number, l: number) => void;
  size?: number;
}

export function ColorWheel({ hue, saturation, lightness, onChange, size = 180 }: ColorWheelProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sliderRef = useRef<HTMLInputElement>(null);
  const dragging = useRef(false);
  const center = size / 2;
  const radius = size / 2 - 8;

  const drawWheel = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, size, size);

    // Draw hue/saturation wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 1) * Math.PI / 180;
      const endAngle = (angle + 1) * Math.PI / 180;

      const gradient = ctx.createRadialGradient(center, center, 0, center, center, radius);
      gradient.addColorStop(0, `hsl(${angle}, 0%, ${lightness}%)`);
      gradient.addColorStop(1, `hsl(${angle}, 100%, ${lightness}%)`);

      ctx.beginPath();
      ctx.moveTo(center, center);
      ctx.arc(center, center, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = gradient;
      ctx.fill();
    }

    // Draw indicator
    const indicatorAngle = hue * Math.PI / 180;
    const indicatorRadius = (saturation / 100) * radius;
    const ix = center + indicatorRadius * Math.cos(indicatorAngle);
    const iy = center + indicatorRadius * Math.sin(indicatorAngle);

    ctx.beginPath();
    ctx.arc(ix, iy, 8, 0, Math.PI * 2);
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2.5;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(ix, iy, 6, 0, Math.PI * 2);
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.stroke();
  }, [hue, saturation, lightness, size, center, radius]);

  useEffect(() => { drawWheel(); }, [drawWheel]);

  const handlePointer = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left - center;
    const y = clientY - rect.top - center;

    let angle = Math.atan2(y, x) * 180 / Math.PI;
    if (angle < 0) angle += 360;

    const dist = Math.min(Math.sqrt(x * x + y * y), radius);
    const sat = Math.round((dist / radius) * 100);

    onChange(Math.round(angle), sat, lightness);
  }, [center, radius, lightness, onChange]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        style={{ cursor: 'crosshair', borderRadius: '50%' }}
        onMouseDown={(e) => { dragging.current = true; handlePointer(e); }}
        onMouseMove={(e) => { if (dragging.current) handlePointer(e); }}
        onMouseUp={() => { dragging.current = false; }}
        onMouseLeave={() => { dragging.current = false; }}
        onTouchStart={(e) => { dragging.current = true; handlePointer(e); }}
        onTouchMove={(e) => { if (dragging.current) handlePointer(e); }}
        onTouchEnd={() => { dragging.current = false; }}
      />
      <div style={{ width: size, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 10, color: 'var(--muted)', width: 12 }}>L</span>
        <input
          ref={sliderRef}
          type="range"
          min={0}
          max={100}
          value={lightness}
          onChange={(e) => onChange(hue, saturation, Number(e.target.value))}
          style={{ flex: 1, accentColor: 'var(--primary)' }}
        />
        <span style={{ fontSize: 11, color: 'var(--muted)', width: 28, textAlign: 'right' }}>{lightness}%</span>
      </div>
    </div>
  );
}
