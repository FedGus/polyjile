<template>
  <div id="view">
    <header>
      <button @click="show = !show">Меню</button>
      <button @click="showModal = true">Создать</button>
            <router-link to="/register">
              Регистрация
            </router-link>
    Logged in
    <span v-if="loggedIn">Yes</span>
    <span v-else>No</span>
    <button class="but" @click="signOut">Sign out</button>
 
    </header>
    <main>
      <div class="sidebar">
        <ul>
          <li>
            <router-link to="/dashboard">
              <ion-icon name="albums-outline"></ion-icon>
            </router-link>
          </li>
          <li>
            <router-link to="/tasks">
              <ion-icon name="clipboard-outline"></ion-icon>
            </router-link>
          </li>
          <li>
            <router-link to="/calendar">
              <ion-icon name="calendar-outline"></ion-icon>
            </router-link>
          </li>
          <li>
            <router-link to="/testing">
              <ion-icon name="bug-outline"></ion-icon>
            </router-link>
          </li>
          <li>
            <router-link to="/reports">
              <ion-icon name="bar-chart-outline"></ion-icon>
            </router-link>
          </li>
          
        </ul>
      </div>
      <transition name="slide-fade">
        <aside v-if="show">
          <ul class="menu">
            <li>Главная</li>
            <li>Задачи</li>
            <li>Календарь</li>
            <li>Тестирование</li>
            <li>Отчеты</li>
          </ul>
        </aside>
      </transition>
      <router-view></router-view>
      <transition name="fade" appear>
        <div class="modal-overlay" v-if="showModal">
          <div class="modal">
            <form @submit="addTask(title, text, priority)">
              <input v-model="title" placeholder="Тема" />
              <input v-model="text" placeholder="Описание" />
              <select v-model="priority" placeholder="Приоритет">
                <option value="highest">Highest</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
                <option value="lowest">Lowest</option>
              </select>
              <button class="button-primary" type="submit">Создать</button>
            </form>
            <button @click="showModal=false">Отмена</button>
          </div>
        </div>
      </transition>
    </main>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'
import * as firebase from "firebase/app";
import { db } from "../main";
import "firebase/auth";
export default {
  name: "Views",
  components: {},
   mounted() {
    this.setupFirebase();
  },
  data() {
    return {
      loggedIn: false,
      show: false,
      showModal: false,
      title: "", // <-- новое свойство
      text: "" // <-- новое свойство
    };
  },
  methods: {
    addTask(title, text, priority) {
      // <-- новый метод
      const timeAdd = new Date().toString();
      const status = "backlog";
      db.collection("tasks").add({ title, text, priority, timeAdd, status });
    },
    setupFirebase() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) {
          // User is signed in.
          console.log("signed in");
          this.loggedIn = true;
        } else {
          // No user is signed in.
          this.loggedIn = false;
          console.log("signed out", this.loggedIn);
        }
      });
    },
    signOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({ name: "login" });
        });
    }
  }
};
</script>

<style>
body {
  margin: 0;
  position: relative;
  z-index: 0;
}
#view {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
main {
  display: flex;
}
.main {
  display: flex;
  width: 100%;
}
header {
  height: 50px;
  box-shadow: 0 0 6px grey;
  position: relative;
  z-index: 3;
}
.sidebar {
  width: 45px;
  box-sizing: border-box;
  background: #f4f5f7;
  position: relative;
  z-index: 2;
}
aside {
  width: 200px;
  height: 500px;
  background: #f4f5f7;
  position: absolute;
  z-index: 1;
}
.menu li {
  margin-left: 40px;
}
ion-icon {
  font-size: 20px;
  color: #172b4d;
}

.slide-fade-enter-active {
  transition: all 0.3s ease;
}
.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.65, 0.05, 0.36, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(-200px);
  opacity: 0;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
li {
  list-style: none;
  padding: 12px 0 12px 12px;
  height: 25px;
}

.modal {
  background: #fff;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 400px;
  background: #fff;
  border: 1px solid #ebecf0;
  border-radius: 4px 4px 4px 4px;
  overflow: hidden;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 1px rgba(9, 30, 66, 0.31);
  padding: 25px;
  z-index: 11;
}
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
