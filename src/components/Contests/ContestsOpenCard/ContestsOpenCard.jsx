import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

import clockIcon from '@icons/clock.svg';
import starIcon from '@icons/star.svg';
import styles from './ContestsOpenCard.module.css';

function Reward({ label, value = 0 }) {
  return (
    <div className={styles.statRow}>
      <span className={styles.label}>{label}</span>
      <span className={styles.reward}>
        <img src={starIcon} alt="" className={styles.starIcon} />
        <span className={styles.rewardNum}>{Number(value) || 0}</span>
      </span>
    </div>
  );
}

export default function ContestsOpenCard({ contest, open, onClose }) {
  const okBtnRef = useRef(null);
  const isOpen = !!open && !!contest;

  // блокируем скролл фона
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [isOpen]);

  // полностью скрываем навигацию/лист карточек по data-hide-on-sheet
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

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={styles.overlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          aria-modal="true"
          role="dialog"
        >
          <motion.div
            className={styles.sheet}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 380, damping: 34 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.inner}>
              {/* шапка */}
              <div className={styles.headerRow}>
                <button className={styles.backBtn} onClick={onClose}>Назад</button>
                <div className={styles.clockBox}>
                  <img src={clockIcon} alt="" className={styles.clock} />
                  <div className={styles.days}>{contest.daysLeft}&nbsp;д.</div>
                </div>
              </div>

              {/* текст слева */}
              <h2 className={styles.title}>{contest.title}</h2>
              {contest.subtitle ? <p className={styles.subtitle}>{contest.subtitle}</p> : null}

              {/* награды: одна ⭐ + число, колонки ровно */}
              <div className={styles.stats}>
                <Reward label="Участие" value={contest.participation} />
                <Reward label="Победа" value={contest.win} />
              </div>

              {/* Загрузить — в самом низу, прямо над Ок/Отмена */}
              <button className={styles.primary}>Загрузить</button>

              {/* снизу — Ок / Отмена, растянуты между краями */}
              <div className={styles.footerRow}>
                <button ref={okBtnRef} className={styles.pillOutline}>Ок</button>
                <button className={styles.pillOutline} onClick={onClose}>Отмена</button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
