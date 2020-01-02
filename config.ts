export const webMapId = 'f2e9b762544945f390ca4ac3671cfa72'

export const title = 'ArcGIS Vue App'

export const mapConfig = {
  arcgis_api: 'http://localhost:8090/arcgis_js_api_4',
  baseLayers: [
    {
      type: 'tiled',
      url:
        'https://map.geoq.cn/arcgis/rest/services/ChinaOnlineStreetPurplishBlue/MapServer',
      visible: true
    }
  ],
  options: {
    camera: {
      heading: 0,
      tilt: 0,
      position: {
        x: 0,
        y: 0,
        z: 25000000
      }
    }
  }
}
