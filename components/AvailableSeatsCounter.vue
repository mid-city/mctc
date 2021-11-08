<template>
  <div>
    <ClientOnly>
      <span v-if="!error && availableSeats >= 1"
        >{{ availableSeats }} Seats Open</span
      >
      <span v-if="!error && availableSeats < 1">Class Full!</span>
    </ClientOnly>
  </div>
</template>
<script>
export default {
  name: 'AvailableSeatsCounter',
  props: {
    eventId: {
      type: String,
      required: true,
    },
    maxSeats: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      takenSeats: 0,
      error: false,
    }
  },
  async fetch() {
    try {
      const data = await this.$axios.$get(`/getSeats?id=${this.eventId}`)
      this.takenSeats = data.count
      this.error = false
    } catch (err) {
      this.error = true
    }
  },
  computed: {
    availableSeats() {
      return this.maxSeats - this.takenSeats
    },
  },
}
</script>
