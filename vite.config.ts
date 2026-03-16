import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "polymnia/api": "http://polymnia-api-alb-635866723.us-east-2.elb.amazonaws.com"
    }
  },
  // base: "/polymnia/"
})
