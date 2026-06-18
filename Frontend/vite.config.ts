import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tanstackStart(), react(), tailwindcss()],

  resolve: {
    alias: {
      // Changed __dirname to import.meta.dirname
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },

  server: {
    host: true,
    port: 8080,

    proxy: {
      "/api": {
        target: "http://localhost:10000",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    target: "esnext",
  },
});