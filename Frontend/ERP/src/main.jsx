import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ContextBody } from './components/Context/Context'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ContextBody>
    <App />
  </ContextBody>
)
