export const mapConfig = {
  // arcgis_api: 'http://localhost:8090/arcgis_js_api_4',
  arcgis_api: 'http://47.110.60.109:8090/arcgis_js_api_4',
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
  },
  bookmarks: [
    {
      name: 'china',
      camera: {
        heading: 0,
        tilt: 9.15,
        position: {
          x: 105.508849,
          y: 22.581284,
          z: 7000000
        }
      }
    }
  ]
}
