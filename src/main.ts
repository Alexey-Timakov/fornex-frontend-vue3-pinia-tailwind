import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { LoadingPlugin } from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';
import './assets/main.css'

const app = createApp(App)
app.use(LoadingPlugin)
app.use(createPinia())
app.use(router)

app.mount('#app')
