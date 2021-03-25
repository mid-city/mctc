<template>
  <nuxt-link
    v-if="!$fetchState.pending"
    :to="`/events/${eventId}`"
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
import { gql } from 'nuxt-graphql-request'

export default {
  name: 'EventCard',
  props: {
    eventId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      event: {},
    }
  },
  async fetch() {
    const query = gql`
      query eventEntryQuery {
        event(id: "${this.eventId}") {
          startDatetime
          endDatetime
          registrationOpen
          course {
            title
            description
          }
          classroom {
            organization
            city
          }
        }
      }
    `

    // this.$$graphql.default.setHeaders({
    //   authorization: `Bearer ${this.$config.contentApiSecret}`,
    // })
    this.event = await this.$graphql.default
      .request(query)
      .then((res) => res.event)
  },
  computed: {
    startDateTime() {
      return new Date(this.event.startDatetime)
    },
    endDateTime() {
      return new Date(this.event.endDatetime)
    },
    startDay() {
      const options = {
        day: 'numeric',
      }
      return this.startDateTime.toLocaleDateString('en-US', options)
    },
    endDay() {
      const options = {
        day: 'numeric',
      }
      return this.endDateTime.toLocaleDateString('en-US', options)
    },

    startMonth() {
      const options = {
        month: 'short',
      }
      return this.startDateTime.toLocaleDateString('en-US', options)
    },
    endMonth() {
      const options = {
        month: 'short',
      }
      return this.endDateTime.toLocaleDateString('en-US', options)
    },
    multiDay() {
      if (this.startDay === this.endDay) {
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
