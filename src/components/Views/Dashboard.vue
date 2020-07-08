<template>
<div class="main">
  <Menu></Menu>
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
</div>
</template>

<script>
import { db } from "../../main";
import { CalendarView, CalendarViewHeader } from "vue-simple-calendar";
import Menu from './Menu.vue'
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
    };
  },
  firestore() {
    return {
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
    }
  }
};
</script>

<style>
#small-calendar {
  font-size: 10px;
  width: 25vw;
  height: 40vh;
}
</style>