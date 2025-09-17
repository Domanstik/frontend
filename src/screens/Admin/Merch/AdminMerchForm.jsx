import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import StarRoundedIcon from '@mui/icons-material/StarRounded';

import { UIContext } from '@contexts/ui-context';
import styles from './AdminMerchForm.module.css';

export default function AdminMerchForm() {
  const { id } = useParams();               // "new" нет — тогда будет undefined
  const { state } = useLocation();          // пришли из списка — объект товара
  const navigate = useNavigate();
  const { setHeader, avatars } = useContext(UIContext);

  useEffect(() => {
    setHeader(prev => {
      if (prev?.title === 'Карточка мерча' && prev?.avatar === avatars?.female) return prev;
      return { title: 'Карточка мерча', avatar: avatars?.female };
    });
  }, [setHeader, avatars]);

  const isEdit = Boolean(id);
  const initial = useMemo(
    () => state ?? { title: '', price: 0, description: '', image: '' },
    [state]
  );

  const [title, setTitle] = useState(initial.title);
  const [price, setPrice] = useState(initial.price);
  const [description, setDescription] = useState(initial.description);
  const [image, setImage] = useState(initial.image);

  const fileRef = useRef(null);

  const onPick = () => fileRef.current?.click();
  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setImage(url);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // сюда добавишь вызов API
    navigate('/admin/merch');
  };

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <button className={styles.backBtn} onClick={() => navigate(-1)}>
          <ArrowBackIosNewRoundedIcon /> Назад
        </button>
        <button className={styles.iconBtn} onClick={onPick} title="Загрузить фото">
          <EditRoundedIcon />
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={onFile} />
      </div>

      <motion.form
        className={styles.form}
        onSubmit={onSubmit}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 320, damping: 26 }}
      >
        <div className={styles.preview} onClick={onPick} role="button" tabIndex={0}>
          {image ? <img src={image} alt="" /> : <span>Загрузить фото</span>}
        </div>

        <div className={styles.titleRow}>
          <input
            className={styles.price}
            type="number"
            min="0"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <StarRoundedIcon className={styles.star} />
          <input
            className={styles.title}
            placeholder="Название товара"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <label className={styles.label}>Описание товара</label>
        <textarea
          className={styles.textarea}
          rows={3}
          placeholder="Описание товара"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className={styles.actions}>
          <button className={styles.ok} type="submit">{isEdit ? 'Сохранить' : 'Ок'}</button>
          <button className={styles.cancel} type="button" onClick={() => navigate('/admin/merch')}>Отмена</button>
        </div>
      </motion.form>
    </div>
  );
}
