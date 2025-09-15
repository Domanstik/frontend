import React from 'react';
import { ListItem, ListItemButton, Typography, Divider } from '@mui/material';
import styles from './NotificationsItem.module.css';

export default function NotificationsItem({ title, date, onClick, isFirst = false }) {
  return (
    <>
      <ListItem
        disableGutters
        className={styles.item}
        sx={{ py: 0, px: 0, minHeight: 0 }}
      >
        <ListItemButton
          className={`${styles.button} ${isFirst ? styles.buttonFirst : ''}`}
          onClick={onClick}
        >
          <div className={`${styles.content} ${isFirst ? styles.contentFirst : ''}`}>
            <Typography variant="body1" className={styles.title}>
              {title}
            </Typography>
          </div>
          <Typography
            variant="body2"
            className={`${styles.date} ${isFirst ? styles.dateFirst : ''}`}
          >
            {date}
          </Typography>
        </ListItemButton>
      </ListItem>
      <Divider className={styles.divider} />
    </>
  );
}
