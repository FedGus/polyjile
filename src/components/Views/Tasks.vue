<template>
  <div>
    <div class="main">
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
                <h1>{{ task.title }}</h1>
                <p>{{ task.text }}</p>
                <pre>{{ task.priority }}</pre>
                <span>{{ dateTask(task.timeAdd) }}</span>
                <button @click="deleteLocation(task.id)">Delete</button>
              </div>
            </draggable>
          </div>
          <div class="column">
            <draggable group="tasks" :list="inProgress" @change="progressCol">
              <div class="issue" v-for="(task, idx) in inProgress" :key="idx">
                <h1>{{ task.title }}</h1>
                <p>{{ task.text }}</p>
                <pre>{{ task.priority }}</pre>
                <span>{{ dateTask(task.timeAdd) }}</span>
                <button @click="deleteLocation(task.id)">Delete</button>
              </div>
            </draggable>
          </div>
          <div class="column">
            <draggable group="tasks" :list="reviews" @change="reviewCol">
              <div class="issue" v-for="(task, idx) in reviews" :key="idx">
                <h1>{{ task.title }}</h1>
                <p>{{ task.text }}</p>
                <pre>{{ task.priority }}</pre>
                <span>{{ dateTask(task.timeAdd) }}</span>
                <button @click="deleteLocation(task.id)">Delete</button>
              </div>
            </draggable>
          </div>
          <div class="column">
            <draggable group="tasks" :list="done" @change="doneCol">
              <div class="issue" v-for="(task, idx) in done" :key="idx">
                <h1>{{ task.title }}</h1>
                <p>{{ task.text }}</p>
                <pre>{{ task.priority }}</pre>
                <span>{{ dateTask(task.timeAdd) }}</span>
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
import { db } from "../../main";
import draggable from "vuedraggable";

export default {
  name: "Tasks",
  components: {
    draggable
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
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        timezone: "UTC",
        hour: "numeric",
        minute: "numeric"
      };
      return new Date(date).toLocaleString("ru", options);
    },
    deleteLocation(id) {
      // <-- новый метод
      db.collection("tasks")
        .doc(id)
        .delete();
    },
    backlogCol: function(evt) {
      window.console.log(evt);
      // if (evt.added) {

      //   let status = "backlog";
      db.collection("tasks")
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
      db.collection("tasks")
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
      db.collection("tasks")
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
      db.collection("tasks")
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
</style>
