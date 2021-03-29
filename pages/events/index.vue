<template>
  <main class="container">
    <h1>Upcoming Training Events</h1>
    <div v-if="!calendarView">
      <event-schedule-card
        v-for="event in events"
        :key="event.sys.id"
        :event="event"
        class="my-4"
      />
    </div>
  </main>
</template>
<script>
import { gql } from 'nuxt-graphql-request'

export default {
  data() {
    return {
      events: [],
      calendarView: false,
    }
  },
  async fetch() {
    const query = gql`
      query eventCollectionQuery {
        eventCollection(where: {
            startDatetime_gte: "${this.$dayjs().toISOString()}"
        }, order: [startDatetime_ASC]) {
          items {
            sys {
              id
            }
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
      }
    `

    this.events = await this.$graphql.default
      .request(query)
      .then((res) => res.eventCollection.items)
  },
}
</script>
