import { useQuery } from "react-query"
import { Unit } from "../../enums/enums"
import { Location } from "../../interfaces/interfaces"
import axios from "axios"

const WeatherData = (location: Location | undefined, unit: Unit) => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY

  const weather = useQuery(
    ["weather", location, unit],
    () => {
      const WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${
        location?.lon
      }&appid=${API_KEY}&units=${unit || "metric"}`

      const res = axios.get(WEATHER_API_ENDPOINT).then((response) => response.data)

      return res
    },
    { enabled: !!location, retry: 0 }
  )
  const forecast = useQuery(
    ["forecast", location, unit],
    () => {
      const FORECAST_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?lat=${location?.lat}&lon=${
        location?.lon
      }&appid=${API_KEY}&units=${unit || "metric"}`

      const res = axios.get(FORECAST_API_ENDPOINT).then((response) => response.data)

      return res
    },
    { enabled: !!location, retry: 0 }
  )

  return {
    weather,
    forecast,
  }
}

export default WeatherData
