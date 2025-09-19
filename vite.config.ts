import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [vue()],
  base: mode === "production" ? "/covid-19/" : "/",
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false, // Disable sourcemaps in production for security
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router", "vuex"],
          charts: ["chart.js", "vue-chartjs"],
          utils: ["axios"],
        },
      },
    },
    // Security: Minify code
    minify: "terser",
  },
  server: {
    port: 5174,
    open: true,
  },
  preview: {
    port: 4173,
    open: true,
  },
}));
