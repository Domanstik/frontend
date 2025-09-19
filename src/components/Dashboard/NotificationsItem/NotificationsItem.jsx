import { motion } from 'framer-motion';
import styles from './NotificationsItem.module.css';

export default function NotificationsItem({ title, date, onClick, isFirst = false, variants, customDelay = 0 }) {
  return (
    <>
      <motion.li
        className={styles.item}
        variants={variants}
        transition={{ delay: customDelay }}
      >
        <motion.button
          className={`${styles.button} ${isFirst ? styles.buttonFirst : ''}`}
          onClick={onClick}
          whileTap={{ scale: 0.98 }}
          whileHover={{ y: -1 }}
        >
          <div className={`${styles.content} ${isFirst ? styles.contentFirst : ''}`}>
            <div className={styles.title}>{title}</div>
          </div>
          <div className={`${styles.date} ${isFirst ? styles.dateFirst : ''}`}>{date}</div>
        </motion.button>
      </motion.li>
      <div className={styles.divider} />
    </>
  );
}
