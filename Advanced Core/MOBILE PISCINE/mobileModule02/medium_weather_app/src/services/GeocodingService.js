// Geocoding service using the Open-Meteo Geocoding and Nominatim APIs

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

  async getLocationName(latitude, longitude) { // handles reverse geocoding for geolocation
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

  formatCoordinatesDisplay(latitude, longitude) {
    const lat = parseFloat(latitude).toFixed(6);
    const lon = parseFloat(longitude).toFixed(6);
    return {
      name: 'Current Location',
      latitude: lat,
      longitude: lon,
      displayName: `${lat}, ${lon}`
    };
  }
};




// //test to fetch and log raw geocoding data
// const logGeocodingData = async (query) => {
//   const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=10&language=en&format=json`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log('Raw Geocoding Data:', data); // logs full raw JSON response
//   } catch (error) {
//     console.error('Error fetching geocoding data:', error);
//   }
// };
// logGeocodingData('London');


// // test to fetch and log raw reverse geocoding data
// const logReverseGeocodingData = async (latitude, longitude) => {
//   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10&addressdetails=1`;
//   try {
//     const response = await fetch(url, {
//       headers: { 'User-Agent': 'WeatherApp/1.0' } // required by Nominatim API
//     });
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     const data = await response.json();
//     console.log('Raw Reverse Geocoding Data:', data); // logs the full raw JSON response
//   } catch (error) {
//     console.error('Error fetching reverse geocoding data:', error);
//   }
// };
// logReverseGeocodingData(40.7128, -74.0060); //New york city
