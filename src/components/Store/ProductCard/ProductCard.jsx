import { useState } from 'react';
import { Card, CardActionArea, CardContent } from '@mui/material';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import styles from './ProductCard.module.css';
import starIcon from '@icons/starShop.svg';

export default function ProductCard({ title, price, productSrc }) {
  const [fav, setFav] = useState(false);

  return (
    <div className={styles.wrap}>
      {/* Сердце снаружи карточки — не обрежется */}
      <button
        type="button"
        className={`${styles.heartBtn} ${fav ? styles.heartActive : ''}`}
        aria-label={fav ? 'Убрать из избранного' : 'В избранное'}
        onClick={() => setFav(v => !v)}
      >
        <FavoriteRoundedIcon className={styles.heartIcon} />
      </button>

      <Card elevation={0} className={styles.card}>
        <CardActionArea className={styles.action}>
          <div className={styles.imageWrap}>
            <div className={styles.imageBox}>
              <img src={productSrc} alt={title} loading="lazy" />
            </div>
          </div>

          <CardContent className={styles.content}>
            <div className={styles.title} title={title}>{title}</div>
            <div className={styles.priceRow}>
              <span className={styles.price}>{price}</span>
              <img src={starIcon} alt="" className={styles.star} aria-hidden="true" />
            </div>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}
