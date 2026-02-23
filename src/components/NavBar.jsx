import { useAuth } from '../context/AuthContext';

export function NavBar({ navigate, path }) {
  const { user, logout } = useAuth();
  if (!user) return null;

  const navLinks = [
    { hash: '#/list',  label: 'Employees' },
    { hash: '#/chart', label: '📊 Chart'  },
    { hash: '#/map',   label: '🗺️ Map'    },
  ];

  const handleLogout = () => {
    logout();
    navigate('#/login');
  };

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 999,
      background: 'rgba(8,8,15,0.92)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(245,158,11,0.12)',
      padding: '0 28px',
      display: 'flex', alignItems: 'center', gap: 8,
      height: 60,
    }}>
      {/* Logo */}
      <div
        onClick={() => navigate('#/list')}
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 800,
          fontSize: 22,
          background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          cursor: 'pointer',
          marginRight: 'auto',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
        }}
      >
        ✦ Jotish
      </div>

      {/* Nav links */}
      {navLinks.map(({ hash, label }) => {
        const active = path.startsWith(hash);
        return (
          <button
            key={hash}
            className="btn-secondary"
            onClick={() => navigate(hash)}
            style={{
              padding: '6px 16px',
              fontSize: 13,
              background: active ? 'rgba(245,158,11,0.15)' : undefined,
              borderColor: active ? 'rgba(245,158,11,0.45)' : undefined,
              color: active ? '#f59e0b' : undefined,
            }}
          >
            {label}
          </button>
        );
      })}

      <div style={{ width: 1, height: 24, background: 'rgba(245,158,11,0.15)', margin: '0 6px' }} />

      {/* Avatar */}
      <div style={{
        width: 34, height: 34, borderRadius: '50%',
        background: 'linear-gradient(135deg, #f59e0b, #d97706)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 14,
        color: '#08080f',
        boxShadow: '0 0 12px rgba(245,158,11,0.4)',
      }}>
        {user.charAt(0).toUpperCase()}
      </div>

      <button
        className="btn-secondary"
        onClick={handleLogout}
        style={{ padding: '5px 14px', fontSize: 12 }}
      >
        Logout
      </button>
    </nav>
  );
}