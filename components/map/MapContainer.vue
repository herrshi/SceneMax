<template>
  <div>
    <div style="display: none">
      <div id="divMapCameraInfo">
        <map-camera-info />
      </div>
    </div>

    <div id="divMap" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator'
import TGISMap from '~/assets/ts/map/TGISMap'
import { mapStore } from '~/store'
import MapCameraInfo from '~/components/map/widgets/MapCameraInfo.vue'

@Component({
  components: {
    MapCameraInfo
  }
})
export default class MapContainer extends Vue {
  mapApp!: TGISMap

  @Provide('getView') getView: Promise<
    __esri.SceneView
  > = this.getViewWhenReady()

  get mapLoaded () {
    return mapStore.mapLoaded
  }

  private getViewWhenReady (): Promise<__esri.SceneView> {
    return new Promise((resolve) => {
      if (this.mapApp && this.mapApp.view && this.mapApp.view.ready) {
        resolve(this.mapApp.view)
      } else {
        const interval = setInterval(() => {
          if (this.mapApp && this.mapApp.view && this.mapApp.view.ready) {
            clearInterval(interval)
            resolve(this.mapApp.view)
          }
        }, 50)
      }
    })
  }

  async mounted () {
    this.mapApp = new TGISMap()
    await this.mapApp.initialize({
      container: 'divMap',
      theme: 'dark-blue'
    })
    mapStore.mapLoadFinish()
    mapStore.setInitialCamera(this.mapApp.view.camera)
    await this.mapApp.loadWidget([
      {
        content: document.getElementById('divMapCameraInfo') as HTMLElement,
        expanded: true,
        position: 'top-right',
        icon: 'esri-icon-navigation'
      }
    ])
    this.mapApp.startRotate(60)
  }
}
</script>

<style scoped>
#divMap {
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
</style>
