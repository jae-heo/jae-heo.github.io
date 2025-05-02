import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// Use the consolidated CSS imports
import './index.css'
import './App.css'

// i18n setup
import './i18n.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)