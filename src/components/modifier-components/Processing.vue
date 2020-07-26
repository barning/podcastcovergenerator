<template>
  <div id="Processing">
    <div class="controls_showTint flex-row">
      <div>
        <input type="checkbox" id="showTint" v-model="tintVisibility">
        <label for="showTint">Tint Image</label>
      </div>

      <div class="controls__color hide">
        <color-picker :initially-collapsed="true" @select="updateTint" />
      </div>
    </div>
  </div>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker'

export default {
  components: { ColorPicker },
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
      imageTint: this.tint,
      color: 'hsl(0, 100%, 50%)'
    }
  },
  methods: {
    updateTint (hue) {
      this.$store.commit('updateTint', hue)
    }
  },
  computed: {
    tintVisibility: {
      get () {
        return this.$store.state.showTint
      },
      set (value) {
        this.$store.commit('updateTintVisibility', value)
      }
    }
  }
}
</script>

<style>
  @import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';
</style>
