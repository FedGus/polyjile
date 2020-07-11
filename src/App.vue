<template>
  <div id="app">
    <header>
      <img class="logo" alt="polyweb" src="./assets/logo.png">
      <button @click="showModal = true" class="primary-header">Создать</button>
      <router-link to="/register">Регистрация</router-link>
      <a @click="show = !show">Меню</a>
      <div class="nav-header">
        <input type="search" placeholder="Поиск">
        <div v-if="loggedIn">
          <a @click="signOut">Выйти</a>
        </div>
        <span v-else><a @click="signOut">Войти</a></span>
      </div>
      
    </header>
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
          <div class="modal-heading">
            <h2>Создание задачи</h2>
          </div>
          <div class="modal-content">
          <form @submit="addTask(title, text, priority)">
            <div class="field-group">
              <label>Тема</label>
              <input class="long-input" v-model="title" placeholder="Тема" />
            </div>
            <div class="field-group">
              <label>Описание</label>
            <input v-model="text" placeholder="Описание" />
            </div>
            <div class="field-group">
              <label>Приоритет</label>
            <select v-model="priority" placeholder="Приоритет">
              <option value="highest">Highest</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
              <option value="lowest">Lowest</option>
            </select>
            </div>
            <div class="field-group">
            <button class="button-primary" type="submit">Создать</button>
            </div>
          </form>
          </div>
          <div class="modal-footer">
            <button @click="showModal=false">Отмена</button>
            </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { db } from "./main";
import * as firebase from "firebase/app";

import "firebase/auth";
export default {
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
          this.signOut();
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
    },
    addTask(title, text, priority) {
      // <-- новый метод
      const timeAdd = new Date().toString();
      const status = "backlog";
      db.collection("tasks").add({ title, text, priority, timeAdd, status });
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 600px;
  background-color: #f4f5f7;
}
.logo {
  border: 0;
  float: left;
  display: block;
  max-height: 30px;
  padding: 5px 0;
}
button {
  background-image: none;
  background-color: #0052cc;
  border-color: transparent;
  color: #fff;
  text-decoration: none;
  font-weight: 600;

  box-sizing: border-box;
  transition: background-color 0.1s ease-out;
  border-radius: 3px;
  cursor: pointer;
  font-family: inherit;
  display: inline-block;
  margin: 0;
  padding: 4px 10px;
  vertical-align: baseline;
  white-space: nowrap;
}
input {
  max-width: 165px;
  transition: background-color 0.2s ease-in-out, border-color 0.2s ease-in-out;
  border: 2px solid #dfe1e6;
  border-radius: 3px;
  box-sizing: border-box;
  font-size: inherit;
  margin: 0;
  vertical-align: baseline;
  padding: 3px 4px;
}

input[type="search"] {
  background: rgba(9, 30, 66, 0.48);
  border: none;
  border-radius: 3px;
  box-shadow: none;
  box-sizing: border-box;
  color: inherit;
  height: 2.143em;
  font-family: inherit;
  font-size: inherit;
  margin: 5px 0 0;
  padding: 0 26px 1px 10px;
  vertical-align: baseline;
  width: 170px;
}
.main {
  display: flex;
  background: #fff;
}
.modal {
  background: #fff;
  left: 50%;
  position: fixed;
  top: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  border: 1px solid #ebecf0;
  border-radius: 4px 4px 4px 4px;
  overflow: hidden;
  box-shadow: 0 8px 16px -4px rgba(9, 30, 66, 0.25),
    0 0 1px rgba(9, 30, 66, 0.31);
  z-index: 11;
  width: 60%
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
.modal-heading {
  background: #fff;
  border-bottom: 2px solid #ebecf0;
  box-sizing: border-box;
  height: 56px;
  margin: 0;
  overflow: hidden;
  padding: 15px 20px;
  position: relative;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.modal-content {
  position: relative;
  overflow: auto;
  padding: 20px;
}
h2 {
  color: #172b4d;
  font-weight: normal;
  font-size: 20px;
  line-height: 1.5;
  margin: 0;
  overflow: hidden;
  padding: 0;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.long-input {
  min-width: 500px;
}
.modal-footer {
  overflow: visible;
  min-height: 51px;
  height: 100%;
  padding: 10px;
  border-top: 2px solid #ebecf0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
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

.item {
  width: 45%;
  margin: 20px auto;
}
.item-header {
  background-color: #0747a6;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  margin: 0;
  min-height: 24px;
  padding: 0;
  position: relative;
}
.item-content {
  border-bottom-left-radius: 3px;
  border-bottom-right-radius: 3px;
  background: #fff;
  box-shadow: 0 2px 2px 0 rgba(9, 30, 66, 0.13);
  padding: 15px;
}
.field-group {
  padding: 4px 0 4px 145px;
  position: relative;
  margin: 1px 0;
}
label {
  float: left;
  margin-left: -145px;
  padding: 5px 0 0;
  position: relative;
  text-align: right;
  width: 130px;
}
h3 {
  color: #fff;
  font-size: 12px;
  font-weight: bold;
  line-height: 1.666666666667;
  margin: 0;
  padding: 4px 64px 4px 10px;
}
</style>
