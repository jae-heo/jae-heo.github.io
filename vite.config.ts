import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/jae-heo.github.io/', // 'react-blog'는 GitHub 저장소 이름. 필요에 따라 변경하세요.
})