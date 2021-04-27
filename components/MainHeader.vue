<template>
  <header class="text-brand bg-gray-100 py-4">
    <div class="container">
      <div class="logo max-w-sm mx-auto">
        <nuxt-link to="/"
          ><img
            src="/logos/Mid-City_Tech_Center.png"
            alt="Mid-City Tech Center"
        /></nuxt-link>
      </div>
      <nav>
        <ul class="flex justify-between items-center">
          <li>
            <nuxt-link to="/courses">Courses</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/instructors">Instructors</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/events">Events</nuxt-link>
          </li>
          <li>
            <nuxt-link to="/contact">Contact</nuxt-link>
          </li>
          <li>
            <button
              class="bg-brand text-gray-50 py-2 px-8 rounded-lg hover:bg-red-500 focus:bg-red-500"
              @click="handleLogin"
            >
              Login
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
export default {
  methods: {
    handleLogin() {
      this.$auth.loginWith('auth0')
    },
  },
}
</script>
