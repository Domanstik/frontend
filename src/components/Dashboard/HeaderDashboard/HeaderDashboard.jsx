// HeaderDashboard.jsx
import React from 'react';
import { Box, IconButton } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import styles from './HeaderDashboard.module.css';

export default function HeaderDashboard({ avatarSrc, onNotify, onToggleTheme }) {
  return (
    <Box component="header" className={styles.header}>
      {/* фон-картинка на всю шапку */}
      {/* Фоновая картинка */}
      {avatarSrc && (
        <Box component="img" src={avatarSrc} alt="" className={styles.bgImg} />
      )}

      {/* светлый градиент поверх фото */}
      <span className={styles.overlay} aria-hidden />

      {/* кнопки действий */}
      <Box className={styles.actions}>
        <IconButton
          onClick={onNotify}
          className={styles.iconButton}
          aria-label="Открыть уведомления"
        >
          <NotificationsIcon />
        </IconButton>
        <IconButton
          onClick={onToggleTheme}
          className={styles.iconButton}
          aria-label="Переключить тему"
        >
          <DarkModeIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

HeaderDashboard.defaultProps = {
  bgSrc: '',
  onNotify: () => {},
  onToggleTheme: () => {},
};
