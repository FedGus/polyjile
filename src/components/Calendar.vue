<template>
	<div id="calendar">
		<calendar-view
			:show-date="showDate"
            :events="events"
            :show-times="showTimes"
            :time-format-options="{ hour: 'numeric', minute: '2-digit' }"
            :display-period-uom="displayPeriodUom"
            :enable-date-selection="true"
			class="theme-default">
			<calendar-view-header
				slot="header"
					slot-scope="{ headerProps }"
					:header-props="headerProps"
					@input="setShowDate" />
		</calendar-view>
	</div>
</template>
<script>
	import { CalendarView, CalendarViewHeader, CalendarMathMixin } from "vue-simple-calendar"
	// The next two lines are processed by webpack. If you're using the component without webpack compilation,
	// you should just create <link> elements for these. Both are optional, you can create your own theme if you prefer.
	require("vue-simple-calendar/static/css/default.css")
	require("vue-simple-calendar/static/css/holidays-us.css")

	export default {
        name: 'calendar',
        mixins: [CalendarMathMixin],
		data: function() {
            return { 
                showDate: new Date(),
            showTimes: true,
            displayPeriodUom: 'week',
            events: [
				{
					id: 1,
					title: "Паника от того, что непонятно, как это работает",
					startDate: this.thisMonth(3, 9, 25),
                    endDate: this.thisMonth(3, 9, 35)
				},
			], }
		},
		components: {
			CalendarView,
			CalendarViewHeader,
		},
		methods: {
			setShowDate(d) {
				this.showDate = d;
            },
            thisMonth(d, h, m) {
			const t = new Date()
			return new Date(t.getFullYear(), t.getMonth(), d, h || 0, m || 0)
		}
		}
	}
</script>
<style>
	#calendar {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		color: #2c3e50;
		height: 67vh;
		width: 100vw;
		margin-left: auto;
		margin-right: auto;
	}
</style>