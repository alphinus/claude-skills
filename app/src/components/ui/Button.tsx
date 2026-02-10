import { type ButtonHTMLAttributes, type ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  loading?: boolean;
}

const baseStyles: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '8px',
  borderRadius: 'var(--radius-sm)',
  fontFamily: 'var(--font-sans)',
  fontWeight: 600,
  cursor: 'pointer',
  transition: 'var(--transition-normal)',
  border: 'none',
  whiteSpace: 'nowrap',
};

const variants: Record<string, React.CSSProperties> = {
  primary: {
    background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
    color: '#0f172a',
    boxShadow: '0 2px 12px rgba(var(--primary-rgb), 0.3)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--text)',
    border: '1px solid var(--glass-border)',
  },
  danger: {
    background: 'rgba(239, 68, 68, 0.1)',
    color: 'var(--error)',
    border: '1px solid rgba(239, 68, 68, 0.2)',
  },
};

const sizes: Record<string, React.CSSProperties> = {
  sm: { padding: '6px 12px', fontSize: '13px' },
  md: { padding: '10px 20px', fontSize: '14px' },
  lg: { padding: '14px 28px', fontSize: '16px' },
};

export function Button({ variant = 'primary', size = 'md', children, loading, disabled, style, ...props }: ButtonProps) {
  return (
    <button
      style={{
        ...baseStyles,
        ...variants[variant],
        ...sizes[size],
        opacity: disabled || loading ? 0.6 : 1,
        pointerEvents: disabled || loading ? 'none' : undefined,
        ...style,
      }}
      disabled={disabled || loading}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-1px)';
        if (variant === 'ghost') e.currentTarget.style.background = 'var(--glass-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
      }}
      {...props}
    >
      {loading && <span style={{ display: 'inline-block', width: 14, height: 14, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.6s linear infinite' }} />}
      {children}
    </button>
  );
}
