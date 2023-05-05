import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
export const store = createPinia()

export function setupStore(app: App) {
  app.use(store)
}

store.use(piniaPluginPersistedstate)
