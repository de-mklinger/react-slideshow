import { resolve } from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      include: "./src/lib/",
      rollupTypes: true
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/lib/index.ts"),
      formats: ["es"]
    },
    rollupOptions: {
      external: ["react", "react/jsx-runtime", "react-dom", "@emotion/css"]
    }
  }
})
