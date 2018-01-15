
// import the base (common logic) file for our App
import VueCalendar from './entry'

import moment from 'moment-timezone'
moment.tz.setDefault("UTC")

export default function(context) {
  let events = context.events.map((evt) => {
    return {
      description: evt.description,
      date: moment(evt.date)
    }
  })
  return VueCalendar(events)
}
