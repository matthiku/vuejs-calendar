<template>
  <div
      id="event-form"
      :class="{ active }"
      :style="{ top, left }">

    <h4>Add Event</h4>

    <p v-if="day">{{ day.format('dddd, Do MMM') }}</p>

    <div class="text">
      <input
          v-focus
          type="text"
          v-model="newEvent"
          @keyup.enter="create"
          placeholder="add event text"
        >
    </div>
    <div class="buttons">
      <button
          @click="create"
          :disabled="newEvent.length === 0"
        >Create</button>
    </div>

    <button id="close-button" @click="close">&#10005</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      newEvent: ''
    }
  },

  directives: {
    focus: {
      update(el) {
        el.focus()
      }
    }
  },

  computed: {
    top () {
      return this.$store.state.eventFormPosY + 'px'
    },
    left () {
      return this.$store.state.eventFormPosX + 'px'
    },
    active () {
      return this.$store.state.eventFormActive
    },
    day () {
      return this.$store.state.eventFormDay
    }
  },

  methods: {
    close () {
      this.newEvent = ''
      this.$store.commit('setEventFormActive', false)
    },
    create () {
      if (this.newEvent.length) {
        this.$store.commit('addEvent', {
          description: this.newEvent,
          date: this.day
        })
        this.close()
      }
    }
  }
}
</script>
