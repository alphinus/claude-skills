import { type ReactNode, type CSSProperties } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  hover?: boolean;
  glow?: boolean;
  onClick?: () => void;
}

export function GlassCard({ children, className = '', style, hover = false, glow = false, onClick }: GlassCardProps) {
  return (
    <div
      className={className}
      onClick={onClick}
      style={{
        background: 'var(--glass-bg)',
        border: '1px solid var(--glass-border)',
        borderRadius: 'var(--radius-lg)',
        backdropFilter: 'blur(12px)',
        padding: '24px',
        transition: 'var(--transition-normal)',
        cursor: onClick ? 'pointer' : undefined,
        ...(glow ? { boxShadow: '0 0 20px rgba(var(--primary-rgb), 0.1)' } : {}),
        ...style,
      }}
      onMouseEnter={hover ? (e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.borderColor = 'rgba(var(--primary-rgb), 0.2)';
        e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
      } : undefined}
      onMouseLeave={hover ? (e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--glass-border)';
        e.currentTarget.style.boxShadow = glow ? '0 0 20px rgba(var(--primary-rgb), 0.1)' : 'none';
      } : undefined}
    >
      {children}
    </div>
  );
}
