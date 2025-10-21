import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Popup from '@components/UI/Popup/Popup';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, selectIsFav } from '@store/slices/shopSlice';
import starIcon from '@icons/star.svg';
import styles from './ProductOpenCard.module.css';

export default function ProductOpenCard({ product, open = false, onClose, onBuy }) {
  const buyBtnRef = useRef(null);
  const [thanksOpen, setThanksOpen] = useState(false);
  const dispatch = useDispatch();

  // После фикса списка id здесь ВСЕГДА есть
  const productId = product?.id ?? null;
  const fav = useSelector(productId != null ? selectIsFav(productId) : () => false);

  const isOpen = !!open && !!product;

  // Блокируем прокрутку фона
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // Прячем всё с data-hide-on-sheet
  useEffect(() => {
    const html = document.documentElement;
    const toHide = Array.from(document.querySelectorAll('[data-hide-on-sheet]'));
    if (isOpen) {
      html.classList.add('contest-sheet-open');
      toHide.forEach(el => { el.setAttribute('aria-hidden', 'true'); el.setAttribute('inert', ''); });
    } else {
      html.classList.remove('contest-sheet-open');
      toHide.forEach(el => { el.removeAttribute('aria-hidden'); el.removeAttribute('inert'); });
    }
    return () => {
      html.classList.remove('contest-sheet-open');
      toHide.forEach(el => { el.removeAttribute('aria-hidden'); el.removeAttribute('inert'); });
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBuy = () => {
    onBuy?.(product);
    setThanksOpen(true);
  };

  return (
    <>
      <div className={styles.root} role="dialog" aria-modal="true" aria-label="Карточка товара">
        <motion.button
          aria-label="Закрыть"
          className={styles.backdrop}
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
        <motion.div
          className={styles.sheet}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          drag="y"
          dragConstraints={{ top: 0, bottom: 0 }}
          dragElastic={0.12}
          onDragEnd={(_, info) => { if (info.offset.y > 120 || info.velocity.y > 600) onClose?.(); }}
        >
          <div className={styles.header}>
            <button className={styles.backBtn} onClick={onClose}>
              <ArrowBackIosNewIcon className={styles.backIcon} /> Назад
            </button>

            {/* Сердце — 1 в 1 как в карточке списка */}
            <motion.button
              type="button"
              className={`${styles.heartBtn} ${fav ? styles.heartActive : ''}`}
              onClick={() => (productId != null) && dispatch(toggleFavorite(productId))}
              whileTap={{ scale: 0.9 }}
              aria-pressed={fav}
              aria-label={fav ? 'Убрать из избранного' : 'В избранное'}
            >
              <FavoriteRoundedIcon className={styles.heartIcon} />
            </motion.button>
          </div>

          <div className={styles.imageWrap}>
            {product.image ? (
              <img src={product.image} alt={product.title} className={styles.image} />
            ) : <div className={styles.imageStub} />}
          </div>

          <div className={styles.info}>
            <div className={styles.titleRow}>
              <div className={styles.rating}>
                <span className={styles.ratingNum}>{product.rating ?? 5}</span>
                <img src={starIcon} alt="" className={styles.starAsset} />
              </div>
              <h2 className={styles.title} title={product.title}>{product.title}</h2>
            </div>
            {product.description ? <p className={styles.desc}>{product.description}</p> : null}
          </div>

          <button ref={buyBtnRef} className={styles.buy} onClick={handleBuy}>Купить</button>
        </motion.div>
      </div>

      <Popup open={thanksOpen} onClose={() => setThanksOpen(false)}>
        <h3 className={styles.popupTitle}>Спасибо большое!<br />С&nbsp;Вами свяжется<br />Ваш HR-менеджер!</h3>
        <button className={styles.popupBtn} onClick={() => setThanksOpen(false)}>Закрыть</button>
      </Popup>
    </>
  );
}
