import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);

// Register Progressive Web App Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log(' PWA Service Worker muvaffaqiyatli ro\'yxatdan o\'tdi:', registration.scope);
      })
      .catch((error) => {
        console.error(' PWA Service Worker ro\'yxatdan o\'tishda xatolik:', error);
      });
  });
}

