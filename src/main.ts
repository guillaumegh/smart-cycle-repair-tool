import { registerSW } from 'virtual:pwa-register'

registerSW({ immediate: true })
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/css/buefy.css'
import '@mdi/font/css/materialdesignicons.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
const app = createApp(App)
import HomeView from '@/views/HomeView.vue'
import CustomerInfosView from '@/views/CustomerInfosView.vue'
import BikeInfosView from '@/views/BikeInfosView.vue'
import EstimateView from '@/views/EstimateView.vue'

import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: HomeView },
  { path: '/customer-infos', component: CustomerInfosView },
  { path: '/bike-infos', component: BikeInfosView},
  { path: '/estimate', component: EstimateView}
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
app.use(router)
app.use(Buefy)
app.mount('#app')
