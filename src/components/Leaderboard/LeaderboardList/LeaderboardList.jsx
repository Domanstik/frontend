import { motion } from 'framer-motion';
import { listStagger } from '../../../lib/motionConfig';
import LeaderboardItem from '../LeaderboardItem/LeaderboardItem';
import styles from './LeaderboardList.module.css';

const ACTIVE_USER_ID = 5;

export default function LeaderboardList({ items = [], onItemClick }) {
  return (
    <div className={styles.board}>
      <motion.ul
        className={styles.list}
        variants={listStagger}
        initial="hidden"
        animate="show"
      >
        {items.map((user, idx) => {
          const isActive = user.id === ACTIVE_USER_ID;
          return (
            <LeaderboardItem
              key={user.id}
              rank={idx + 1}
              name={user.name}
              score={user.score}
              avatar={user.avatar}
              active={isActive}
              onClick={() => onItemClick?.(user)}
              index={idx}
            />
          );
        })}
      </motion.ul>
    </div>
  );
}
