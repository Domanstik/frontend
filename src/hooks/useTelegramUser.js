import { useEffect, useState } from 'react';

export default function useTelegramUser() {
  const [user, setUser] = useState(null);
  const [meta, setMeta] = useState({ hasTG: false, hasInitData: false });

  useEffect(() => {
    const tg = window.Telegram?.WebApp;

    if (!tg) {
      const q = new URLSearchParams(window.location.search);
      if (q.get('mockTg') === '1') {
        const username = (q.get('u') || 'Domanstik').replace(/^@/, '');
        const id = Number(q.get('id') || '645370433');
        setUser({ id, username, first_name: 'Demo', last_name: '', photo_url: q.get('photo') || '' });
      }
      setMeta({ hasTG: false, hasInitData: false });
      return;
    }

    try { tg.ready(); tg.expand(); } catch {}

    const unsafe = tg.initDataUnsafe;
    const raw = tg.initData;

    setMeta({ hasTG: true, hasInitData: !!raw });

    if (unsafe?.user) {
      setUser(unsafe.user); // {id, username, first_name, last_name, photo_url?}
    } else {
      setUser(null);
    }
  }, []);

  return { user, meta };
}
