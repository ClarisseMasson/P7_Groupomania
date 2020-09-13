import Vue from 'vue'
import App from './App.vue'
import router from './router'
//ce composant gère automatiquement la taille verticale de mes textareas
import VueTextareaAutosize from "vue-textarea-autosize";

Vue.config.productionTip = false

//genere un autofocus avec v-focus
Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

import VTooltip from 'v-tooltip'
import moment from 'moment'
moment.locale('fr');

Vue.use(VTooltip)
Vue.use(VueTextareaAutosize);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
