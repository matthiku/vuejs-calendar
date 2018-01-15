import Vue from 'vue'
import './style.scss'

import store from './store'

import moment from 'moment-timezone'
moment.tz.setDefault("UTC")
// add moment to the Vue prototype, so that we can use it in all components!
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment }})

import App from './Components/App.vue'

// re-initialize the Vuex store
// and merge the events from the server into the existing state object
let events = []
if (window.__INITIAL_STATE__) {
  events = window.__INITIAL_STATE__.map((evt) => {
    return {
      description: evt.description,
      date: moment(evt.date)
    }
  })
}
let initialState = Object.assign({}, store.state, { events })
store.replaceState(initialState)

new Vue({
  el: '#app',
  data: {
    moment
  },
  components: {
    App
  },
  store,
  render(createElement) {
    return createElement(
      // tag name
      'div',
      // options
      { attrs: { id: 'app'} },
      // children
      [
        createElement('app')
      ]
    )
  }
});
