import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Appointments from '../views/Appointments.vue'
import Registration from '../views/Registration.vue'
import Login from '../views/Login.vue'
import UserAppointments from '../views/UserAppointments.vue'
import UserData from '../views/UserData.vue'
import AdminPanel from '../views/AdminPanel.vue'

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
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/user-appointments',
    name: 'UserAppointments',
    component: UserAppointments
  },
  {
    path: '/user-data',
    name: 'UserData',
    component: UserData
  },
  {
    path: '/admin-panel',
    name: 'AdminPanel',
    component: AdminPanel
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
