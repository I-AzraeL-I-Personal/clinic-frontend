import { createApp } from 'vue'
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap"

const store = createStore({
  state: {
    userData: { email: '', role: '', token: '', userUUID: '' }
  },
  mutations: {
    setUserData(state, data) {
      state.userData = data
    },
    clearUserData(state) {
      state.userData = { email: '', role: '', token: '', userUUID: '' }
    }
  },
  getters: {
    role: state => state.userData.role,
    uuid: state => state.userData.userUUID,
    token: state => state.userData.token,
    email: state => state.userData.email
  },
  plugins: [createPersistedState()]
})

const notificationMixin = {
  methods: {
    showSuccess(message) {
      this.$notify({
        title: 'Informacja',
        text: message,
        type: 'success'
      })
    },
    showError(message) {
      this.$notify({
        title: 'Informacja',
        text: message,
        type: 'error'
      })
    }
  }
}

axios.defaults.baseURL = process.env.VUE_APP_APIURL
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(
  config => {
    if (!store.state.userData) {
      store.commit('clearUserData')
    }
    const token = store.getters.token
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  error => Promise.reject(error)
)
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401 && error.config.url !== '/login') {
      store.commit('clearUserData')
      router.push('/login')
      return Promise.reject(error)
    }
    if (error.response.status === 404 && error.config.url !== '/appointment/find') {
      console.log(error.config.url)
      router.go(-1)
      return Promise.reject(error)
    }
    return Promise.reject(error)
  }
)

createApp(App)
  .use(Notifications)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mixin(notificationMixin)
  .mount('#app')