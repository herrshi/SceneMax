<template>
  <div class="container">
    <map-container />
  </div>
</template>

<script>
import MapContainer from '~/components/map/MapContainer'

export default {
  components: {
    MapContainer
  }
}
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
