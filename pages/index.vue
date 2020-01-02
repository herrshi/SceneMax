<template>
  <div class="app">
    <welcome-page />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import WelcomePage from '~/components/TheWelcomePage.vue'

@Component({
  components: {
    WelcomePage
  }
})
export default class App extends Vue {}
</script>

<style scoped></style>
