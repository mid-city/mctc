<template>
  <main class="container">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <course-tile
        v-for="course in courses"
        :key="course.title"
        :course="course"
      ></course-tile>
    </div>
  </main>
</template>
<script>
export default {
  data() {
    return {
      courses: [
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
