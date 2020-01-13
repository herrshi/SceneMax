import { loadModules, loadCss, setDefaultOptions } from 'esri-loader'
import { mapConfig } from '~/config'
import { IWidgetConfig, IMapInitialize, IBookmark } from '~/assets/ts/types/map'

class TGISMap {
  public view!: __esri.SceneView
  private rotateHandler!: number
  private bookmarks: Array<IBookmark> = []

  /**
   * 移动地图镜头
   * @param xOffset 经度偏移量
   * @param yOffset 纬度偏移量
   */
  private shiftCamera (xOffset: number, yOffset: number): __esri.Camera {
    const camera = this.view.camera.clone()
    camera.position.longitude += xOffset
    camera.position.latitude += yOffset
    return camera
  }

  /**
   * 禁止鼠标事件
   */
  private disableMouseEvent () {
    this.view.on('drag', event => event.stopPropagation())
    this.view.on('double-click', event => event.stopPropagation())
    this.view.on('mouse-wheel', event => event.stopPropagation())
    this.view.on('click', event => event.stopPropagation())
    this.view.on('immediate-click', event => event.stopPropagation())
  }

  /**
   * 初始化地图
   * @param params
   */
  public async initialize (params: IMapInitialize) {
    setDefaultOptions({ url: `${mapConfig.arcgis_api}/init.js` })

    const cssFile: string = params.theme
      ? `themes/${params.theme}/main.css`
      : 'css/main.css'
    loadCss(`${mapConfig.arcgis_api}/esri/${cssFile}`)

    this.bookmarks = mapConfig.bookmarks

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

  public async loadWidget (widgetConfigs: Array<IWidgetConfig>) {
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

  /**
   * 启动地球旋转动画
   * @param speed 动画速度倍数
   */
  public startRotate (speed: number = 0.1) {
    // this.disableMouseEvent()
    this.view.ui.empty('top-left')

    const xOffset: number = 30
    const yOffset: number = 0
    this.rotateHandler = window.setInterval(() => {
      this.view.goTo(this.shiftCamera(xOffset, yOffset), {
        speedFactor: speed,
        easing: 'linear'
      })
    }, 5000)
    this.view.goTo(this.shiftCamera(xOffset, yOffset), {
      speedFactor: speed,
      easing: 'linear'
    })
  }

  /**
   * 停止地球旋转动画
   */
  public stopRotate () {
    window.clearInterval(this.rotateHandler)
  }

  /**
   * 显示人口图层
   */
  public showPopulationLayer () {}

  /**
   * 隐藏人口图层
   */
  public hidePopulationLayer () {}

  /**
   * 跳转书签位置
   * @param name 书签名称
   * @returns Promise
   */
  public goToBookmark (name: string) {
    const bookmark = this.bookmarks.find((bookmark) => bookmark.name === name)
    if (bookmark) {
      return this.view.goTo(bookmark.camera, { speedFactor: 0.2 })
    }
  }
}

export default TGISMap
