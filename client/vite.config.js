import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { compression } from 'vite-plugin-compression2'

export default defineConfig({
  plugins: [
    react(), 
    compression(),
    compression({ algorithm: 'brotliCompress', exclude: [/\.(br)$/, /\.(gz)$/], deleteOriginalAssets: true })
  ],
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
          vendor: ["axios", "react-icons"],
          shared: ["react", "react-dom"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
});
