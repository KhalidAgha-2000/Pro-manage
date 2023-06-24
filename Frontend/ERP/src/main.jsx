import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App';
import './index.css';
import { ContextBody } from './Context/Context';
import axios from 'axios'

axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextBody>
    <App />
  </ContextBody>
);
