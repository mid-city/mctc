<template>
  <footer class="bg-gray-900 text-gray-200">
    <div class="container flex justify-center py-8">
      <a
        v-if="$auth.loggedIn"
        class="underline hover:text-gray-50 cursor-pointer"
        @click="$auth.logout()"
        >Logout</a
      >
      <a
        v-else
        class="underline hover:text-gray-50 cursor-pointer"
        @click="$auth.loginWith('auth0')"
        >Admin Login</a
      >
    </div>
  </footer>
</template>
