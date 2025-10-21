import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { selectTheme } from '@/store/slices/uiSlice';

import notifLight from '@icons/navigation/notifications-light.svg';
import notifDark from '@icons/navigation/notifications-dark.svg';
import themeLight from '@icons/navigation/light-sheme-light.svg';
import themeDark from '@icons/navigation/light-sheme-dark.svg';

import { springSm } from '@lib/motionConfig';
import styles from './HeaderDashboard.module.css';

export default function HeaderDashboard({ avatarSrc, onNotify, onToggleTheme }) {
  const theme = useSelector(selectTheme);
  const isDark = theme === 'dark';

  const notifIcon = isDark ? notifDark : notifLight;
  const themeIcon = isDark ? themeDark : themeLight;

  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0, transition: springSm }}
    >
      {/* крупная иллюстрация/аватар */}
      {avatarSrc && (
        <motion.img
          src={avatarSrc}
          alt=""
          className={styles.bgImg}
          initial={{ scale: 1.06, y: 6 }}
          animate={{ scale: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } }}
        />
      )}

      {/* снежинки + мягкий свет */}
      <span className={styles.overlay} aria-hidden />

      {/* кнопки */}
      <div className={styles.actions}>
        <motion.button
          onClick={onNotify}
          className={styles.iconButton}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Открыть уведомления"
        >
          <img src={notifIcon} alt="" />
        </motion.button>

        <motion.button
          onClick={onToggleTheme}
          className={styles.iconButton}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Переключить тему"
        >
          <img src={themeIcon} alt="" />
        </motion.button>
      </div>
    </motion.header>
  );
}

HeaderDashboard.defaultProps = {
  avatarSrc: '',
  onNotify: () => {},
  onToggleTheme: () => {},
};
