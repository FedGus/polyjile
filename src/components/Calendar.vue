<template>
<div class="main">
	<div id="calendar">

		<div class="calendar-controls">

			<div v-if="message" class="notification is-success">{{ message }}</div>

		

			<div class="box">
				<div class="field">
					<label class="label">Title</label>
					<div class="control">
						<input v-model="newEventTitle" class="input" type="text">
					</div>
				</div>

				<div class="field">
					<label class="label">Start date</label>
					<div class="control">
						<input v-model="newEventStartDate" class="input" type="date">
					</div>
				</div>

				<div class="field">
					<label class="label">End date</label>
					<div class="control">
						<input v-model="newEventEndDate" class="input" type="date">
					</div>
				</div>

				<button class="button is-info" @click="clickTestAddEvent">Add Event</button>
			</div>

		</div>
		<div class="calendar-parent">
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
				<calendar-view-header slot="header" slot-scope="{ headerProps }" :header-props="headerProps" @input="setShowDate" />
			</calendar-view>
		</div>
	</div>
</div>
</template>
<script>
// For testing against the published version
import {
	CalendarView,
	CalendarViewHeader,
	CalendarMathMixin,
} from "vue-simple-calendar"
require("vue-simple-calendar/static/css/default.css")
require("vue-simple-calendar/static/css/holidays-us.css")
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
	},
	mixins: [CalendarMathMixin],
	data() {
		return {
			/* Show the current month, and give it some fake events to show */
			showDate: this.thisMonth(1),
			message: "",
			startingDayOfWeek: 1,
			disablePast: false,
			disableFuture: false,
			displayPeriodUom: "month",
			displayPeriodCount: 1,
			showEventTimes: true,
			newEventTitle: "",
			newEventStartDate: "",
			newEventEndDate: "",
			useDefaultTheme: true,
			useHolidayTheme: true,
			events: [
				{
					id: "e0",
					title: "Уже что-то получилось",
					startDate: "2020-07-03 12:00",
					endDate: "2020-07-03 22:00"
				},
				{
					id: "e4",
					startDate: this.thisMonth(22),
					title: "День рождения!",
					classes: "birthday",
					url: "https://en.wikipedia.org/wiki/Birthday",
				},
				{
					id: "e5",
					startDate: this.thisMonth(11),
					endDate: this.thisMonth(11),
					title: "Другой цвет",
					classes: "purple",
				},
				{
					id: "e6",
					startDate: this.thisMonth(29),
					title: "Еще цвет",
					classes: "orange",
				}
			],
		}
	},
	computed: {
		userLocale() {
			return this.getDefaultBrowserLocale
		},
		dayNames() {
			return this.getFormattedWeekdayNames(this.userLocale, "long", 0)
		},
		themeClasses() {
			return {
				"theme-default": this.useDefaultTheme,
				"holiday-us-traditional": this.useHolidayTheme,
				"holiday-us-official": this.useHolidayTheme,
			}
		},
	},
	mounted() {
		this.newEventStartDate = this.isoYearMonthDay(this.today())
		this.newEventEndDate = this.isoYearMonthDay(this.today())
	},
	methods: {
		periodChanged(range, eventSource) {
			// Demo does nothing with this information, just including the method to demonstrate how
			// you can listen for changes to the displayed range and react to them (by loading events, etc.)
			console.log(eventSource)
			console.log(range)
		},
		thisMonth(d, h, m) {
			const t = new Date()
			return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
		},
		onClickDay(d) {
			this.message = `You clicked: ${d.toLocaleDateString()}`
		},
		onClickEvent(e) {
			this.message = `You clicked: ${e.title}`
		},
		setShowDate(d) {
			this.message = `Changing calendar view to ${d.toLocaleDateString()}`
			this.showDate = d
		},
		onDrop(event, date) {
			this.message = `You dropped ${event.id} on ${date.toLocaleDateString()}`
			// Determine the delta between the old start date and the date chosen,
			// and apply that delta to both the start and end date to move the event.
			const eLength = this.dayDiff(event.startDate, date)
			event.originalEvent.startDate = this.addDays(event.startDate, eLength)
			event.originalEvent.endDate = this.addDays(event.endDate, eLength)
		},
		clickTestAddEvent() {
			this.events.push({
				startDate: this.newEventStartDate,
				endDate: this.newEventEndDate,
				title: this.newEventTitle,
			})
			this.message = "You added an event!"
		},
	},
}
</script>

<style>
html,
body {
	height: 100%;
	margin: 0;
	background-color: #f7fcff;
}
#calendar {
	display: flex;
}
/* .calendar-controls {
	margin-right: 1rem;
	min-width: 14rem;
	max-width: 14rem;
} */
/* .calendar-parent {
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	overflow-x: hidden;
	overflow-y: hidden;
	max-height: 80vh;
	background-color: white;
} */
/* For long calendars, ensure each week gets sufficient height. The body of the calendar will scroll if needed */
/* .cv-wrapper.period-month.periodCount-2 .cv-week,
.cv-wrapper.period-month.periodCount-3 .cv-week,
.cv-wrapper.period-year .cv-week {
	min-height: 6rem;
} */
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