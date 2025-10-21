import { motion } from 'framer-motion';
import { springSm } from '../../../lib/motionConfig';

import clockIcon from '@icons/clock.svg';
import starIcon from '@icons/star.svg';

import styles from './ContestsCard.module.css';

function StarCount({ value = 0 }) {
  return (
    <span className={styles.starCount} aria-label={`звёзд: ${Number(value) || 0}`}>
      <img src={starIcon} alt="" className={styles.starIcon} />
      <span className={styles.starNum}>{Number(value) || 0}</span>
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
      animate={{ opacity: 1, y: 0, transition: springSm }}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      layout
    >
      <div className={styles.wrap}>
        {/* Лево: заголовок и описание */}
        <div className={styles.headerLeft}>
          <div className={styles.title} title={title}>{title}</div>
          {subtitle ? (
            <div className={styles.subtitle} title={subtitle}>{subtitle}</div>
          ) : null}
        </div>

        {/* Право: часы (фиксированы в правом верхнем углу) */}
        <div className={styles.headerRight} aria-hidden="true">
          <img src={clockIcon} alt="" className={styles.clock} />
          <div className={styles.days}>{daysLeft}&nbsp;д.</div>
        </div>

        {/* Статистика */}
        <div className={styles.stats}>
          <div className={styles.statRow}>
            <span className={styles.label}>Участие</span>
            <StarCount value={participation} />
          </div>
          <div className={styles.statRow}>
            <span className={styles.label}>Победа</span>
            <StarCount value={win} />
          </div>
        </div>

        {/* Кнопка — в правом нижнем углу */}
        <button
          type="button"
          className={`${styles.cta} ${active ? styles.ctaActive : ''}`}
          onClick={onClick}
          aria-pressed={active}
        >
          {active ? 'АКТИВНО' : 'УЧАСТВОВАТЬ'}
        </button>
      </div>
    </motion.article>
  );
}
