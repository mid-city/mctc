<template>
  <main>
    <div class="h-28 sm:h-40 md:h-60 xl:h-80 overflow-hidden relative">
      <div
        class="bg-gradient-to-b from-transparent to-black h-full relative z-10"
      >
        <div class="title container h-full relative">
          <h1
            class="
              text-2xl
              sm:text-3xl
              md:text-4xl
              lg:text-5xl
              text-gray-50
              uppercase
              absolute
              bottom-2
              sm:bottom-4
              left-4
            "
          >
            {{ course.title }}
          </h1>
        </div>
      </div>
      <NuxtImg
        :src="course.heroCloudinaryId"
        alt="hero image"
        class="absolute top-0 left-0"
        height="1000"
        width="3000"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
        fit="cover"
      />
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
      <div>
        <p
          v-for="instructor in course.instructorsCollection.items"
          :key="instructor.sys.id"
          class="mb-4 md:col-span-1"
        >
          {{ instructor.name }}
        </p>
      </div>
      <!-- <div class="md:grid grid-cols-2 gap-4 xl:grid-cols-3">
        <instructor-card
          v-for="instructor in course.instructorsCollection.items"
          :id="instructor.sys.id"
          :key="instructor.sys.id"
          class="mb-4 md:col-span-1"
        ></instructor-card>
      </div> -->
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
						categories
            heroImage { url }
						heroCloudinaryId
            instructorsCollection {
              items { 
								sys { id } 
								name
							}
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
