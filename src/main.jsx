import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import App from './App';
import store from './store';

import './styles/globals.css';
import './styles/tokens.css';
import './styles/themes.css';

// Гидрация хранилищ
import { hydrateFromVault as hydrateInternal } from './store/slices/authSlice';
import { hydrateExternalFromVault, rpcEnsureSession } from './store/slices/externalSlice';

store.dispatch(hydrateInternal());
store.dispatch(hydrateExternalFromVault());
store.dispatch(rpcEnsureSession());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
