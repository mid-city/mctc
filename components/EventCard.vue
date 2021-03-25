<template>
  <div class="p-4 mb-4 bg-blue-100">
    <p>{{ event.course.title }}</p>
    <p>{{ event.classroom.organization }} &mdash; {{ event.classroom.city }}</p>
    <nuxt-link :to="`/events/${eventId}`" class="underline">Details</nuxt-link>
  </div>
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
      event: undefined,
    }
  },
  async fetch() {
    const query = gql`
      query eventEntryQuery {
        event(id: "${this.eventId}") {
          startDatetime
          endDatetime
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
    const response = await this.$graphql.default.request(query)
    this.event = response.event
  },
}
</script>
