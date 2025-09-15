import React from 'react';
import { motion } from 'framer-motion';
import ContestsCard from '../ContestsCard/ContestsCard';
import styles from './ContestsList.module.css';

const MOCK = [
  { id: '1', title: 'Участие в съёмках для соц. сетей', subtitle: 'Участие в одном ролике', participation: 1, win: 3, daysLeft: 7 },
  { id: '2', title: 'Идеи для соц. сетей', subtitle: '1 идея (реализованная)', participation: 2, win: 3, daysLeft: 10 },
  { id: '3', title: 'Участие в фотоконкурсе “8 марта”', subtitle: '', participation: 1, win: 3, daysLeft: 4 },
  { id: '4', title: 'Опрос', subtitle: '', participation: 1, win: 2, daysLeft: 4 },
];

const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export default function ContestsList({ items = MOCK, onJoin }) {
  return (
    <div className={styles.wrap}>
      <motion.div className={styles.stack} variants={listVariants} initial="hidden" animate="show">
        {items.map((it) => (
          <ContestsCard
            key={it.id}
            title={it.title}
            subtitle={it.subtitle}
            participation={it.participation}
            win={it.win}
            daysLeft={it.daysLeft}
            onClick={() => onJoin?.(it)}
          />
        ))}
      </motion.div>
    </div>
  );
}
