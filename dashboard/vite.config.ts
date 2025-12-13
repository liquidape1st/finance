import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dynamicImport from 'vite-plugin-dynamic-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    babel: {
      plugins: [
        'babel-plugin-macros'
      ]
    }
  }),
  dynamicImport()],
  assetsInclude: ['**/*.md'],
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src'),
    },
  },
  server: {
    port: 8268, // <-- đổi số này theo ý bạn
    open: true, // optional: tự mở trình duyệt
  },
  preview: {
    port: 8268
  },
  build: {
    outDir: 'build'
  }
});
