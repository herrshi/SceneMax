<template>
  <div style="position: absolute; width: 400px; right: 20px; top: 100px">
    <div id="part1" style="opacity: 0">
      <h2 class="white-text font-weight-bold">
        Global View
      </h2>
      <p class="white-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
    </div>
    <div id="part2" class="mt-5" style="opacity: 0">
      <mdb-row>
        <mdb-col>
          <h4 class="white-text">
            场景
          </h4>
          <h4
            id="sceneCountText"
            class="font-weight-bold"
            style="color: rgb(250, 183, 255)"
          >
            {{ par2Data.sceneCount }}
          </h4>
        </mdb-col>
        <mdb-col>
          <h4 class="white-text">
            覆盖率
          </h4>
          <h4
            id="coverageText"
            class="font-weight-bold"
            style="color: rgb(89, 255, 255)"
          >
            {{ par2Data.coverage }}
          </h4>
        </mdb-col>
      </mdb-row>
    </div>

    <div id="part3" style="opacity: 0; height: 300px" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import anime from 'animejs'
import $ from 'jquery'
import echarts from 'echarts'

@Component
export default class GlobalViewContent extends Vue {
  private par2Data = {
    sceneCount: '0',
    coverage: '0%'
  }

  private chartData = [
    { sceneName: '场景1', count: 220 },
    { sceneName: '场景2', count: 182 },
    { sceneName: '场景3', count: 191 },
    { sceneName: '场景4', count: 234 },
    { sceneName: '场景5', count: 290 }
  ]

  private initChartData () {
    this.chartData.sort((a, b) => a.count - b.count)
    const chart = echarts.init($('#part3')[0] as HTMLDivElement)
    const yData = this.chartData.map(
      (data, index) => index + 1 + '. ' + data.sceneName + '  ' + data.count
    )
    chart.setOption({
      grid: {
        containLabel: true,
        left: 5,
        right: 0
      },
      xAxis: {
        show: false
      },
      yAxis: {
        data: yData,
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        axisLabel: {
          color: 'white',
          fontSize: 18,
          fontFamily: 'Microsoft YaHei'
        }
      },
      series: [
        {
          type: 'bar',
          data: this.chartData.map(data => data.count),
          barWidth: 5,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: 'rgb(166, 132, 255)' },
              { offset: 0.5, color: 'rgb(246, 66, 255)' },
              { offset: 1, color: 'rgb(245, 1, 255)' }
            ]) as any
          },
          animationDelay: (index: number) => index * 100
        }
      ],
      animationEasing: 'elasticOut'
    })
  }

  async mounted () {
    const animeTimeLine = anime.timeline({
      duration: 2000
    })
    await animeTimeLine
      .add({
        targets: '#part1',
        opacity: 1,
        delay: 2000
      })
      .add(
        {
          targets: '#part2',
          opacity: 1
        },
        '-=500'
      )
      .add(
        {
          targets: this.par2Data,
          sceneCount: '12',
          coverage: '64%',
          round: 1,
          easing: 'linear',
          update: () => {
            $('#sceneCountText')[0].innerHTML = this.par2Data.sceneCount
            $('#coverageText')[0].innerHTML = this.par2Data.coverage
          }
        },
        '-=500'
      )
      .add({
        targets: '#part3',
        opacity: 1
      }).finished
    this.initChartData()
  }
}
</script>

<style scoped></style>
