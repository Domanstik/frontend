import { motion } from 'framer-motion';
import { fadeInUp, listStagger } from '../../../lib/motionConfig';
import NotificationsItem from '../NotificationsItem/NotificationsItem';
import styles from './NotificationsList.module.css';

export default function NotificationsList({ items = [], onItemClick }) {
  return (
    <div className={styles.root}>
      <motion.ul
        className={styles.list}
        variants={listStagger}
        initial="hidden"
        animate="show"
      >
        {items.map((n, i) => (
          <NotificationsItem
            key={n.id}
            title={n.title}
            date={n.date}
            onClick={() => onItemClick?.(n)}
            variants={fadeInUp}
            customDelay={i * 0.04}
          />
        ))}
      </motion.ul>
    </div>
  );
}
