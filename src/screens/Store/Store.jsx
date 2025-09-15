import { useEffect, useContext, useMemo, useState } from 'react';
import { UIContext } from '@contexts/ui-context';
import { Box, Container, TextField, InputAdornment, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ProductList from '@components/Store/ProductList/ProductList';

const products = [
  { title: 'Футболка', price: 120, productSrc: '/images/shopItems/tshirt.jpg' },
  { title: 'Термокружка', price: 90, productSrc: '/images/shopItems/tshirt.jpg' },
  { title: 'Кепка', price: 100, productSrc: '/images/shopItems/tshirt.jpg' },
  { title: 'Рюкзак', price: 200, productSrc: '/images/shopItems/tshirt.jpg' },
  { title: 'Футболка', price: 120, productSrc: '/images/shopItems/tshirt.jpg' },
  { title: 'Термокружка', price: 90, productSrc: '/images/shopItems/tshirt.jpg' },
  { title: 'Кепка', price: 100, productSrc: '/images/shopItems/tshirt.jpg' },
  { title: 'Рюкзак', price: 200, productSrc: '/images/shopItems/tshirt.jpg' },
  { title: 'Футболка', price: 120, productSrc: '/images/shopItems/tshirt.jpg' },
  { title: 'Термокружка', price: 90, productSrc: '/images/shopItems/tshirt.jpg' },
  { title: 'Кепка', price: 100, productSrc: '/images/shopItems/tshirt.jpg' },
  { title: 'Рюкзак', price: 200, productSrc: '/images/shopItems/tshirt.jpg' },
];

export default function Store() {
  const { setHeader, avatars } = useContext(UIContext);
  const [q, setQ] = useState('');

  // Забираем примитив, чтобы не зависеть от всего объекта
  const avatarFemale = avatars?.female;

  useEffect(() => {
    // Не обновляем, если уже установлено нужное значение
    setHeader((prev) => {
      if (prev?.title === 'МАГАЗИН' && prev?.avatar === avatarFemale) return prev;
      return { title: 'МАГАЗИН', avatar: avatarFemale };
    });
  }, [setHeader, avatarFemale]); // <-- больше НЕТ avatars в зависимостях

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products;
    return products.filter(
      (p) => p.title.toLowerCase().includes(s) || String(p.price).includes(s)
    );
  }, [q]);

  return (
    <Box
      sx={{
        minHeight: '100dvh',
        position: 'relative',
        pb: { xs: 9, sm: 4 },
      }}
    >
      <Container maxWidth="sm" sx={{ pt: 1.5, pb: 1 }}>
        <TextField
          fullWidth
          size="small"
          placeholder="Поиск по товарам"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchRoundedIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              borderRadius: 3,
              bgcolor: 'rgba(255,255,255,0.85)',
              backdropFilter: 'blur(6px)',
            },
          }}
        />
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.9)', mt: 1, display: 'block' }}>
          Найдено: {filtered.length}
        </Typography>
      </Container>

      <Container maxWidth="sm" sx={{ pb: 2 }}>
        <ProductList products={filtered} />
      </Container>
    </Box>
  );
}
