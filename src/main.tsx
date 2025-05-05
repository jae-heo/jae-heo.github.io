import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import './styles/global.css'

// i18n setup
import './i18n.ts'

import { Buffer } from 'buffer'

declare global {
  interface Window {
    Buffer: typeof Buffer;
  }
}

window.Buffer = Buffer

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)