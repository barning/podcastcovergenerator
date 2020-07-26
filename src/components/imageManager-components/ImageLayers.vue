<template>
  <div class="image-layers" id="ImageLayers">
    <ul>
      <li v-for="(item, index) in imageSrc" :key="item.src">
        <div v-on:click="setItemActive(index)" class="image-layers__layer">
          <img :src="item.src">
        </div>
        <div class="object-modifier">
          <button v-on:click="moveElementUp(index)">Up</button>
          <button v-on:click="moveElementDown(index)">Down</button>
          <button v-on:click="deleteElement(index)">Delete</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ImageLayers',
  computed: {
    imageSrc () {
      return this.$store.getters.imageSrc
    }
  },
  methods: {
    setItemActive (i) {
      this.$store.commit('setAllImagesInactive')
      this.$store.commit('setImageActive', i)
    },
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
