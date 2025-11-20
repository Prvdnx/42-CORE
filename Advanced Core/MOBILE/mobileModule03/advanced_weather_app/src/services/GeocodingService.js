// Geocoding service using the Open-Meteo Geocoding and Nominatim APIs

// Generic private function for API calls
const _fetchAPI = async (url, options = {}) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Fetch error for URL ${url}:`, error);
    throw error;
  }
};

export const GeocodingService = {
  // Search for cities by name
  async searchCities(query) {
    if (!query || query.trim().length < 2) {
      return [];
    }
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;

    try {
      const data = await _fetchAPI(url);
      if (!data.results) return [];

      return data.results.map(city => ({
        id: city.id,
        name: city.name,
        country: city.country,
        region: city.admin1 || '',
        latitude: city.latitude,
        longitude: city.longitude,
        displayName: `${city.name}${city.admin1 ? `, ${city.admin1}` : ''}, ${city.country}`
      }));
    } catch (error) {
      return [];
    }
  },

  // Reverse geocoding: convert coordinates to city name
  async getLocationName(latitude, longitude) {
    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;
    const options = { headers: { 'User-Agent': 'WeatherApp/1.0' } };

    try {
      const data = await _fetchAPI(url, options);
      if (!data || !data.address) {
        return this.formatCoordinatesDisplay(latitude, longitude);
      }

      const { address } = data;
      const city = address.city || address.town || address.village || address.municipality || address.county;
      const region = address.state || address.province || address.region;
      const country = address.country;

      if (!city && !country) {
        return this.formatCoordinatesDisplay(latitude, longitude);
      }

      return {
        name: city || 'Unknown Location',
        country: country || 'Unknown Country',
        region: region || '',
        latitude,
        longitude,
        displayName: `${city || 'Unknown'}${region ? `, ${region}` : ''}, ${country || ''}`.replace(/, $/, '')
      };
    } catch (error) {
      return this.formatCoordinatesDisplay(latitude, longitude);
    }
  },

  // Fallback to display a user-friendly name if reverse geocoding fails
  formatCoordinatesDisplay(latitude, longitude) {
    return {
      name: 'Current Location',
      country: '',
      region: '',
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      displayName: 'Current Location'
    };
  }
};
