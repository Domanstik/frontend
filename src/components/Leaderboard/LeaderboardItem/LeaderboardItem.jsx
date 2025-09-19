import { motion } from 'framer-motion';
import { fadeInUp, springSm } from '../../../lib/motionConfig';
import styles from './LeaderboardItem.module.css';

function ScoreStar({ value, active }) {
  return (
    <motion.div
      className={styles.star}
      animate={active ? { scale: [1, 1.06, 1] } : { scale: 1 }}
      transition={active ? { duration: 1.6, repeat: Infinity, repeatDelay: 1.2 } : {}}
    >
      <svg className={styles.starSvg} viewBox="0 0 64 64" aria-hidden>
        <path d="M32 4l8.3 17 18.7 2.7-13.5 13.2 3.2 18.5L32 46.9 15.3 55.4l3.2-18.5L5 23.7 23.7 21 32 4z" />
      </svg>
      <span className={styles.starValue}>{value}</span>
    </motion.div>
  );
}

export default function LeaderboardItem({
  rank, name, score, avatar, active = false, onClick, index = 0,
}) {
  const topClass = rank === 1 ? styles.top1 : rank === 2 ? styles.top2 : rank === 3 ? styles.top3 : '';
  const activeClass = active ? styles.active : '';

  return (
    <>
      <motion.li
        className={`${styles.item} ${activeClass}`}
        variants={fadeInUp}
        transition={{ delay: index * 0.05 }}
      >
        <motion.button
          className={styles.button}
          onClick={onClick}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.985 }}
          transition={springSm}
        >
          <span className={styles.rank}>{rank}</span>

          {avatar ? (
            <motion.img
              src={avatar}
              alt=""
              className={`${styles.avatar} ${topClass}`}
              animate={active ? { scale: 1.06 } : { scale: 1 }}
              transition={springSm}
            />
          ) : (
            <i className={`${styles.avatar} ${topClass}`} aria-hidden />
          )}

          <span className={styles.nameWrap}><span className={styles.name}>{name}</span></span>

          <ScoreStar value={score} active={active} />
        </motion.button>
      </motion.li>

      <div className={styles.divider} />
    </>
  );
}
