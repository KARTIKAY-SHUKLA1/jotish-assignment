import { useState, useRef, useCallback, useEffect } from 'react';
import { DEPT_COLORS, FALLBACK_EMPLOYEES } from '../constants/data';

export function DetailPage({ navigate, id }) {
  const emp = FALLBACK_EMPLOYEES.find(e => String(e.id) === String(id)) || FALLBACK_EMPLOYEES[0];
  const color = DEPT_COLORS[emp.department] || '#f59e0b';

  const [camState, setCamState] = useState('idle');
  const videoRef  = useRef(null);
  const streamRef = useRef(null);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
      streamRef.current = stream;
      setCamState('active');
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      }, 100);
    } catch (err) {
      alert('Camera error: ' + err.message);
    }
  }, []);

  const capturePhoto = useCallback(() => {
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width  = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', 0.92);
    streamRef.current?.getTracks().forEach(t => t.stop());
    navigate(`#/photo?emp=${emp.id}&src=${encodeURIComponent(dataUrl)}`);
  }, [navigate, emp.id]);

  const stopCamera = () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    setCamState('idle');
  };

  useEffect(() => () => streamRef.current?.getTracks().forEach(t => t.stop()), []);

  const InfoRow = ({ label, value }) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px 0', borderBottom: '1px solid rgba(245,158,11,0.08)' }}>
      <span style={{ fontSize: 11, color: '#7c7a8e', textTransform: 'uppercase', letterSpacing: '0.4px', fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 14, fontWeight: 500 }}>{value}</span>
    </div>
  );

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '32px 24px' }}>
      <button className="btn-secondary" onClick={() => navigate('#/list')} style={{ padding: '8px 16px', fontSize: 13, marginBottom: 24 }}>
        ← Back to List
      </button>

      <div className="fu" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>

        {/* Profile banner */}
        <div className="card" style={{ gridColumn: '1 / -1', padding: 28, display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{
            width: 84, height: 84, borderRadius: '50%', flexShrink: 0,
            background: `linear-gradient(135deg, ${color}, ${color}88)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 34,
            color: '#08080f',
            boxShadow: `0 0 0 4px ${color}25, 0 0 20px ${color}30`,
          }}>
            {emp.name.charAt(0)}
          </div>
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 28, marginBottom: 8 }}>{emp.name}</h1>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
              <span className="tag" style={{ background: `${color}18`, color, border: `1px solid ${color}35` }}>{emp.department}</span>
              <span style={{ color: '#7c7a8e', fontSize: 13 }}>📍 {emp.city}</span>
              <span style={{ color: '#7c7a8e', fontSize: 13 }}>📅 Joined {emp.joinDate}</span>
            </div>
            <div style={{ marginTop: 10, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24, color: '#34d399' }}>
              ₹{emp.salary.toLocaleString()}
              <span style={{ fontFamily: "'DM Sans'", fontWeight: 400, fontSize: 13, color: '#7c7a8e' }}> / month</span>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 14, color: '#f59e0b' }}>Contact</h3>
          <InfoRow label="Email"  value={emp.email} />
          <InfoRow label="Phone"  value={emp.phone} />
          <InfoRow label="City"   value={emp.city} />
        </div>

        {/* Personal */}
        <div className="card" style={{ padding: 22 }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 14, color: '#f59e0b' }}>Personal Info</h3>
          <InfoRow label="Age"         value={`${emp.age} years`} />
          <InfoRow label="Gender"      value={emp.gender} />
          <InfoRow label="Employee ID" value={`#${String(emp.id).padStart(4, '0')}`} />
        </div>

        {/* Camera */}
        <div className="card" style={{ gridColumn: '1 / -1', padding: 26 }}>
          <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 16, marginBottom: 6, color: '#f59e0b' }}>
            📸 Capture Photo
          </h3>
          <p style={{ color: '#7c7a8e', fontSize: 13, marginBottom: 20 }}>
            Use your device camera to capture a photo for this employee.
          </p>

          {camState === 'idle' && (
            <button className="btn-primary" onClick={startCamera} style={{ padding: '12px 26px', fontSize: 14 }}>
              📷 Open Camera
            </button>
          )}

          {camState === 'active' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
              <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', width: '100%', maxWidth: 520, background: '#000' }}>
                <video ref={videoRef} autoPlay playsInline style={{ width: '100%', display: 'block' }} />
                <div style={{ position: 'absolute', inset: 0, border: `2px solid ${color}60`, borderRadius: 16, pointerEvents: 'none' }} />
                <div style={{ position: 'absolute', top: 12, right: 12, background: 'rgba(0,0,0,0.65)', borderRadius: 20, padding: '4px 10px', fontSize: 12, color: '#fff', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444' }} />
                  LIVE
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <button
                  className="btn-primary"
                  onClick={capturePhoto}
                  style={{ width: 66, height: 66, borderRadius: '50%', fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0 }}
                >
                  📸
                </button>
                <button className="btn-secondary" onClick={stopCamera} style={{ padding: '10px 20px', fontSize: 13 }}>
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}