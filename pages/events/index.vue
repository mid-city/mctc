<template>
  <main>
    <div class="body-container">
      <h1>Class Schedule</h1>
      <EventList :start="start" :end="end" />
    </div>
  </main>
</template>
<script>
export default {
  computed: {
    start() {
      return this.$dayjs().subtract(1, 'month').toISOString()
    },
    end() {
      return this.$dayjs().add(1, 'year').toISOString()
    },
  },
}
</script>
