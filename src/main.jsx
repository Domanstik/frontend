// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';        // <-- исправлено
import App from './App';
import store from './store';

import './styles/globals.css';
import './styles/tokens.css';
import './styles/themes.css';

// main.jsx (фрагмент — добавь перед ReactDOM.createRoot)
import { hydrateFromVault as hydrateInternal } from './store/slices/authSlice';
import { hydrateExternalFromVault, rpcEnsureSession } from './store/slices/externalSlice';

store.dispatch(hydrateInternal());
store.dispatch(hydrateExternalFromVault());
store.dispatch(rpcEnsureSession()); // тихо попробуем получить/обновить session_jwt



import bgDay from '@images/background_day.svg';
document.documentElement.style.setProperty('--app-bg-image', `url(${bgDay})`);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
