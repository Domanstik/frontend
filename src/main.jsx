import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from '@reduxjs/toolkit';
import App from './App';
import store from './store';
import './styles/globals.css';

import bgDay from '@assets/images/background_day.svg';
document.documentElement.style.setProperty('--app-bg-image', `url(${bgDay})`);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
