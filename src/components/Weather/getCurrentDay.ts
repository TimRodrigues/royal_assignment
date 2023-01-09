export default function getCurrentDay(item: number) {
  const date = new Date(item * 1000)
  const day: string = date.toLocaleDateString("en-US", { weekday: "short" })

  return day
}
