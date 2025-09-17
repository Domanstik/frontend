import { useContext, useEffect, useState } from 'react';
import { UIContext } from '@contexts/ui-context';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

import styles from './AdminSurveys.module.css';

const MOCK = [{ id: 's1', title: 'Новый опрос 1', subtitle: 'время опроса' }];

export default function AdminSurveys() {
  const { setHeader, avatars } = useContext(UIContext);
  const [items, setItems] = useState(MOCK);
  const navigate = useNavigate();

  useEffect(() => {
    setHeader({ title: 'Опросы', avatar: avatars?.female });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
