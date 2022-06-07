import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import * as path from "path";
import viteCompression from "vite-plugin-compression";

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    global: {
      CodeMirror: "CodeMirror"
    }
  },
  plugins: [svelte(), viteCompression()],
  resolve: {
    alias: {
      "node-fetch": "isomorphic-fetch",
      "@": path.resolve(__dirname, "./src")
    },
  },
  build: {
    outDir: '../docs',
    minify: "terser"
  }
})
