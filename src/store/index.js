import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import moment from 'moment-timezone'
moment.tz.setDefault("UTC")

import Axios from 'axios'

export default new Vuex.Store( {
  state: {
    error: '',
    currentYear: 2018,
    currentMonth: 1,
    eventFormPosX: 0,
    eventFormPosY: 0,
    eventFormActive: false,
    eventFormDay: moment(),
    events: []
  },

  mutations: {
    setError (state, payload) {
      state.error = payload
    },
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
    }
  },

  actions: {
    addEvent (context, payload) {
      Axios.post('/add_event', payload)
      .then((resp) => {
        if (resp.status === 200) {
          context.commit('addEvent', payload)
          context.commit('setEventFormActive', false)
        } else {
          console.log(resp)
          context.commit('setError', 'error when trying to upload event! ' + resp.status)
        }
      })
      .catch((error) => {
        console.log(error)
        context.commit('setError', 'error when trying to upload event!')
      })
    }
  }
})
