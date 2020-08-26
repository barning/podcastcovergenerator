<template>
    <vue-p5 v-on="{setup, draw}"></vue-p5>
</template>

<script>
import VueP5 from 'vue-p5'
import { mapGetters } from 'vuex'

export default {
  name: 'Sketch',
  components: {
    'vue-p5': VueP5
  },
  data () {
    return {
      s: null,
      images: [],
      tintVisible: false,
      tintHue: null
    }
  },
  computed: {
    ...mapGetters([
      'imageScale'
    ]),
    showTintUpdated () {
      return this.$store.state.showTint
    },
    imagesUpdated () {
      return this.$store.state.images
    },
    tintUpdated () {
      return this.$store.state.tintHue
    },
    imageIsActive () {
      return this.$store.state.activeInArray
    }
  },
  watch: {
    imagesUpdated (storeImage) {
      if (storeImage.length >= 0) {
        this.images = []
        for (let i = 0; i < storeImage.length; i++) {
          this.s.loadImage(
            storeImage[i].src,
            this.imageReady
          )
        }
      }
    },
    tintUpdated (hue) {
      this.tintVisible = true
      this.tintHue = hue
      this.draw(this.s)
      this.$store.commit('updateTintVisibility', true)
    },
    showTintUpdated (visible) {
      this.tintVisible = visible
      this.draw(this.s)
    },
    imageIsActive (i) {
      console.log(this.images[i])
    },
    imageScale () {
      this.draw(this.s)
    }
  },
  methods: {
    setup (s) {
      this.s = s
      s.createCanvas(500, 500)
      s.noLoop()
    },
    HSLToRGB (h, s, l) {
      // Must be fractions of 1
      s /= 100
      l /= 100

      const c = (1 - Math.abs(2 * l - 1)) * s
      const x = c * (1 - Math.abs((h / 60) % 2 - 1))
      const m = l - c / 2
      let r = 0
      let g = 0
      let b = 0
      if (h >= 0 && h < 60) {
        r = c; g = x; b = 0
      } else if (h >= 60 && h < 120) {
        r = x; g = c; b = 0
      } else if (h >= 120 && h < 180) {
        r = 0; g = c; b = x
      } else if (h >= 180 && h < 240) {
        r = 0; g = x; b = c
      } else if (h >= 240 && h < 300) {
        r = x; g = 0; b = c
      } else if (h >= 300 && h < 360) {
        r = c; g = 0; b = x
      }
      r = Math.round((r + m) * 255)
      g = Math.round((g + m) * 255)
      b = Math.round((b + m) * 255)

      return 'rgb(' + r + ',' + g + ',' + b + ')'
    },
    draw (s) {
      s.background('green')
      s.text('Hello p5!', 20, 20)

      if (this.tintVisible) {
        s.tint(this.HSLToRGB(this.tintHue, 100, 50))
      } else {
        s.noTint()
      }

      for (let i = 0; i < this.images.length; i++) {
        const element = this.images[i]
        const scale = this.imageScale[i]

        s.imageMode(s.CENTER)

        if (element.height > element.width) {
          element.resize(s.width, 0)
        } else {
          element.resize(0, s.height)
        }

        if (scale) {
          const scaling = s.map(scale.scale, 1, 100, 0.1, 2)
          s.image(element, s.width / 2, s.height / 2, scaling * s.width, scaling * element.height * s.width / element.width)
        } else {
          s.image(element, s.width / 2, s.height / 2)
        }
      }
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
