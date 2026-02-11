import { NavLink, useLocation } from 'react-router-dom';
import type { Brand } from '../../lib/types';

interface SidebarProps {
  brands: Brand[];
  open?: boolean;
  onClose?: () => void;
}

const navLinkStyle = (isActive: boolean): React.CSSProperties => ({
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '10px 16px',
  borderRadius: 'var(--radius-sm)',
  color: isActive ? 'var(--primary)' : 'var(--muted)',
  background: isActive ? 'rgba(var(--primary-rgb), 0.08)' : 'transparent',
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: isActive ? 600 : 400,
  transition: 'var(--transition-fast)',
});

export function Sidebar({ brands, open, onClose }: SidebarProps) {
  const location = useLocation();

  const handleNavClick = () => {
    if (onClose) onClose();
  };

  return (
    <aside
      className={`sidebar ${open ? 'open' : ''}`}
      style={{
        width: 260,
        minWidth: 260,
        height: '100vh',
        background: 'var(--sidebar-bg)',
        borderRight: '1px solid var(--glass-border)',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 100,
      }}
    >
      {/* Logo */}
      <div style={{
        padding: '20px 20px 16px',
        borderBottom: '1px solid var(--glass-border)',
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em' }}>
          <span className="gradient-text">Brand Machine</span>
        </h1>
        <p style={{ fontSize: 11, color: 'var(--muted)', marginTop: 2 }}>Claude Skills Brand Builder</p>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '12px 12px', flex: 1, overflowY: 'auto' }}>
        <div style={{ marginBottom: 24 }}>
          <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 16px', marginBottom: 8 }}>
            Navigation
          </p>
          <NavLink to="/" end style={({ isActive }) => navLinkStyle(isActive)} onClick={handleNavClick}>
            <span>◆</span> Dashboard
          </NavLink>
          <NavLink to="/brands/new" style={({ isActive }) => navLinkStyle(isActive)} onClick={handleNavClick}>
            <span>+</span> New Brand
          </NavLink>
          <NavLink to="/build" style={({ isActive }) => navLinkStyle(isActive)} onClick={handleNavClick}>
            <span>⚡</span> Build Status
          </NavLink>
          {brands.length >= 2 && (
            <NavLink to="/compare" style={({ isActive }) => navLinkStyle(isActive)} onClick={handleNavClick}>
              <span>⟷</span> Compare
            </NavLink>
          )}
        </div>

        {brands.length > 0 && (
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 16px', marginBottom: 8 }}>
              Brands ({brands.length})
            </p>
            {brands.map(brand => (
              <NavLink
                key={brand.slug}
                to={`/brands/${brand.slug}/edit`}
                style={({ isActive }) => ({
                  ...navLinkStyle(isActive),
                  gap: 10,
                })}
                onClick={handleNavClick}
              >
                <span style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: brand.colors?.PRIMARY || 'var(--muted)',
                  flexShrink: 0,
                }} />
                {brand.brand?.name || brand.slug}
              </NavLink>
            ))}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div style={{
        padding: '12px 20px',
        borderTop: '1px solid var(--glass-border)',
        fontSize: 11,
        color: 'var(--muted)',
      }}>
        claude-skills v1.0
      </div>
    </aside>
  );
}
