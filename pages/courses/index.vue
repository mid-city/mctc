<template>
  <main class="container">
    <h1>Course Catalog</h1>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <course-card
        v-for="course in courses"
        :key="course.sys.id"
        :course="course"
      ></course-card>
    </div>
  </main>
</template>
<script>
import { gql } from 'nuxt-graphql-request'
export default {
  async asyncData({ $graphql, $config: { contentApiSecret } }) {
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

    // $graphql.default.setHeaders({ authorization: `Bearer ${contentApiSecret}` })
    const response = await $graphql.default.request(query)
    const courses = response.courseCollection.items
    return { courses }
  },
}
</script>
<style scoped></style>
