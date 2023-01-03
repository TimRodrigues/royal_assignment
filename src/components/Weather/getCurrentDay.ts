export default function getCurrentDay() {
  const dayOfWeekShortStrings = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const currentDate = new Date()
  const currentDayOfWeek = currentDate.getDay()
  return dayOfWeekShortStrings[currentDayOfWeek]
}
