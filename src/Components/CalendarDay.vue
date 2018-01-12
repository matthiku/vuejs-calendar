<template>
  <div
      :class="classObject"
    >

    {{ day.format('D') }}

  </div>
</template>

<script>
export default {
  props: ['day'],

  computed: {
    month () {
      return this.$store.state.currentMonth
    },
    year () {
      return this.$store.state.currentYear
    },
    classObject () {
      return {
        day: true,
        today: this.day.isSame(this.$moment(), 'day'),
        past: this.day.isBefore(this.$moment(), 'day'),
        'not-current-month': !this.day.isSame(this.$moment(`${this.year}-${this.month}-1`, 'YYYY-MM-DD'), 'month')
      }
    }
  }
}
</script>
