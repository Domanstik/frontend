import { useEffect } from 'react';

export default function TelegramProvider({ children }) {
  useEffect(() => {
    window.Telegram?.WebApp?.ready();
  }, []);

  return children;
}
