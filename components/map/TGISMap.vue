<template>
  <div />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Map extends Vue {
  async mounted () {
    const mapApp = await import('./map')
    await mapApp.initialize(this.$el as HTMLDivElement)
  }
}
</script>

<style scoped >
div {
  padding: 0;
  margin: 0;
  width: 100%;
  height: 100%;
}
</style>
