<template>
  <div style="position: absolute; width: 400px; right: 20px; top: 50px">
    <div id="globalPart1" class="initPart">
      <h2 class="white-text font-weight-bold">
        Global View
      </h2>
      <p class="white-text">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam.
      </p>
    </div>
    <div id="globalPart2" class="initPart">
      <mdb-row>
        <mdb-col>
          <h4 class="white-text font-weight-bold">
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
          <h4 class="white-text font-weight-bold">
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

    <div id="globalPart3" class="initPart">
      <mdb-row>
        <mdb-col>
          <mdb-row
            v-for="(data, index) in chartData"
            :key="index"
            style="margin-top: 12px"
          >
            <mdb-col>
              <h6 class="white-text font-weight-bold">
                {{ index + 1 }}. {{ data.sceneName }}
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
          <div id="globalChartDiv" style="height: 200px" />
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
export default class GlobalViewContent extends Vue {
  private par2Data = {
    sceneCount: '0',
    coverage: '0%'
  }

  private chartData: Array<any> = []

  mounted () {
    const sourceData = [
      { sceneName: '违停驱离', count: 220 },
      { sceneName: '信控专家', count: 182 },
      { sceneName: '场景', count: 191 },
      { sceneName: '场景', count: 234 },
      { sceneName: '场景', count: 290 }
    ]
    this.chartData = sourceData.sort((a, b) => b.count - a.count)
  }

  private initChartData () {
    const chart = echarts.init($('#globalChartDiv')[0] as HTMLDivElement)
    const yData = this.chartData.map(
      data => data.sceneName + '  ' + data.count
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
            // color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            //   { offset: 0, color: 'rgb(166, 132, 255)' },
            //   { offset: 0.5, color: 'rgb(246, 66, 255)' },
            //   { offset: 1, color: 'rgb(245, 1, 255)' }
            // ]) as any
          },
          animationDelay: (index: number) => index * 100
        }
      ],
      animationEasing: 'elasticOut'
    })
  }

  public async showContent () {
    const animeTimeLine = anime.timeline({
      duration: 2000
    })
    await animeTimeLine
      .add({
        targets: '#globalPart1',
        opacity: 1,
        delay: 2000
      })
      .add(
        {
          targets: '#globalPart2',
          opacity: 1,
          translateY: 150
        }
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
        }
      )
      .add(
        {
          targets: '#globalPart3',
          opacity: 1,
          translateY: 250
        }
      ).finished
    this.initChartData()
  }

  public async hideContent () {
    const animeTimeLine = anime.timeline({
      duration: 2000
    })
    await animeTimeLine
      .add({
        targets: '#globalPart1',
        opacity: 0,
        translateY: 10
      })
      .add(
        {
          targets: '#globalPart2',
          opacity: 0,
          translateY: 10
        },
        '-=1800'
      )
      .add(
        {
          targets: '#globalPart3',
          opacity: 0,
          translateY: 10
        },
        '-=1800'
      ).finished
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
  padding-right: 0
}
</style>
