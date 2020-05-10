<template>
  <div class="image-layers" id="ImageLayers">
    <ul>
      <li v-for="item in imageSrc" :key="item.src">
        <img :src="item.src">
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ImageLayer',
  computed: {
    imageSrc () {
      return this.$store.getters.imageSrc
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
