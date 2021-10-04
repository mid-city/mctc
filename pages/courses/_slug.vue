<template>
  <main>
    <div
      class="h-40 md:h-60 xl:h-80 bg-center bg-cover"
      :style="`background-image: linear-gradient(to top,rgba(17, 24, 39, 1) 10%,rgba(17, 24, 39, 0)), url('${heroImage}');`"
    >
      <div class="container h-full relative">
        <h1
          class="
            text-2xl
            sm:text-3xl
            md:text-4xl
            lg:text-5xl
            text-gray-50
            uppercase
            absolute
            bottom-4
            left-4
          "
        >
          {{ course.title }}
        </h1>
      </div>
      <!-- <img :src="heroImage" alt="" class="absolute bottom-0 left-0 -z-10" /> -->
    </div>

    <div class="body-container">
      <h2 class="text-brand text-2xl my-8">Course Description</h2>
      <div v-if="course.longDescription" class="prose">
        <rich-text-renderer :document="course.longDescription.json" />
      </div>
    </div>

    <div class="container">
      <h2 v-if="!multipleInstructors">Instructor</h2>
      <h2 v-if="multipleInstructors">Instructors</h2>
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

  data() {
    return {
      course: {},
    }
  },

  async fetch() {
    const query = gql`
      query courseQuery {
        courseCollection(where: { slug: "${this.$route.params.slug}" }) {
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

    this.course = await this.$graphql.default
      .request(query)
      .then((res) => res.courseCollection.items[0])
  },

  computed: {
    heroImage() {
      if (this.course.heroImage) {
        return this.course.heroImage.url
      } else {
        return ''
      }
    },
    multipleInstructors() {
      if (this.course.instructorsCollection.items.length > 1) return true
      else return false
    },
  },
}
</script>
