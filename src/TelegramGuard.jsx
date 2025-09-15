import React from 'react';

export default function TelegramGuard({ children }) {
  const isTelegram = typeof window !== 'undefined'
    && window.Telegram
    && window.Telegram.WebApp;

  if (!isTelegram) {
    // Можно просто показать заглушку:
    return (
      <div style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.25rem',
        background: '#fff',
        color: '#111569',
        textAlign: 'center',
        padding: '2rem',
      }}>
        Это приложение можно открыть только<br />в Telegram
      </div>
    );
    // Или редиректнуть пользователя, если нужно:
    // window.location.replace('https://t.me/YourBotName');
    // return null;
  }

  return children;
}
