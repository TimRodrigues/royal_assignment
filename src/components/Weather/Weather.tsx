import React from "react"
import { useState, useEffect } from "react"
import getCurrentDay from "./getCurrentDay"
import WeatherAirConditions from "./WeatherAirConditions"
import WeatherDayForecast from "./WeatherDayForecast"
import WeatherForecast from "./WeatherForecast"
import WeatherHeader from "./WeatherHeader"
import ClipLoader from "react-spinners/ClipLoader"
import { Forecast, ForecastByDay, WeatherInterface } from "../../interfaces/interfaces"
import { Unit } from "../../enums/enums"

interface WeatherProps {
  weather: WeatherInterface
  forecast: Forecast[]
  refetchWeather: () => void
  isFetching: boolean
  unit: Unit
  setUnit: (unit: Unit) => void
  weatherError: any
  forecastError: any
}

const Weather = (props: WeatherProps) => {
  const { weather, forecast, refetchWeather, isFetching, unit, setUnit, weatherError, forecastError } = props
  const [selectedDay, setSelectedDay] = useState<string>("")

  useEffect(() => {
    if (forecast && !selectedDay) setSelectedDay(getCurrentDay(forecast[0].dt))
  }, [forecast, selectedDay])

  const forecastByDay = forecast?.reduce((acc: ForecastByDay, item: Forecast) => {
    const date = new Date(item.dt * 1000)
    const day: string = date.toLocaleDateString("en-US", { weekday: "short" })
    if (!acc[day]) {
      acc[day] = {
        day,
        highestTemp: item.main.temp,
        lowestTemp: item.main.temp,
        feelsLikeTemp: item.main.feels_like,
        humidity: item.main.humidity,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
        windSpeed: item.wind.speed,
        chanceOfRain: item.pop,
        forecast: [item],
      }
    } else {
      acc[day].highestTemp = Math.max(acc[day].highestTemp, item.main.temp)
      acc[day].lowestTemp = Math.min(acc[day].lowestTemp, item.main.temp)
      acc[day].description = item.weather[0].description
      acc[day].icon = item.weather[0].icon
      acc[day].windSpeed = (acc[day].windSpeed + item.wind.speed) / 2
      acc[day].chanceOfRain = (acc[day].chanceOfRain + item.pop) / 2
      acc[day].feelsLikeTemp = (acc[day].feelsLikeTemp + item.main.feels_like) / 2
      acc[day].humidity = (acc[day].humidity + item.main.humidity) / 2
      acc[day].forecast.push(item)
    }
    return acc
  }, {} as ForecastByDay)

  const getWeatherImage = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`
  }

  const changeUnit = () => {
    setUnit(unit === Unit.Metric ? Unit.Imperial : Unit.Metric)
  }

  if (weatherError || forecastError) {
    return (
      <>
        <p>Something went wrong {weatherError ? weatherError?.message : forecastError?.message}</p>
        <button className="weather-content-actions-refresh" onClick={refetchWeather}>
          {isFetching ? <ClipLoader size={20} /> : "Refetch"}
        </button>
      </>
    )
  }

  return (
    <div className="Weather">
      <div className="weather-content">
        <div className="weather-content-actions">
          <button className="weather-content-actions-refresh" onClick={refetchWeather}>
            {isFetching ? <ClipLoader size={20} /> : "Refetch"}
          </button>
          <button className="weather-content-actions-unit" onClick={changeUnit}>
            Show in {unit === "metric" ? "Imperial" : "Metric"}
          </button>
        </div>
        {forecastByDay && weather ? (
          <div className="weather-content-wrapper">
            <div className="weather-content-day">
              <WeatherHeader
                weather={weather}
                forecastByDay={forecastByDay}
                selectedDay={selectedDay}
                getWeatherImage={getWeatherImage}
              />
              <WeatherDayForecast
                forecastByDay={forecastByDay}
                selectedDay={selectedDay}
                getWeatherImage={getWeatherImage}
              />
              <WeatherAirConditions forecastByDay={forecastByDay} selectedDay={selectedDay} unit={unit} />
            </div>
            <WeatherForecast
              forecastByDay={forecastByDay}
              selectedDay={selectedDay}
              setSelectedDay={setSelectedDay}
              getWeatherImage={getWeatherImage}
            />
          </div>
        ) : (
          <ClipLoader size={150} data-testid="loader" />
        )}
      </div>
    </div>
  )
}

export default Weather
