import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tintHue: {},
    showTint: false,
    images: [
    ]
  },
  mutations: {
    updateTintVisibility (state, visibility) {
      state.showTint = visibility
    },
    updateTint (state, hue) {
      state.tintHue = hue
    },
    addImage (state, Image) {
      state.images.push(Image)
    },
    setAllImagesInactive (state) {
      state.images.forEach(image => {
        image.active = false
      })
    },
    setImageActive (state, index) {
      state.images[index].active = true
    }
  },
  getters: {
    imageSrc: state => {
      return state.images.filter(image => image.src)
    },
    activeImage: state => {
      return state.images.filter(image => image.active)
    }
  },
  actions: {
  },
  modules: {
  }
})
