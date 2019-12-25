import { loadModules, loadCss, setDefaultOptions } from 'esri-loader'
import { mapConfig } from '~/config'

export interface WidgetConfig {
  container: HTMLElement
  expanded?: boolean
  position?: string
  icon?: string
}

class TGISMap {
  view!: __esri.SceneView

  constructor() {}

  async initialize(container: HTMLDivElement) {
    setDefaultOptions({ url: `${mapConfig.arcgis_api}/init.js` })
    loadCss(`${mapConfig.arcgis_api}/esri/themes/dark-blue/main.css`)

    type MapModules = [
      typeof import('esri/views/SceneView'),
      typeof import('esri/Basemap'),
      typeof import('esri/Map'),
      typeof import('esri/layers/TileLayer'),
      typeof import('esri/core/Collection')
    ]
    const [
      SceneView,
      Basemap,
      Map,
      TileLayer,
      Collection
    ] = await (loadModules([
      'esri/views/SceneView',
      'esri/Basemap',
      'esri/Map',
      'esri/layers/TileLayer',
      'esri/core/Collection'
    ]) as Promise<MapModules>)

    const baseLayers = new Collection()
    baseLayers.addMany(
      mapConfig.baseLayers.map((layerConfig) => {
        if (layerConfig.type === 'tiled') {
          delete layerConfig.type
          return new TileLayer(layerConfig)
        }
      })
    )
    const basemap = new Basemap({
      baseLayers
    })
    const view = new SceneView({
      map: new Map({
        basemap
      }),
      container
    })
    view.ui.remove('attribution')
    await view.when()
    this.view = view
  }

  async loadWidget(widgetConfigs: Array<WidgetConfig>) {
    type MapModules = [typeof import('esri/widgets/Expand')]
    const [Expand] = await (loadModules(['esri/widgets/Expand']) as Promise<
      MapModules
    >)
    widgetConfigs.forEach((widgetConfig) => {
      if (widgetConfig.expanded) {
        const expandWidget = new Expand({
          view: this.view,
          content: widgetConfig.container,
          expandIconClass: widgetConfig.icon
        })
        this.view.ui.add(expandWidget, widgetConfig.position || 'top-right')
      }
    })
  }
}

export default TGISMap
