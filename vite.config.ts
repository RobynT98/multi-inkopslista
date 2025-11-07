import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import { VitePWA } from "vite-plugin-pwa"

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      srcDir: "src",
      filename: "sw.ts",
      strategies: "injectManifest",
      manifest: {
        name: "Multi-lnkopslista",
        short_name: "Inköpslistor",
        description: "Vardagslistor och önskelistor med länkar, bilder och offline-stöd.",
        start_url: ".",
        display: "standalone",
        background_color: "#0b0f14",
        theme_color: "#1f2937",
        icons: [
          { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
          { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any maskable" }
        ]
      }
    })
  ]
})