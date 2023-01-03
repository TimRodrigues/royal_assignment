import React from "react"
import { ForecastByDay, WeatherInterface } from "../../interfaces/interfaces"

interface WeatherHeaderProps {
  weather: WeatherInterface
  forecastByDay: ForecastByDay
  selectedDay: string
  getWeatherImage: (icon: string) => string
}

const WeatherHeader = (props: WeatherHeaderProps) => {
  const { weather, forecastByDay, selectedDay, getWeatherImage } = props

  return (
    <>
      {selectedDay === Object.keys(forecastByDay)[0] ? (
        <div className="weather-header">
          <div className="weather-header-left">
            <h1 className="weather-header-location">{weather.name}</h1>
            <p className="weather-header-description">{weather.weather[0].description}</p>
            <h1 className="weather-header-temperature">{Math.round(weather.main.temp)}°</h1>
          </div>
          <img src={getWeatherImage(weather?.weather[0].icon)} alt={weather?.weather[0].description} />
        </div>
      ) : (
        <div className="weather-header">
          <div className="weather-header-left">
            <h1 className="weather-header-location">{weather.name}</h1>
            <p className="weather-header-description">{forecastByDay[selectedDay]?.description}</p>
            <h1 className="weather-header-temperature">
              <div>
                {Math.round(forecastByDay[selectedDay]?.highestTemp)}°
                <span>/{Math.round(forecastByDay[selectedDay]?.lowestTemp)}°</span>
              </div>
            </h1>
          </div>
          <img src={getWeatherImage(forecastByDay[selectedDay]?.icon)} alt={forecastByDay[selectedDay]?.description} />
        </div>
      )}
    </>
  )
}

export default WeatherHeader
