<template>

  <div id="app">
 <header>
  <button @click="show = !show">Меню</button>
  <button @click="showModal = true">Создать</button>
</header>
<main>
<div class="sidebar">
  <ul>
    <li><router-link to="/dashboard"><ion-icon name="albums-outline"></ion-icon></router-link></li>
    <li><router-link to="/hello"><ion-icon name="clipboard-outline"></ion-icon></router-link></li>
    <li><router-link to="/calendar"><ion-icon name="calendar-outline"></ion-icon></router-link></li>
    <li><router-link to="/testing"><ion-icon name="bug-outline"></ion-icon></router-link></li>
    <li><router-link to="/reports"><ion-icon name="bar-chart-outline"></ion-icon></router-link></li>
  </ul>
</div>
      <router-view></router-view>
</main>
    <!--<HelloWorld msg="Welcome to Your Vue.js App"/>-->
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    //HelloWorld
  }
}
</script>

<style>
body {
margin: 0;
position: relative;
z-index: 0;
 }
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
main {
  display: flex;
}
header {
  height: 50px;
  box-shadow: 0 0 6px grey;
  position: relative;
  z-index: 3;
}
.sidebar {
  width: 56px;

  background: #f4f5f7;
  position: relative;
  z-index: 2;
}

ul {
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
li {
  list-style: none;
  padding: 10px 0 10px 10px;
  height: 25px;
}
</style>
