import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { createPortal } from 'react-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StarIcon from '@mui/icons-material/Star';
import Popup from '@components/UI/Popup/Popup';
import styles from './ProductOpenCard.module.css';

export default function ProductOpenCard({
  product, open = false, onClose, onToggleLike, onBuy
}) {
  const buyBtnRef = useRef(null);
  const [thanksOpen, setThanksOpen] = useState(false);
  if (!open || !product) return null;

  const handleBuy = () => {
    onBuy?.(product);
    setThanksOpen(true);
  };

  return createPortal(
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
          initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 320, damping: 32 }}
          drag="y" dragConstraints={{ top: 0, bottom: 0 }} dragElastic={0.12}
          onDragEnd={(_, info) => { if (info.offset.y > 120 || info.velocity.y > 600) onClose?.(); }}
        >
          <div className={styles.header}>
            <button className={styles.backBtn} onClick={onClose}>
              <ArrowBackIosNewIcon className={styles.backIcon} /> Назад
            </button>
            <button
              className={`${styles.heart} ${product.liked ? styles.heartOn : ''}`}
              onClick={() => onToggleLike?.(product.id)}
              aria-pressed={!!product.liked}
              aria-label={product.liked ? 'Убрать из избранного' : 'В избранное'}
            >
              <FavoriteIcon />
            </button>
          </div>

          <div className={styles.imageWrap}>
            {product.image ? (
              <img src={product.image} alt={product.title} className={styles.image} />
            ) : <div className={styles.imageStub} /> }
          </div>

          <div className={styles.info}>
            <div className={styles.titleRow}>
              <div className={styles.rating}>{product.rating ?? 5}<StarIcon className={styles.star} /></div>
              <h2 className={styles.title} title={product.title}>{product.title}</h2>
            </div>
            {product.description ? <p className={styles.desc}>{product.description}</p> : null}
          </div>

          <button ref={buyBtnRef} className={styles.buy} onClick={handleBuy}>Купить</button>
        </motion.div>
      </div>

      {/* POPUP СПАСИБО */}
      <Popup open={thanksOpen} onClose={() => setThanksOpen(false)}>
        <h3 className={styles.popupTitle}>Спасибо большое!<br/>С&nbsp;Вами свяжется<br/>Ваш HR-менеджер!</h3>
        <button className={styles.popupBtn} onClick={() => setThanksOpen(false)}>Закрыть</button>
      </Popup>
    </>,
    document.body
  );
}
