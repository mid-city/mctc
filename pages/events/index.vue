<template>
  <main class="container">
    <h1>Upcoming Training Events</h1>
    <event-card
      v-for="event in events"
      :key="event.sys.id"
      :event-id="event.sys.id"
      class="my-4"
    />
  </main>
</template>
<script>
import { gql } from 'nuxt-graphql-request'

export default {
  data() {
    return {
      events: [],
    }
  },
  async fetch() {
    const date = new Date()
    const query = gql`
      query eventCollectionQuery {
        eventCollection(where: {
            startDatetime_gte: "${date.toISOString()}"
        }) {
          items {
            sys {
              id
            }
          }
        }
      }
    `

    // this.$$graphql.default.setHeaders({
    //   authorization: `Bearer ${this.$config.contentApiSecret}`,
    // })
    this.events = await this.$graphql.default
      .request(query)
      .then((res) => res.eventCollection.items)
  },
}
</script>
