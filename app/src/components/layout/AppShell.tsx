import { type ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import type { Brand } from '../../lib/types';

interface AppShellProps {
  children: ReactNode;
  brands: Brand[];
}

export function AppShell({ children, brands }: AppShellProps) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar brands={brands} />
      <div style={{ flex: 1, marginLeft: 260, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopBar />
        <main style={{ flex: 1, padding: 28, overflowY: 'auto' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
