<template>
  <main class="container">
    <h1 class="text-brand text-3xl my-8">Course Catalog</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <course-tile
        v-for="course in courses.courseCollection.items"
        :key="course.sys.id"
        :course="course"
      ></course-tile>
    </div>
  </main>
</template>
<script>
import { gql } from 'nuxt-graphql-request'
export default {
  async asyncData({ $graphql, params }) {
    const query = gql`
      query courseCollectionQuery {
        courseCollection {
          items {
            sys {
              id
            }
            title
            description
            heroImage {
              url
            }
            instructorsCollection {
              items {
                name
              }
            }
          }
        }
      }
    `

    const courses = await $graphql.default.request(query)
    return { courses }
  },
  data() {
    return {
      oldCourses: [
        {
          title: 'AC 101',
          shortDesc: 'Learn the fundamentals of Air Contitioning',
          instructor: 'Andrew Ballentine',
          img: 'AC_101.jpeg',
        },
        {
          title: 'Fujitsu Indoor Head Teardown',
          shortDesc: 'See the innards. Be happy',
          instructor: 'Andrew Ballentine',
          img: 'Fujitsu_Indoor_Head_Teardown.jpeg',
        },
      ],
    }
  },
}
</script>
<style scoped></style>
