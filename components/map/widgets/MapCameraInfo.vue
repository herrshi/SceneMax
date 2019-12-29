<template>
  <mdb-card dark>
    <mdb-card-body color="elegant" class="white-text">
      <mdb-card-title>{{ widgetTitle }}</mdb-card-title>
      <hr class="hr-light">
      <mdb-row>
        <mdb-col>
          <mdb-input v-model="heading" label="Heading" @keypress.native.enter="goTo" />
        </mdb-col>
        <mdb-col>
          <mdb-input v-model="tilt" label="Tilt" @keypress.native.enter="goTo" />
        </mdb-col>
        <mdb-col>
          <mdb-input v-model="height" label="Height" @keypress.native.enter="goTo" />
        </mdb-col>
      </mdb-row>

      <mdb-row>
        <mdb-col>
          <mdb-input v-model="x" label="x" @keypress.native.enter="goTo" />
        </mdb-col>
        <mdb-col>
          <mdb-input v-model="y" label="y" @keypress.native.enter="goTo" />
        </mdb-col>
      </mdb-row>

      <div class="d-flex justify-content-around">
        <mdb-btn color="mdb-color" size="sm" @click="goTo">
          <mdb-icon far icon="paper-plane" class="mr-1" />跳转
        </mdb-btn>

        <mdb-btn color="mdb-color" size="sm" @click="resetCamera">
          <mdb-icon icon="home" class="mr-1" />还原
        </mdb-btn>
      </div>
    </mdb-card-body>
  </mdb-card>
</template>

<script lang="ts">
import { Vue, Component, Inject } from 'vue-property-decorator'
import { mapStore } from '~/store'

@Component
export default class MapCameraInfo extends Vue {
  view!: __esri.SceneView
  widgetTitle: string = '地图镜头'
  heading: number = 0
  tilt: number = 0
  height: number = 0
  x: number = 0
  y: number = 0

  @Inject('getView') readonly getView!: Promise<__esri.SceneView>

  async mounted () {
    this.view = await this.getView
    this.showCameraParams(this.view.camera)
    this.view.watch('camera', () => {
      const camera: __esri.Camera = this.view.camera
      this.showCameraParams(camera)
    })
  }

  private showCameraParams (camera: __esri.Camera) {
    this.heading = Number(camera.heading.toFixed(2))
    this.tilt = Number(camera.tilt.toFixed(2))
    this.x = Number(camera.position.longitude.toFixed(6))
    this.y = Number(camera.position.latitude.toFixed(6))
    this.height = Number(
      camera.position.hasZ ? camera.position.z.toFixed(2) : null
    )
  }

  private resetCamera () {
    this.view.goTo(mapStore.initialCamera)
  }

  private goTo () {
    const camera = {
      heading: this.heading,
      tilt: this.tilt,
      position: {
        longitude: this.x,
        latitude: this.y,
        z: this.height
      }
    }
    this.view.goTo(camera)
  }
}
</script>

<style scoped>
.card {
  width: 350px;
}
.form-control {
  color: white !important;
}
</style>
