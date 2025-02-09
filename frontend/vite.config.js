import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
      target: 'https://fsd-capstone.onrender.com',
      changeOrigin: true,
      secure:false,
      rewrite: (path) => path.replace( '/^\/api/', ""), // Remove "/api" from the path
    },
  },
}
});
