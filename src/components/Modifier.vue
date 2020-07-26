<template>
  <div id="modifier">
    <Position/>
    <Scale/>
    <Processing v-bind:index="this.index"/>
  </div>
</template>

<script>
import Position from './modifier-components/Position.vue'
import Scale from './modifier-components/Scale.vue'
import Processing from './modifier-components/Processing.vue'

export default {
  name: 'Modifier',
  components: {
    Position,
    Scale,
    Processing
  },
  props: [
    'index'
  ],
  computed: {
    activeImage () {
      return this.$store.getters.activeImage
    }
  }
}
</script>
