// Weather service using the Open-Meteo API
const API_BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Private function to fetch weather data
const _fetchWeatherData = async (latitude, longitude, params) => {
  try {
    const url = `${API_BASE_URL}?latitude=${latitude}&longitude=${longitude}&${params}&timezone=auto`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch weather data for params: ${params}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Weather data fetch error:', error);
    throw error;
  }
};

export const WeatherService = {
  // Get the current weather
  async getCurrentWeather(latitude, longitude) {
    const params = 'current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m';
    const data = await _fetchWeatherData(latitude, longitude, params);
    
    return {
      temperature: Math.round(data.current.temperature_2m),
      humidity: data.current.relative_humidity_2m,
      windSpeed: Math.round(data.current.wind_speed_10m),
      weatherCode: data.current.weather_code,
      description: this.getWeatherDescription(data.current.weather_code),
      unit: data.current_units.temperature_2m
    };
  },

  // Get today's forecast (24h)
  async getTodayForecast(latitude, longitude) {
    const params = 'hourly=temperature_2m,weather_code,wind_speed_10m&forecast_days=1';
    const data = await _fetchWeatherData(latitude, longitude, params);
    
    return data.hourly.time.map((time, index) => ({
      time: new Date(time).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
      temperature: Math.round(data.hourly.temperature_2m[index]),
      weatherCode: data.hourly.weather_code[index],
      description: this.getWeatherDescription(data.hourly.weather_code[index]),
      windSpeed: Math.round(data.hourly.wind_speed_10m[index])
    }));
  },

  // Get the weekly forecast
  async getWeeklyForecast(latitude, longitude) {
    const params = 'daily=temperature_2m_max,temperature_2m_min,weather_code&forecast_days=7';
    const data = await _fetchWeatherData(latitude, longitude, params);
    
    return data.daily.time.map((date, index) => ({
      date: new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      maxTemp: Math.round(data.daily.temperature_2m_max[index]),
      minTemp: Math.round(data.daily.temperature_2m_min[index]),
      weatherCode: data.daily.weather_code[index],
      description: this.getWeatherDescription(data.daily.weather_code[index])
    }));
  },

  // Convert weather code to description
  getWeatherDescription(code) {
    const weatherCodes = {
      0: 'Clear sky', 1: 'Mainly clear', 2: 'Partly cloudy', 3: 'Overcast',
      45: 'Fog', 48: 'Depositing rime fog', 51: 'Light drizzle', 53: 'Moderate drizzle',
      55: 'Dense drizzle', 56: 'Light freezing drizzle', 57: 'Dense freezing drizzle',
      61: 'Slight rain', 63: 'Moderate rain', 65: 'Heavy rain', 66: 'Light freezing rain',
      67: 'Heavy freezing rain', 71: 'Slight snow fall', 73: 'Moderate snow fall',
      75: 'Heavy snow fall', 77: 'Snow grains', 80: 'Slight rain showers',
      81: 'Moderate rain showers', 82: 'Violent rain showers', 85: 'Slight snow showers',
      86: 'Heavy snow showers', 95: 'Thunderstorm', 96: 'Thunderstorm with slight hail',
      99: 'Thunderstorm with heavy hail'
    };
    return weatherCodes[code] || 'Unknown';
  }
};
