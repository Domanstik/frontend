import React from 'react';
import { List, Box } from '@mui/material';
import LeaderboardItem from '../LeaderboardItem/LeaderboardItem';
import styles from './LeaderboardList.module.css';

const ACTIVE_USER_ID = 5;

export default function LeaderboardList({ items = [], onItemClick }) {

  return (
    <Box className={styles.board}>
      <List disablePadding>
        {items.map((user, idx) => {
          const isActive = user.id === ACTIVE_USER_ID;
          return (
            <LeaderboardItem
              key={user.id}
              rank={idx + 1}
              name={user.name}
              score={user.score}
              avatar={user.avatar}
              active={isActive}
              onClick={() => onItemClick?.(user)}
            />
          );
        })}
      </List>
    </Box>
  );
}
