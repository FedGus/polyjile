<template>
  <div class="main">
    <Menu></Menu>
    <div id="calendar">
      <div class="calendar-controls">
        <div v-if="message" class="notification is-success">{{ message }}</div>

        <transition name="fade" appear>
          <div class="modal-overlay" v-if="addEvent">
            <div class="modal">
              <div class="field">
                <label class="label">Описание:</label>
                <div class="control">
                  <input v-model="newEventTitle" class="input" type="text" />
                </div>
              </div>

              <div class="field">
                <label class="label">Начало:</label>
                <div class="control">
                  <input v-model="newEventStartDate" class="input" type="datetime-local" />
                </div>
              </div>

              <div class="field">
                <label class="label">Окончание:</label>
                <div class="control">
                  <input v-model="newEventEndDate" class="input" type="datetime-local" />
                </div>
              </div>

              <button class="button is-info" @click="clickTestAddEvent">Добавить событие</button>
              <button @click="addEvent=false">Отмена</button>
            </div>
          </div>
        </transition>
      </div>
      <div class="calendar-parent">
        <button @click="addEvent = true">Создать</button>
        <calendar-view
          :events="events"
          :show-date="showDate"
          :time-format-options="{hour: 'numeric', minute:'2-digit'}"
          :enable-drag-drop="true"
          :disable-past="disablePast"
          :disable-future="disableFuture"
          :show-event-times="showEventTimes"
          :display-period-uom="displayPeriodUom"
          :display-period-count="displayPeriodCount"
          :starting-day-of-week="startingDayOfWeek"
          :class="themeClasses"
          :period-changed-callback="periodChanged"
          @drop-on-date="onDrop"
          @click-date="onClickDay"
          @click-event="onClickEvent"
        >
          <calendar-view-header
            slot="header"
            slot-scope="{ headerProps }"
            :header-props="headerProps"
            @input="setShowDate"
          />
        </calendar-view>
      </div>
    </div>
  </div>
</template>
<script>
// For testing against the published version
import { db } from "../../main";
import Menu from './Menu.vue'
import {
  CalendarView,
  CalendarViewHeader,
  CalendarMathMixin
} from "vue-simple-calendar";
require("vue-simple-calendar/static/css/default.css");
require("vue-simple-calendar/static/css/holidays-us.css");
// For live testing while making changes to the component, assumes repo pulled to sister folder
/*
import CalendarView from "../../vue-simple-calendar/src/components/CalendarView.vue"
import CalendarViewHeader from "../../vue-simple-calendar/src/components/CalendarViewHeader.vue"
import CalendarMathMixin from "../../vue-simple-calendar/src/components/CalendarMathMixin.js"
require("../../vue-simple-calendar/static/css/default.css")
require("../../vue-simple-calendar/static/css/holidays-us.css")
*/
export default {
  name: "calendar",
  components: {
    CalendarView,
    CalendarViewHeader,
    Menu
  },
  mixins: [CalendarMathMixin],
  data() {
    return {
      /* Show the current month, and give it some fake events to show */
      showDate: new Date(),
      addEvent: false,
      message: "",
      startingDayOfWeek: 1,
      disablePast: false,
      disableFuture: false,
      displayPeriodUom: "week",
      displayPeriodCount: 1,
      showEventTimes: true,
      newEventTitle: "",
      newEventStartDate: "",
      newEventEndDate: "",
      useDefaultTheme: true,
      useHolidayTheme: false,
      events: []
    };
  },
  firestore() {
    return {
      events: db.collection("events")
    };
  },
  computed: {
    userLocale() {
      return this.getDefaultBrowserLocale;
    },
    dayNames() {
      return this.getFormattedWeekdayNames(this.userLocale, "long", 0);
    },
    themeClasses() {
      return {
        "theme-default": this.useDefaultTheme,
        "holiday-us-traditional": this.useHolidayTheme,
        "holiday-us-official": this.useHolidayTheme
      };
    }
  },
  mounted() {
    this.newEventStartDate = this.isoYearMonthDay(this.today());
    this.newEventEndDate = this.isoYearMonthDay(this.today());
  },
  methods: {
    periodChanged(range, eventSource) {
      // Demo does nothing with this information, just including the method to demonstrate how
      // you can listen for changes to the displayed range and react to them (by loading events, etc.)
      console.log(eventSource);
      console.log(range);
    },
    thisMonth(d, h, m) {
      const t = new Date();
      return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0);
    },
    onClickDay(d) {
      this.message = `You clicked: ${d.toLocaleDateString()}`;
    },
    onClickEvent(e) {
      var options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        timezone: "UTC",
        hour: "numeric",
        minute: "numeric"
      };
      this.message = `Начало:${new Date(e.startDate).toLocaleString(
        "ru",
        options
      )} 
			Окончание: ${new Date(e.endDate).toLocaleString("ru", options)} ${e.title}`;
    },
    setShowDate(d) {
      this.message = `Changing calendar view to ${d.toLocaleDateString()}`;
      this.showDate = d;
    },
    onDrop(event, date) {
      this.message = `You dropped ${event.id} on ${date.toLocaleDateString()}`;
      // Determine the delta between the old start date and the date chosen,
      // and apply that delta to both the start and end date to move the event.
      const eLength = this.dayDiff(event.startDate, date);
      event.originalEvent.startDate = this.addDays(event.startDate, eLength);
      event.originalEvent.endDate = this.addDays(event.endDate, eLength);
    },
    clickTestAddEvent() {
      var startDate = this.newEventStartDate;
      var endDate = this.newEventEndDate;
      var title = this.newEventTitle;
      db.collection("events").add({ title, startDate, endDate });
      this.message = "You added an event!";
    }
  }
};
</script>

<style>
#calendar {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  color: #2c3e50;
  height: 65vh;
  width: 95vw;
}
.calendar-controls {
  margin-right: 1rem;
  min-width: 14rem;
  max-width: 14rem;
}
.calendar-parent {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: hidden;
  max-height: 80vh;
  background-color: white;
}
/* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
.cv-weeks {
  height: 60vh;
}
/* These styles are optional, to illustrate the flexbility of styling the calendar purely with CSS. */
/* Add some styling for events tagged with the "birthday" class */
.calendar .event.birthday {
  background-color: #e0f0e0;
  border-color: #d7e7d7;
}
.calendar .event.birthday::before {
  content: "\1F382";
  margin-right: 0.5em;
}
</style>