<template>
  <div class="grid grid-cols-12 gap-2 p-12 w-full">
    <h1 class="col-span-12">Class Info Sheet</h1>
    <table class="col-span-6">
      <tbody>
        <tr>
          <td>Course</td>
          <td>{{ event.course.title }}</td>
        </tr>
        <tr>
          <td>Date</td>
          <td>{{ displayDate }}</td>
        </tr>
        <tr>
          <td>Time</td>
          <td>{{ displayTime }}</td>
        </tr>
        <tr>
          <td>Classroom</td>
          <td>{{ event.classroom.city }}</td>
        </tr>
        <tr>
          <td>Refreshments</td>
          <td>{{ event.refreshments }}</td>
        </tr>
        <tr>
          <td>MC #</td>
          <td>{{ event.course.sku }}</td>
        </tr>
        <tr>
          <td>Required Materials</td>
          <td>
            <p v-for="mc in event.course.requiredMaterials" :key="mc">
              MC {{ mc }}
            </p>
          </td>
        </tr>
        <tr>
          <td>Standard Price</td>
          <td>${{ event.course.price }}</td>
        </tr>
        <tr>
          <td>Dealer Price</td>
          <td>
            <span v-if="event.course.dealerPrice"
              >${{ event.course.dealerPrice }}</span
            ><span v-else>N/A</span>
          </td>
        </tr>
        <tr>
          <td>BOGO Allowed?</td>
          <td>
            <span v-if="event.course.bogoAllowed">Yes</span>
            <span v-else>No</span>
          </td>
        </tr>
        <tr>
          <td>Training Hours</td>
          <td>{{ event.course.trainingHours }}</td>
        </tr>
        <tr>
          <td>Instructor(s)</td>
          <td>
            <p
              v-for="instructor in event.course.instructorsCollection.items"
              :key="instructor.sys.id"
            >
              {{ instructor.name }}
            </p>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import { gql } from 'nuxt-graphql-request'
export default {
  layout: 'class-details',
  async asyncData({ route, $graphql }) {
    const query = gql`
			query eventEntryQuery {
				event(id:"${route.params.id}") {
					startDatetime
					endDatetime
					refreshments
					maxAttendees
          classroom {
            organization
            address
            city
            state
            zip
          }
					course {
						slug
						title
						description
						sku
						trainingHours
						price
						dealerPrice
						bogoAllowed
						requiredMaterials 
						instructorsCollection {
							items {
								sys {
									id
								}
								name
							}
						}
					}
				}
			}
		`

    const event = (await $graphql.default.request(query)).event
    return { event }
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
}
</script>
<style scoped>
tr {
  @apply border-b-2;
}
td:last-child {
  @apply text-right;
}
</style>
