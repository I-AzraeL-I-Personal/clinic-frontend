import { createApp } from 'vue'
import { createStore } from 'vuex'
import createPersistedState from "vuex-persistedstate"
import App from './App.vue'
import Notifications from '@kyvg/vue3-notification'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const store = createStore({
  state: {
    userData: { email: '', role: '', token: '', userUUID: '' }
  },
  mutations: {
    setUserData(state, data) {
      state.userData = data
    }
  },
  plugins: [createPersistedState()]
})

axios.defaults.baseURL = process.env.VUE_APP_APIURL
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.interceptors.request.use(
  function(config) {
    if (!store.state.userData) {
      store.commit('setUserData', { email: '', role: '', token: '', userUUID: '' })
    }
    const token = store.state.userData.token
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
)

createApp(App)
  .use(Notifications)
  .use(store)
  .use(router)
  .use(VueAxios, axios)
  .mount('#app')