<template>
  <div>
    <img
      v-if="photoPresent"
      :src="instructor.photo.url"
      class="w-24 rounded-full border-2"
    />
    <FaIcon
      v-if="!photoPresent"
      :icon="['fas', 'user-circle']"
      class="fa-6x"
    ></FaIcon>
  </div>
</template>
<script>
export default {
  name: 'InstructorPhoto',
  props: {
    instructor: {
      type: Object,
      required: true,
    },
  },
  computed: {
    photoUrl() {
      return this.instructor.photo ? this.instructor.photo.url : ''
    },
    photoPresent() {
      return this.photoUrl.length > 0
    },
  },
}
</script>
