import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css';
import { ContextBody } from './Context/Context';
import { AdminProvider } from './Context/AdminContext';
import { EmployeeProvider } from './Context/EmployeeeContext';
import { ProjectProvider } from './Context/ProjectContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextBody>
    <AdminProvider>
      <EmployeeProvider>
        <ProjectProvider>
          <App />
        </ProjectProvider>
      </EmployeeProvider>
    </AdminProvider>
  </ContextBody>
);
