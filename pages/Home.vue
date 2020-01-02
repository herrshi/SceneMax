<template>
  <div>
    <map-container />
    <global-view-content />
  </div>
</template>

<script>
import { Vue, Component } from 'vue-property-decorator'
import MapContainer from '~/components/map/MapContainer.vue'
import GlobalViewContent from '~/components/TheGlobalViewContent.vue'

@Component({
  components: {
    MapContainer,
    GlobalViewContent
  }
})
export default class Home extends Vue {}
</script>

<style scoped>
#divHomeOverlay {
  position: absolute;
  padding: 0;
  margin: 0;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
}
</style>
