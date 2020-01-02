import { loadModules, loadCss, setDefaultOptions } from 'esri-loader'
import { mapConfig } from '~/config'
import { IWidgetConfig, IMapInitialize } from '~/assets/ts/types/map'

class TGISMap {
  public view!: __esri.SceneView
  private rotateHandler!: number

  constructor() {}

  public async initialize(params: IMapInitialize) {
    setDefaultOptions({ url: `${mapConfig.arcgis_api}/init.js` })
    const cssFile: string = params.theme
      ? `themes/${params.theme}/main.css`
      : 'css/main.css'
    loadCss(`${mapConfig.arcgis_api}/esri/${cssFile}`)
    // if (params.theme) {
    //   loadCss(`${mapConfig.arcgis_api}/esri/themes/${params.theme}/main.css`)
    // }
    // else {
    //   loadCss(`${mapConfig.arcgis_api}/esri/css/main.css`)
    // }

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
      container: params.container,
      ...mapConfig.options
    })
    view.ui.remove('attribution')
    await view.when()
    this.view = view
  }

  public async loadWidget(widgetConfigs: Array<IWidgetConfig>) {
    type MapModules = [typeof import('esri/widgets/Expand')]
    const [Expand] = await (loadModules(['esri/widgets/Expand']) as Promise<
      MapModules
    >)
    widgetConfigs.forEach((widgetConfig) => {
      if (widgetConfig.expanded) {
        const expandWidget = new Expand({
          view: this.view,
          content: widgetConfig.content,
          expandIconClass: widgetConfig.icon
        })
        this.view.ui.add(expandWidget, widgetConfig.position || 'top-right')
      }
    })
  }

  private shiftCamera(xOffset: number, yOffset: number): __esri.Camera {
    const camera = this.view.camera.clone()
    camera.position.longitude += xOffset
    camera.position.latitude += yOffset
    return camera
  }

  public startRotate(xOffset: number = 60, yOffset: number = 0, speed: number = 0.1) {
    // 禁止鼠标事件
    this.view.on('drag', (event) => event.stopPropagation())
    this.view.on('double-click', (event) => event.stopPropagation())
    this.view.on('mouse-wheel', (event) => event.stopPropagation())
    this.view.on('click', (event) => event.stopPropagation())

    this.rotateHandler = window.setInterval(() => {
      this.view.goTo(this.shiftCamera(xOffset, yOffset), {speedFactor : speed, easing: "linear"})
    }, 3000);
    this.view.goTo(this.shiftCamera(xOffset, yOffset), {speedFactor : speed, easing: "linear"})
  }

  public stopRotate() {
    window.clearInterval(this.rotateHandler)
  }
}

export default TGISMap
