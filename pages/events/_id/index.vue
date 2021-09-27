<template>
  <main>
    <div class="body-container lg:grid grid-cols-2 gap-6 pt-8">
      <div>
        <h1 class="mt-0">{{ event.course.title }}</h1>

        <div class="mb-8">
          <p>{{ event.course.description }}</p>
          <p class="text-right">
            <NuxtLink
              :to="`/courses/${event.course.slug}`"
              class="text-blue-800 underline"
            >
              Full Course Description
            </NuxtLink>
          </p>
          <p>{{ displayDate }}</p>
          <p>{{ displayTime }}</p>
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
          <LazyClassroomMap
            :lat="event.classroom.coordinates.lat"
            :lon="event.classroom.coordinates.lon"
            class="my-8 md:my-0 lg:my-8 max-w-2xl h-40 lg:h-80"
          />
        </div>
      </div>
      <div class="rounded p-8 bg-gray-200">
        <h2 class="text-brand text-2xl text-center">{{ formHeading }}</h2>
        <div
          v-if="registrationOpen"
          class="flex flex-wrap justify-between items-center mt-2"
        >
          <p>Price: ${{ event.course.price }}</p>
          <p>{{ statusMessage }}</p>
        </div>
        <RegistrationForm
          v-if="registrationOpen"
          :event-id="$route.params.id"
          :price="event.course.price"
          :dealer-price="event.course.dealerPrice"
          :start-date="startDateTime.toISOString()"
          :location="event.classroom.city"
          :course-title="event.course.title"
          :max-seats="event.maxAttendees"
        />
      </div>
    </div>
    <NuxtLink
      :to="`/events/${$route.params.id}/info-sheet`"
      class="fixed -top-80 -left-80"
      >info-sheet</NuxtLink
    >
  </main>
</template>
<script>
import { gql } from 'nuxt-graphql-request'
export default {
  async asyncData({ route, $graphql }) {
    const query = gql`
      query eventEntryQuery {
        event(id: "${route.params.id}") {
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

    const event = await $graphql.default.request(query).then((res) => res.event)

    return { event }
  },

  data() {
    return {
      takenSeats: null,
    }
  },

  async fetch() {
    const data = await this.$axios.$get(`/getSeats?id=${this.$route.params.id}`)
    this.takenSeats = data.count
  },

  computed: {
    displayDate() {
      return this.dateText(this.event.startDatetime, this.event.endDatetime)
    },
    displayTime() {
      return this.timeText(
        this.event.startDatetime,
        this.event.endDatetime,
        this.event.classroom.timeZone
      )
    },
    startDateTime() {
      return this.$dayjs(this.event.startDatetime)
    },
    endDateTime() {
      return this.$dayjs(this.event.endDatetime)
    },
    startDate() {
      return this.startDateTime.format('ddd, MMMM D, YYYY')
    },
    endDate() {
      return this.endDateTime.format('ddd, MMMM D, YYYY')
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
    hoursUntilStart() {
      const now = this.$dayjs()
      return this.startDateTime.diff(now, 'hour')
    },
    availableSeats() {
      if (this.takenSeats !== null)
        return this.event.maxAttendees - this.takenSeats
      else return null
    },
    registrationOpen() {
      if (this.hoursUntilStart < 24) return false
      else if (this.availableSeats === null) return true
      else if (this.availableSeats < 1) return false
      else return true
    },
    statusMessage() {
      if (this.registrationOpen && this.availableSeats === null) return ''
      else if (this.registrationOpen && this.availableSeats > 1)
        return `${this.availableSeats} Seats Remaining`
      else return `${this.availableSeats} Seat Remaining`
    },
    formHeading() {
      if (this.registrationOpen) return 'Register'
      else return 'Registration Closed'
    },
  },
  methods: {
    dateText(startISOString, endISOString) {
      const start = this.$dayjs(startISOString)
      const end = this.$dayjs(endISOString)

      const multiDay = !start.isSame(end, 'day')

      if (multiDay)
        return `${start.format('ddd, MMM. D')} \u2013 ${end.format(
          'ddd, MMM. D, YYYY'
        )}`
      else return start.format('dddd, MMM. D, YYYY')
    },
    timeText(startISOString, endISOString, timeZone) {
      const start =
        timeZone === 'Central'
          ? this.$dayjs(startISOString).tz('America/Chicago')
          : this.$dayjs(startISOString)
      const end =
        timeZone === 'Central'
          ? this.$dayjs(endISOString).tz('America/Chicago')
          : this.$dayjs(endISOString)
      const tzString = timeZone === 'Central' ? 'Central Time' : 'Eastern Time'

      return `${start.format('h:mm A')} \u2013 ${end.format(
        'h:mm A'
      )} ${tzString}`
    },
  },

  fetchOnServer: false,
}
</script>
