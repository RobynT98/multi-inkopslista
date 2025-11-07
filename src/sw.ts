// Minimal service worker (vite-plugin-pwa fyller i assets vid build)
self.addEventListener("install", () => {})
self.addEventListener("activate", (e: any) => self.clients?.claim?.())