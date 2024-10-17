// export const timeConv = function (str) {
//     const d = new Date(str)

//   const options = {
//     month: 'short',
//     day: '2-digit',
//     year: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true,
//     timeZone: 'Asia/Kolkata', // Set the time zone to India
//   }



//   return d.toLocaleString('en-IN', options)
// }



export const timeConv = function (str: string): string {
  const d = new Date(str);

  const options: Intl.DateTimeFormatOptions = {
      month: 'short',
      day: '2-digit',
      year: '2-digit', // Correct type
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
      timeZone: 'Asia/Kolkata', // Set the time zone to India
  };

  return d.toLocaleString('en-IN', options);
}








export function prettyDate(d) {
  const date = new Date(d)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  return (
    date.getUTCDate() + '-' +
    months[date.getUTCMonth()] + '-' +
    date.getUTCFullYear()
  )
}

export function prettyDateTime(d) {
  const date = new Date(d)
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]

  const dat = date.getDate() < 10 ? `0${date.getDate()} ` : date.getDate()
  const hr = date.getHours() < 10 ? `0${date.getHours()} ` : date.getHours()

  return (
    months[date.getMonth()] +
    ' ' +
    dat +
    ', ' +
    date.getFullYear() +
    '   ' +
    hr +
    ':' +
    String(date.getMinutes()).padStart(2, '0')
  )
}
export function getDifferenceInDays(date1, date2) {
  const x = new Date()
  const diffInMs = date1 - x
  return parseInt(diffInMs / (1000 * 60 * 60 * 24))
}

export function getDifferenceInHours(date1, date2) {
  const x = new Date()
  const diffInMs = date1 - x
  return parseInt(diffInMs / (1000 * 60 * 60))
}

export function getDifferenceInMinutes(date1, date2) {
  const x = new Date()
  const diffInMs = date1 - x
  return parseInt(diffInMs / (1000 * 60))
}

export function getDifferenceInSeconds(date1, date2) {
  const x = new Date()

  const diffInMs = Math.abs(x - date1)
  return parseInt(diffInMs / 1000)
}

export function formatToPhone(no) {
  return no?.toString().replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
}

export function getWeekMonthNo(milliseconds) {
  const date = new Date(milliseconds)
  const currentMonth = date.getMonth()
  // Get month and year
  const month = date.getMonth() + 1 // Months are zero-based
  const year = date.getFullYear()
  // Get week number
  const weekNumberOfMonth = Math.ceil((date.getDate() + date.getDay()) / 7)

  // Get the day of the week (0 for Sunday, 1 for Monday, ..., 6 for Saturday)
  const dayOfWeek = date.getDay()

  // Adjust the date to start from Monday (if current day is Sunday, move back one week)
  date.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))

  // Get the year of the date

  // Find the first Thursday of the year
  const firstThursday = new Date(year, 0, 4 - ((date.getDay() + 6) % 7))

  // Calculate the week number
  const weekNumberOfYear = Math.floor(
    (date - firstThursday) / (7 * 24 * 3600 * 1000) + 1
  )

  // Calculate the start date of the week (assuming Monday as the start of the week)
  const startDate = new Date(date)
  startDate.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))

  // Calculate the end date of the week
  const endDate = new Date(startDate)
  endDate.setDate(startDate.getDate() + 6)
  // If the end date is in a different month, adjust it to the last day of the month
  if (endDate.getMonth() !== currentMonth) {
    endDate.setDate(new Date(year, currentMonth + 1, 0).getDate())
  }
  // Format the date string
  const formattedDate = `W-${weekNumberOfYear}_M-${month}_year-${year}`

  return {
    weekNumberOfYear: weekNumberOfYear,
    weekNumberOfMonth: weekNumberOfMonth,
    month: month,
    year,
  }
}

export function getNextThreeMonths() {
  const months = [
    { name: 'January', value: 1 },
    { name: 'February', value: 2 },
    { name: 'March', value: 3 },
    { name: 'April', value: 4 },
    { name: 'May', value: 5 },
    { name: 'June', value: 6 },
    { name: 'July', value: 7 },
    { name: 'August', value: 8 },
    { name: 'September', value: 9 },
    { name: 'October', value: 10 },
    { name: 'November', value: 11 },
    { name: 'December', value: 12 },
  ]

  // Get the current month
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonthIndex = currentDate.getMonth()
  const currentMonthName = months[currentMonthIndex]

  const nextMonths = [
    {
      name: `${currentMonthName?.name}-${currentYear}`,
      count: currentMonthName?.value,
      currentYear: currentYear //%100
    },
  ]

  // Get the names and counts of the next three months
  for (let i = 1; i <= 3; i++) {
    const nextMonthIndex = (currentMonthIndex + i) % 12
    const nextMonthName = months[nextMonthIndex]
    nextMonths.push({
      name: `${nextMonthName?.name}-${currentYear}`,
      count: nextMonthName?.value,
      currentYear: currentYear //%100 // high
    })
  }

  return nextMonths
}
