import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { setHeader } from '@/store/slices/uiSlice';
import { adminSurveys as MOCK } from '@/mocks/admin';
import styles from './AdminSurveys.module.css';

export default function AdminSurveys() {
  const dispatch = useDispatch();
  const [items, setItems] = useState(MOCK);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setHeader({ title: 'Опросы', avatar: '' }));
  }, [dispatch]);

  const remove = (id) => setItems((x) => x.filter((i) => i.id !== id));

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate(-1)} aria-label="Назад">
          <ArrowBackIosNewRoundedIcon />
        </button>
        <div className={styles.hTitle}>Опросы</div>
        <div className={styles.hActions}>
          <button
            className={styles.circle}
            onClick={() => navigate('/admin/surveys/create')}
            aria-label="Создать"
          >
            <AddRoundedIcon />
          </button>
          <button className={styles.circle} aria-label="Свернуть">
            <RemoveRoundedIcon />
          </button>
        </div>
      </div>

      <ul className={styles.list}>
        {items.map((it, i) => (
          <motion.li
            key={it.id}
            className={styles.row}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 320, damping: 26 }}
          >
            <div className={styles.texts}>
              <div className={styles.title}>{it.title}</div>
              <div className={styles.subtitle}>{it.subtitle}</div>
            </div>
            <button
              className={styles.delete}
              onClick={() => remove(it.id)}
              aria-label="Удалить"
            >
              <DeleteRoundedIcon />
            </button>
            <div className={styles.under} />
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
