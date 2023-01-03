import React from "react"
import { ForecastByDay } from "../../interfaces/interfaces"

interface WeatherDayForecastProps {
  forecastByDay: ForecastByDay
  selectedDay: string
  getWeatherImage: (icon: string) => string
}

const WeatherDayForecast = (props: WeatherDayForecastProps) => {
  const { forecastByDay, selectedDay, getWeatherImage } = props
  return (
    <div className="weather-day-forecast">
      <p className="weather-day-forecast-title">{selectedDay} FORECAST</p>
      <div className="weather-day-forecast-content">
        {forecastByDay[selectedDay]?.forecast.map((item) => (
          <div className="weather-day-forecast-hour" key={item.dt}>
            <p>
              {new Date(item.dt * 1000).toLocaleTimeString("en-US", {
                hour: "numeric",
                minute: "numeric",
              })}
            </p>
            <img src={getWeatherImage(item?.weather[0].icon)} alt={item?.weather[0].description} />
            <p className="weather-day-forecast-hour-temperature">{Math.round(item?.main?.temp)}°</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherDayForecast
