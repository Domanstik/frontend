import { useEffect, useContext, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { UIContext } from '@contexts/ui-context';
import { Box, Container, TextField, InputAdornment, Typography } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ProductList from '@components/Store/ProductList/ProductList';
import ProductOpenCard from '@components/Store/ProductOpenCard/ProductOpenCard';

import { selectBalance } from '@/store/slices/externalSlice';
import starShop from '@icons/starShop.svg';

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

// бейдж со звездой и числом (цвет цифры #111569)
function BalanceBadge({ value }) {
  const wrap = {
    position: 'relative',
    width: 40,
    height: 40,
    display: 'inline-block',
  };
  const img = { width: '100%', height: '100%', display: 'block' };
  const txt = {
    position: 'absolute',
    inset: 0,
    display: 'grid',
    placeItems: 'center',
    fontWeight: 800,
    fontSize: 14,
    color: '#111569',
    letterSpacing: 0.2,
  };
  return (
    <span style={wrap} aria-label={`Баланс: ${value}`}>
      <img src={starShop} alt="" style={img} />
      <span style={txt}>{value}</span>
    </span>
  );
}

export default function Store() {
  const { setHeader, avatars } = useContext(UIContext);
  const [q, setQ] = useState('');
  const [selected, setSelected] = useState(null);
  const balance = useSelector(selectBalance);

  const avatarFemale = avatars?.female;

  useEffect(() => {
    setHeader((prev) => {
      const right = <BalanceBadge value={balance} />;
      if (prev?.title === 'МАГАЗИН' && prev?.avatar === avatarFemale && prev?.right?.props?.value === balance) {
        return prev;
      }
      return { title: 'МАГАЗИН', avatar: avatarFemale, right };
    });
  }, [setHeader, avatarFemale, balance]);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return products;
    return products.filter(
      (p) => p.title.toLowerCase().includes(s) || String(p.price).includes(s)
    );
  }, [q]);

  return (
    <Box sx={{ minHeight: '100dvh', position: 'relative', pb: { xs: 9, sm: 4 } }}>
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
            /* дарк — приглушённый инпут */
            '&[data-theme="dark"] & .MuiOutlinedInput-root, :root[data-theme="dark"] & .MuiOutlinedInput-root': {
              bgcolor: 'rgba(255,255,255,0.08)',
              color: '#fff',
            },
          }}
        />
        <Typography
          variant="caption"
          sx={{
            color: 'rgba(255,255,255,0.9)',
            mt: 1,
            display: 'block',
            ':root[data-theme="dark"] &': { color: 'rgba(255,255,255,0.75)' },
          }}
        >
          Найдено: {filtered.length}
        </Typography>
      </Container>

      <Container maxWidth="sm" sx={{ pb: 2 }}>
        <ProductList products={filtered} onSelect={setSelected} />
      </Container>

      <ProductOpenCard
        product={selected}
        open={!!selected}
        onClose={() => setSelected(null)}
        onToggleLike={(id) => setSelected((p) => ({ ...p, liked: !p?.liked }))}
        onBuy={(p) => console.log('buy', p)}
      />
    </Box>
  );
}
