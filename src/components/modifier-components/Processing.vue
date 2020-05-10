<template>
  <div id="Processing">
    <div class="controls_showTint flex-row">
      <div>
        <input type="checkbox" id="showTint" :value="tintVisibility" @input="updateTintVisibility">
        <label for="showTint">Tint Image</label>
      </div>

      <div class="controls__color hide">
        <input id="color-input" type="color" value="#7f3af6">
      </div>

      <div class="controls_showImage">
        <input type="checkbox" id="showImage" :value="imageVisibility" @input="updateImageVisibility">
        <label for="checkbox">Image is visible</label>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Processing',
  props: [
    'index',
    'tint',
    'showTint',
    'showImage'
  ],
  data () {
    return {
      imageVisibility: this.showImage,
      tintVisibility: this.showTint,
      imageTint: this.tint
    }
  },
  methods: {
    updateImageVisibility (e) {
      this.$store.commit('updateImageVisibility', this.index)
    },
    updateTintVisibility (e) {
      this.$store.commit('updateTintVisibility', this.index)
    },
    updateTint (e) {
      this.$store.commit('updateTint', this.index)
    }
  }
}
</script>
