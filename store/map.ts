import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'map'
})
export default class MapModule extends VuexModule {
  mapLoaded = false
  initialCamera = {}

  @Mutation
  mapLoadFinish() {
    this.mapLoaded = true
  }

  @Mutation
  setInitialCamera (camera: __esri.Camera) {
    this.initialCamera = camera
  }
}
