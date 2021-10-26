import { createRouter, createWebHistory } from 'vue-router'
import Appointments from '../views/Appointments.vue'
import Registration from '../views/Registration.vue'
import Login from '../views/Login.vue'
import UserAppointments from '../views/UserAppointments.vue'
import UserData from '../views/UserData.vue'
import AdminPanel from '../views/AdminPanel.vue'
import Home from '../views/Home.vue'
import AppointmentDetails from '../views/AppointmentDetails.vue'

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
  },
  {
    path: '/appointment-details',
    name: 'AppointmentDetails',
    component: AppointmentDetails,
    props: route => Object.assign({}, route.query, route.params)
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: { name: 'Home' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
