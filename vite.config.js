import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  base: "/displaynoise/",
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
