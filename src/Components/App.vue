<template>
  <div>
    <div v-for="(day, index) in days" :key="index">{{ day }}</div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      month: 1,
      year: 2018
    }
  },
  computed: {
    days () {
      let days = []
      let currentDay = this.$moment(`${this.year}-${this.month}-1`, 'YYYY-M-D')
      do {
        days.push(currentDay)
        currentDay = currentDay.clone().add(1, 'day')
      } while (currentDay.month() < this.month)
      return days
    }
  }
}
</script>
