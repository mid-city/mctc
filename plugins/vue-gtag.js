import Vue from 'vue'
import VueGtag from 'vue-gtag'

export default (context) => {
  Vue.use(VueGtag, { config: { id: 'G-2FQ4PX6RX2' } }, context.app.router)
}
