import { type ReactNode, useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import type { Brand } from '../../lib/types';

interface AppShellProps {
  children: ReactNode;
  brands: Brand[];
}

export function AppShell({ children, brands }: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Mobile overlay */}
      <div
        className={`sidebar-overlay ${sidebarOpen ? 'open' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />
      <Sidebar brands={brands} open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content" style={{ flex: 1, marginLeft: 260, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        {/* Mobile menu button */}
        <div
          className="mobile-header"
          style={{
            display: 'none',
            alignItems: 'center',
            gap: 12,
            padding: '12px 16px',
            borderBottom: '1px solid var(--glass-border)',
          }}
        >
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              background: 'none', border: 'none', color: 'var(--text)',
              fontSize: 22, cursor: 'pointer', padding: 4,
            }}
          >
            ☰
          </button>
          <span className="gradient-text" style={{ fontSize: 16, fontWeight: 700 }}>Brand Machine</span>
        </div>
        <TopBar />
        <main style={{ flex: 1, padding: 28, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
