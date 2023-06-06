import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css';
import { ContextBody } from './Context/Context';
import { ProjectProvider } from './Context/ProjectContext';
import { TeamtProvider } from './Context/TeamContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextBody>
    <ProjectProvider>
      <TeamtProvider>
        <App />
      </TeamtProvider>
    </ProjectProvider>
  </ContextBody>
);
