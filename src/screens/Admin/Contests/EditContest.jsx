import { useContext, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { UIContext } from '@contexts/ui-context';
import { motion } from 'framer-motion';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import LanguageRoundedIcon from '@mui/icons-material/LanguageRounded';

import styles from './CreateContest.module.css'; // переиспользуем стили создания

export default function EditContest() {
  const { setHeader, avatars } = useContext(UIContext);
  const navigate = useNavigate();
  const location = useLocation();
  const { id } = useParams();

  // получаем данные конкурса: из location.state (пришли из списка)
  // или дефолты (если открыли по прямой ссылке)
  const initial = useMemo(() => {
    const fromState = location.state && typeof location.state === 'object' ? location.state : null;
    return fromState ?? {
      id,
      title: '',
      starsJoin: '',
      starsWin: '',
      period: '',
      locale: 'all',
      lang: 'ru',
      subtitle: '',
    };
  }, [location.state, id]);

  const [form, setForm] = useState({
    title: initial.title,
    starsJoin: initial.starsJoin,
    starsWin: initial.starsWin,
    period: initial.period,
    locale: initial.locale ?? 'all',
    lang: initial.lang ?? 'ru',
  });

  useEffect(() => {
    setHeader({ title: 'Редактирование конкурса', avatar: avatars?.female });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const save = (e) => {
    e.preventDefault();
    // TODO: вызов API для сохранения
    console.log('save contest', { id, ...form });
    navigate(-1); // назад к списку
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <button className={styles.back} onClick={() => navigate(-1)} type="button">
          <ArrowBackIosNewRoundedIcon />
        </button>
        <div className={styles.hTitle}>Редактирование конкурса</div>
      </div>

      <motion.form
        className={styles.form}
        onSubmit={save}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div className={styles.row}>
          <label className={styles.label}>Название</label>
          <input
            className={styles.input}
            value={form.title}
            onChange={update('title')}
            placeholder=""
          />

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
          <input className={styles.input} value={form.starsJoin} onChange={update('starsJoin')} inputMode="numeric" />
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Звезды за победу</label>
          <input className={styles.input} value={form.starsWin} onChange={update('starsWin')} inputMode="numeric" />
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Срок проведения</label>
          <input className={styles.input} value={form.period} onChange={update('period')} placeholder="DDMM / YYYY" />
        </div>

        <div className={styles.row}>
          <label className={styles.label}>Локация</label>
          <select className={styles.selectWide} value={form.locale} onChange={update('locale')}>
            <option value="all">All</option>
            <option value="hq">HQ</option>
            <option value="minsk">Minsk</option>
          </select>
        </div>

        <div className={styles.footer}>
          <button type="submit" className={styles.btnPrimary}>Сохранить</button>
          <button type="button" className={styles.btnGhost} onClick={() => navigate(-1)}>Отмена</button>
        </div>
      </motion.form>
    </div>
  );
}
