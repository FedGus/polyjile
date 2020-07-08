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

import Dashboard from './components/Views/Dashboard.vue';
import Calendar from './components/Views/Calendar.vue';
import Tasks from './components/Views/Tasks.vue';
import Testing from './components/Views/Testing.vue';
import Reports from './components/Views/Reports.vue';
import Register from './components/Register.vue';
import Login from './components/Login.vue';
import "firebase/auth";


var router = new VueRouter({
  routes: [
    {path: '/dashboard', name: "dashboard", component: Dashboard},
    {path: '/tasks', component: Tasks},
    {path: '/calendar', component: Calendar},
    {path: '/testing', component: Testing},
    {path: '/reports', component: Reports},
    {path: "/register", name: "register", component: Register},
    {path: "/login", name: "login", component: Login}
  ]
})
new Vue({
  router: router,
  render: h => h(App),
}).$mount('#app')
