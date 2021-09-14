<template>
  <div>
    <span>{{ availableSeats }} Seats Open</span>
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
      const data = await this.$axios.$get('/getSeats')
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
