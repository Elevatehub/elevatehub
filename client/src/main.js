// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import '@mdi/font/css/materialdesignicons.css'
//
import 'sweetalert2/src/sweetalert2.scss'
import 'vue-skeletor/dist/vue-skeletor.css'
import { Skeletor } from 'vue-skeletor'
import VueApexCharts from 'vue3-apexcharts'
import axios from 'axios'
// import { createStore } from 'vuex'
import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap'
import 'swiper/css'
import 'swiper/css/effect-fade'
import '../src/assets/css/fontawesome-all.min.css'
import '../src/assets/scss/style.scss'

const BASEAPI = import.meta.env.VITE_APP_BASEAPI
const token = localStorage.getItem('access_token')
  ? localStorage.getItem('access_token').slice(1, -1)
  : null
axios.defaults.baseURL = BASEAPI
axios.interceptors.request.use((config) => {
  if (token != null) {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

const vuetify = createVuetify({
  components,
  directives,
})

library.add(faUserSecret)

const app = createApp(App)

app.component(Skeletor.name, Skeletor)
app.use(VueApexCharts)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.component('EasyDataTable', Vue3EasyDataTable);
app.use(vuetify)

// Use the Vuex store
app.use(store)
app.mount('#app')

