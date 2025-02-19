import { useState } from 'react'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
export default function CalendarHome({}) {
  const [value, onChange] = useState(new Date())

  return (
    <div className="p-4">
      <Calendar onChange={onChange} value={value} />
    </div>
  )
}
