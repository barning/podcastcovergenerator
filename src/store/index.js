import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    tintHue: {},
    activeInArray: null,
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
      state.activeInArray = index
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
