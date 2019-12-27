import { VuexModule, Module, Mutation } from 'vuex-module-decorators'

@Module({
  stateFactory: true,
  namespaced: true,
  name: 'map'
})
export default class MapModule extends VuexModule {
  mapLoaded: boolean = false

  @Mutation
  mapLoadFinish() {
    this.mapLoaded = true
  }
}
