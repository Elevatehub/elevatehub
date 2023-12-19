import { createStore } from 'vuex'

export default createStore({
  state: {
    loadingTrend: false,
    loadingDonut: false,
    loadingStackBar: false
  },
  mutations: {
    setLoadingTrend(state, value) {
      state.loadingTrend = value
    },
    setLoadingDonut(state, value) {
      state.loadingDonut = value
    },
    setLoadingStackBar(state, value) {
      state.loadingStackBar = value
    }
  }
  // ... other modules, actions, getters, etc. ...
})
