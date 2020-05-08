<template>
  <div id="Processing">
    <div class="controls_showTint flex-row">
      <div>
        <input v-on:click="manageTintVisibility" type="checkbox" id="showTint">
        <label for="showTint">Tint Image</label>
      </div>

      <div class="controls__color hide">
        <input id="color-input" type="color" value="#7f3af6">
      </div>

      <div class="controls_showLogo">
        <input v-on:click="manageLogoVisibility" type="checkbox" id="showLogo">
        <label for="showLogoCheckbox">Show Logo</label>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Processing',
  methods: {
    manageTintVisibility: function (event) {
      this.$store.commit('toggleTint')
    },
    manageLogoVisibility: function (event) {
      this.$store.commit('toggleLogo')
    }
  }
}
</script>
