import Vue from 'vue'
import './style.scss'

import store from './store'

import App from './Components/App.vue'

import moment from 'moment-timezone'
moment.tz.setDefault("UTC")
// add moment to the Vue prototype, so that we can use it in all components!
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment }})

new Vue({
  el: '#app',
  data: {
    moment
  },
  components: {
    App
  },
  store
});
