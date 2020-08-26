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
    deleteItem (state, index) {
      state.images.splice(index, 1)
    },
    moveItemUp (state, index) {
      let newIndex = index - 1

      if (newIndex >= state.images.length || newIndex < 0) {
        newIndex = index
      }

      while (index < 0) {
        index += state.images.length
      }
      while (newIndex < 0) {
        newIndex += state.images.length
      }
      if (newIndex >= state.images.length) {
        var k = newIndex - state.images.length + 1
        while (k--) {
          state.images.push(undefined)
        }
      }
      state.images.splice(newIndex, 0, state.images.splice(index, 1)[0])

      state.images.forEach(element => {
        Vue.set(element, 'isActive', false)
      })
    },
    moveItemDown (state, index) {
      let newIndex = index + 1

      if (newIndex >= state.images.length || newIndex < 0) {
        newIndex = index
      }

      while (index < 0) {
        index += state.images.length
      }
      while (newIndex < 0) {
        newIndex += state.images.length
      }
      if (newIndex >= state.images.length) {
        var k = newIndex - state.images.length + 1
        while (k--) {
          state.images.push(undefined)
        }
      }
      state.images.splice(newIndex, 0, state.images.splice(index, 1)[0])

      state.images.forEach(element => {
        Vue.set(element, 'isActive', false)
      })
    },
    setItemActive (state, index) {
      state.images.forEach(element => {
        Vue.set(element, 'isActive', false)
      })
      Vue.set(state.images[index], 'isActive', true)
    },
    isLogo (state, index) {
      console.log(index)
      state.images.forEach(element => {
        Vue.set(element, 'isLogo', false)
      })
      Vue.set(state.images[index], 'isLogo', true)
    }
  },
  getters: {
    imageIsActive: state => {
      return state.images.filter(image => image.isActive)
    },
    imageScale: state => {
      return state.images.filter(image => image.scale)
    },
    imageIsLogo: state => {
      return state.images.filter(image => image.isLogo)
    }
  },
  actions: {
  },
  modules: {
  }
})
