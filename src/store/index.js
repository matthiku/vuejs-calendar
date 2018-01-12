import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store( {
  state: {
    currentYear: 2018,
    currentMonth: 1
  },
  mutations: {
    setCurrentYear (state, payload) {
      state.currentYear = payload
    },
    setCurrentMonth (state, payload) {
      state.currentMonth = payload
    }
  }
})
