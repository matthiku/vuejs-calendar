// base file with the common logic for our app -
//    used by server-side rendering as well as the regular client-side rendering

import Vue from 'vue'

import store from './store'

import moment from 'moment-timezone'
moment.tz.setDefault("UTC")
// add moment to the Vue prototype, so that we can use it in all components!
Object.defineProperty(Vue.prototype, '$moment', { get() { return this.$root.moment }})

import App from './Components/App.vue'

export default function (events) {

  // assign the server-side data (events) to the state
  let initialState = Object.assign({}, store.state, { events })
  store.replaceState(initialState)

  return new Vue({
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
}
