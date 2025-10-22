import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'
import "@fortawesome/fontawesome-free/css/all.min.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n/i18next.js';

//import { AuthContextProvider } from './context/authcontext.jsx'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    
    <App />
    
  </React.StrictMode>
);

