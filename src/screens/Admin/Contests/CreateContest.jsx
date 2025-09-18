import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';
import { setHeader } from '@/store/slices/uiSlice';
import styles from './CreateContest.module.css';

export default function CreateContest() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    starsJoin: '',
    starsWin: '',
    period: '',
    locale: 'all',
    lang: 'ru',
  });

  useEffect(() => {
    dispatch(setHeader({ title: 'Создание конкурса', avatar: '' }));
  }, [dispatch]);
  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    console.log('create contest', form);
    navigate(-1);
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate(-1)}>
          <ArrowBackIosNewRoundedIcon />
        </button>
        <div className={styles.hTitle}>Создание конкурса</div>
      </div>
      <motion.form
        className={styles.form}
        onSubmit={submit}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className={styles.row}>
          <label className={styles.label}>Название</label>
          <input className={styles.input} value={form.title} onChange={update('title')} />
          <label className={`${styles.label} ${styles.right}`}>Язык</label>
          <div className={styles.lang}>
            <LanguageRoundedIcon className={styles.langIcon} />
            <select className={styles.select} value={form.lang} onChange={update('lang')}>
              <option value="ru">Рус 🇷🇺</option>
              <option value="en">Eng 🇬🇧</option>
              <option value="pl">Pol 🇵🇱</option>
            </select>
          </div>
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Звезды за участие</label>
          <input
            className={styles.input}
            value={form.starsJoin}
            onChange={update('starsJoin')}
            inputMode="numeric"
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Звезды за победу</label>
          <input
            className={styles.input}
            value={form.starsWin}
            onChange={update('starsWin')}
            inputMode="numeric"
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Срок проведения</label>
          <input
            className={styles.input}
            value={form.period}
            onChange={update('period')}
            placeholder="DDMM / YYYY"
          />
        </div>
        <div className={styles.row}>
          <label className={styles.label}>Локация</label>
          <select
            className={styles.selectWide}
            value={form.locale}
            onChange={update('locale')}
          >
            <option value="all">All</option>
            <option value="hq">HQ</option>
            <option value="minsk">Minsk</option>
          </select>
        </div>
        <div className={styles.footer}>
          <button type="submit" className={styles.btnPrimary}>
            Ок
          </button>
          <button type="button" className={styles.btnGhost} onClick={() => navigate(-1)}>
            Отмена
          </button>
        </div>
      </motion.form>
    </div>
  );
}
