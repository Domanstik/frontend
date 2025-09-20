import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StarIcon from '@mui/icons-material/Star';

import { setHeader } from '@/store/slices/uiSlice';
import { fetchProfile, selectBalance } from '@/store/slices/externalSlice';
import useTelegramUser from '@/hooks/useTelegramUser';

import {
  uploadFromUrl,
  upsertProfile,
  getProfileRow,
} from '@/services/imageStorage';

import styles from './Dashboard.module.css';

// Бакет и шаблон пути для аватарок
const AVATARS_BUCKET = 'avatars';           // создай public bucket в Supabase
const avatarPath = (id) => `u/${id}`;       // будет u/<id>/<file>

export default function Dashboard() {
  const dispatch = useDispatch();
  const balance = useSelector(selectBalance);

  // Telegram user
  const { user: tgUser } = useTelegramUser();

  const [displayName, setDisplayName] = useState('—');
  const [avatarUrl, setAvatarUrl] = useState('');

  // 1) Подтянуть профиль/баланс из внешнего RPC
  useEffect(() => {
    dispatch(fetchProfile()); // { fio, balance }
  }, [dispatch]);

  // 2) Имя + аватар: берём из TG; если можно — кладём копию в Supabase и используем публичную ссылку
  useEffect(() => {
    let cancelled = false;

    (async () => {
      if (!tgUser?.id) return;

      const fullName =
        [tgUser.first_name, tgUser.last_name].filter(Boolean).join(' ') ||
        tgUser.username ||
        `tg_${tgUser.id}`;
      if (!cancelled) setDisplayName(fullName);

      // уже есть запись в supabase?
      try {
        const row = await getProfileRow(tgUser.id);
        if (row?.avatar_url) {
          if (!cancelled) setAvatarUrl(row.avatar_url);
          // и обновим шапку
          dispatch(setHeader({ title: 'Дашборд', avatar: row.avatar_url }));
          return;
        }
      } catch {
        // молча пропускаем
      }

      // если в Telegram есть фотка — попробуем залить копию в Supabase
      if (tgUser.photo_url) {
        try {
          const { url } = await uploadFromUrl({
            bucket: AVATARS_BUCKET,
            url: tgUser.photo_url,
            fileName: `avatar_${tgUser.id}`,
            destFolder: avatarPath(tgUser.id),
          });
          await upsertProfile({ id: tgUser.id, username: fullName, avatarUrl: url });
          if (!cancelled) setAvatarUrl(url);
          dispatch(setHeader({ title: 'Дашборд', avatar: url }));
          return;
        } catch {
          // бывает CORS у TG — тогда fallback на прямой URL
        }
      }

      // fallback: используем прямой TG url или плейсхолдер
      const fallback = tgUser.photo_url || '';
      if (!cancelled) setAvatarUrl(fallback);
      dispatch(setHeader({ title: 'Дашборд', avatar: fallback }));
    })();

    return () => { cancelled = true; };
  }, [tgUser, dispatch]);

  // 3) мемо для UI
  const balanceText = useMemo(() => (Number.isFinite(balance) ? balance : 0), [balance]);

  return (
    <div className={styles.page}>
      <div className={styles.headerSpacer} />

      <div className={styles.name}>{displayName}</div>

      <div className={styles.card}>
        <div className={styles.counter}>{balanceText}</div>
        <StarIcon className={styles.star} />
      </div>

      <div className={styles.actions}>
        <a className={styles.link} href="/notifications">Уведомления</a>
      </div>

      {/* декоративный аватар в хедере (если у тебя этот проп используется в HeaderDashboard — он уже заполнен через setHeader) */}
      {avatarUrl ? <img src={avatarUrl} alt="" className={styles.hiddenAvatarPreload} /> : null}
    </div>
  );
}
