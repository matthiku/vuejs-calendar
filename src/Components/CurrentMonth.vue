<template>
  <div>

      {{ formattedDate }}

      <button @click="dec">-</button>
      <button @click="inc">+</button>

  </div>
</template>

<script>
export default {
  methods: {
    dec () {
      if (this.month === 1) {
        this.$store.commit('setCurrentMonth', 12)
        this.$store.commit('setCurrentYear', this.year - 1)
      } else {
        this.$store.commit('setCurrentMonth', this.month - 1)
      }
      this.$store.commit('setEventFormActive', false)
    },
    inc () {
      if (this.month === 12) {
        this.$store.commit('setCurrentMonth', 1)
        this.$store.commit('setCurrentYear', this.year + 1)
      } else {
        this.$store.commit('setCurrentMonth', this.month + 1)
      }
      this.$store.commit('setEventFormActive', false)
    }
  },
  computed: {
    month () {
      return this.$store.state.currentMonth
    },
    year () {
      return this.$store.state.currentYear
    },
    formattedDate () {
      return this.$moment(`${this.year}-${this.month}-1`, 'YYYY-MM-DD').format('MMMM YYYY')
    }
  }
}
</script>
