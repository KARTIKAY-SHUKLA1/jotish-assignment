import { FALLBACK_EMPLOYEES } from '../constants/data';

export function PhotoPage({ navigate }) {
  const params = new URLSearchParams(window.location.hash.split('?')[1] || '');
  const src   = params.get('src');
  const empId = params.get('emp');
  const emp   = FALLBACK_EMPLOYEES.find(e => String(e.id) === String(empId)) || FALLBACK_EMPLOYEES[0];

  const handleDownload = () => {
    const a = document.createElement('a');
    a.href = src;
    a.download = `${emp.name.replace(/\s+/g, '_')}_photo.jpg`;
    a.click();
  };

  return (
    <div style={{ maxWidth: 620, margin: '0 auto', padding: '32px 24px', textAlign: 'center' }}>
      <button
        className="btn-secondary"
        onClick={() => navigate(`#/detail/${emp.id}`)}
        style={{ padding: '8px 16px', fontSize: 13, marginBottom: 24 }}
      >
        ← Back
      </button>

      <div className="fu card" style={{ padding: 36 }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>✦</div>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 26, marginBottom: 6, color: '#f59e0b' }}>
          Photo Captured!
        </h2>
        <p style={{ color: '#7c7a8e', fontSize: 14, marginBottom: 28 }}>
          Profile photo for <strong style={{ color: '#f0ede8' }}>{emp.name}</strong>
        </p>

        {src ? (
          <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(245,158,11,0.15)' }}>
            <img src={src} alt="Captured" style={{ width: '100%', display: 'block' }} />
          </div>
        ) : (
          <div style={{ height: 260, borderRadius: 16, background: 'rgba(245,158,11,0.03)', border: '2px dashed rgba(245,158,11,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <p style={{ color: '#7c7a8e' }}>No image captured. Go back and try again.</p>
          </div>
        )}

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          {src && (
            <button className="btn-primary" onClick={handleDownload} style={{ padding: '12px 24px', fontSize: 14 }}>
              ⬇️ Download Photo
            </button>
          )}
          <button className="btn-secondary" onClick={() => navigate(`#/detail/${emp.id}`)} style={{ padding: '12px 20px', fontSize: 14 }}>
            Retake
          </button>
          <button className="btn-secondary" onClick={() => navigate('#/list')} style={{ padding: '12px 20px', fontSize: 14 }}>
            Back to List
          </button>
        </div>
      </div>
    </div>
  );
}