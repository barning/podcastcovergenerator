<template>
    <vue-p5 v-on="{setup, draw}"></vue-p5>
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
      s: null,
      images: []
    }
  },
  computed: {
    imagesUpdated () {
      return this.$store.state.images
    }
  },
  watch: {
    imagesUpdated () {
      if (this.$store.state.images.length >= 0) {
        for (let i = 0; i < this.$store.state.images.length; i++) {
          this.s.loadImage(this.$store.state.images[i].src, this.imageReady)
        }
      }
    }
  },
  methods: {
    setup (s) {
      this.s = s
      s.createCanvas(500, 500)
      s.noLoop()
    },
    draw (s) {
      s.background('green')
      s.text('Hello p5!', 20, 20)
      this.images.forEach(image => {
        if (image.height > image.width) {
          image.resize(s.width, 0)
        } else {
          image.resize(0, s.height)
        }
        s.image(image, 0, 0)
      })
    },
    imageReady (img) {
      this.images.push(img)
      this.draw(this.s)
    }
  },
  render (s) {
    return s(VueP5)
  }
}
</script>
