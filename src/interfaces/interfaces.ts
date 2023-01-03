export interface Location {
  lat: number
  lon: number
}

export interface WeatherInterface {
  coord: {
    lon: number
    lat: number
  }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
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
