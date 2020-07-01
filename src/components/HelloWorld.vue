<template>
<div>
  <header>
<button @click="show = !show"></button>
<button>Создать</button>
</header>

<transition name="slide-fade">
<aside v-if="show">
  <ul>
    <li>Главная</li>
    <li>Задачи</li>
    <li>Тестирование</li>
    <li>Отчеты</li>
  </ul>
</aside>
</transition>

<section>
  <div class="column">
      <draggable group="tasks" :list="backlog" @change="log">
        <div class="issue" v-for="(task, idx) in backlog" :key="idx">
          <h1>{{ task.title }}</h1>
          <p>{{ task.text }}</p>
          <span>{{ task.timeAdd }}</span>
          <button @click="deleteLocation(task.id)">Delete</button>
        </div>
      </draggable>
  </div>
  <div class="column">
      <draggable group="tasks" :list="inProgress" @change="log">
       <div class="issue" v-for="(task, idx) in inProgress" :key="idx">
          <h1>{{ task.title }}</h1>
          <p>{{ task.text }}</p>
          <span>{{ task.timeAdd }}</span>
          <button @click="deleteLocation(task.id)">Delete</button>
        </div>
      </draggable>
  </div>
  <div class="column">
      <draggable group="tasks" :list="reviews" @change="log">
       <div class="issue" v-for="(task, idx) in reviews" :key="idx">
          <h1>{{ task.title }}</h1>
          <p>{{ task.text }}</p>
          <span>{{ task.timeAdd }}</span>
          <button @click="deleteLocation(task.id)">Delete</button>
        </div>
      </draggable>
  </div>
  <div class="column">
      <draggable group="tasks" :list="done" @change="log">
       <div class="issue" v-for="(task, idx) in done" :key="idx">
          <h1>{{ task.title }}</h1>
          <p>{{ task.text }}</p>
          <span>{{ task.timeAdd }}</span>
          <button @click="deleteLocation(task.id)">Delete</button>
        </div>
      </draggable>
  </div>
</section>

<form @submit="addLocation(title, text)">
  <input v-model="title" placeholder="Location Name">
  <input v-model="text" placeholder="Location Image URL">
  <button type="submit">Add New Location</button>
</form>

</div>
</template>

<script>
import { db } from '../main'
import draggable from 'vuedraggable'

export default {
  name: 'HelloWorld',
  components: {
    draggable
  },
   data () {
     return {
       show: false,
       backlog: [],
       inProgress: [],
       reviews: [],
       done: [],
       title: '',      // <-- новое свойство
       text: '',    // <-- новое свойство
     }
   },
   firestore () {
   return {
     backlog: db.collection('tasks').where('status', '==', 'backlog'),
     inProgress: db.collection('tasks').where('status', '==', 'progress'),
     reviews: db.collection('tasks').where('status', '==', 'reviews'),
     done: db.collection('tasks').where('status', '==', 'done')
   }
   
 },
   methods: {
   addLocation (title, text) {      // <-- новый метод
     const timeAdd = new Date()
     const status = 'backlog'
     db.collection('tasks').add({ title, text, timeAdd, status })
   },
    deleteLocation (id) {   // <-- новый метод
     db.collection('tasks').doc(id).delete()
   },
   log: function(evt) {
      window.console.log(evt);
      if (evt == 'added') {
        alert('aaa')
      }
    }
   }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
height: 50px;
box-shadow: 0 0 6px grey;
position: relative;
z-index: 1;
}
section {
   display: grid;
    grid-column-gap: 10px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}
.column {
  background: #f4f5f7;
}
aside {
  width: 200px;
  height: 500px;
  background: #f4f5f7;
  position: absolute;
  z-index: 2;
}

.issue {
    color: #172b4d;
    background-color: #fff;
    cursor: move;
    display: block;
    font-size: 14px;
    line-height: 1.42857143;
    position: relative;
    box-shadow: 0 0 1px 0 rgba(9,30,66,0.31), 0 2px 4px -1px rgba(9,30,66,0.25);
    border-radius: 2px;
    margin: 5px;
    padding: 10px
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(.65, .05, 0.36, 1);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active до версии 2.1.8 */ {
  transform: translateX(-200px);
  opacity: 0;
}
</style>
