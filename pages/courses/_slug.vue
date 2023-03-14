<template>
  <main>
    <div class="h-28 sm:h-40 md:h-60 xl:h-80 overflow-hidden relative">
      <div
        class="bg-gradient-to-b from-transparent to-black h-full relative z-10"
      >
        <div class="title container h-full relative">
          <h1
            class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-50 uppercase absolute bottom-2 sm:bottom-4 left-4"
          >
            {{ course.title }}
          </h1>
        </div>
      </div>
      <NuxtImg
        provider="contentful"
        :src="course.heroImage.url"
        :height="course.heroImage.height"
        :width="course.heroImage.width"
        sizes="xs:100vw sm:100vw md:100vw lg:100vw xl:100vw 2xl:100vw"
        fit="cover"
        class="absolute top-0 left-0"
        alt="hero image"
      />
    </div>
    <div class="body-container grid grid-cols-1 lg:grid-cols-12">
      <div class="lg:col-span-8">
        <h2 class="text-brand text-2xl my-8">Course Description</h2>
        <div v-if="course.longDescription" class="prose">
          <rich-text-renderer :document="course.longDescription.json" />
        </div>
        <div>
          <h2>{{ instructorsTitle }}</h2>
          <div>
            <p
              v-for="instructor in course.instructorsCollection.items"
              :key="instructor.sys.id"
              class="mb-4 md:col-span-1"
            >
              {{ instructor.name }}
            </p>
          </div>
        </div>
      </div>
      <div class="lg:col-span-4 bg-gray-200 px-4 py-8 mt-8">
        <h3 class="text-gray-800 mb-8 text-xl">Upcoming Classes</h3>
        <EventList
          :start="eventListStart"
          :end="eventListEnd"
          :course="course.sys.id"
          class="event-list grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-1"
        />
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

  async asyncData({ route, $graphql }) {
    const query = gql`
      query courseQuery {
        courseCollection(where: { slug: "${route.params.slug}" }) {
          items {
						sys {
							id
						}
            title
            slug
            description
            longDescription { json }
						categories
            heroImage { url , height, width }
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

    const course = await $graphql.default
      .request(query)
      .then((res) => res.courseCollection.items[0])

    return { course }
  },

  head() {
    return {
      title: this.course.title,
    }
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

    instructorsTitle() {
      return this.multipleInstructors ? 'Instructors' : 'Instructor'
    },

    eventListStart() {
      return this.$dayjs().toISOString()
    },

    eventListEnd() {
      return this.$dayjs().add(3, 'months').toISOString()
    },
  },
}
</script>
