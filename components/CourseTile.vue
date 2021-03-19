<template>
  <div class="tile relative overflow-hidden p-8 text-white">
    <h1 class="text-red-800 text-2xl uppercase">{{ course.title }}</h1>
    <img
      :src="require(`~/assets/img/${course.img}`)"
      class="absolute -z-10 top-0 left-0"
    />
    <p>{{ course.shortDesc }}</p>
    <p>Instructor: {{ course.instructor }}</p>
  </div>
</template>
<script>
export default {
  name: 'CourseTile',
  props: {
    course: {
      type: Object,
      required: true,
    },
  },
}
</script>
<style scoped></style>
