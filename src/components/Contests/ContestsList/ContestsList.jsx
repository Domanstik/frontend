import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ContestsCard from '../ContestsCard/ContestsCard';
import { listStagger, fadeInUp } from '../../../lib/motionConfig';
import styles from './ContestsList.module.css';

export default function ContestsList({ items = [], onOpenContest }) {
  const navigate = useNavigate();
  const handleClick = (it) =>
    it.kind === 'survey'
      ? navigate(`/survey/${it.id}`, { state: it })
      : onOpenContest?.(it);

  return (
    <div className={styles.wrap} data-hide-on-sheet>   {/* ⬅️ добавили */}
      <motion.div
        className={styles.stack}
        variants={listStagger}
        initial="hidden"
        animate="show"
      >
        {items.map((it) => (
          <motion.div key={it.id} variants={fadeInUp} className={styles.item}>
            <ContestsCard
              title={it.title}
              subtitle={it.subtitle}
              participation={it.participation}
              win={it.win}
              daysLeft={it.daysLeft}
              active={!!it.active}
              onClick={() => handleClick(it)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
