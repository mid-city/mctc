<template>
  <main>
    <event-card
      v-for="event in events"
      :key="event.sys.id"
      :event-id="event.sys.id"
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
    const query = gql`
      query eventCollectionQuery {
        eventCollection {
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
    const response = await this.$graphql.default.request(query)
    this.events = response.eventCollection.items
  },
}
</script>
