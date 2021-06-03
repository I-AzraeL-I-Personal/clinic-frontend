import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

axios.defaults.baseURL = process.env.VUE_APP_APIURL
axios.defaults.headers.post['Content-Type'] = 'application/json';

createApp(App)
  .use(router, axios, VueAxios)
  .mount('#app')
