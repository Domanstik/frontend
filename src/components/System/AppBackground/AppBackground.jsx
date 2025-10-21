import './AppBackground.css';

/**
 * Фиксированный слой фона приложения.
 * Использует CSS-переменную --app-bg-image, которую ты задаёшь в main.jsx.
 * Ничего не перехватывает (pointer-events: none) и всегда под всем (z-index: 0).
 */
export default function AppBackground() {
  return (
    <div className="app-bg" aria-hidden />
  );
}

