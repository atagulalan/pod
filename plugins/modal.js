import Vue from 'vue'
import VModal from 'vue-js-modal/dist/ssr.nocss'

Vue.use(VModal)

// TODO workaround, app doesn't have $modal inside it,
// Check this if solved, implement
// https://github.com/euvl/vue-js-modal/issues/543
export default ({ app }, inject) => {
  // Set the function directly on the context.app object
  app.accessiblePluginModal = Vue.prototype.$modal
}
