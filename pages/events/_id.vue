<template>
  <main class="container lg:grid grid-cols-2 gap-6 pt-8">
    <div>
      <h1 class="mt-0">{{ event.course.title }}</h1>
      <div class="mb-8">
        <p>
          {{ startDate }}
          <span v-if="multiDay">&ndash; {{ endDate }}</span>
        </p>
        <p>
          {{ startTime }} &ndash; {{ endTime }}
          {{ event.classroom.timeZone }} Time
        </p>
      </div>
      <div class="mb-8 md:grid grid-cols-2 lg:block">
        <div>
          <h2 class="text-brand text-lg mb-2">Location</h2>
          <p>
            {{ event.classroom.organization }} &mdash;
            {{ event.classroom.city }} Classroom <br />
            {{ event.classroom.address }}<br />{{ event.classroom.city }},
            {{ event.classroom.state }} {{ event.classroom.zip }}
          </p>
        </div>
        <client-only>
          <classroom-map
            :lat="event.classroom.coordinates.lat"
            :lon="event.classroom.coordinates.lon"
            class="my-8 md:my-0 lg:my-8 max-w-2xl h-40 lg:h-80"
          />
        </client-only>
      </div>
    </div>
    <registration-form class="rounded" />
  </main>
</template>
<script>
import { gql } from 'nuxt-graphql-request'
export default {
  data() {
    return {
      event: {},
    }
  },

  async fetch() {
    const query = gql`
      query eventEntryQuery {
        event(id: "${this.$route.params.id}") {
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
            address
            city
            state
            zip
            timeZone
            coordinates {
              lat
              lon
            }
          }
        }
      }
    `

    this.event = await this.$graphql.default
      .request(query)
      .then((res) => res.event)
  },

  computed: {
    startDateTime() {
      return this.$dayjs(this.event.startDatetime)
    },
    endDateTime() {
      return this.$dayjs(this.event.endDatetime)
    },
    startDate() {
      return this.startDateTime.format('dddd, MMMM D, YYYY')
    },
    endDate() {
      return this.endDateTime.format('dddd, MMMM D, YYYY')
    },
    startTime() {
      if (this.event.classroom.timeZone === 'Central') {
        return this.startDateTime.tz('America/Chicago').format('h:mm A')
      } else {
        return this.startDateTime.format('h:mm A')
      }
    },
    endTime() {
      if (this.event.classroom.timeZone === 'Central') {
        return this.endDateTime.tz('America/Chicago').format('h:mm A')
      } else {
        return this.endDateTime.format('h:mm A')
      }
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
  },
}
</script>
