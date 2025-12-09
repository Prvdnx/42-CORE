// Get the corresponding weather icon and color
export const getWeatherIconAndColor = (weatherCode) => {
  const iconMap = {
    0: { icon: 'sunny', color: '#FFD700' },         // Clear sky - Golden
    1: { icon: 'partly-sunny', color: '#FFA500' },  // Mainly clear - Orange
    2: { icon: 'partly-sunny', color: '#FF8C00' },  // Partly cloudy - Dark Orange
    3: { icon: 'cloudy', color: '#708090' },        // Overcast - Slate Gray
    45: { icon: 'cloud', color: '#A9A9A9' },        // Fog - Dark Gray
    48: { icon: 'cloud', color: '#A9A9A9' },        // Depositing rime fog - Dark Gray
    51: { icon: 'rainy', color: '#4682B4' },        // Light drizzle - Steel Blue
    53: { icon: 'rainy', color: '#4169E1' },        // Moderate drizzle - Royal Blue
    55: { icon: 'rainy', color: '#1E90FF' },        // Dense drizzle - Dodger Blue
    56: { icon: 'snow', color: '#87CEEB' },         // Light freezing drizzle - Sky Blue
    57: { icon: 'snow', color: '#B0E0E6' },         // Dense freezing drizzle - Powder Blue
    61: { icon: 'rainy', color: '#4682B4' },        // Slight rain - Steel Blue
    63: { icon: 'rainy', color: '#4169E1' },        // Moderate rain - Royal Blue
    65: { icon: 'rainy', color: '#0000CD' },        // Heavy rain - Medium Blue
    66: { icon: 'snow', color: '#87CEEB' },         // Light freezing rain - Sky Blue
    67: { icon: 'snow', color: '#6495ED' },         // Heavy freezing rain - Cornflower Blue
    71: { icon: 'snow', color: '#E0FFFF' },         // Slight snow fall - Light Cyan
    73: { icon: 'snow', color: '#B0E0E6' },         // Moderate snow fall - Powder Blue
    75: { icon: 'snow', color: '#87CEEB' },         // Heavy snow fall - Sky Blue
    77: { icon: 'snow', color: '#F0F8FF' },         // Snow grains - Alice Blue
    80: { icon: 'rainy', color: '#4682B4' },        // Slight rain showers - Steel Blue
    81: { icon: 'rainy', color: '#4169E1' },        // Moderate rain showers - Royal Blue
    82: { icon: 'rainy', color: '#0000CD' },        // Violent rain showers - Medium Blue
    85: { icon: 'snow', color: '#B0E0E6' },         // Slight snow showers - Powder Blue
    86: { icon: 'snow', color: '#87CEEB' },         // Heavy snow showers - Sky Blue
    95: { icon: 'thunderstorm', color: '#483D8B' }, // Thunderstorm - Dark Slate Blue
    96: { icon: 'thunderstorm', color: '#4B0082' }, // Thunderstorm with slight hail - Indigo
    99: { icon: 'thunderstorm', color: '#800080' }  // Thunderstorm with heavy hail - Purple
  };
  
  return iconMap[weatherCode] || { icon: 'partly-sunny', color: '#FFA500' };
};

// function to get only the icon if needed
export const getWeatherIcon = (weatherCode) => {
  return getWeatherIconAndColor(weatherCode).icon;
};
