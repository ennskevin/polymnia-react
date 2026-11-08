import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    proxy: {
      "/polymnia/api": {
        target: mode === 'development'
          ? "http://localhost:8080"
          : "http://polymnia-api-alb-635866723.us-east-2.elb.amazonaws.com",
        changeOrigin: true,
      }
    }
  },
  base: "/polymnia/"
}))