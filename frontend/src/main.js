import Vue from 'vue'
import App from './App.vue'
import router from './router'
//ce composant gère automatiquement la taille verticale de mes textareas
import VueTextareaAutosize from "vue-textarea-autosize";
import VPopover from 'vue-js-popover'

Vue.config.productionTip = false

//genere un autofocus avec v-focus
Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})

Vue.mixin({
    methods: {
        getHeader: function () {
            return {
                headers: {
                    'Authorization': "Bearer " + sessionStorage.getItem('token'),
                    'X-AccountId': sessionStorage.getItem('accountId')
                }
            }
        }
    }
})

Vue.use(VPopover, { tooltip: true })

import moment from 'moment'
moment.locale('fr');

Vue.use(VueTextareaAutosize);

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
