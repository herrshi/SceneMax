<template>
  <div id="map_container" />
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class Demo2 extends Vue {
  mounted () {
    // const BMapGL = (window as any).BMapGL || {}
    // console.log(BMapGL)
    const mapv = ((window as any).mapv as any) || {}
    const mapvgl = (window as any).mapvgl || {}
    const initMap = ((window as any).initMap as any) || {}
    const darkStyle = ((window as any).darkStyle as any) || {}

    const map = initMap({
      tilt: 48.8,
      heading: 0,
      center: [105.348145, 28.165926],
      zoom: 6,
      style: darkStyle
    })
    const view = new mapvgl.View({
      map
    })
    const cities = [
      '北京',
      '天津',
      '上海',
      '重庆',
      '石家庄',
      '太原',
      '呼和浩特',
      '哈尔滨',
      '长春',
      '沈阳',
      '济南',
      '南京',
      '合肥',
      '杭州',
      '南昌',
      '福州',
      '郑州',
      '武汉',
      '长沙',
      '广州',
      '南宁',
      '西安',
      '银川',
      '兰州',
      '西宁',
      '乌鲁木齐',
      '成都',
      '贵阳',
      '昆明',
      '拉萨',
      '海口'
    ]

    const pointData = cities.map((city) => {
      const cityCenter = mapv.utilCityCenter.getCenterByCityName(city)
      return {
        geometry: {
          type: 'Point',
          coordinates: [cityCenter.lng, cityCenter.lat]
        }
      }
    })

    const rippleLayer = new mapvgl.RippleLayer({
      segs: 64,
      size: 1,
      scale: 2,
      step: 0.1,
      unit: 'px',
      color: 'rgb(255, 51, 0)',
      data: pointData
    })
    view.addLayer(rippleLayer)

    let randomLineCount = 60
    const curve = new mapvgl.BezierCurve()
    const lineData = []
    while (randomLineCount--) {
      let startPoint = mapv.utilCityCenter.getCenterByCityName(
        cities[Math.floor(Math.random() * cities.length)]
      )
      startPoint = map.lnglatToMercator(startPoint.lng, startPoint.lat)
      let endPoint = mapv.utilCityCenter.getCenterByCityName(
        cities[Math.floor(Math.random() * cities.length)]
      )
      endPoint = map.lnglatToMercator(endPoint.lng, endPoint.lat)

      curve.setOptions({
        start: [startPoint[0], startPoint[1]],
        end: [endPoint[0], endPoint[1]]
      })
      const curveModelData = curve.getPoints(60)
      lineData.push({
        geometry: {
          type: 'LineString',
          coordinates: curveModelData
        },
        properties: {
          count: Math.random()
        }
      })
    }
    const lineTripData = lineData.map((item) => {
      item.geometry.coordinates = item.geometry.coordinates.map((item: any) => {
        item[2] += 3
        return item
      })
      return item
    })

    const lineTripLayer = new mapvgl.LineTripLayer({
      color: 'rgb(255, 255, 204)',
      step: 0.1,
      data: lineTripData
    })
    view.addLayer(lineTripLayer)

    const lineLayer = new mapvgl.SimpleLineLayer({
      blend: 'lighter',
      color: 'rgb(255, 153, 0, 0.6)',
      data: lineData
    })
    view.addLayer(lineLayer)
  }
}
</script>

<style scoped>
#map_container {
  position: absolute;
  left: 0;
  top: 0;
  padding: 0;
  margin: 0;
  width: 100vw;
  height: 100vh;
}
</style>
