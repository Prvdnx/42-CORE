# Mobile Module 02

Enhanced weather application with additional features.

## Overview
This module builds upon Module 01 with a more advanced weather application implementation.

## Project

### Medium Weather App
A functional weather application with real API integration:
- **WeatherService**: Fetches current weather, today's forecast, and weekly forecast
- **LocationService**: Gets user's current GPS coordinates
- **GeocodingService**: Converts coordinates to location names
- Three separate screens: CurrentlyScreen, TodayScreen, WeeklyScreen
- Automatic geolocation on app launch
- City search with location selection
- Loading states and error handling
- Parallel API calls with Promise.all

## Topics Covered
- Real API integration with weather services
- Geolocation and geocoding APIs
- Async/await and Promise.all for parallel requests
- Component-based architecture (separate screens)
- useCallback for memoized functions
- useEffect for side effects (initial geolocation)
- Error handling and loading states
- Passing data between components via props

## Technologies
- **React Native**: Cross-platform mobile development framework
- **Expo**: Development toolchain
- **React**: JavaScript library
- **JavaScript/ES6**: Programming language

## Usage
Navigate to the medium_weather_app directory and run:
```bash
# Using the run script (recommended)
./run rebuild  # Clean, install, and start with tunnel
./run start    # Start the development server
./run clean    # Clean project artifacts

# Or manually
npm install
npx expo start
```
