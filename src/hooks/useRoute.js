import { useState, useEffect } from 'react';

export function useRoute() {
  const [path, setPath] = useState(window.location.hash || '#/login');

  useEffect(() => {
    const handler = () => setPath(window.location.hash || '#/login');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);

  const navigate = (to) => { window.location.hash = to; };

  return { path, navigate };
}