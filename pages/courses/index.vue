<template>
  <main>
    <div class="body-container">
      <h1>Course Catalog</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <course-card
          v-for="course in courses"
          :key="course.sys.id"
          :course="course"
        ></course-card>
      </div>
    </div>
  </main>
</template>
<script>
import { gql } from 'nuxt-graphql-request'

export default {
  data() {
    return {
      courses: [],
    }
  },

  async fetch() {
    const query = gql`
      query courseCollectionQuery {
        courseCollection {
          items {
            sys {
              id
            }
            title
            slug
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

    this.courses = await this.$graphql.default
      .request(query)
      .then((res) => res.courseCollection.items)
  },
}
</script>
<style scoped></style>
