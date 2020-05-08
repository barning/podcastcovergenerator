import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    showLogo: false,
    showTint: false,
    images: []
  },
  mutations: {
    addImage (state, Image) {
      state.images.push(Image)
    },
    toggleLogo (state) {
      state.showLogo = !state.showLogo
    },
    toggleTint (state) {
      state.showTint = !state.showTint
    }
  },
  actions: {
  },
  modules: {
  }
})
