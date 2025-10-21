import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { springMd } from '@lib/motionConfig';
import { selectIsAdmin } from '@store/slices/authSlice';

import contest from '@icons/navigation/contests.svg';
import rating from '@icons/navigation/rating.svg';
import shop from '@icons/navigation/shop.svg';
import dashboard from '@icons/navigation/dashboard.svg';
import AdminPanelSettingsRoundedIcon from '@mui/icons-material/AdminPanelSettingsRounded';

import styles from './Navigation.module.css';

const userItems = [
  { to: '/contests', icon: contest, label: 'Contests', exact: false },
  { to: '/leaderboard', icon: rating, label: 'Leaderboard', exact: false },
  { to: '/store', icon: shop, label: 'Shop', exact: false },
  { to: '/dashboard', icon: dashboard, label: 'Dashboard', exact: true },
];

const adminItem = { to: '/admin', icon: AdminPanelSettingsRoundedIcon, label: 'Admin', exact: false };

function RenderIcon({ icon, label, isActive }) {
  const motionProps = {
    initial: false,
    animate: isActive ? { scale: 1.06 } : { scale: 1 },
    transition: springMd,
    whileTap: { scale: 0.95 },
  };

  if (typeof icon === 'string') {
    return (
      <motion.img
        src={icon}
        alt={label}
        className={`${styles.icon} ${styles.iconImg}`}
        {...motionProps}
      />
    );
  }
  const IconCmp = icon;
  return (
    <motion.span className={`${styles.icon} ${styles.iconSvg}`} aria-hidden="true" {...motionProps}>
      <IconCmp />
    </motion.span>
  );
}

export default function Navigation() {
  const isAdmin = useSelector(selectIsAdmin);
  const items = isAdmin ? [adminItem, ...userItems] : userItems;

  return (
    <motion.nav
      data-hide-on-sheet
      className={styles.nav}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1, transition: springMd }}
      exit={{ y: 40, opacity: 0, transition: springMd }}
    >
      {items.map(({ to, icon, label, exact }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            styles.navButton + (isActive ? ` ${styles.active}` : '')
          }
          end={exact}
        >
          {({ isActive }) => (
            <span className={styles.iconWrap}>
              <AnimatePresence initial={false}>
                {isActive && <motion.span layoutId="navHalo" className={styles.haloBox} />}
              </AnimatePresence>
              <RenderIcon icon={icon} label={label} isActive={isActive} />
            </span>
          )}
        </NavLink>
      ))}
    </motion.nav>
  );
}
