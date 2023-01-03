import React from "react"
import { ForecastByDay } from "../../interfaces/interfaces"

interface WeatherForecastProps {
  forecastByDay: ForecastByDay
  selectedDay: string
  getWeatherImage: (icon: string) => string
  setSelectedDay: (day: string) => void
}

const WeatherForecast = (props: WeatherForecastProps) => {
  const { forecastByDay, selectedDay, getWeatherImage, setSelectedDay } = props

  return (
    <div className="weather-forecast">
      <p className="weather-forecast-title">6-DAY FORECAST</p>
      <div className="weather-forecast-day-wrapper">
        {Object.values(forecastByDay).map((item) => (
          <div
            key={item.day}
            onClick={() => setSelectedDay(item.day)}
            className={
              selectedDay === item.day ? "weather-forecast-day-item selected-day" : "weather-forecast-day-item"
            }
          >
            <p style={{ fontWeight: "bold" }}>{item.day}</p>
            <div className="weather-forecast-day-image-description">
              <img src={getWeatherImage(item.icon)} alt={item.description} />
              <p>{item.description}</p>
            </div>
            <div>
              <span>{Math.round(item.highestTemp)}</span>° /{Math.round(item.lowestTemp)}°
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherForecast
