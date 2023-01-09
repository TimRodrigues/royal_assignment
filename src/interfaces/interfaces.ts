export interface Location {
  lat: number
  lon: number
}

export interface WeatherInterface {
  name: string
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  main: {
    temp: number
  }
  dt: number
  id: number
  coord: {
    lon: number
    lat: number
  }
}

export interface Forecast {
  dt: number
  main: {
    temp: number
    feels_like: number
    humidity: number
  }
  weather: {
    description: string
    icon: string
  }[]
  wind: {
    speed: number
  }
  pop: number
}

export interface ForecastByDay {
  [day: string]: {
    day: string
    highestTemp: number
    lowestTemp: number
    description: string
    icon: string
    windSpeed: number
    chanceOfRain: number
    feelsLikeTemp: number
    humidity: number
    forecast: Forecast[]
  }
}
