import { motion } from 'framer-motion';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { springSm } from '@lib/motionConfig';
import styles from './HeaderDashboard.module.css';

export default function HeaderDashboard({ avatarSrc, onNotify, onToggleTheme }) {
  return (
    <motion.header
      className={styles.header}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0, transition: springSm }}
    >
      {/* фон-заливка (градиент) уже в CSS через ::before */}

      {/* крупная «фото»-иллюстрация внизу шапки */}
      {avatarSrc && (
        <motion.img
          src={avatarSrc}
          alt=""
          className={styles.bgImg}
          initial={{ scale: 1.06, y: 6 }}
          animate={{ scale: 1, y: 0, transition: { duration: 1.2, ease: 'easeOut' } }}
        />
      )}

      {/* снежинки + мягкий свет сверху */}
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
          <NotificationsIcon />
        </motion.button>

        <motion.button
          onClick={onToggleTheme}
          className={styles.iconButton}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Переключить тему"
        >
          <DarkModeIcon />
        </motion.button>
      </div>
    </motion.header>
  );
}

HeaderDashboard.defaultProps = {
  avatarSrc: '',
  onNotify: () => { },
  onToggleTheme: () => { },
};
