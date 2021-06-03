import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Appointments from '../views/Appointments.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/appoint',
    name: 'Appoint',
    component: Appointments
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
