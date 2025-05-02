import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// Import stylesheets
import './styles/index.css'
// Make sure to import the layout-control.css file if you've created it separately
import './styles/components/layout-control.css'
// i18n setup
import './i18n.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)