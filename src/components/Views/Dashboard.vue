<template>
<div class="main">
  <Menu></Menu>
  <div class="row">
    <div id="small-calendar">
      <calendar-view
        :show-date="showDate"
        :events="events"
        :show-event-times="showEventTimes"
        :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
        class="theme-default"
      >
        <calendar-view-header />
        <!-- slot="header"
            slot-scope="{ headerProps }"
            :header-props="headerProps"
        @input="setShowDate" />-->
      </calendar-view>
    </div>
  
  <div class="board">
    <div class="column">
              <div class="issue" v-for="(task, idx) in inProgress" :key="idx">
                <span class="ghx-key">{{ task.title }}</span>
                <span>{{ task.text }}</span>
                <img src="../../assets/avatar.jpg" alt="Исполнитель" class="ghx-avatar-img">
                <img :src="iconPriority(task.priority)" class="ghx-priority">
                <span>{{ dateTask(task.timeAdd) }}</span>
                <!-- <button @click="deleteLocation(task.id)">Delete</button> -->
              </div>
          </div>
  </div>
  </div>
</div>
</template>

<script>
import { db } from "../../main";
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import Menu from "./Menu.vue";
// The next two lines are processed by webpack. If you're using the component without webpack compilation,
// you should just create <link> elements for these. Both are optional, you can create your own theme if you prefer.
require("vue-simple-calendar/static/css/default.css");
export default {
  data: function() {
    return {
      showDate: new Date(),
      showEventTimes: true,
      displayPeriodUom: "week",
      events: [],
      inProgress: []
    };
  },
  firestore() {
    return {
      inProgress: db.collection("tasks").where("status", "==", "progress"),
      events: db.collection("events")
    };
  },
  components: {
    CalendarView,
    CalendarViewHeader,
    Menu
  },
  methods: {
    setShowDate(d) {
      this.showDate = d;
    },
    thisMonth(d, h, m) {
      const t = new Date();
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
    },
    iconPriority(priority) {
      if (priority == "highest") return require("../../assets/highest.svg");
      if (priority == "high") return require("../../assets/high.svg");
      if (priority == "medium") return require("../../assets/medium.svg");
      if (priority == "low") return require("../../assets/low.svg");
      if (priority == "lowest") return require("../../assets/lowest.svg");
    },
    dateTask(date) {
      var options = {
        day: "numeric",
        month: "long"
      };
      return new Date(date).toLocaleString("ru", options);
    }
  }
};
</script>

<style>
#small-calendar {
  font-size: 10px;
  width: 25vw;
  height: 40vh;
  position: absolute;
  right: 0;
}
.board {
  display: flex;
  flex-direction: column;
}
.column {
  background: #f4f5f7;
  min-width: calc(25% - 5px);
  margin-right: 5px;
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