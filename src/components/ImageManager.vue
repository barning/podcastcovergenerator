<template>
  <div id="ImageManager">
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
