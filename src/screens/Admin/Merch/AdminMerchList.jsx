import { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import RemoveRoundedIcon from '@mui/icons-material/RemoveRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import { UIContext } from '@contexts/ui-context';
import styles from './AdminMerchList.module.css';

const MOCK = [
  { id: 'p1', title: 'Футболка', price: 3, image: '' },
  { id: 'p2', title: 'Кружка',    price: 5, image: '' },
  { id: 'p3', title: 'Кепка',     price: 10, image: '' },
  { id: 'p4', title: 'Рюкзак',    price: 25, image: '' },
];

export default function AdminMerchList() {
  const { setHeader, avatars } = useContext(UIContext);
  const [items, setItems] = useState(MOCK);
  const [removeMode, setRemoveMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setHeader(prev => {
      if (prev?.title === 'Мерчандайз' && prev?.avatar === avatars?.female) return prev;
      return { title: 'Мерчандайз', avatar: avatars?.female };
    });
  }, [setHeader, avatars]);

  const onRemove = (id) => setItems(arr => arr.filter(x => x.id !== id));

  return (
    <div className={styles.page}>
      <div className={styles.toolbar}>
        <button className={styles.leftBtn} onClick={() => navigate(-1)}>
          <ArrowBackIosNewRoundedIcon /> Назад
        </button>

        <div className={styles.toolsRight}>
          <button className={styles.iconBtn} onClick={() => navigate('/admin/merch/new')}>
            <AddRoundedIcon />
          </button>
          <button
            className={`${styles.iconBtn} ${removeMode ? styles.iconBtnActive : ''}`}
            onClick={() => setRemoveMode(v => !v)}
          >
            <RemoveRoundedIcon />
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {items.map((it, i) => (
          <motion.div
            key={it.id}
            className={styles.card}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05, type: 'spring', stiffness: 320, damping: 26 }}
            onClick={() => navigate(`/admin/merch/${it.id}/edit`, { state: it })}
          >
            <div className={styles.imgStub} />
            <div className={styles.priceRow}>
              <span className={styles.price}>{it.price}</span>
              <StarRoundedIcon className={styles.star} />
            </div>

            {removeMode && (
              <button
                className={styles.minusBadge}
                onClick={(e) => { e.stopPropagation(); onRemove(it.id); }}
                aria-label="Удалить"
              >
                <RemoveRoundedIcon />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
