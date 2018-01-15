import './style.scss'

import moment from 'moment-timezone'
moment.tz.setDefault("UTC")

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

// import the base (common logic) file for our App
import VueCalendar from './entry'

setTimeout(function() {
  VueCalendar(events).$mount('#app')
}, 2000)

