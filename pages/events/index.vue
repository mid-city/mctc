<template>
  <main>
    <div class="body-container">
      <h1>Class Schedule</h1>
      <div
        v-if="flags.agendaView"
        class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6"
      >
        <event-schedule-card
          v-for="event in events"
          :key="event.sys.id"
          :event="event"
          class="w-full"
        />
      </div>
    </div>
  </main>
</template>
<script>
import { gql } from 'nuxt-graphql-request'

export default {
  data() {
    return {
      events: [],
      flags: {
        agendaView: true,
        calendarView: false,
      },
    }
  },
  async fetch() {
    const query = gql`
      query eventCollectionQuery {
        eventCollection(where: {
            startDatetime_gte: "${this.$dayjs()
              .subtract(15, 'days')
              .toISOString()}"
        }, order: [startDatetime_ASC]) {
          items {
            sys {
              id
            }
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
      }
    `

    this.events = await this.$graphql.default
      .request(query)
      .then((res) => res.eventCollection.items)
  },
}
</script>
