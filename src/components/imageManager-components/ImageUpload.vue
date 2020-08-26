<template>
  <div class="image-upload" id="ImageUpload">
    <picture-input
      ref="pictureInput"
      margin="16"
      accept="image/jpeg,image/png"
      size="1"
      button-class="btn"
      :hideChangeButton="true"
      :custom-strings="{
        drag: 'Upload an image by clicking this area or drop a file'
      }"
      @change="onChange">
    </picture-input>
  </div>
</template>

<style lang="scss">
// .image-upload {

// }
</style>

<script>
import PictureInput from 'vue-picture-input'

export default {
  name: 'ImageUpload',
  components: {
    PictureInput
  },
  methods: {
    onChange (image) {
      console.log('New picture selected!')
      if (image) {
        console.log('Picture loaded.')
        const obj = {}
        obj.src = image
        obj.showLogo = false
        obj.position = null
        obj.scale = 50

        this.$store.commit('addImage', obj)
        this.$refs.pictureInput.removeImage()
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    }
  }
}
</script>
