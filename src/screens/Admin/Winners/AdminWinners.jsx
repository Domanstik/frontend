import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import { setHeader } from '@/store/slices/uiSlice';
import { adminWinners as MOCK } from '@/mocks/admin';
import styles from './AdminWinners.module.css';

export default function AdminWinners() {
  const dispatch = useDispatch();
  const [items] = useState(MOCK);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setHeader({ title: 'Победители', avatar: '' }));
  }, [dispatch]);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowBackIosNewRoundedIcon />
        </button>
        <div className={styles.hTitle}>Победители</div>
      </div>

      <ul className={styles.list}>
        {items.map((it, i) => (
          <motion.li
            key={it.id}
            className={styles.row}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 320, damping: 26 }}
            onClick={() => navigate(`/admin/winners/${it.id}`, { state: it })}
            role="button"
            tabIndex={0}
          >
            <div className={styles.title}>{it.title}</div>
            <div className={styles.subtitle}>{it.subtitle}</div>
            <div className={styles.under} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
