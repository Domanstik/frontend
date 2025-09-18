import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import { setHeader } from '@/store/slices/uiSlice';
import { adminContests as MOCK } from '@/mocks/admin';
import styles from './AdminContests.module.css';

export default function AdminContests() {
  const dispatch = useDispatch();
  const [items, setItems] = useState(MOCK);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(setHeader({ title: 'Конкурсы', avatar: '' }));
  }, [dispatch]);

  const remove = (id) => setItems((arr) => arr.filter((x) => x.id !== id));
  const openEdit = (item) => navigate(`/admin/contests/${item.id}/edit`, { state: item });

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button
          className={styles.back}
          onClick={() => navigate(-1)}
          type="button"
          aria-label="Назад"
        >
          <ArrowBackIosNewRoundedIcon />
        </button>
        <div className={styles.hTitle}>Конкурсы</div>
        <div className={styles.hActions}>
          <button
            className={styles.circle}
            onClick={() => navigate('/admin/contests/create')}
            type="button"
            aria-label="Создать конкурс"
          >
            <AddRoundedIcon />
          </button>
          <button className={styles.circle} type="button" aria-label="Свернуть">
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
            onClick={() => openEdit(it)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openEdit(it)}
          >
            <div className={styles.texts}>
              <div className={styles.title}>{it.title}</div>
              <div className={styles.subtitle}>{it.subtitle}</div>
            </div>

            <button
              className={styles.delete}
              onClick={(e) => {
                e.stopPropagation();
                remove(it.id);
              }}
              aria-label="Удалить"
              type="button"
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
