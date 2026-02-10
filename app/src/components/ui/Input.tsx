import { type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export function Input({ label, style, id, ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div style={{ position: 'relative' }}>
      <label
        htmlFor={inputId}
        style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '6px',
        }}
      >
        {label}
      </label>
      <input
        id={inputId}
        style={{
          width: '100%',
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text)',
          fontSize: '14px',
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          transition: 'var(--transition-normal)',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--primary)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--primary-rgb), 0.08)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        {...props}
      />
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export function Textarea({ label, style, id, ...props }: TextareaProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div style={{ position: 'relative' }}>
      <label
        htmlFor={inputId}
        style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '6px',
        }}
      >
        {label}
      </label>
      <textarea
        id={inputId}
        style={{
          width: '100%',
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text)',
          fontSize: '14px',
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          transition: 'var(--transition-normal)',
          resize: 'vertical',
          minHeight: '80px',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--primary)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--primary-rgb), 0.08)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        {...props}
      />
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export function Select({ label, options, style, id, ...props }: SelectProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');
  return (
    <div style={{ position: 'relative' }}>
      <label
        htmlFor={inputId}
        style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--muted)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '6px',
        }}
      >
        {label}
      </label>
      <select
        id={inputId}
        style={{
          width: '100%',
          padding: '10px 14px',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid var(--glass-border)',
          borderRadius: 'var(--radius-sm)',
          color: 'var(--text)',
          fontSize: '14px',
          fontFamily: 'var(--font-sans)',
          outline: 'none',
          transition: 'var(--transition-normal)',
          cursor: 'pointer',
          ...style,
        }}
        onFocus={(e) => {
          e.currentTarget.style.borderColor = 'var(--primary)';
          e.currentTarget.style.boxShadow = '0 0 0 3px rgba(var(--primary-rgb), 0.08)';
        }}
        onBlur={(e) => {
          e.currentTarget.style.borderColor = 'var(--glass-border)';
          e.currentTarget.style.boxShadow = 'none';
        }}
        {...props}
      >
        {options.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}
