import Vue from "vue";
import App from "./App";
import router from "./router/index";

import BlackDashboard from "./plugins/blackDashboard";
import i18n from "./i18n"
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';
Vue.use(Toast, {
    type: 'center',
    duration: 3000,
    wordWrap: true,
    width: '250px'
});
Vue.use(BlackDashboard);

import firebase from 'firebase'

firebase.initializeApp({
  apiKey: "AIzaSyBSJnZ8feBfxifNkxZP1fbyI8jBnRCqH_0",
    authDomain: "opticshub-db274.firebaseapp.com",
    databaseURL: "https://opticshub-db274.firebaseio.com",
    projectId: "opticshub-db274",
    storageBucket: "opticshub-db274.appspot.com",
    messagingSenderId: "584067423916"
})

/* eslint-disable no-new */
new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount("#app");
