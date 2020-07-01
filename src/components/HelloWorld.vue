<template>
<div>
  <header>
<button @click="show = !show">Меню</button>
<button @click="showModal = true">Создать</button>
</header>
<div class="main">
<transition name="fade" appear>
  <div class="modal-overlay" v-if="showModal">
    <div class="modal">
      <form @submit="addLocation(title, text)">
        <input v-model="title" placeholder="Тема">
        <input v-model="text" placeholder="Описание">
        <button class="button-primary" type="submit">Создать</button>
      </form>
      <button @click="showModal=false">Отмена</button>
    </div>
  </div>
</transition>
<div class="sidebar">
  <ul>
    <li><ion-icon name="albums-outline"></ion-icon></li>
    <li><ion-icon name="clipboard-outline"></ion-icon></li>
    <li><ion-icon name="calendar-outline"></ion-icon></li>
    <li><ion-icon name="bug-outline"></ion-icon></li>
    <li><ion-icon name="bar-chart-outline"></ion-icon></li>
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
<div class="board">
<section>
  <div class="column">
      <draggable group="tasks" :list="backlog" @change="backlogCol">
        <div class="issue" v-for="(task, idx) in backlog" :key="idx">
          <h1>{{ task.title }}</h1>
          <p>{{ task.text }}</p>
          <span>{{ task.timeAdd }}</span>
          <button @click="deleteLocation(task.id)">Delete</button>
        </div>
      </draggable>
  </div>
  <div class="column">
      <draggable group="tasks" :list="inProgress" @change="progressCol">
       <div class="issue" v-for="(task, idx) in inProgress" :key="idx">
          <h1>{{ task.title }}</h1>
          <p>{{ task.text }}</p>
          <span>{{ task.timeAdd }}</span>
          <button @click="deleteLocation(task.id)">Delete</button>
        </div>
      </draggable>
  </div>
  <div class="column">
      <draggable group="tasks" :list="reviews" @change="reviewCol">
       <div class="issue" v-for="(task, idx) in reviews" :key="idx">
          <h1>{{ task.title }}</h1>
          <p>{{ task.text }}</p>
          <span>{{ task.timeAdd }}</span>
          <button @click="deleteLocation(task.id)">Delete</button>
        </div>
      </draggable>
  </div>
  <div class="column">
      <draggable group="tasks" :list="done" @change="doneCol">
       <div class="issue" v-for="(task, idx) in done" :key="idx">
          <h1>{{ task.title }}</h1>
          <p>{{ task.text }}</p>
          <span>{{ task.timeAdd }}</span>
          <button @click="deleteLocation(task.id)">Delete</button>
        </div>
      </draggable>
  </div>
</section>
</div>
</div>


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
       showModal: false,
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
     reviews: db.collection('tasks').where('status', '==', 'review'),
     done: db.collection('tasks').where('status', '==', 'done'),

     
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
   backlogCol: function(evt) {
     window.console.log(evt);
     // if (evt.added) {
     
      //   let status = "backlog";
      db.collection('tasks').doc(evt.added.element.id).update({ 'status' : 'backlog' });
      this.backlog.splice(evt.added.newIndex, 1)
     // }
    },
   progressCol: function(evt) {
       window.console.log(evt);
      // if (evt.added) {
      //   let idEl = evt.added.element.id;
      //   let status = "progress";
      db.collection('tasks').doc(evt.added.element.id).update({ 'status': 'progress' });
      this.inProgress.splice(evt.added.newIndex, 1)
      // }
    },
    reviewCol: function(evt) {
      window.console.log(evt);
      // if (evt.added) {
      //   let idEl = evt.added.element.id;
      //   let status = "review";
      db.collection('tasks').doc(evt.added.element.id).update({ 'status' : 'review' });
      this.reviews.splice(evt.added.newIndex, 1)
      // }
    },
   doneCol: function(evt) {
      window.console.log(evt);
      // if (evt.added) {
      //   let idEl = evt.added.element.id;
      //   let status = "done";
      db.collection('tasks').doc(evt.added.element.id).update({ 'status' : 'done' });
      this.done.splice(evt.added.newIndex, 1)
      // }
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
z-index: 3;
}
section {
   display: grid;
   grid-column-gap: 10px;
   grid-template-columns: repeat(4, minmax(200px, 1fr));
}
.column {
  background: #f4f5f7;
}

.main {
  display: flex;
}
aside {
  width: 200px;
  height: 500px;
  background: #f4f5f7;
  position: absolute;
  z-index: 1;
}

.sidebar {
  width: 56px;
  background: #f4f5f7;
  position: relative;
  z-index: 2;
}

.board {
  display: flex;
  flex-direction: column;
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

.menu li {
  margin-left: 40px;
}
ion-icon {
  font-size: 20px;
  color: #172b4d;
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
  box-shadow: 0 8px 16px -4px rgba(9,30,66,0.25), 0 0 1px rgba(9,30,66,0.31);
  padding: 25px;
  z-index: 11;
}
.modal-overlay {
  position: fixed;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: rgba(0, 0, 0, 0.3);
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
button {
    box-sizing: border-box;
    transition: background-color .1s ease-out;
    border-radius: 3px;
    cursor: pointer;
    font-family: inherit;
    padding: 4px 10px;
    vertical-align: baseline;
    white-space: nowrap;
}
.button-primary {
    background-color: #0052cc;
    border-color: transparent;
    color: #fff;
    text-decoration: none;
    font-weight: 600;
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


.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
