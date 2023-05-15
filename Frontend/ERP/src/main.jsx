import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css';
import { ContextBody } from './components/Context/Context';
import { AdminProvider } from './components/Context/AdminContext';
import { EmployeeProvider } from './components/Context/EmployeeeContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextBody>
    <AdminProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </AdminProvider>
  </ContextBody>
);
