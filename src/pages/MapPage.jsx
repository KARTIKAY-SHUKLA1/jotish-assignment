import { useEffect, useRef } from 'react';
import { DEPT_COLORS, CITY_COORDS, FALLBACK_EMPLOYEES } from '../constants/data';

export function MapPage({ navigate }) {
  const mapRef      = useRef(null);
  const mapInstance = useRef(null);

  const cityGroups = FALLBACK_EMPLOYEES.reduce((acc, emp) => {
    if (!acc[emp.city]) acc[emp.city] = [];
    acc[emp.city].push(emp);
    return acc;
  }, {});

  useEffect(() => {
    // Load Leaflet CSS
    if (!document.getElementById('leaflet-css')) {
      const link = document.createElement('link');
      link.id  = 'leaflet-css';
      link.rel = 'stylesheet';
      link.href = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.css';
      document.head.appendChild(link);
    }

    // Load Leaflet JS then init map
    const initMap = () => {
      if (mapInstance.current) return;
      const L = window.L;

      const map = L.map(mapRef.current, {
        zoomControl: true,
        attributionControl: false,
      });

      map.setView([20.5937, 78.9629], 5);
      mapInstance.current = map;

      L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png').addTo(map);

      Object.entries(cityGroups).forEach(([city, emps]) => {
        const coords = CITY_COORDS[city];
        if (!coords) return;

        const count = emps.length;
        const depts = [...new Set(emps.map(e => e.department))];
        const size  = 34 + count * 5;

        const icon = L.divIcon({
          html: `<div style="width:${size}px;height:${size}px;background:linear-gradient(135deg,#f59e0b,#d97706);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'Syne',sans-serif;font-weight:700;color:#08080f;font-size:13px;box-shadow:0 4px 24px rgba(245,158,11,0.5);border:2px solid rgba(251,191,36,0.5);cursor:pointer">${count}</div>`,
          iconSize:   [0, 0],
          iconAnchor: [size / 2, size / 2],
          className:  '',
        });

        const deptTags = depts.map(d =>
          `<span style="display:inline-block;padding:2px 8px;border-radius:10px;background:${DEPT_COLORS[d] || '#f59e0b'}22;color:${DEPT_COLORS[d] || '#f59e0b'};font-size:11px;margin:2px;border:1px solid ${DEPT_COLORS[d] || '#f59e0b'}44">${d}</span>`
        ).join('');

        L.marker(coords, { icon }).addTo(map).bindPopup(
          `<div style="font-family:'DM Sans',sans-serif;min-width:180px">
             <b style="font-family:'Syne',sans-serif;font-size:16px;display:block;margin-bottom:4px;color:#f59e0b">${city}</b>
             <span style="color:#aaa;font-size:13px;display:block;margin-bottom:8px">${count} employee${count > 1 ? 's' : ''}</span>
             ${deptTags}
           </div>`
        );
      });
    };

    if (window.L) {
      initMap();
    } else {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.3/dist/leaflet.js';
      script.onload = initMap;
      document.body.appendChild(script);
    }

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>
      <button className="btn-secondary" onClick={() => navigate('#/list')} style={{ padding: '8px 16px', fontSize: 13, marginBottom: 24 }}>
        ← Back
      </button>

      <div className="fu">
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32, marginBottom: 6 }}>
          ✦ City Map
        </h1>
        <p style={{ color: '#7c7a8e', fontSize: 14, marginBottom: 22 }}>
          Employee distribution across India — click any pin to explore
        </p>

        <div style={{ height: 520, borderRadius: 18, overflow: 'hidden', border: '1px solid rgba(245,158,11,0.15)', marginBottom: 22 }}>
          <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(155px,1fr))', gap: 12 }}>
          {Object.entries(cityGroups).map(([city, emps]) => (
            <div key={city} className="card" style={{ padding: '14px 16px' }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 4 }}>
                📍 {city}
              </div>
              <div style={{ fontSize: 13, color: '#f59e0b', fontWeight: 600, marginBottom: 4 }}>
                {emps.length} employee{emps.length > 1 ? 's' : ''}
              </div>
              <div style={{ fontSize: 12, color: '#7c7a8e' }}>
                Avg ₹{Math.round(emps.reduce((s, e) => s + (+e.salary || 0), 0) / emps.length).toLocaleString()}/mo
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}