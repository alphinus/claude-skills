import { useState, useEffect, useCallback, createContext, useContext, type ReactNode } from 'react';

interface ToastMessage {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

interface ToastContextValue {
  toast: (type: ToastMessage['type'], message: string) => void;
}

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function useToast() {
  return useContext(ToastContext);
}

const typeColors: Record<string, string> = {
  success: 'var(--success)',
  error: 'var(--error)',
  warning: 'var(--warning)',
  info: 'var(--info)',
};

let nextId = 0;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback((type: ToastMessage['type'], message: string) => {
    const id = nextId++;
    setToasts(prev => [...prev, { id, type, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div style={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
        zIndex: 9999,
        pointerEvents: 'none',
      }}>
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onDismiss={() => setToasts(prev => prev.filter(x => x.id !== t.id))} />
        ))}
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: ToastMessage; onDismiss: () => void }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  return (
    <div
      onClick={onDismiss}
      style={{
        padding: '12px 20px',
        background: 'var(--surface)',
        border: `1px solid ${typeColors[toast.type]}`,
        borderLeft: `3px solid ${typeColors[toast.type]}`,
        borderRadius: 'var(--radius-sm)',
        color: 'var(--text)',
        fontSize: '14px',
        backdropFilter: 'blur(12px)',
        boxShadow: 'var(--shadow-md)',
        pointerEvents: 'auto',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(20px)',
        maxWidth: 360,
      }}
    >
      {toast.message}
    </div>
  );
}
