<template>
  <main class="container">
    <h1>Thank you!</h1>
    <p>Test registration successful.</p>
  </main>
</template>
<script>
// import { gql } from 'nuxt-graphql-request'
// export default {
//   data() {
//     return {
//       event: {},
//     }
//   },
//   async fetch() {
//     const query = gql`
//       query eventEntryQuery {
//         event(id: "${this.$route.query.event}") {
//           startDatetime
//           endDatetime
//           course {
//             slug
//             title
//             description
//             heroImage {
//               url
//             }
//           }
//           classroom {
//             organization
//             city
//             state
//             timeZone
//           }
//         }
//       }
//     `

//     this.event = await this.$graphql.default
//       .request(query)
//       .then((res) => res.event)
//   },
// }
</script>
