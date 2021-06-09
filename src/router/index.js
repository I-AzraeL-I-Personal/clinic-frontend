import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Appointments from '../views/Appointments.vue'
import Registration from '../views/Registration.vue'

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
  },
  {
    path: '/register',
    name: 'Register',
    component: Registration
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
