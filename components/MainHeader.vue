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
          <li v-if="$auth.loggedIn">
            <nuxt-link to="/admin">Admin</nuxt-link>
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>
