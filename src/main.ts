import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'

// Import your routes
import Home from './views/Home.vue'
import Rules from './views/Rules.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/rules', name: 'Rules', component: Rules },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const pinia = createPinia()

const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')
