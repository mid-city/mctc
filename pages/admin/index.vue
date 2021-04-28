<template>
  <main>
    <div class="container"><h1>Admin page</h1></div>
  </main>
</template>
<script>
export default {
  middleware: 'auth',
  computed: {
    user() {
      return this.$auth.user
    },
  },
}
</script>
