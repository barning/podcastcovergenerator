import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    images: [
    ]
  },
  mutations: {
    addImage (state, Image) {
      state.images.push(Image)
    }
  },
  getters: {
    imageSrc: state => {
      return state.images.filter(image => image.src)
    }
  },
  actions: {
  },
  modules: {
  }
})
