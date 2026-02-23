import { useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useRoute } from './hooks/useRoute';
import { NavBar }    from './components/NavBar';
import { LoginPage } from './pages/LoginPage';
import { ListPage }  from './pages/ListPage';
import { DetailPage } from './pages/DetailPage';
import { PhotoPage }  from './pages/PhotoPage';
import { ChartPage }  from './pages/ChartPage';
import { MapPage }    from './pages/MapPage';

function AppRoutes() {
  const { user } = useAuth();
  const { path, navigate } = useRoute();

  useEffect(() => {
    if (!user && !path.startsWith('#/login')) {
      navigate('#/login');
    }

    if (
      user &&
      (path === '#/login' ||
        path === '#/' ||
        path === '#' ||
        path === '')
    ) {
      navigate('#/list');
    }
  }, [user, path, navigate]); // ✅ FIXED: added navigate here

  const renderPage = () => {
    if (!user || path.startsWith('#/login')) {
      return <LoginPage navigate={navigate} />;
    }

    if (path.startsWith('#/detail')) {
      const id = path.replace('#/detail/', '').split('?')[0];
      return <DetailPage navigate={navigate} id={id} />;
    }

    if (path.startsWith('#/photo')) {
      return <PhotoPage navigate={navigate} />;
    }

    if (path.startsWith('#/chart')) {
      return <ChartPage navigate={navigate} />;
    }

    if (path.startsWith('#/map')) {
      return <MapPage navigate={navigate} />;
    }

    return <ListPage navigate={navigate} />;
  };

  return (
    <>
      <NavBar navigate={navigate} path={path} />
      {renderPage()}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}