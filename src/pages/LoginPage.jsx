import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Spinner } from '../components/Spinner';

export function LoginPage({ navigate }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 700));
    if (username === 'testuser' && password === 'Test123') {
      login(username);
      navigate('#/list');
    } else {
      setError('Invalid credentials. Hint: testuser / Test123');
    }
    setLoading(false);
  };

  const inputStyle = {
    width: '100%', padding: '13px 16px',
    background: '#0c0c18',
    border: '1px solid rgba(245,158,11,0.2)',
    borderRadius: 12, color: '#f0ede8',
    fontSize: 15, fontFamily: "'DM Sans', sans-serif",
    transition: 'border-color 0.2s',
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      alignItems: 'center', justifyContent: 'center',
      padding: 24, position: 'relative',
    }}>
      {/* Background glows */}
      <div style={{ position: 'fixed', top: -200, left: -150, width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle,rgba(245,158,11,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'fixed', bottom: -200, right: -150, width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle,rgba(139,92,246,0.08) 0%,transparent 70%)', pointerEvents: 'none' }} />

      <div className="fu card" style={{ width: '100%', maxWidth: 420, padding: '48px 40px' }}>

        {/* Logo + tagline */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <div style={{ fontSize: 40, marginBottom: 8 }}>✦</div>
          <div style={{
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 38,
            background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
            marginBottom: 6,
          }}>
            Jotish
          </div>
          <p style={{ color: '#7c7a8e', fontSize: 13 }}>Employee Management Portal</p>
          <div style={{ width: 40, height: 1, background: 'rgba(245,158,11,0.3)', margin: '14px auto 0' }} />
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Username */}
          <div>
            <label style={{ display: 'block', fontSize: 11, color: '#f59e0b', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>
              Username
            </label>
            <input
              style={inputStyle}
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="testuser"
              autoComplete="username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label style={{ display: 'block', fontSize: 11, color: '#f59e0b', fontWeight: 600, letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: 8 }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input
                style={{ ...inputStyle, paddingRight: 50 }}
                type={showPass ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPass(!showPass)}
                style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#7c7a8e', fontSize: 16, padding: 4 }}
              >
                {showPass ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Error */}
          {error && (
            <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 10, padding: '10px 14px', color: '#fca5a5', fontSize: 13 }}>
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="btn-primary"
            disabled={loading}
            style={{ padding: '15px 24px', fontSize: 15, marginTop: 4, opacity: loading ? 0.75 : 1 }}
          >
            {loading
              ? <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}><Spinner size={20} /> Signing in…</span>
              : '✦ Sign In'
            }
          </button>
        </form>

        {/* Demo hint */}
        <div style={{ marginTop: 24, padding: '12px 16px', background: 'rgba(245,158,11,0.05)', borderRadius: 10, border: '1px dashed rgba(245,158,11,0.2)', fontSize: 12, color: '#7c7a8e', textAlign: 'center' }}>
          Demo: <span style={{ color: '#f59e0b' }}>testuser</span> / <span style={{ color: '#f59e0b' }}>Test123</span>
        </div>
      </div>
    </div>
  );
}