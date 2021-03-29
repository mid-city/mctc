<template>
  <nuxt-link
    :to="`/events/${event.sys.id}`"
    class="flex p-4 bg-blue-200 hover:bg-blue-300 border-2 border-blue-400 rounded text-gray-800 items-center flex-wrap max-w-xl"
  >
    <div class="flex-grow">
      <h2 class="text-2xl">{{ event.course.title }}</h2>
      <p class="text-sm">
        {{ event.classroom.organization }} &mdash; {{ event.classroom.city }}
      </p>
    </div>
    <p class="text-3xl text-blue-900">
      {{ startMonth }} {{ startDay
      }}<span v-if="multiDay">
        &ndash; <span v-if="multiMonth">{{ endMonth }}</span> {{ endDay }}</span
      >
    </p>
  </nuxt-link>
</template>
<script>
// import { gql } from 'nuxt-graphql-request'

export default {
  name: 'EventScheduleCard',

  props: {
    event: {
      type: Object,
      required: true,
    },
  },

  computed: {
    startDateTime() {
      return this.$dayjs(this.event.startDatetime)
    },
    endDateTime() {
      return this.$dayjs(this.event.endDatetime)
    },
    startDay() {
      return this.startDateTime.format('D')
    },
    endDay() {
      return this.endDateTime.format('D')
    },

    startMonth() {
      return this.startDateTime.format('MMM')
    },
    endMonth() {
      return this.endDateTime.format('MMM')
    },
    multiDay() {
      if (
        this.startDateTime.format('MM/DD/YYYY') ===
        this.endDateTime.format('MM/DD/YYYY')
      ) {
        return false
      } else {
        return true
      }
    },
    multiMonth() {
      if (this.startMonth === this.endMonth) {
        return false
      } else {
        return true
      }
    },
  },
}
</script>
