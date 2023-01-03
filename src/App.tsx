import React from "react"
import "./App.css"
import { useState, useEffect } from "react"
import Weather from "./components/Weather/Weather"
import WeatherData from "./components/WeatherData/WeatherData"
import { Unit } from "./enums/enums"
import { Location } from "./interfaces/interfaces"

function App() {
  const [location, setLocation] = useState<Location>()
  const [unit, setUnit] = useState<Unit>(Unit.Metric)
  const [currentLocationError, setCurrentLocationError] = useState<GeolocationPositionError>()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        })
      },
      (error) => {
        setCurrentLocationError(error)
      }
    )
  }, [])

  const { weather, isFetching, refetchWeather, forecast, weatherError, forecastError } = WeatherData(location, unit)

  return (
    <div className="App">
      <div>
        {currentLocationError ? (
          <p>{currentLocationError.message}</p>
        ) : (
          <Weather
            weather={weather}
            forecast={forecast?.list}
            refetchWeather={refetchWeather}
            isFetching={isFetching}
            unit={unit}
            setUnit={setUnit}
            weatherError={weatherError}
            forecastError={forecastError}
          />
        )}
      </div>
    </div>
  )
}

export default App
