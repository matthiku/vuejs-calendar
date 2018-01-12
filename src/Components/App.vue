<template>
  <div>
    <div id="header">
      <div>
        <h1>Vue.js Calendar</h1>
      </div>
      <div>
        <current-month></current-month>
      </div>


    </div>

    <div id="day-bar">
      <div v-for="(day, index) in weeks[0]" :key="index">{{ day.format('ddd') }}</div>
    </div>

    <div id="calendar">
      <div
          class="calendar-week"
          v-for="(week, index) in weeks"
          :key="index">

        <calendar-day v-for="(day, index) in week" :key="index" :day="day"></calendar-day>

      </div>
    </div>

  </div>
</template>

<script>
import CalendarDay from './CalendarDay.vue'
import CurrentMonth from './CurrentMonth.vue'

export default {
  components: {
    CurrentMonth,
    CalendarDay
  },

  computed: {
    month () {
      return this.$store.state.currentMonth
    },
    year () {
      return this.$store.state.currentYear
    },
    days () {

      // generating days array of the current month
      let days = []
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D')
      do {
        days.push(currentDay)
        currentDay = currentDay.clone().add(1, 'day')
        if (days.length > 32) {
          debugger
          break
        }
      } while (currentDay.month() === this.month - 1)

      const SUNDAY = 0

      // add next month's days to end of arry, but not if the month ends on a Saturday
      if (currentDay.day() > 0) {
        do {
          days.push(currentDay)
          currentDay = currentDay.clone().add(1, 'day')
          if (days.length > 38) {
            debugger
            break
          }
        } while (currentDay.day() !== SUNDAY)
      }

      // add previous month's days to start of array
      currentDay = days[0].clone()
      // but not if the first day already is a Sunday
      if (currentDay.day() !== SUNDAY) {
        do {
          currentDay = currentDay.clone().add(-1, 'day')
          days.unshift(currentDay)
          if (days.length > 46) {
            debugger
            break
          }
        } while (currentDay.day() !== SUNDAY)
      }
      return days
    },
    weeks () {
      let weeks = []
      let week = []

      for (let day in this.days) {
        week.push(this.days[day])
        if (week.length === 7) {
          weeks.push(week)
          week = []
        }
      }
      return weeks
    }
  }
}
</script>
