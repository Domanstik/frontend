import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ContestsCard from '../ContestsCard/ContestsCard';
import styles from './ContestsList.module.css';

const MOCK = [
  { id: '1', kind: 'contest', title: 'Участие в съёмках для соц. сетей', subtitle: 'Участие в одном ролике', participation: 1, win: 3, daysLeft: 7 },
  { id: '2', kind: 'contest', title: 'Идеи для соц. сетей', subtitle: '1 идея (реализованная)', participation: 2, win: 3, daysLeft: 10 },
  { id: '3', kind: 'contest', title: 'Участие в фотоконкурсе “8 марта”', subtitle: '', participation: 1, win: 3, daysLeft: 4 },
  { id: '4', kind: 'survey',  title: 'Опрос', subtitle: '', participation: 1, win: 2, daysLeft: 4 },
];


const listVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

export default function ContestsList({ items = [], onOpenContest }) {
  const navigate = useNavigate();

  const handleClick = (it) => {
    if (it.kind === 'survey') {
      // экран прохождения опроса
      navigate(`/survey/${it.id}`, { state: it });
    } else {
      // конкурс — открой шит/попап или переходи на страницу конкурса
      onOpenContest?.(it);
      // или так, если у тебя есть страница конкурса:
      // navigate(`/contests/${it.id}`, { state: it });
    }
  };

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
            onClick={() => handleClick(it)}
          />
        ))}
      </motion.div>
    </div>
  );
}
