import React from 'react';
import ReactDOM from 'react-dom/client';
// 1. IMPORTACIÓN CORREGIDA: Ahora importamos el archivo base 'index.css'.
import './index.css';
import './Styles/Globals.css';
// i18n (internationalization) initialization
import './i18n';

import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();