import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource-variable/source-serif-4';
import App from './App';
import { LocaleProvider } from './locale';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>,
);
