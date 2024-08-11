import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
      // redirect api calls to server
      "/api":{
        target:"http://localhost:4500",
        secure:false
      }
    }
  }
})
