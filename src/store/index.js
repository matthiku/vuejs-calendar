import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import moment from 'moment-timezone'
moment.tz.setDefault("UTC")

import Axios from 'axios'

export default new Vuex.Store( {
  state: {
    currentYear: 2018,
    currentMonth: 1,
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    eventFormDay: moment(),
    events: []
  },

  mutations: {
    setCurrentYear (state, payload) {
      state.currentYear = payload
    },
    setCurrentMonth (state, payload) {
      state.currentMonth = payload
    },
    setEventFormPos (state, payload) {
      state.eventFormPosX = payload.x
      state.eventFormPosY = payload.y
    },
    setEventFormActive (state, payload) {
      state.eventFormActive = payload
    },
    setEventFormDay (state, payload) {
      state.eventFormDay = payload
    },
    addEvent (state, payload) {
      state.events.push(payload)
      Axios.post('/add_event', payload)
    }
  },

  actions: {
    addEvent (context, payload) {
      console.log(context)
    }
  }
})
