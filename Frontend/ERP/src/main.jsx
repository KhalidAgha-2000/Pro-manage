import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { ContextBody } from './components/Context/Context';
import { AdminProvider } from './components/Context/AdminContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextBody>
    <AdminProvider>
      <App />
    </AdminProvider>
  </ContextBody>
);
