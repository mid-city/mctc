<template>
  <main>
    <div class="body-container">
      <h1>Contact</h1>
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <div v-if="content" class="content">
          <RichTextRenderer :document="content.json" />
        </div>
        <ContactForm />
      </div>
    </div>
  </main>
</template>
<script>
import { gql } from 'nuxt-graphql-request'
import RichTextRenderer from 'contentful-rich-text-vue-renderer'
export default {
  components: {
    RichTextRenderer,
  },
  async asyncData({ $graphql }) {
    const query = gql`
      query pageEntryQuery {
        page(id: "2IGlp5M1llvBY4YfQI1rhd") {
          content {
            json
          }
        }
      }
    `
    return (await $graphql.default.request(query)).page
  },
}
</script>
<style scoped>
.content p {
  @apply my-4;
}
</style>
