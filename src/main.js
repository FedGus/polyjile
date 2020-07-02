import Vue from 'vue'
import App from './App.vue'
import firebase from 'firebase/app'
import 'firebase/firestore'

import { firestorePlugin } from 'vuefire'
Vue.use(firestorePlugin)
// Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyDggupN1_JJmHlSuMUuCOFbPgHYMxxiHjk",
  authDomain: "polygile.firebaseapp.com",
  databaseURL: "https://polygile.firebaseio.com",
  projectId: "polygile",
  storageBucket: "polygile.appspot.com",
  messagingSenderId: "895132686671",
  appId: "1:895132686671:web:3f2791de935d0cc990cd3a"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore()


import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Dashboard from './components/Dashboard.vue';
import Calendar from './components/Calendar.vue';
import HelloWorld from './components/HelloWorld.vue';
import Testing from './components/Testing.vue';
import Reports from './components/Reports.vue';

var router = new VueRouter({
  routes: [
    {path: '/dashboard', component: Dashboard},
    {path: '/hello', component: HelloWorld},
    {path: '/calendar', component: Calendar},
    {path: '/testing', component: Testing},
    {path: '/reports', component: Reports}
  ]
})
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
