<template>
  <div>
    <transition name="fade-in">
      <b-map-container v-show="showNationalMap" ref="bMapContainer" />
    </transition>

    <transition name="fade-out">
      <map-container
        v-if="showGlobalMap"
        ref="mapContainer"
        @mapLoaded="mapLoaded"
      />
    </transition>

    <global-view-content ref="globalViewContent" />
    <national-view-content ref="nationalViewContent" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import MapContainer from '~/components/map/MapContainer.vue'
import BMapContainer from '~/components/map/BMapContainer.vue'
import GlobalViewContent from '~/components/TheGlobalViewContent.vue'
import NationalViewContent from '~/components/TheNationalViewContent.vue'

@Component({
  components: {
    MapContainer,
    BMapContainer,
    GlobalViewContent,
    NationalViewContent
  }
})
export default class Home extends Vue {
  @Ref() readonly mapContainer!: MapContainer
  @Ref() readonly globalViewContent!: GlobalViewContent
  @Ref() readonly nationalViewContent!: NationalViewContent

  showGlobalMap: boolean = true
  showNationalMap: boolean = false

  private mapLoaded () {
    this.globalViewContent.showContent()
    this.mapContainer.startRotate()

    setTimeout(() => {
      this.showNation()
    }, 12000)
  }

  private async showNation () {
    this.mapContainer.stopRotate()
    await this.mapContainer.goToBookmark('china')
    await this.globalViewContent.hideContent()
    this.showGlobalMap = false
    this.showNationalMap = true
    await this.nationalViewContent.showContent()
  }
}
</script>

<style scoped>
.fade-out-enter-active,
.fade-out-leave-active {
  transition: opacity 2s;
}
.fade-out-enter, .fade-out-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

.fade-in-enter-active,
.fade-in-leave-active {
  transition: opacity 2s;
}
.fade-in-enter, .fade-in-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 1;
}
</style>
