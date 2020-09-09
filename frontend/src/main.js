import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

import VTooltip from 'v-tooltip'

Vue.use(VTooltip)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
