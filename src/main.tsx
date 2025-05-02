import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
// 기존 index.css 대신 새로운 스타일 파일 사용
import './styles/index.css'
// i18n 설정 가져오기
import './i18n.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)