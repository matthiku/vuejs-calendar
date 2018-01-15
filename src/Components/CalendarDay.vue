<template>
  <div
      :class="classObject"
      @click="captureClick"
      title="click to add an event"
    >

    {{ day.format('D') }}

    <ul class="event-list">
      <li
          v-for="(event, index) in events"
          :key="index"
        >{{ event.description }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ['day'],

  computed: {
    events () {
      return this.$store.state.events.filter((evt) => evt.date.isSame(this.day, 'day'))
    },
    month () {
      return this.$store.state.currentMonth
    },
    year () {
      return this.$store.state.currentYear
    },
    isActive () {
      if (this.$store.state.eventFormActive && this.$store.state.eventFormDay.isSame(this.day, 'day') ) {
        return true
      }
      return false
    },
    classObject () {
      return {
        active: this.isActive,
        day: true,
        today: this.day.isSame(this.$moment(), 'day'),
        past: this.day.isBefore(this.$moment(), 'day'),
        'not-current-month': !this.day.isSame(this.$moment(`${this.year}-${this.month}-1`, 'YYYY-MM-DD'), 'month')
      }
    }
  },

  methods: {
    captureClick(evt) {
      this.$store.commit('setEventFormPos', {y: evt.clientY, x: evt.clientX})
      this.$store.commit('setEventFormDay', this.day)
      this.$store.commit('setEventFormActive', true)
    }
  }
}
</script>
