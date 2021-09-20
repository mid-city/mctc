<template>
  <div id="mapbox" class="w-full"></div>
</template>
<script>
import 'mapbox-gl/dist/mapbox-gl.css'
import mapboxgl from 'mapbox-gl'

export default {
  name: 'ClassroomMap',

  props: {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      mapStyle: 'mapbox://styles/mapbox/streets-v11',
      mapZoom: 11,
    }
  },
  mounted() {
    mapboxgl.accessToken = this.$config.mapboxToken
    this.mapbox = new mapboxgl.Map({
      container: 'mapbox',
      style: this.mapStyle,
      center: [this.lon, this.lat],
      zoom: this.mapZoom,
    })
    const marker = new mapboxgl.Marker({ color: '#D42F35' }).setLngLat([
      this.lon,
      this.lat,
    ])
    marker.addTo(this.mapbox)
  },
  methods: {},
}
</script>
