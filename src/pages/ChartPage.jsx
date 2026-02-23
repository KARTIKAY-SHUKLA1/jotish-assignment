import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { DEPT_COLORS, FALLBACK_EMPLOYEES } from '../constants/data';

export function ChartPage({ navigate }) {
  const top10 = FALLBACK_EMPLOYEES
    .slice(0, 10)
    .map(e => ({ name: e.name.split(' ')[0], salary: e.salary, dept: e.department }));

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    const d = payload[0].payload;
    return (
      <div style={{ background: '#10101c', border: '1px solid rgba(245,158,11,0.2)', borderRadius: 10, padding: '12px 16px' }}>
        <p style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, marginBottom: 4 }}>{label}</p>
        <p style={{ color: '#34d399', fontSize: 14 }}>₹{d.salary.toLocaleString()}</p>
        <p style={{ color: '#7c7a8e', fontSize: 12 }}>{d.dept}</p>
      </div>
    );
  };

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '32px 24px' }}>
      <button className="btn-secondary" onClick={() => navigate('#/list')} style={{ padding: '8px 16px', fontSize: 13, marginBottom: 24 }}>
        ← Back
      </button>

      <div className="fu">
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 32, marginBottom: 6 }}>
          ✦ Salary Chart
        </h1>
        <p style={{ color: '#7c7a8e', fontSize: 14, marginBottom: 28 }}>Monthly compensation — top 10 employees</p>

        {/* Bar chart */}
        <div className="card" style={{ padding: '28px 16px 12px' }}>
          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={top10} margin={{ top: 10, right: 20, left: 10, bottom: 65 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(245,158,11,0.06)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: '#7c7a8e', fontSize: 12, fontFamily: "'DM Sans'" }}
                angle={-35} textAnchor="end" interval={0}
              />
              <YAxis
                tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`}
                tick={{ fill: '#7c7a8e', fontSize: 12 }}
                axisLine={false} tickLine={false}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(245,158,11,0.04)' }} />
              <Bar dataKey="salary" radius={[8, 8, 0, 0]} maxBarSize={46}>
                {top10.map((d, i) => <Cell key={i} fill={DEPT_COLORS[d.dept] || '#f59e0b'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 16, justifyContent: 'center' }}>
          {Object.entries(DEPT_COLORS).map(([dept, color]) => (
            <div key={dept} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: '#c4c1a8' }}>
              <div style={{ width: 10, height: 10, borderRadius: 2, background: color, flexShrink: 0 }} />
              {dept}
            </div>
          ))}
        </div>

        {/* Salary table */}
        <div className="card" style={{ marginTop: 24, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr 1fr 1fr', gap: 16, padding: '10px 18px', fontSize: 11, color: '#7c7a8e', textTransform: 'uppercase', letterSpacing: '0.5px', borderBottom: '1px solid rgba(245,158,11,0.08)' }}>
            <span>#</span><span>Name</span><span>Department</span><span style={{ textAlign: 'right' }}>Salary</span>
          </div>
          {[...top10].sort((a, b) => b.salary - a.salary).map((d, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '30px 1fr 1fr 1fr', gap: 16, padding: '12px 18px', borderBottom: '1px solid rgba(245,158,11,0.05)', alignItems: 'center' }}>
              <span style={{ color: '#7c7a8e', fontSize: 13 }}>{i + 1}</span>
              <span style={{ fontWeight: 500, fontSize: 14 }}>{d.name}</span>
              <span className="tag" style={{ background: `${DEPT_COLORS[d.dept] || '#f59e0b'}18`, color: DEPT_COLORS[d.dept] || '#f59e0b', border: `1px solid ${DEPT_COLORS[d.dept] || '#f59e0b'}35` }}>
                {d.dept}
              </span>
              <span style={{ textAlign: 'right', fontFamily: "'Syne', sans-serif", fontWeight: 600, color: '#34d399' }}>
                ₹{d.salary.toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}