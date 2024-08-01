// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './pages/App';
import { UserProvider } from './context/UserContext';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <App />
    </UserProvider>
  </React.StrictMode>
);
