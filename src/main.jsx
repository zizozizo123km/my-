import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Use the modern concurrent root API for better performance and future compatibility
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode enables checks and warnings for potential problems in an application
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)