export function Spinner({ size = 28 }) {
  return (
    <div style={{
      width: size,
      height: size,
      border: '3px solid rgba(245,158,11,0.2)',
      borderTopColor: '#f59e0b',
      borderRadius: '50%',
      animation: 'spin 0.7s linear infinite',
      flexShrink: 0,
    }} />
  );
}