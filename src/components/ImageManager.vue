<template>
  <div class="image-manager" id="ImageManager">
    <ImageUpload/>
    <ImageLayers/>
  </div>
</template>

<script>
import ImageUpload from './imageManager-components/ImageUpload.vue'
import ImageLayers from './imageManager-components/ImageLayers.vue'

export default {
  name: 'ImageManager',
  components: {
    ImageUpload,
    ImageLayers
  }
}
</script>

<style lang="scss">
.image-manager {
  width: 300px;
}
</style>
