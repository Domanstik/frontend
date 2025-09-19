import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { springMd } from '../../lib/motionConfig';

// !!! путь до слайса проверь по своему проекту
import { selectIsAdmin } from '../../store/slices/authSlice';

import contest from '@icons/navigation/contests.svg';
import rating from '@icons/navigation/rating.svg';
import shop from '@icons/navigation/shop.svg';
import dashboard from '@icons/navigation/dashboard.svg';
import admin from '@icons/navigation/admin.svg'; // добавь иконку

import styles from './Navigation.module.css';

const userItems = [
  { to: '/contests', icon: contest, label: 'Contests', exact: false },
  { to: '/leaderboard', icon: rating, label: 'Leaderboard', exact: false },
  { to: '/store', icon: shop, label: 'Shop', exact: false },
  { to: '/dashboard', icon: dashboard, label: 'Dashboard', exact: true },
];
const adminItem = { to: '/admin', icon: admin, label: 'Admin', exact: false };

export default function Navigation() {
  const isAdmin = useSelector(selectIsAdmin);
  const items = isAdmin ? [adminItem, ...userItems] : userItems;

  return (
    <motion.nav
      className={styles.nav}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: springMd }}
      exit={{ y: 40, opacity: 0, transition: springMd }}
    >
      {items.map(({ to, icon, label, exact }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) => styles.navButton + (isActive ? ` ${styles.active}` : '')}
          end={exact}
        >
          {({ isActive }) => (
            <span className={styles.iconWrap}>
              <AnimatePresence initial={false}>
                {isActive && (
                  <motion.span
                    layoutId="navHalo"
                    className={styles.highlight}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1, transition: springMd }}
                    exit={{ opacity: 0, scale: 0.92, transition: springMd }}
                  />
                )}
              </AnimatePresence>

              <motion.img
                src={icon}
                alt={label}
                className={styles.icon}
                initial={false}
                animate={isActive ? { scale: 1.06 } : { scale: 1 }}
                transition={springMd}
                whileTap={{ scale: 0.95 }}
              />
            </span>
          )}
        </NavLink>
      ))}
    </motion.nav>
  );
}
