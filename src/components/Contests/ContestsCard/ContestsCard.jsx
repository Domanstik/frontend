import React from 'react';
import { motion } from 'framer-motion';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StarIcon from '@mui/icons-material/Star';
import styles from './ContestsCard.module.css';

function Stars({ value = 0 }) {
  const arr = Array.from({ length: 3 }, (_, i) => i < value);
  return (
    <span className={styles.stars}>
      {arr.map((filled, i) => (
        <StarIcon key={i} className={filled ? styles.starOn : styles.starOff} />
      ))}
    </span>
  );
}

export default function ContestsCard({
  title,
  subtitle,
  participation = 0,
  win = 0,
  daysLeft,
  active = false,
  onClick,
}) {
  return (
    <motion.article
      className={styles.card}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      transition={{ type: 'spring', stiffness: 320, damping: 26, mass: 0.6 }}
      layout
    >
      <div className={styles.rowTop}>
        <div className={styles.left}>
          <div className={styles.title} title={title}>{title}</div>
          {subtitle ? (
            <div className={styles.subtitle} title={subtitle}>{subtitle}</div>
          ) : null}
        </div>

        <div className={styles.timerWrap}>
          <AccessTimeIcon className={styles.timerIcon} />
          <div className={styles.days}>{daysLeft} д.</div>
        </div>
      </div>

      <div className={styles.rowBottom}>
        <div className={styles.statsCol}>
          <div className={styles.statRow}>
            <span className={styles.label}>Участие</span>
            <Stars value={participation} />
          </div>
          <div className={styles.statRow}>
            <span className={styles.label}>Победа</span>
            <Stars value={win} />
          </div>
        </div>

        <motion.button
          type="button"
          className={`${styles.cta} ${active ? styles.ctaActive : ''}`}
          onClick={onClick}
          whileTap={{ scale: 0.97 }}
          aria-pressed={active}
        >
          {active ? 'АКТИВНО' : 'УЧАСТВОВАТЬ'}
        </motion.button>
      </div>

      <div className={styles.lightDivider} />
    </motion.article>
  );
}
