import { createApp } from 'vue'
import './style.css'
import './tailwind.css'
import 'normalize.css'
import 'nprogress/nprogress.css'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import registerElement from '@/utils/register-element'
import { testToken } from './api/info/api'
import localCache from '@/utils/cache'
const app = createApp(App)

const token = localCache.getCache('token')
if (token !== undefined && token !== null) {
  testToken().then((response: { status: number }) => {
    if (response.status !== 0) {
      localCache.deleteCache('token')
    }
  })
}
testToken()
setupStore(app)
setupRouter(app)
registerElement(app)
app.mount('#app')
