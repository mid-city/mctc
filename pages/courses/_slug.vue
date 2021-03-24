<template>
  <main>
    <div
      class="h-40 md:h-60 xl:h-80 bg-center bg-cover"
      :style="`background-image: linear-gradient(to top,rgba(17, 24, 39, 1) 10%,rgba(17, 24, 39, 0)), url('${heroImage}');`"
    >
      <div class="container h-full relative">
        <h1
          class="text-2xl md:text-3xl lg:text-4xl text-gray-50 uppercase absolute bottom-4 left-4"
        >
          {{ course.title }}
        </h1>
      </div>
      <!-- <img :src="heroImage" alt="" class="absolute bottom-0 left-0 -z-10" /> -->
    </div>

    <div class="container">
      <h2>Course Description</h2>
      <div v-if="course.longDescription" class="prose md:prose-lg max-w-none">
        <rich-text-renderer :document="course.longDescription.json" />
      </div>
    </div>

    <div class="container">
      <h2>Instructors</h2>
      <div class="md:grid grid-cols-2 gap-4 xl:grid-cols-3">
        <instructor-card
          v-for="instructor in course.instructorsCollection.items"
          :id="instructor.sys.id"
          :key="instructor.sys.id"
          class="mb-4 md:col-span-1"
        ></instructor-card>
      </div>
    </div>
  </main>
</template>
<script>
import { gql } from 'nuxt-graphql-request'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'

export default {
  components: {
    RichTextRenderer,
  },

  async asyncData({ $graphql, $config: { contentApiSecret }, params }) {
    const query = gql`
      query courseQuery {
        courseCollection(where: { slug: "${params.slug}" }) {
          items {
            title
            slug
            description
            longDescription { json }
            heroImage { url }
            instructorsCollection {
              items { sys { id } }
            }
          }
        }
      }
    `
    // $graphql.default.setHeaders({ authorization: `Bearer ${contentApiSecret}` })
    const response = await $graphql.default.request(query)
    const course = response.courseCollection.items[0]
    return { course }
  },

  computed: {
    heroImage() {
      if (this.course.heroImage) {
        return this.course.heroImage.url
      } else {
        return ''
      }
    },
  },
}
</script>
<style scoped>
h2 {
  @apply text-brand text-xl my-4 sm:text-2xl;
}
</style>
