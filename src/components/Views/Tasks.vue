<template>
  <div>
    <div class="main">
      <Menu></Menu>
      <div class="board">
        <section>
          <div class="column">
            <h5>Backlog</h5>
          </div>
          <div class="column">
            <h5>In progress</h5>
          </div>
          <div class="column">
            <h5>Review</h5>
          </div>
          <div class="column">
            <h5>Done</h5>
          </div>
        </section>
        <section>
          <div class="column">
            <draggable group="tasks" :list="backlog" @change="backlogCol">
              <div class="issue" v-for="(task, idx) in backlog" :key="idx">
                <span class="ghx-key">{{ task.title }}</span>
                <span>{{ task.text }}</span>
                <img src="../../assets/avatar.jpg" alt="Исполнитель" class="ghx-avatar-img">
                <img :src="iconPriority(task.priority)" class="ghx-priority">
                <span>{{ dateTask(task.timeAdd) }}</span>
                <!-- <button @click="deleteLocation(task.id)">Delete</button> -->
              </div>
            </draggable>
          </div>
          <div class="column">
            <draggable group="tasks" :list="inProgress" @change="progressCol">
              <div class="issue" v-for="(task, idx) in inProgress" :key="idx">
                <span class="ghx-key">{{ task.title }}</span>
                <span>{{ task.text }}</span>
                <img src="../../assets/avatar.jpg" alt="Исполнитель" class="ghx-avatar-img">
                <img :src="iconPriority(task.priority)" class="ghx-priority">
                <span>{{ dateTask(task.timeAdd) }}</span>
                <!-- <button @click="deleteLocation(task.id)">Delete</button> -->
              </div>
            </draggable>
          </div>
          <div class="column">
            <draggable group="tasks" :list="reviews" @change="reviewCol">
              <div class="issue" v-for="(task, idx) in reviews" :key="idx">
                <span class="ghx-key">{{ task.title }}</span>
                <span>{{ task.text }}</span>
                <img src="../../assets/avatar.jpg" alt="Исполнитель" class="ghx-avatar-img">
                <img :src="iconPriority(task.priority)" class="ghx-priority">
                <span>{{ dateTask(task.timeAdd) }}</span>
                <!-- <button @click="deleteLocation(task.id)">Delete</button> -->
              </div>
            </draggable>
          </div>
          <div class="column">
            <draggable group="tasks" :list="done" @change="doneCol">
              <div class="issue" v-for="(task, idx) in done" :key="idx">
               <span class="ghx-key">{{ task.title }}</span>
                <span>{{ task.text }}</span>
                <img src="../../assets/avatar.jpg" alt="Исполнитель" class="ghx-avatar-img">
                <img :src="iconPriority(task.priority)" class="ghx-priority">
                <span>{{ dateTask(task.timeAdd) }}</span>
                <!-- <button @click="deleteLocation(task.id)">Delete</button> -->
              </div>
            </draggable>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from "../../main";
import draggable from "vuedraggable";
import Menu from "./Menu.vue";

export default {
  name: "Tasks",
  components: {
    draggable,
    Menu
  },
  data() {
    return {
      backlog: [],
      inProgress: [],
      reviews: [],
      done: []
    };
  },
  firestore() {
    return {
      backlog: db.collection("tasks").where("status", "==", "backlog"),
      inProgress: db.collection("tasks").where("status", "==", "progress"),
      reviews: db.collection("tasks").where("status", "==", "review"),
      done: db.collection("tasks").where("status", "==", "done")
    };
  },
  methods: {
    dateTask(date) {
      var options = {
        day: "numeric",
        month: "long"
      };
      return new Date(date).toLocaleString("ru", options);
    },
    iconPriority(priority) {
      if (priority == "highest") return require("../../assets/highest.svg");
      if (priority == "high") return require("../../assets/high.svg");
      if (priority == "medium") return require("../../assets/medium.svg");
      if (priority == "low") return require("../../assets/low.svg");
      if (priority == "lowest") return require("../../assets/lowest.svg");
    },
    deleteLocation(id) {
      // <-- новый метод
      db
        .collection("tasks")
        .doc(id)
        .delete();
    },
    backlogCol: function(evt) {
      window.console.log(evt);
      // if (evt.added) {

      //   let status = "backlog";
      db
        .collection("tasks")
        .doc(evt.added.element.id)
        .update({ status: "backlog" });
      this.backlog.splice(evt.added.newIndex, 1);
      // }
    },
    progressCol: function(evt) {
      window.console.log(evt);
      // if (evt.added) {
      //   let idEl = evt.added.element.id;
      //   let status = "progress";
      db
        .collection("tasks")
        .doc(evt.added.element.id)
        .update({ status: "progress" });
      this.inProgress.splice(evt.added.newIndex, 1);
      // }
    },
    reviewCol: function(evt) {
      window.console.log(evt);
      // if (evt.added) {
      //   let idEl = evt.added.element.id;
      //   let status = "review";
      db
        .collection("tasks")
        .doc(evt.added.element.id)
        .update({ status: "review" });
      this.reviews.splice(evt.added.newIndex, 1);
      // }
    },
    doneCol: function(evt) {
      window.console.log(evt);
      // if (evt.added) {
      //   let idEl = evt.added.element.id;
      //   let status = "done";
      db
        .collection("tasks")
        .doc(evt.added.element.id)
        .update({ status: "done" });
      this.done.splice(evt.added.newIndex, 1);
      // }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
section {
  display: flex;
  box-sizing: border-box;
  width: calc(100vw - 45px);
  /* grid-column-gap: 10px;
   grid-template-columns: repeat(4, minmax(200px, 1fr)); */
}
.column {
  background: #f4f5f7;
  min-width: calc(25% - 5px);
  margin-right: 5px;
}

h5 {
  margin-left: 5px;
}
.board {
  display: flex;
  flex-direction: column;
}
.ghx-key {
  color: #5e6c84;
  font-weight: 600;
  line-height: 1.66666667;
  letter-spacing: 0;
  outline: 0;
  text-transform: uppercase;
}
span {
  padding: 1px;
  display: block;
  font-size: 12px;
}

.issue {
  color: #172b4d;
  background-color: #fff;
  cursor: move;
  display: block;
  font-size: 14px;
  line-height: 1.42857143;
  position: relative;
  box-shadow: 0 0 1px 0 rgba(9, 30, 66, 0.31),
    0 2px 4px -1px rgba(9, 30, 66, 0.25);
  border-radius: 2px;
  margin: 5px;
  padding: 10px;
}
button {
  box-sizing: border-box;
  transition: background-color 0.1s ease-out;
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
.ghx-avatar-img {
  border-radius: 50%;
  height: 32px;
  width: 32px;
  min-width: 32px;
  cursor: default;
  display: inline-block;
  vertical-align: middle;
  overflow: hidden;
  position: absolute;
  right: 10px;
  top: 10px;
  margin-right: 4px;
  margin-bottom: 4px;
}
.ghx-priority {
  height: 16px;
  width: 16px;
  overflow: hidden;
}
</style>
