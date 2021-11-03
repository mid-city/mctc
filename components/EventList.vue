<template>
  <div class="grid gap-4 md:grid-cols-2 xl:grid-cols-3 xl:gap-6">
    <event-schedule-card
      v-for="event in events"
      :key="event.sys.id"
      :event="event"
      class="w-full"
    />
  </div>
</template>
<script>
import { gql } from 'nuxt-graphql-request'
export default {
  name: 'EventList',
  props: {
    start: {
      type: String,
      default: '',
    },
    end: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      events: [],
    }
  },
  async fetch() {
    const query = gql`
      query eventCollectionQuery {
        eventCollection(where: {
            startDatetime_gte: "${this.listStart}",
						endDatetime_lte: "${this.listEnd}"
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
  computed: {
    listStart() {
      return this.start ? this.start : this.$dayjs().toISOString()
    },
    listEnd() {
      return this.end ? this.end : this.$dayjs().add(1, 'month').toISOString()
    },
  },
}
</script>
