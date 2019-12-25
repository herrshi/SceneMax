<template>
  <div>
    <p><strong>Heading</strong>: {{ heading }}</p>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Inject } from 'vue-property-decorator'

@Component
export default class MapCameraInfo extends Vue {
  view!: __esri.SceneView
  heading: number = 0

  @Inject('getView') readonly getView!: Promise<__esri.SceneView>

  async mounted () {
    this.view = await this.getView
    this.view.watch('camera', () => {
      const camera: __esri.Camera = this.view.camera
      this.heading = Number(camera.heading.toFixed(3))
    })
  }
}
</script>

<style scoped>
div {
  height: 300px;
  width: 300px;
}
</style>
