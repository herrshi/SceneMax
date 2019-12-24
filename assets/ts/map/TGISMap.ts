import { loadCss, loadModules } from 'esri-loader'
const webmapid = 'e691172598f04ea8881cd2a4adaa45ba'

export const initializeMap = async (container: HTMLDivElement) => {
  loadCss()

  const [WebMap, MapView] = await loadModules([
    'esri/WebMap',
    'esri/views/MapView'
  ])
  // the returned objects now have type
  const webmap = new WebMap({
    portalItem: {
      id: webmapid
    }
  })
  // and we show that map in a container w/ id #viewDiv
  const view = new MapView({
    map: webmap,
    container
  })

  view.when().then(() => {
    console.log('map is ready')
  })
}
