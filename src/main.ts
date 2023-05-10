import { createApp } from 'vue'
import './style.css'
import './tailwind.css'
import 'normalize.css'
import App from './App.vue'
import { setupStore } from './store'
import { setupRouter } from './router'
import registerElement from '@/utils/register-element'
const app = createApp(App)
setupStore(app)
setupRouter(app)
registerElement(app)
app.mount('#app')
