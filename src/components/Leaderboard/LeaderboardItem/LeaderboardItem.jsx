import React from 'react';
import {
  ListItem,
  ListItemButton,
  Avatar,
  Typography,
  Divider,
  Box,
} from '@mui/material';
import styles from './LeaderboardItem.module.css';

function ScoreStar({ value }) {
  return (
    <div className={styles.star}>
      {/*SVG звезды как фон, число — поверх*/}
      <svg className={styles.starSvg} viewBox="0 0 64 64" aria-hidden>
        <path d="M32 4l8.3 17 18.7 2.7-13.5 13.2 3.2 18.5L32 46.9 15.3 55.4l3.2-18.5L5 23.7 23.7 21 32 4z"/>
      </svg>
      <span className={styles.starValue}>{value}</span>
    </div>
  );
}

export default function LeaderboardItem({
  rank,
  name,
  score,
  avatar,
  active = false,
  onClick,
}) {
  const topClass =
    rank === 1 ? styles.top1 : rank === 2 ? styles.top2 : rank === 3 ? styles.top3 : '';
  const activeClass = active ? styles.active : '';

  return (
    <>
      <ListItem disableGutters className={`${styles.item} ${activeClass}`}>
        <ListItemButton className={styles.button} onClick={onClick}>
          {/* № */}
          <Typography className={styles.rank} component="span">
            {rank}
          </Typography>

          {/* Аватар + бордер по месту */}
          <Avatar
            src={avatar}
            alt={name}
            className={`${styles.avatar} ${topClass}`}
            imgProps={{ alt: name }}
          />

          {/* Имя (в 2 строки при необходимости) */}
          <Box className={styles.nameWrap}>
            <Typography className={styles.name} variant="body1">
              {name}
            </Typography>
          </Box>

          {/* Справа звезда со значением */}
          <ScoreStar value={score} />
        </ListItemButton>
      </ListItem>
      <Divider className={styles.divider} />
    </>
  );
}
