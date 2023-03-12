<template>
  <NuxtLink
    :to="`/courses/${course.slug}`"
    class="block relative overflow-hidden text-gray-200"
  >
    <div class="relative z-10 p-8 bg-top bg-cover h-full" :style="bgStyle">
      <h1 class="text-brand text-2xl uppercase">{{ course.title }}</h1>

      <p>{{ course.description }}</p>

      <div class="flex justify-between items-center mt-4 border-t-2 pt-2">
        <p v-if="instructors.length < 2">Instructor:</p>
        <p v-else>Instructors:</p>
        <div>
          <p v-for="instructor in instructors" :key="instructor.name">
            {{ instructor.name }}
          </p>
        </div>
        <FaIcon
          :icon="['fas', 'eye']"
          class="eyeIcon fa-lg absolute top-4 right-4 text-gray-50"
        ></FaIcon>
      </div>
    </div>
    <NuxtImg
      :src="course.heroImage.url"
      :width="course.heroImage.width"
      :height="course.heroImage.height"
      provider="contentful"
      sizes="sm:100vw"
      class="absolute top-0 left-0 z-0 w-full"
    />
  </NuxtLink>
</template>
<script>
export default {
  name: 'CourseCard',
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
  computed: {
    instructors() {
      return this.course.instructorsCollection.items
    },
    bgStyle() {
      // const imgUrl = this.$img(this.course.heroCloudinaryId)
      const gradient =
        'linear-gradient(to right,rgba(17,24,39,0.85) 20%,rgba(17,24,39,0.3))'

      // return `background-image:${gradient},url(${imgUrl});`
      return `background-image:${gradient}`
    },
  },
}
</script>
<style scoped>
.eyeIcon {
  visibility: hidden;
}

a:hover .eyeIcon,
a:focus .eyeIcon {
  visibility: visible;
}
</style>
