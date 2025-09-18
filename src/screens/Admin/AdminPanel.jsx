import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import PollRoundedIcon from '@mui/icons-material/PollRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';

import { setHeader } from '@/store/slices/uiSlice';
import styles from './AdminPanel.module.css';

const rows = [
  {
    id: 'contests',
    title: 'Конкурсы',
    leftIcon: <EmojiEventsRoundedIcon />,
    right: 'plus',
    to: '/admin/contests',
  },
  {
    id: 'surveys',
    title: 'Опросы',
    leftIcon: <PollRoundedIcon />,
    right: 'plus',
    to: '/admin/surveys',
  },
  {
    id: 'winners',
    title: 'Победители',
    leftIcon: <MilitaryTechRoundedIcon />,
    right: 'chev',
    to: '/admin/winners',
  },
  {
    id: 'merch',
    title: 'Мерчандайз',
    leftIcon: <StorefrontRoundedIcon />,
    right: 'chev',
    to: '/admin/merch',
  },
  {
    id: 'reports',
    title: 'Отчётность',
    leftIcon: <AssessmentRoundedIcon />,
    right: 'chev',
    to: '/admin/reports',
  },
];

export default function AdminPanel() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setHeader({ title: 'ПАНЕЛЬ АДМИНИСТРАТОРА', avatar: '' }));
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <ul className={styles.list}>
          {rows.map((row, i) => (
            <motion.li
              key={row.id}
              className={styles.item}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.05 * i,
                type: 'spring',
                stiffness: 320,
                damping: 26,
              }}
            >
              <Link to={row.to} className={styles.row}>
                <span className={styles.leftIcon}>{row.leftIcon}</span>
                <span className={styles.title}>{row.title}</span>

                {row.right === 'plus' ? (
                  <span
                    className={`${styles.circleBtn} ${styles.plusBtn}`}
                    aria-hidden="true"
                  >
                    <AddRoundedIcon />
                  </span>
                ) : (
                  <span className={styles.circleBtn} aria-hidden="true">
                    <ChevronRightRoundedIcon />
                  </span>
                )}
              </Link>
              <div className={styles.underline} />
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
