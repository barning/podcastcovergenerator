<template>
  <div class="image-manager" id="ImageManager">
    <ImageUpload/>
    <ImageLayer/>
  </div>
</template>

<script>
import ImageUpload from './imageManager-components/ImageUpload.vue'
import ImageLayer from './imageManager-components/ImageLayer.vue'

export default {
  name: 'ImageManager',
  components: {
    ImageUpload,
    ImageLayer
  }
}
</script>

<style lang="scss">
.image-manager {
  width: 300px;
}
</style>
