<template>
  <div id="Scale">
    <div v-for="(element, index) in imageIsActive" :key="index">
      <vue-slider v-model="element.scale"></vue-slider>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'Scale',
  components: {
    VueSlider
  },
  computed: {
    ...mapGetters([
      'imageIsActive'
    ])
  }

}
</script>
