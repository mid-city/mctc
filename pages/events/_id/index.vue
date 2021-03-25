<template>
  <main class="container">
    <h1>{{ event.course.title }}</h1>
    <p>
      {{ startDate }}
      <span v-if="multiDay">&ndash; {{ endDate }}</span>
    </p>
    <p>
      {{ startTime }} &ndash; {{ endTime
      }}<span v-if="multiDay"> (Both Days)</span>
    </p>
    <p>
      {{ event.classroom.organization }} &mdash;
      {{ event.classroom.city }} Classroom
    </p>
  </main>
</template>
<script>
import { gql } from 'nuxt-graphql-request'
export default {
  async asyncData({ $graphql, $config: { contentApiSecret }, params }) {
    const query = gql`
      query eventEntryQuery {
        event(id: "${params.id}") {
          startDatetime
          endDatetime
          refreshments
          maxAttendees
          course {
            sys {
              id
            }
            slug
            title
            description
            price
            dealerPrice
            instructorsCollection {
              items {
                sys {
                  id
                }
                slug
                name
              }
            }
            heroImage {
              url
            }
          }
          classroom {
            sys {
              id
            }
            organization
            city
            coordinates {
              lat
              lon
            }
          }
        }
      }
    `
    // $graphql.default.setHeaders({ authorization: `Bearer ${contentApiSecret}` })
    const response = await $graphql.default.request(query)
    const event = response.event
    return { event }
  },
  computed: {
    startDate() {
      const date = new Date(this.event.startDatetime)
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return date.toLocaleDateString('en-US', options)
    },
    endDate() {
      const date = new Date(this.event.endDatetime)
      const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }
      return date.toLocaleDateString('en-US', options)
    },
    startTime() {
      const date = new Date(this.event.startDatetime)
      const options = {
        timeStyle: 'short',
      }
      return date.toLocaleTimeString('en-US', options)
    },
    endTime() {
      const date = new Date(this.event.endDatetime)
      const options = {
        timeStyle: 'short',
      }
      return date.toLocaleTimeString('en-US', options)
    },
    multiDay() {
      if (this.startDate !== this.endDate) {
        return true
      } else {
        return false
      }
    },
  },
}
</script>
