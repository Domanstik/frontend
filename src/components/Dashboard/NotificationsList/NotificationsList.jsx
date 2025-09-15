import React from 'react';
import { Box, List } from '@mui/material';
import NotificationsItem from '../NotificationsItem/NotificationsItem';
import styles from './NotificationsList.module.css';
export default function NotificationsList({ items = [], onItemClick }) {
  return (
    <Box>
      <List disablePadding>
        {items.map((n) => (
          <NotificationsItem
            key={n.id}
            title={n.title}
            date={n.date}
            onClick={() => onItemClick?.(n)}
          />
        ))}
      </List>
    </Box>
  );
}
