import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import Map from '~/store/map'

let mapStore: Map

function initialiseStores(store: Store<any>): void {
  mapStore = getModule(Map, store)
}

export {
  initialiseStores,
  mapStore
}
