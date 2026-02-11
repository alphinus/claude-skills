import { Component, type ReactNode } from 'react';

interface Props { children: ReactNode; }
interface State { hasError: boolean; error: Error | null; }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'center',
          justifyContent: 'center', minHeight: '60vh', gap: 16, padding: 40,
        }}>
          <div style={{ fontSize: 48, opacity: 0.6 }}>⚠</div>
          <h2 style={{ fontSize: 20, fontWeight: 700 }}>Something went wrong</h2>
          <p style={{ color: 'var(--muted)', fontSize: 14, maxWidth: 400, textAlign: 'center' }}>
            {this.state.error?.message || 'An unexpected error occurred.'}
          </p>
          <button
            onClick={() => { this.setState({ hasError: false, error: null }); window.location.href = '/'; }}
            style={{
              padding: '10px 20px', borderRadius: 'var(--radius-sm)',
              background: 'linear-gradient(135deg, var(--primary), var(--primary-dark))',
              color: '#0f172a', border: 'none', fontWeight: 600, cursor: 'pointer',
              fontSize: 14, marginTop: 8,
            }}
          >
            Back to Dashboard
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
