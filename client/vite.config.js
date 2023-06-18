import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api/v1/": {
        target: "http://localhost:5000/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["axios"],
          shared: ["react", "react-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
