<template>
  <header>
    <nav
      class="
        menu
        fixed
        left-0
        z-30
        top-0
        w-5/6
        max-w-xs
        bg-gray-50
        min-h-screen
      "
      :class="menuDisplayClass"
    >
      <div class="pt-4 mt-12 sm:mt-16 md:mt-20">
        <ul @click="hideMenu">
          <li>
            <NuxtLink to="/courses"
              ><FaIcon :icon="['fas', 'book']" class="fa-fw mr-1"></FaIcon
              >Course Catalog</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/instructors"
              ><FaIcon
                :icon="['fas', 'chalkboard-teacher']"
                class="fa-fw mr-1"
              ></FaIcon
              >Instructors</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/events"
              ><FaIcon
                :icon="['fas', 'calendar-alt']"
                class="fa-fw mr-1"
              ></FaIcon
              >Class Schedule</NuxtLink
            >
          </li>
          <li>
            <NuxtLink to="/contact">
              <FaIcon :icon="['fas', 'mobile-alt']" class="fa-fw mr-1"></FaIcon
              >Contact</NuxtLink
            >
          </li>
        </ul>
      </div>
    </nav>
    <div
      class="
        flex
        items-center
        text-brand
        bg-gray-50
        shadow-sm
        z-40
        fixed
        top-0
        w-full
        h-12
        sm:h-16
        md:h-20
        lg:h-28
      "
    >
      <a
        class="
          lg:hidden
          absolute
          left-4
          sm:left-8
          p-1
          rounded
          hover:bg-gray-200
          focus:bg-gray-200
          cursor-pointer
          z-50
        "
        @click="toggleMenu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h7"
          />
        </svg>
      </a>
      <div
        class="
          container
          flex flex-wrap
          lg:justify-between
          justify-center
          items-center
        "
      >
        <HeaderLogo class="w-40 sm:w-48 md:w-60 lg:w-80" />
        <nav class="hidden lg:block flex-grow max-w-xl text-gray-700">
          <ul class="flex justify-between items-center text-md">
            <li>
              <NuxtLink to="/courses"
                ><FaIcon :icon="['fas', 'book']" class="fa-fw mr-1"></FaIcon
                >Course Catalog</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/instructors"
                ><FaIcon
                  :icon="['fas', 'chalkboard-teacher']"
                  class="fa-fw mr-1"
                ></FaIcon
                >Instructors</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/events"
                ><FaIcon
                  :icon="['fas', 'calendar-alt']"
                  class="fa-fw mr-1"
                ></FaIcon
                >Class Schedule</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/contact">
                <FaIcon
                  :icon="['fas', 'mobile-alt']"
                  class="fa-fw mr-1"
                ></FaIcon
                >Contact</NuxtLink
              >
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>
<style scoped>
.menu li {
  @apply p-4 mb-2;
}
</style>
<script>
export default {
  name: 'MainHeader',
  data() {
    return {
      menuVisible: false,
    }
  },
  computed: {
    menuDisplayClass() {
      return this.menuVisible ? 'block lg:hidden' : 'hidden'
    },
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible
    },
    hideMenu() {
      this.menuVisible = false
    },
  },
}
</script>
