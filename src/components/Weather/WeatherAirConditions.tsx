import React from "react"
import { Unit } from "../../enums/enums"
import { ForecastByDay } from "../../interfaces/interfaces"

interface WeatherAirConditionsProps {
  forecastByDay: ForecastByDay
  selectedDay: string
  unit: Unit
}

const WeatherAirConditions = (props: WeatherAirConditionsProps) => {
  const { forecastByDay, selectedDay, unit } = props

  return (
    <div className="weather-air-conditions">
      <p className="weather-air-conditions-title">AIR CONDITIONS</p>
      <div className="weather-air-conditions-wrapper">
        <div className="weather-air-conditions-item-col">
          <div className="weather-air-conditions-item">
            <p>Real Feel</p>
            <div>{Math.round(forecastByDay[selectedDay]?.feelsLikeTemp)}°</div>
          </div>
          <div className="weather-air-conditions-item">
            <p>Chance of rain</p>
            <div>{(forecastByDay[selectedDay]?.chanceOfRain * 100).toFixed(1)}%</div>
          </div>
        </div>
        <div className="weather-air-conditions-item-col-right">
          <div className="weather-air-conditions-item">
            <p>Wind</p>
            <div>
              {Math.round(forecastByDay[selectedDay]?.windSpeed * 100) / 100} {unit === "metric" ? "m/s" : "mph"}
            </div>
          </div>
          <div className="weather-air-conditions-item">
            <p>Humidity</p>
            <div>{Math.round(forecastByDay[selectedDay]?.humidity)}%</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WeatherAirConditions
