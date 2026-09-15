import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })
import { createApp } from 'vue'
// Temporaire, en attente CI Shifter
await import('@/api/mockShifterApi')
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
import CustomersList from '@/components/customers/CustomersList.vue'
import CustomerDetail from '@/components/customers/CustomerDetail.vue'

import { createMemoryHistory, createRouter } from 'vue-router'

const routes = [
  { path: '/', component: HomeView },
  { path: '/customer-infos', component: CustomerInfosView,children: [
    {
      path: '',
      name: 'customer-list',
      component: CustomersList
    },
    {
      path: '/:id',
      name: 'customer-detail',
      component: CustomerDetail,
      props: true
    }
  ] },
  { path: '/bike-infos', component: BikeInfosView},
  { path: '/estimate', component: EstimateView}
]

export const router = createRouter({
  history: createMemoryHistory(),
  routes,
})
// router.beforeEach((to) => {
//   const targetPath = to.fullPath.toLowerCase()
//   if(targetPath.startsWith('tel') || targetPath.startsWith('sms')) {
//     window.location.href = to.fullPath
//     return false
//   }
//   return true
// })
app.use(router)
app.use(Buefy)
app.mount('#app')
