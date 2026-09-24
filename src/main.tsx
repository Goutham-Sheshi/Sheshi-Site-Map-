import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import logoUrl from './assets/logo.png'

// Ensure browser tab favicon updates immediately in local dev and iframe previews
const updateFavicon = (href: string) => {
  let link = document.querySelector<HTMLLinkElement>("link[rel~='icon']");
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.type = 'image/png';
  link.href = href;
};
updateFavicon(logoUrl);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

