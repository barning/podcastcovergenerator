<template>
  <div class="app" id="app">
    <Sketch/>
    <Modifier/>
    <ImageManager/>
  </div>
</template>

<script>
import Sketch from './components/Sketch.vue'
import Modifier from './components/Modifier.vue'
import ImageManager from './components/ImageManager.vue'

export default {
  name: 'App',
  components: {
    Sketch,
    Modifier,
    ImageManager
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.app {
  display: flex;
}
</style>
