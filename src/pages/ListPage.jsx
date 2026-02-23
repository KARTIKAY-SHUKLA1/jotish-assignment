import { useState, useEffect } from 'react';
import { DEPT_COLORS, FALLBACK_EMPLOYEES, API_URL, API_BODY } from '../constants/data';

export function ListPage({ navigate }) {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading]     = useState(true);
  const [search, setSearch]       = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [sortKey, setSortKey]     = useState('name');
  const [sortAsc, setSortAsc]     = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(API_BODY),
        });
        const json = await res.json();
        const data = json.data || json.employees || json.records || json.result;
        if (Array.isArray(data) && data.length > 0) setEmployees(data);
        else setEmployees(FALLBACK_EMPLOYEES);
      } catch {
        setEmployees(FALLBACK_EMPLOYEES);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const departments = ['All', ...new Set(employees.map(e => e.department).filter(Boolean))];

  const filtered = employees
    .filter(e => deptFilter === 'All' || e.department === deptFilter)
    .filter(e => {
      if (!search) return true;
      const q = search.toLowerCase();
      return e.name?.toLowerCase().includes(q) || e.city?.toLowerCase().includes(q) || e.email?.toLowerCase().includes(q);
    })
    .sort((a, b) => {
      const va = a[sortKey], vb = b[sortKey];
      if (typeof va === 'number') return sortAsc ? va - vb : vb - va;
      return sortAsc ? String(va).localeCompare(String(vb)) : String(vb).localeCompare(String(va));
    });

  const handleSort = (key) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };

  const SortBtn = ({ label, k }) => (
    <button
      onClick={() => handleSort(k)}
      style={{ background: 'none', border: 'none', cursor: 'pointer', color: sortKey === k ? '#f59e0b' : '#7c7a8e', fontSize: 12, fontFamily: "'DM Sans', sans-serif", display: 'flex', alignItems: 'center', gap: 3, padding: 0 }}
    >
      {label} {sortKey === k ? (sortAsc ? '↑' : '↓') : '↕'}
    </button>
  );

  const stats = [
    { icon: '👥', label: 'Total',       value: employees.length },
    { icon: '💰', label: 'Avg Salary',  value: `₹${Math.round(employees.reduce((s, e) => s + (+e.salary || 0), 0) / (employees.length || 1)).toLocaleString()}` },
    { icon: '🏢', label: 'Departments', value: new Set(employees.map(e => e.department)).size },
    { icon: '🗺️', label: 'Cities',      value: new Set(employees.map(e => e.city)).size },
  ];

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 24px' }}>

      {/* Header */}
      <div className="fu" style={{ marginBottom: 28 }}>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32, marginBottom: 4 }}>
          ✦ Employees
        </h1>
        <p style={{ color: '#7c7a8e', fontSize: 14 }}>
          {employees.length} team members · {new Set(employees.map(e => e.city)).size} cities
        </p>
      </div>

      {/* Stats */}
      <div className="fu d1" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(150px,1fr))', gap: 12, marginBottom: 24 }}>
        {stats.map(s => (
          <div key={s.label} className="card" style={{ padding: '16px 18px' }}>
            <div style={{ fontSize: 22, marginBottom: 6 }}>{s.icon}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, color: '#f59e0b' }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#7c7a8e', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Search + Filter */}
      <div className="fu d2" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center', marginBottom: 14 }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍  Search name, city, email…"
          style={{
            flex: 1, minWidth: 200, padding: '10px 16px',
            background: '#0c0c18', border: '1px solid rgba(245,158,11,0.15)',
            borderRadius: 10, color: '#f0ede8', fontSize: 14,
            fontFamily: "'DM Sans', sans-serif",
          }}
        />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {departments.map(d => (
            <button
              key={d}
              onClick={() => setDeptFilter(d)}
              style={{
                padding: '7px 14px', borderRadius: 20, border: '1px solid', fontSize: 12,
                fontWeight: 500, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif",
                background: deptFilter === d ? 'rgba(245,158,11,0.15)' : 'transparent',
                borderColor: deptFilter === d ? 'rgba(245,158,11,0.5)' : 'rgba(245,158,11,0.12)',
                color: deptFilter === d ? '#f59e0b' : '#7c7a8e',
              }}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Action buttons + Sort */}
      <div className="fu d2" style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap', alignItems: 'center' }}>
        <button className="btn-primary" onClick={() => navigate('#/chart')} style={{ padding: '10px 20px', fontSize: 13 }}>
          📊 Salary Chart
        </button>
        <button className="btn-primary btn-purple" onClick={() => navigate('#/map')} style={{ padding: '10px 20px', fontSize: 13 }}>
          🗺️ City Map
        </button>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: '#7c7a8e' }}>Sort by:</span>
          <SortBtn label="Name" k="name" />
          <SortBtn label="Salary" k="salary" />
          <SortBtn label="Age" k="age" />
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 66 }} />)}
        </div>
      ) : (
        <div className="fu d3 card" style={{ overflow: 'hidden' }}>
          {/* Header row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1.4fr 1fr 1fr 100px',
            gap: 16, padding: '12px 22px',
            borderBottom: '1px solid rgba(245,158,11,0.1)',
            fontSize: 11, color: '#7c7a8e', textTransform: 'uppercase', letterSpacing: '0.5px',
          }}>
            <span>Employee</span><span>Department</span><span>City</span><span>Salary</span><span>Action</span>
          </div>

          {/* Data rows */}
          {filtered.map((emp, i) => (
            <div
              key={emp.id || i}
              className="hov"
              onClick={() => navigate(`#/detail/${emp.id || i}`)}
              style={{
                display: 'grid', gridTemplateColumns: '2fr 1.4fr 1fr 1fr 100px',
                gap: 16, padding: '15px 22px',
                borderBottom: '1px solid rgba(245,158,11,0.06)',
                alignItems: 'center',
                border: '1px solid transparent',
              }}
            >
              {/* Avatar + name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                  background: `linear-gradient(135deg, ${DEPT_COLORS[emp.department] || '#f59e0b'}, ${DEPT_COLORS[emp.department] || '#f59e0b'}88)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 15,
                  color: '#08080f',
                }}>
                  {(emp.name || '?').charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>{emp.name}</div>
                  <div style={{ fontSize: 12, color: '#7c7a8e', marginTop: 1 }}>{emp.email}</div>
                </div>
              </div>

              <span className="tag" style={{
                background: `${DEPT_COLORS[emp.department] || '#f59e0b'}18`,
                color: DEPT_COLORS[emp.department] || '#f59e0b',
                border: `1px solid ${DEPT_COLORS[emp.department] || '#f59e0b'}35`,
              }}>
                {emp.department}
              </span>

              <span style={{ fontSize: 14, color: '#c4c1a8' }}>📍 {emp.city}</span>

              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 600, fontSize: 14, color: '#34d399' }}>
                ₹{(+emp.salary || 0).toLocaleString()}
              </span>

              <button
                className="btn-secondary"
                style={{ padding: '6px 14px', fontSize: 12 }}
                onClick={e => { e.stopPropagation(); navigate(`#/detail/${emp.id || i}`); }}
              >
                View →
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div style={{ padding: 48, textAlign: 'center', color: '#7c7a8e' }}>
              No employees match your search.
            </div>
          )}
        </div>
      )}
    </div>
  );
}