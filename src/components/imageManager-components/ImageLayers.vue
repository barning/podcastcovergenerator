<template>
  <div class="image-layers" id="ImageLayers">
    <ul>
      <li v-for="(item, index) in imageSrc" :key="index">
        <input v-model="imageSrc" name="setActive" :value="index" type="radio">
        <div class="image-layers__layer">
          <img :src="item.src">
        </div>
        <div class="object-modifier">
          <button v-on:click="moveElementUp(index)">Up</button>
          <button v-on:click="moveElementDown(index)">Down</button>
          <button v-on:click="deleteElement(index)">Delete</button>
          <input v-model="imageIsLogo" name="isLogo" :value="index" type="radio">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ImageLayers',
  computed: {
    imageSrc: {
      get () {
        return this.$store.state.images
      },
      set (i) {
        this.$store.commit('setItemActive', i)
      }
    },
    imageIsLogo: {
      get () {
        return this.$store.state.images
      },
      set (i) {
        this.$store.commit('isLogo', i)
      }
    }
  },
  methods: {
    deleteElement (i) {
      this.$store.commit('deleteItem', i)
    },
    moveElementUp (i) {
      this.$store.commit('moveItemUp', i)
    },
    moveElementDown (i) {
      this.$store.commit('moveItemDown', i)
    }
  }
}
</script>

<style lang="scss">
.image-layers {
  ul {
    display: flex;
    flex-direction: column;
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    img {
      max-width: 150px;
    }
  }
}
</style>
