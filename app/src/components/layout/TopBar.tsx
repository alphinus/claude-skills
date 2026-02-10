import { useLocation, Link } from 'react-router-dom';

export function TopBar() {
  const location = useLocation();

  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <header style={{
      height: 52,
      borderBottom: '1px solid var(--glass-border)',
      display: 'flex',
      alignItems: 'center',
      padding: '0 28px',
      background: 'rgba(var(--primary-rgb), 0.01)',
    }}>
      <nav style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13 }}>
        {breadcrumbs.map((crumb, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            {i > 0 && <span style={{ color: 'var(--muted)' }}>/</span>}
            {crumb.href ? (
              <Link to={crumb.href} style={{ color: 'var(--muted)', textDecoration: 'none' }}>
                {crumb.label}
              </Link>
            ) : (
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{crumb.label}</span>
            )}
          </span>
        ))}
      </nav>
    </header>
  );
}

function getBreadcrumbs(path: string): { label: string; href?: string }[] {
  if (path === '/') return [{ label: 'Dashboard' }];
  if (path === '/brands/new') return [{ label: 'Dashboard', href: '/' }, { label: 'New Brand' }];
  if (path === '/build') return [{ label: 'Dashboard', href: '/' }, { label: 'Build Status' }];
  if (path === '/compare') return [{ label: 'Dashboard', href: '/' }, { label: 'Compare' }];

  const match = path.match(/^\/brands\/([^/]+)\/(edit|collection)$/);
  if (match) {
    const [, slug, section] = match;
    return [
      { label: 'Dashboard', href: '/' },
      { label: slug, href: `/brands/${slug}/edit` },
      { label: section === 'edit' ? 'Edit' : 'Collection' },
    ];
  }

  return [{ label: 'Dashboard', href: '/' }];
}
