import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from "node:url";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        workspace: fileURLToPath(new URL('./index.html', import.meta.url)),
        shop: fileURLToPath(new URL('./shop.html', import.meta.url)),
        adminLab: fileURLToPath(new URL('./admin-lab.html', import.meta.url)),
      },
    },
  },
  optimizeDeps: {
    include: ["react", "react-dom/client"],
  },
  server: {
    host: "127.0.0.1",
  },
  plugins: [react()],
});
