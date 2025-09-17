import { Outlet, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import HeaderSimple from '@components/HeaderSimple/HeaderSimple';
import HeaderDashboard from '@components/Dashboard/HeaderDashboard/HeaderDashboard';
import Navigation from '@components/Navigation/Navigation';
import { UIContext } from '@contexts/ui-context';
import './AppLayout.css';

export default function AppLayout() {
  const { header } = useContext(UIContext);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className={`app-layout ${isDashboard ? 'app-layout--dashboard' : ''}`}>
      {isDashboard ? (
        <HeaderDashboard
          title={header.title}
          avatarSrc={header.avatar}
          right={header.right}
        />
      ) : (
        <HeaderSimple
          title={header.title}
          avatarSrc={header.avatar}
          right={header.right}
        />
      )}

      <main className="app-content">
        <Outlet />
      </main>

      <Navigation />

      {/* ВАЖНО: корень для модалок/шитов/попапов */}
      <div id="app-portal-root" />
    </div>
  );
}
