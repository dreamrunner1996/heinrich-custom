import { createApp } from 'vue'
import App from './App.vue'
import store from '@/store'
import route from '@/router'

createApp(App).use(store).use(route).mount('#app')
