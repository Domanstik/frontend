import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import HeaderSimple from '@components/HeaderSimple/HeaderSimple';
import HeaderDashboard from '@components/Dashboard/HeaderDashboard/HeaderDashboard';
import Navigation from '@components/Navigation/Navigation';

import { selectHeader, selectTheme, setTheme } from './store/slices/uiSlice';
import styles from './AppLayout.module.css';

export default function AppLayout() {
  const header = useSelector(selectHeader);
  const theme = useSelector(selectTheme);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  const contentClassName = useMemo(
    () =>
      isDashboard
        ? `${styles.appContent} ${styles.appContentDashboard}`
        : styles.appContent,
    [isDashboard],
  );

  const handleToggleTheme = useCallback(() => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  }, [dispatch, theme]);

  const handleOpenNotifications = useCallback(() => {
    navigate('/notifications');
  }, [navigate]);

  return (
    <div className={styles.appLayout}>
      {isDashboard ? (
        <HeaderDashboard
          avatarSrc={header.avatar}
          onNotify={handleOpenNotifications}
          onToggleTheme={handleToggleTheme}
        />
      ) : (
        <HeaderSimple
          title={header.title}
          avatarSrc={header.avatar}
          right={header.right}
        />
      )}

      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          className={contentClassName}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>

      <Navigation />
      <div id="app-portal-root" />
    </div>
  );
}
