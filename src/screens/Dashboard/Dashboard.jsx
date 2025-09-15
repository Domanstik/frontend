import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const stars = 58; // подставь актуальное значение

  return (
    <Box
      sx={{
        display: 'grid',
        justifyItems: 'center',
        gap: 2,
        pt: 2,
      }}
    >
      {/* Имя пользователя */}
      <Typography variant="h6" sx={{ color: '#ffffff', fontWeight: 600 }}>
        Петрова Екатерина
      </Typography>

      {/* Карточка со звёздами */}
      <Paper
        elevation={0}
        sx={{
          position: 'relative',
          width: 120,
          height: 120,
          borderRadius: 3,
          display: 'grid',
          placeItems: 'center',
          backgroundColor: 'rgba(255,255,255,0.12)',
          border: '1.5px solid rgba(255,255,255,0.6)',
          backdropFilter: 'blur(6px)',
        }}
      >
        {/* Счётчик в правом верхнем углу */}
        <Typography
          variant="h5"
          sx={{
            position: 'absolute',
            top: 8,
            right: 10,
            fontWeight: 700,
            color: '#0a1a5c',
            lineHeight: 1,
          }}
        >
          {stars}
        </Typography>

        {/* Большая звезда */}
        <StarIcon sx={{ fontSize: 64, color: '#F3C419' }} />
      </Paper>

      {/* Уведомления */}
      <Button
        component={Link}
        to="/notifications"
        variant="text"
        sx={{ color: '#ffffff', textTransform: 'none', fontSize: 16 }}
      >
        Уведомления
      </Button>
    </Box>
  );
}
