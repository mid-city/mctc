<template>
  <nuxt-link
    :to="`/events/${event.sys.id}`"
    class="
      block
      p-4
      hover:bg-gray-200
      focus:bg-gray-200
      border-2 border-gray-400
      hover:border-gray-600
      focus:border-gray-600
      text-gray-800
      max-w-xl
    "
  >
    <div class="">
      <h2 class="text-2xl text-gray-600 font-bold mb-2">
        {{ event.course.title }}
      </h2>
      <p class="">
        <FaIcon
          :icon="['fas', 'calendar-day']"
          class="fa-fw mr-2 text-brand"
        ></FaIcon
        >{{ displayDate }}
      </p>
      <p class="">
        <FaIcon
          :icon="['fas', 'map-marker-alt']"
          class="fa-fw mr-2 text-brand"
        ></FaIcon
        >{{ event.classroom.organization }} &mdash; {{ event.classroom.city }}
      </p>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  name: 'EventScheduleCard',

  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  computed: {
    displayDate() {
      return this.dateText(this.event.startDatetime, this.event.endDatetime)
    },
  },
  methods: {
    dateText(startISOString, endISOString) {
      const start = this.$dayjs(startISOString)
      const end = this.$dayjs(endISOString)

      const multiDay = !start.isSame(end, 'day')
      const multiMonth = !start.isSame(end, 'month')

      if (multiMonth)
        return `${start.format('MMMM D')} \u2013 ${end.format('MMMM D, YYYY')}`
      else if (multiDay)
        return `${start.format('MMMM D')} \u2013 ${end.format('D, YYYY')}`
      else return start.format('MMMM D, YYYY')
    },
  },
}
</script>
