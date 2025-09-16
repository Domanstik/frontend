import { useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import styles from './AdminPanel.module.css';

import AddRoundedIcon from '@mui/icons-material/AddRounded';
import ChevronRightRoundedIcon from '@mui/icons-material/ChevronRightRounded';
import EmojiEventsRoundedIcon from '@mui/icons-material/EmojiEventsRounded';
import PollRoundedIcon from '@mui/icons-material/PollRounded';
import MilitaryTechRoundedIcon from '@mui/icons-material/MilitaryTechRounded';
import StorefrontRoundedIcon from '@mui/icons-material/StorefrontRounded';
import AssessmentRoundedIcon from '@mui/icons-material/AssessmentRounded';

import { UIContext } from '@contexts/ui-context';
import { Link } from 'react-router-dom';

const rows = [
  { id: 'contests',    title: 'Конкурсы',   leftIcon: <EmojiEventsRoundedIcon/>,  right: 'plus' },
  { id: 'surveys',     title: 'Опросы',     leftIcon: <PollRoundedIcon/>,         right: 'plus' },
  { id: 'winners',     title: 'Победители', leftIcon: <MilitaryTechRoundedIcon/>, right: 'chev' },
  { id: 'merch',       title: 'Мерчандайз', leftIcon: <StorefrontRoundedIcon/>,   right: 'chev' },
  { id: 'reports',     title: 'Отчётность', leftIcon: <AssessmentRoundedIcon/>,   right: 'chev' },
];

export default function AdminPanel() {
  const { setHeader, avatars } = useContext(UIContext);

  useEffect(() => {
    setHeader(prev => {
      if (prev?.title === 'ПАНЕЛЬ АДМИНИСТРАТОРА' && prev?.avatar === avatars?.female) return prev;
      return { title: 'ПАНЕЛЬ АДМИНИСТРАТОРА', avatar: avatars?.female };
    });
  }, [setHeader, avatars]);

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
              transition={{ delay: 0.05 * i, type: 'spring', stiffness: 320, damping: 26 }}
            >
              {/* при необходимости подставь реальные маршруты в to= */}
              <Link to="#" className={styles.row} onClick={(e)=>e.preventDefault()}>
                <span className={styles.leftIcon}>{row.leftIcon}</span>
                <span className={styles.title}>{row.title}</span>

                {row.right === 'plus' ? (
                  <span className={`${styles.circleBtn} ${styles.plusBtn}`}>
                    <AddRoundedIcon/>
                  </span>
                ) : (
                  <span className={styles.circleBtn}>
                    <ChevronRightRoundedIcon/>
                  </span>
                )}
              </Link>
              <div className={styles.underline}/>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
