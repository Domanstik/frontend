import { Outlet, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';

import HeaderSimple from '@components/HeaderSimple/HeaderSimple';
import HeaderDashboard from '@components/Dashboard/HeaderDashboard/HeaderDashboard';
import Navigation from '@components/Navigation/Navigation';
import { selectHeader } from './store/slices/uiSlice';

import styles from './AppLayout.module.css';

export default function AppLayout() {
  const header = useSelector(selectHeader);
  const location = useLocation();
  const isDashboard = location.pathname === '/dashboard';

  const contentClassName = useMemo(
    () =>
      isDashboard
        ? `${styles.appContent} ${styles.appContentDashboard}`
        : styles.appContent,
    [isDashboard]
  );

  return (
    <div
      className={`${styles.appLayout} ${
        isDashboard ? styles.appLayoutDashboard : ''
      }`}
    >
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
