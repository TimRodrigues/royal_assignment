import { useQuery } from "react-query"
import { Unit } from "../../enums/enums"
import { Location } from "../../interfaces/interfaces"

const WeatherData = (location: Location | undefined, unit: Unit) => {
  const API_KEY = process.env.REACT_APP_WEATHER_API_KEY
  const {
    data: weather,
    isFetching,
    error: weatherError,
    refetch: refetchWeather,
  } = useQuery(
    ["weather", location, unit],
    async () => {
      const WEATHER_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?lat=${location?.lat}&lon=${
        location?.lon
      }&appid=${API_KEY}&units=${unit || "metric"}`
      const res = await fetch(WEATHER_API_ENDPOINT)
      if (res.status === 400) {
        throw new Error("Invalid location")
      }
      return res.json()
    },
    { enabled: !!location, retry: 1 }
  )
  const {
    data: forecast,
    error: forecastError,
    refetch: refetchForecast,
  } = useQuery(
    ["forecast", location, unit],
    async () => {
      const FORECAST_API_ENDPOINT = `https://api.openweathermap.org/data/2.5/forecast?lat=${location?.lat}&lon=${
        location?.lon
      }&appid=${API_KEY}&units=${unit || "metric"}`
      const res = await fetch(FORECAST_API_ENDPOINT)
      if (res.status === 400) {
        throw new Error("Invalid location")
      }
      return res.json()
    },
    { enabled: !!location, retry: 1 }
  )

  return {
    weather,
    isFetching,
    weatherError,
    forecast,
    forecastError,
    refetchWeather,
    refetchForecast,
  }
}

export default WeatherData
