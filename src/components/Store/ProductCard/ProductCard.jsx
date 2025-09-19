import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';
import { toggleFavorite, selectIsFav } from '@store/slices/shopSlice';
import { springSm } from '../../../lib/motionConfig';
import styles from './ProductCard.module.css';

export default function ProductCard({ id, title, price, productSrc, onClick }) {
  const dispatch = useDispatch();
  const fav = useSelector(selectIsFav(id));

  return (
    <motion.div className={styles.card} whileHover={{ y: -2 }} transition={springSm}>
      <motion.button
        type="button"
        className={`${styles.heartBtn} ${fav ? styles.heartActive : ''}`}
        onClick={() => dispatch(toggleFavorite(id))}
        whileTap={{ scale: 0.9 }}
        aria-pressed={fav}
        aria-label={fav ? 'Убрать из избранного' : 'В избранное'}
      >
        <FavoriteRoundedIcon className={styles.heartIcon} />
      </motion.button>

      <motion.button className={styles.action} onClick={onClick} whileTap={{ scale: 0.98 }}>
        <div className={styles.imageWrap}>
          <div className={styles.imageBox}>
            {productSrc ? <img src={productSrc} alt={title} loading="lazy" /> : <div className={styles.imgStub} />}
          </div>
        </div>

        <div className={styles.content}>
          <div className={styles.title} title={title}>{title}</div>
          <div className={styles.priceRow}>
            <span className={styles.price}>{price}</span>
            <StarRoundedIcon className={styles.star} />
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
