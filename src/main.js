import Vue from "vue";
import App from "./App";
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
import VueAgile from 'vue-agile'

Vue.use(VueAgile)
Vue.use(Toast, {
    type: 'center',
    duration: 3000,
    wordWrap: true,
    width: '250px'
});
Vue.use(BlackDashboard);

import firebase from 'firebase'

firebase.initializeApp({
    // ENTER FIREBASE DETAILS
})

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
