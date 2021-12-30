<template>
  <main>
    <div class="body-container">
      <h1>Course Catalog</h1>
      <div class="flex justify-start text-xs mb-4 flex-wrap">
        <div class="filter-option">
          <input
            id="filterAll"
            v-model="selectedCategory"
            type="radio"
            name="filter"
            value=""
            checked
          />
          <label for="filterAll">All</label>
        </div>
        <div
          v-for="category in uniqueCategories"
          :key="category"
          class="filter-option"
        >
          <input
            :id="category"
            v-model="selectedCategory"
            type="radio"
            name="filter"
            :value="category"
          />
          <label :for="category">{{ category }}</label>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <course-card
          v-for="course in visibleCourses"
          :key="course.sys.id"
          :course="course"
        ></course-card>
      </div>
    </div>
  </main>
</template>
<script>
import { gql } from 'nuxt-graphql-request'

export default {
  data() {
    return {
      courses: [],
      visibleCourses: [],
      selectedCategory: '',
    }
  },

  async fetch() {
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
            categories
            heroCloudinaryId
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

    this.courses = await this.$graphql.default
      .request(query)
      .then((res) => res.courseCollection.items)

    this.computeFilter()
  },

  head: {
    title: 'Course Catalog',
  },

  computed: {
    uniqueCategories() {
      const allCategories = this.courses.flatMap((course) => course.categories)
      return [...new Set(allCategories)]
    },
  },

  watch: {
    selectedCategory() {
      this.computeFilter()
    },
  },

  methods: {
    computeFilter() {
      const noCategorySelected = this.selectedCategory.length === 0
      if (noCategorySelected) this.visibleCourses = this.courses
      else
        this.visibleCourses = this.courses.filter((course) =>
          course.categories.includes(this.selectedCategory)
        )
    },
  },
}
</script>
<style scoped>
.filter-option {
  @apply relative px-4 py-2 mb-2 mr-2;
}
.filter-option input {
  @apply appearance-none absolute top-0 left-0 w-full h-full border-brand border-2 rounded cursor-pointer;
}
.filter-option input:checked {
  @apply bg-brand;
}
.filter-option input:checked + label {
  @apply text-gray-100;
}
.filter-option label {
  @apply relative z-10 text-gray-900 cursor-pointer;
}
</style>
