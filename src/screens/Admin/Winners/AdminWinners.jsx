import { useContext, useEffect, useState } from 'react';
import { UIContext } from '@contexts/ui-context';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import styles from './AdminWinners.module.css';

const MOCK = [
  { id: 'w1', title: 'Участие в съёмках для соц.сетей', subtitle: '7 дн.' },
  { id: 'w2', title: 'Фото-конкурс «8 марта»', subtitle: '3 дн.' },
];

export default function AdminWinners() {
  const { setHeader, avatars } = useContext(UIContext);
  const [items] = useState(MOCK);
  const navigate = useNavigate();

  useEffect(() => {
    setHeader({ title: 'Победители', avatar: avatars?.female });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate(-1)}>
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
