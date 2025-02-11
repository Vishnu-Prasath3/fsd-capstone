import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
	plugins: [react()],
	server: {
	  proxy: {
		'/api': 'https://fsd-capstone.onrender.com', // Change 5000 to your backend port
	  },
	},
  });
  