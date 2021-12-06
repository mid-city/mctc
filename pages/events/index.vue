<template>
  <main>
    <div class="body-container">
      <h1>Class Schedule</h1>
      <EventList
        :start="start"
        :end="end"
        class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6"
      />
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
