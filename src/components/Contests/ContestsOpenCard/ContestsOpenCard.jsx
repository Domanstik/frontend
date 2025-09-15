import React, { useRef } from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import BottomSheet from '@components/BottomSheet/BottomSheet';
import styles from './ContestsOpenCard.module.css';

export default function ContestsOpenCard({ contest, open, onClose }) {
  const okBtnRef = useRef(null);
  if (!contest) return null;

  return (
    <BottomSheet open={open} onClose={onClose} initialFocusRef={okBtnRef} height="72vh" ariaLabel="Участие в конкурсе">
      <div className={styles.wrap}>
        <div className={styles.headerRow}>
          <button className={styles.backBtn} onClick={onClose}>Назад</button>
          <div className={styles.clock}>
            <AccessTimeIcon className={styles.clockIcon} />
            <div className={styles.days}>{contest.daysLeft} д.</div>
          </div>
        </div>

        <h2 className={styles.title}>{contest.title}</h2>
        {contest.subtitle && <p className={styles.subtitle}>{contest.subtitle}</p>}

        <div className={styles.stats}>
          <div className={styles.statRow}>
            Участие
            <span className={styles.stars}>
              {Array.from({ length: 3 }, (_, i) => (
                <StarIcon key={i} className={i < (contest.participation || 0) ? styles.starOn : styles.starOff} />
              ))}
            </span>
          </div>
          <div className={styles.statRow}>
            Победа
            <span className={styles.stars}>
              {Array.from({ length: 3 }, (_, i) => (
                <StarIcon key={i} className={i < (contest.win || 0) ? styles.starOn : styles.starOff} />
              ))}
            </span>
          </div>
        </div>

        <button className={styles.primary}>Загрузить</button>

        <div className={styles.footerRow}>
          <button ref={okBtnRef} className={styles.pill} onClick={onClose}>Ок</button>
          <button className={styles.pillOutline} onClick={onClose}>Отмена</button>
        </div>
      </div>
    </BottomSheet>
  );
}
