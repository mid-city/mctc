<template>
  <div class="border-2 p-4">
    <div class="flex flex-row flex-wrap items-center mb-4">
      <InstructorPhoto :instructor="instructor" />
      <p class="text-brand font-bold flex-grow text-center">
        {{ instructor.name }}
      </p>
    </div>
    <div class="overflow-hidden max-h-40 relative">
      <p>{{ instructor.bio }}</p>
      <div
        class="
          absolute
          bottom-0
          left-0
          bg-gradient-to-t
          from-gray-50
          to-transparent
          z-10
          w-full
          h-20
        "
      >
        <div class="relative h-full w-full">
          <a
            href="#"
            class="underline text-blue-800 absolute bottom-0 right-0 text-sm"
            >More&hellip;</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { gql } from 'nuxt-graphql-request'

export default {
  name: 'InstructorCard',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      instructor: {},
    }
  },
  async fetch() {
    const query = gql`
      query instructorQuery {
        instructor(id: "${this.id}") {
          name
          bio
          photo {
            url
          }
        }
      }
    `
    // this.$graphql.default.setHeaders({
    //   authorization: `Bearer ${this.$config.contentApiSecret}`,
    // })
    const response = await this.$graphql.default.request(query)
    this.instructor = response.instructor
  },
}
</script>
<style scoped></style>
