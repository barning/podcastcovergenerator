<template>
    <vue-p5 v-on="{setup, draw}" :key="tint"></vue-p5>
</template>

<script>
import VueP5 from 'vue-p5'

export default {
  name: 'Sketch',
  components: {
    'vue-p5': VueP5
  },
  data () {
    return {
      tint: false
    }
  },
  computed: {
    isTintShown () {
      return this.$store.state.showTint
    }
  },
  watch: {
    isTintShown () {
      this.tint = !this.tint
    }
  },
  methods: {
    setup (s) {
      s.createCanvas(500, 500)
      s.noLoop()
    },
    draw (s) {
      s.background('green')
      s.text('Hello p5!', 20, 20)

      if (this.tint === true) {
        s.background('red')
      }
    }
  },
  render (s) {
    return s(VueP5)
  }
}
</script>
