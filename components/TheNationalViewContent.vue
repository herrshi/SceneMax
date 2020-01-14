<template>
  <div style="position: absolute; width: 400px; right: 20px; top: 50px">
    <div id="nationalPart1" class="initPart">
      <h2 class="white-text font-weight-bold">
        National View
      </h2>
      <p class="white-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
    </div>

    <div id="nationalPart2" class="initPart">
      <mdb-row>
        <mdb-col>
          <mdb-row
            v-for="(data, index) in chartData"
            :key="index"
            style="margin-top: 22px"
          >
            <mdb-col>
              <h6 class="white-text font-weight-bold">
                {{ index + 1 }}. {{ data.cityName }}
              </h6>
            </mdb-col>
            <mdb-col>
              <h6 class="white-text text-right font-weight-bold">
                {{ data.count.toLocaleString('en-US') }}
              </h6>
            </mdb-col>
          </mdb-row>
        </mdb-col>

        <mdb-col>
          <div id="nationalChartDiv" style="height: 500px" />
        </mdb-col>
      </mdb-row>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import anime from 'animejs'
import $ from 'jquery'
import echarts from 'echarts'

@Component
export default class NationalViewContent extends Vue {
  private chartData: Array<any> = []

  mounted () {
    const sourceData = [
      { cityName: '上海', count: 12264745 },
      { cityName: '北京', count: 10345404 },
      { cityName: '深圳', count: 9208784 },
      { cityName: '广州', count: 5597049 },
      { cityName: '成都', count: 4547074 },
      { cityName: '杭州', count: 4295342 },
      { cityName: '南京', count: 3846346 },
      { cityName: '武汉', count: 3215786 },
      { cityName: '厦门', count: 2730653 },
      { cityName: '重庆', count: 2573083 }
    ]
    this.chartData = sourceData.sort((a, b) => b.count - a.count)
  }

  async showContent () {
    const animeTimeLine = anime.timeline({
      duration: 2000
    })
    await animeTimeLine
      .add({
        targets: '#nationalPart1',
        opacity: 1
      })
      .add({
        targets: '#nationalPart2',
        opacity: 1,
        translateY: 150
      }).finished
    this.initChartData()
  }

  private initChartData () {
    const chart = echarts.init($('#nationalChartDiv')[0] as HTMLDivElement)
    const yData = this.chartData.map(
      data => data.cityName + '  ' + data.count
    )
    chart.setOption({
      grid: {
        left: 5,
        right: 0,
        top: 0,
        bottom: 0
      },
      xAxis: {
        show: false
      },
      yAxis: {
        data: yData,
        show: false
      },
      series: [
        {
          type: 'bar',
          data: this.chartData.map(data => data.count).reverse(),
          barWidth: 5,
          barCategoryGap: '10%',
          itemStyle: {
            barBorderRadius: [0, 5, 5, 0],
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 1,
              y2: 0,
              colorStops: [
                {
                  offset: 0,
                  color: 'rgb(166, 132, 255)'
                },
                {
                  offset: 0.5,
                  color: 'rgb(246, 66, 255)'
                },
                {
                  offset: 1,
                  color: 'rgb(245, 1, 255)'
                }
              ]
            } as any
          },
          animationDelay: (index: number) => index * 100
        }
      ],
      animationEasing: 'elasticOut'
    })
  }
}
</script>

<style scoped>
.initPart {
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  width: 100%;
}
div .col {
  padding-right: 0;
}
</style>
